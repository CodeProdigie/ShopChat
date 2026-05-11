import "server-only";

import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { getShopChatDb, hasMongoConfig } from "@/lib/mongodb";
import {
  demoConversation,
  demoMessages,
  demoOrder,
  demoProducts,
  type ChatMessage,
  type Conversation,
  type Order,
  type Product,
} from "@/lib/shopchat-data";

const collections = {
  products: "products",
  conversations: "conversations",
  messages: "messages",
  orders: "orders",
  users: "users",
};

async function withMongo<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasMongoConfig()) {
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.warn("Falling back to demo data after MongoDB error", error);
    return fallback;
  }
}

export async function syncCurrentUser(role: "buyer" | "seller" = "buyer") {
  const session = await auth();
  const userId = session.userId;

  if (!userId || !hasMongoConfig()) {
    return userId;
  }

  try {
    const db = await getShopChatDb();
    await db.collection(collections.users).updateOne(
      { clerkId: userId },
      {
        $setOnInsert: {
          clerkId: userId,
          role,
          plan: "free",
          createdAt: new Date().toISOString(),
        },
        $set: { updatedAt: new Date().toISOString() },
      },
      { upsert: true },
    );
  } catch (error) {
    console.warn("Unable to sync Clerk user to MongoDB", error);
  }

  return userId;
}

export async function getProducts(): Promise<Product[]> {
  return withMongo(async () => {
    const db = await getShopChatDb();
    const products = await db
      .collection<Product>(collections.products)
      .find({})
      .sort({ title: 1 })
      .toArray();

    if (products.length === 0) {
      await db.collection<Product>(collections.products).insertMany(demoProducts);
      return demoProducts;
    }

    return products;
  }, demoProducts);
}

export async function getProduct(slug: string): Promise<Product> {
  const fallback =
    demoProducts.find((product) => product.slug === slug) || demoProducts[3];

  return withMongo(async () => {
    const db = await getShopChatDb();
    const product = await db
      .collection<Product>(collections.products)
      .findOne({ slug });

    return product || fallback;
  }, fallback);
}

export async function getOrCreateConversation(productSlug: string) {
  const currentUserId = (await syncCurrentUser("buyer")) || demoConversation.buyerId;
  const product = await getProduct(productSlug);
  const fallback = {
    conversation: {
      ...demoConversation,
      buyerId: currentUserId,
      productSlug,
      sellerId: product.sellerId,
    },
    product,
  };

  return withMongo(async () => {
    const db = await getShopChatDb();
    const now = new Date().toISOString();
    const existing = await db.collection<Conversation>(collections.conversations).findOne({
      buyerId: currentUserId,
      productSlug,
      sellerId: product.sellerId,
    });

    if (existing) {
      return { conversation: existing, product };
    }

    const conversation: Conversation = {
      id: randomUUID(),
      buyerId: currentUserId,
      sellerId: product.sellerId,
      productSlug,
      status: "active",
    };

    await db.collection<Conversation & { createdAt: string }>(collections.conversations).insertOne({
      ...conversation,
      createdAt: now,
    });

    await db.collection<ChatMessage>(collections.messages).insertOne({
      id: randomUUID(),
      conversationId: conversation.id,
      senderId: "system",
      senderRole: "system",
      text: `Conversation started for ${product.title}.`,
      createdAt: now,
    });

    return { conversation, product };
  }, fallback);
}

export async function getConversationMessages(conversationId: string) {
  const fallback = demoMessages.map((message) => ({
    ...message,
    conversationId,
  }));

  return withMongo(async () => {
    const db = await getShopChatDb();
    const messages = await db
      .collection<ChatMessage>(collections.messages)
      .find({ conversationId })
      .sort({ createdAt: 1 })
      .toArray();

    return messages.length > 0 ? messages : fallback;
  }, fallback);
}

export async function createMessage(params: {
  conversationId: string;
  text: string;
  senderRole?: "buyer" | "seller";
}) {
  const currentUserId = (await syncCurrentUser(params.senderRole || "buyer")) || "demo-buyer";
  const message: ChatMessage = {
    id: randomUUID(),
    conversationId: params.conversationId,
    senderId: currentUserId,
    senderRole: params.senderRole || "buyer",
    text: params.text,
    createdAt: new Date().toISOString(),
  };

  if (hasMongoConfig()) {
    try {
      const db = await getShopChatDb();
      await db.collection<ChatMessage>(collections.messages).insertOne(message);
    } catch (error) {
      console.warn("Unable to persist chat message", error);
    }
  }

  return message;
}

export async function getOrder(orderId: string): Promise<{ order: Order; product: Product }> {
  const fallbackProduct = demoProducts.find((product) => product.slug === demoOrder.productSlug) || demoProducts[3];
  const fallback = { order: { ...demoOrder, id: orderId || demoOrder.id }, product: fallbackProduct };

  return withMongo(async () => {
    const db = await getShopChatDb();
    const order = await db.collection<Order>(collections.orders).findOne({ id: orderId });
    if (!order) {
      return fallback;
    }

    return { order, product: await getProduct(order.productSlug) };
  }, fallback);
}
