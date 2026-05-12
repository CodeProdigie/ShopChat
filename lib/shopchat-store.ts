import "server-only";

import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { getShopChatDb, hasMongoConfig } from "@/lib/mongodb";
import {
  demoConversation,
  demoOrder,
  demoProducts,
  type ChatMessage,
  type Conversation,
  type Order,
  type Product,
} from "@/lib/shopchat-data";

const memory = globalThis as typeof globalThis & {
  __shopchatProducts?: Product[];
  __shopchatConversations?: Conversation[];
  __shopchatMessages?: ChatMessage[];
};

function memoryProducts() {
  memory.__shopchatProducts ||= [];
  return memory.__shopchatProducts;
}

function memoryConversations() {
  memory.__shopchatConversations ||= [];
  return memory.__shopchatConversations;
}

function memoryMessages() {
  memory.__shopchatMessages ||= [];
  return memory.__shopchatMessages;
}

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

export async function activateSeller() {
  const session = await auth();
  const userId = session.userId;

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  if (hasMongoConfig()) {
    try {
      const db = await getShopChatDb();
      await db.collection(collections.users).updateOne(
        { clerkId: userId },
        {
          $set: {
            role: "seller",
            sellerId: userId,
            updatedAt: new Date().toISOString(),
          },
          $setOnInsert: {
            clerkId: userId,
            plan: "free",
            createdAt: new Date().toISOString(),
          },
        },
        { upsert: true },
      );
    } catch (error) {
      console.warn("Unable to activate seller in MongoDB", error);
    }
  }

  return { sellerId: userId, role: "seller" as const };
}

export async function getProducts(): Promise<Product[]> {
  return withMongo(async () => {
    const db = await getShopChatDb();
    return db
      .collection<Product>(collections.products)
      .find({})
      .sort({ title: 1 })
      .toArray();
  }, []);
}

export async function getProduct(slug: string): Promise<Product> {
  const fallback =
    memoryProducts().find((product) => product.slug === slug) || demoProducts[3];

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

    return { conversation, product };
  }, (() => {
    const conversations = memoryConversations();
    let conversation = conversations.find(
      (item) =>
        item.buyerId === currentUserId &&
        item.productSlug === productSlug &&
        item.sellerId === product.sellerId,
    );

    if (!conversation) {
      conversation = {
        id: `${currentUserId}-${productSlug}`,
        buyerId: currentUserId,
        sellerId: product.sellerId,
        productSlug,
        status: "active",
      };
      conversations.push(conversation);
    }

    return { conversation, product };
  })());
}

export async function getConversationMessages(conversationId: string) {
  const fallback = memoryMessages().filter((message) => message.conversationId === conversationId);

  return withMongo(async () => {
    const db = await getShopChatDb();
    const messages = await db
      .collection<ChatMessage>(collections.messages)
      .find({ conversationId })
      .sort({ createdAt: 1 })
      .toArray();

    return messages;
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

  memoryMessages().push(message);

  return message;
}

export async function createProduct(input: {
  title: string;
  price: number;
  description: string;
  category?: string;
  image?: string;
  stock?: number;
}) {
  const sellerId = (await syncCurrentUser("seller")) || "demo-seller";
  const slug = `${input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString(36)}`;
  const product: Product = {
    slug,
    title: input.title,
    price: input.price,
    priceLabel: `$${input.price.toLocaleString()}`,
    description: input.description,
    sellerId,
    seller: "Your Shop",
    badge: "New Arrival",
    image:
      input.image ||
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    rating: 5,
    sales: "0 Sales",
    category: input.category || "General",
    stock: input.stock ?? 1,
    createdAt: new Date().toISOString(),
    specs: [
      { label: "Stock", value: `${input.stock ?? 1} available` },
      { label: "Category", value: input.category || "General" },
    ],
  };

  if (hasMongoConfig()) {
    try {
      const db = await getShopChatDb();
      await db.collection<Product>(collections.products).insertOne(product);
    } catch (error) {
      console.warn("Unable to persist product", error);
    }
  }

  memoryProducts().unshift(product);
  return product;
}

export async function deleteProduct(slug: string) {
  const sellerId = (await syncCurrentUser("seller")) || "demo-seller";

  if (hasMongoConfig()) {
    try {
      const db = await getShopChatDb();
      await db.collection<Product>(collections.products).deleteOne({ slug, sellerId });
    } catch (error) {
      console.warn("Unable to delete product", error);
    }
  }

  memory.__shopchatProducts = memoryProducts().filter(
    (product) => !(product.slug === slug && product.sellerId === sellerId),
  );
  return { ok: true };
}

export async function getSellerProducts() {
  const sellerId = (await syncCurrentUser("seller")) || "demo-seller";

  return withMongo(async () => {
    const db = await getShopChatDb();
    return db
      .collection<Product>(collections.products)
      .find({ sellerId })
      .sort({ createdAt: -1 })
      .toArray();
  }, memoryProducts().filter((product) => product.sellerId === sellerId));
}

export async function getSellerConversations() {
  const sellerId = (await syncCurrentUser("seller")) || "demo-seller";
  const fallbackConversations = memoryConversations().filter(
    (conversation) => conversation.sellerId === sellerId,
  );

  return withMongo(async () => {
    const db = await getShopChatDb();
    return db
      .collection<Conversation>(collections.conversations)
      .find({ sellerId })
      .toArray();
  }, fallbackConversations);
}

export async function createProductOffer(params: {
  conversationId: string;
  productSlug: string;
  note: string;
}) {
  const product = await getProduct(params.productSlug);
  const text = `${params.note}\n\nOFFER::${product.slug}`;
  return createMessage({
    conversationId: params.conversationId,
    senderRole: "seller",
    text,
  });
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
