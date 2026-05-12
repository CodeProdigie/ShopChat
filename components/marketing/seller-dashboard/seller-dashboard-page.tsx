"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  MessageSquare,
  Package,
  Plus,
  Send,
  ShoppingBag,
  Store,
  Trash2,
} from "lucide-react";
import { ShopChatUserButton } from "@/components/auth/shopchat-user-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { ChatMessage, Conversation, Product } from "@/lib/shopchat-data";

function money(value: number) {
  return `$${value.toLocaleString()}`;
}

export function SellerDashboardPage({
  initialProducts,
  initialConversations,
}: {
  initialProducts: Product[];
  initialConversations: Conversation[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [conversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    initialConversations[0] || null,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [offerProduct, setOfferProduct] = useState(initialProducts[0]?.slug || "");
  const totalInventory = products.reduce((sum, product) => sum + (product.stock || 0), 0);
  const selectedProduct = useMemo(
    () => products.find((product) => product.slug === selectedConversation?.productSlug),
    [products, selectedConversation],
  );

  useEffect(() => {
    if (!selectedConversation) {
      return;
    }

    fetch(`/api/conversations/${selectedConversation.id}/messages`)
      .then((response) => response.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => setMessages([]));
  }, [selectedConversation]);

  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        price: Number(form.get("price")),
        stock: Number(form.get("stock")),
        category: form.get("category"),
        image: form.get("image"),
        description: form.get("description"),
      }),
    });

    if (!response.ok) {
      return;
    }

    const { product } = (await response.json()) as { product: Product };
    setProducts((current) => [product, ...current]);
    setOfferProduct(product.slug);
    event.currentTarget.reset();
  }

  async function removeProduct(slug: string) {
    await fetch(`/api/products/${slug}`, { method: "DELETE" });
    setProducts((current) => current.filter((product) => product.slug !== slug));
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedConversation || !draft.trim()) {
      return;
    }

    const response = await fetch(`/api/conversations/${selectedConversation.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: draft.trim(), senderRole: "seller" }),
    });

    if (response.ok) {
      const { message } = (await response.json()) as { message: ChatMessage };
      setMessages((current) => [...current, message]);
      setDraft("");
    }
  }

  async function sendOffer() {
    if (!selectedConversation || !offerProduct) {
      return;
    }

    const response = await fetch(`/api/conversations/${selectedConversation.id}/offer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productSlug: offerProduct,
        note: "Would you like to buy this item now?",
      }),
    });

    if (response.ok) {
      const { message } = (await response.json()) as { message: ChatMessage };
      setMessages((current) => [...current, message]);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-line bg-surface-elevated backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 font-black text-primary">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
              <Store className="h-5 w-5" />
            </span>
            ShopChat Seller
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ShopChatUserButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">Listed products</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <MessageSquare className="h-5 w-5 text-secondary" />
            <p className="mt-4 text-sm text-muted-foreground">Buyer conversations</p>
            <p className="text-3xl font-bold">{conversations.length}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <BarChart3 className="h-5 w-5 text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">Inventory units</p>
            <p className="text-3xl font-bold">{totalInventory}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="space-y-6">
            <form onSubmit={createProduct} className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Create product</h1>
                  <p className="text-sm text-muted-foreground">New products appear in the buyer marketplace.</p>
                </div>
                <Plus className="h-5 w-5 text-primary" />
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <input name="title" required placeholder="Product name" className="rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <input name="price" required min="1" type="number" placeholder="Price" className="rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <input name="category" placeholder="Category" className="rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <input name="stock" min="1" type="number" placeholder="Stock" className="rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
                <input name="image" placeholder="Image URL" className="rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary sm:col-span-2" />
                <textarea name="description" required placeholder="Description" rows={3} className="rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary sm:col-span-2" />
              </div>

              <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">
                <Plus className="h-4 w-4" />
                Publish product
              </button>
            </form>

            <div className="rounded-2xl border border-line bg-surface shadow-sm">
              <div className="border-b border-line p-5">
                <h2 className="text-xl font-bold">Your products</h2>
              </div>
              <div className="divide-y divide-line">
                {products.map((product) => (
                  <div key={product.slug} className="flex items-center gap-4 p-4">
                    <img src={product.image} alt={product.title} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {money(product.price)} - {product.stock || 0} in stock
                      </p>
                    </div>
                    <Link href={`/product/${product.slug}`} className="hidden rounded-xl border border-line px-3 py-2 text-sm font-semibold sm:inline-flex">
                      View
                    </Link>
                    <button onClick={() => removeProduct(product.slug)} className="grid h-10 w-10 place-items-center rounded-xl border border-line text-muted-foreground hover:text-error">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {products.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">No products yet.</div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-surface shadow-sm">
            <div className="grid min-h-[42rem] lg:grid-cols-[16rem_1fr]">
              <aside className="border-b border-line lg:border-b-0 lg:border-r">
                <div className="p-4">
                  <h2 className="font-bold">Buyer messages</h2>
                  <p className="text-sm text-muted-foreground">Respond or send a product offer.</p>
                </div>
                <div className="divide-y divide-line">
                  {conversations.map((conversation) => {
                    const product = products.find((item) => item.slug === conversation.productSlug);
                    const active = conversation.id === selectedConversation?.id;

                    return (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`flex w-full items-start gap-3 p-4 text-left ${active ? "bg-primary-soft text-primary" : "hover:bg-surface-soft"}`}
                      >
                        <Package className="mt-1 h-4 w-4" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold">{product?.title || conversation.productSlug}</span>
                          <span className="block text-xs text-muted-foreground">{conversation.buyerId}</span>
                        </span>
                      </button>
                    );
                  })}
                  {conversations.length === 0 ? (
                    <div className="p-6 text-sm text-muted-foreground">No buyer conversations yet.</div>
                  ) : null}
                </div>
              </aside>

              <div className="flex min-h-[42rem] flex-col">
                <div className="border-b border-line p-4">
                  <p className="font-semibold">{selectedProduct?.title || "Select a conversation"}</p>
                  <p className="text-sm text-muted-foreground">{selectedConversation?.buyerId || "No active buyer selected"}</p>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.senderRole === "seller" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.senderRole === "seller" ? "bg-primary text-white" : "bg-surface-soft"}`}>
                        {message.text.includes("OFFER::") ? (
                          <OfferBubble text={message.text} products={products} />
                        ) : (
                          message.text
                        )}
                      </div>
                    </div>
                  ))}
                  {selectedConversation && messages.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-line p-8 text-center text-sm text-muted-foreground">
                      No messages yet. Send the first reply or product offer.
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-line p-4">
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row">
                    <select value={offerProduct} onChange={(event) => setOfferProduct(event.target.value)} className="rounded-xl border border-line bg-background px-3 py-2 text-sm">
                      {products.map((product) => (
                        <option key={product.slug} value={product.slug}>{product.title}</option>
                      ))}
                    </select>
                    <button onClick={sendOffer} className="rounded-xl border border-secondary px-4 py-2 text-sm font-semibold text-secondary hover:bg-secondary/10">
                      Send buy card
                    </button>
                  </div>
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      placeholder="Reply to buyer..."
                      className="min-w-0 flex-1 rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                    />
                    <button className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function OfferBubble({ text, products }: { text: string; products: Product[] }) {
  const [note, offer] = text.split("\n\nOFFER::");
  const product = products.find((item) => item.slug === offer);

  if (!product) {
    return <>{note}</>;
  }

  return (
    <div className="space-y-3 text-left text-foreground">
      <p>{note}</p>
      <div className="rounded-xl bg-white p-3 text-slate-900">
        <div className="flex gap-3">
          <img src={product.image} alt={product.title} className="h-16 w-16 rounded-lg object-cover" />
          <div>
            <p className="font-semibold">{product.title}</p>
            <p className="text-sm text-slate-500">{product.priceLabel}</p>
          </div>
        </div>
        <Link href={`/payment-success?product=${product.slug}`} className="mt-3 inline-flex w-full justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
          Buy Now
        </Link>
      </div>
    </div>
  );
}
