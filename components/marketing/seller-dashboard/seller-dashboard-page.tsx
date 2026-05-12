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
  Settings2,
  Store,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
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
  const [addProductModal, setAddProductModal] = useState(false);
  const [viewProductsModal, setViewProductsModal] = useState(false);
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
      toast.error("Unable to create product. Try again.");
      return;
    }

    const { product } = (await response.json()) as { product: Product };
    setProducts((current) => [product, ...current]);
    setOfferProduct(product.slug);
    event.currentTarget.reset();
    setAddProductModal(false);
    toast.success("Product created successfully!");
  }

  async function removeProduct(slug: string) {
    const response = await fetch(`/api/products/${slug}`, { method: "DELETE" });

    if (!response.ok) {
      toast.error("Unable to delete product. Please try again.");
      return;
    }

    setProducts((current) => current.filter((product) => product.slug !== slug));
    toast.success("Product deleted.");
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedConversation || !draft.trim()) {
      toast.error("Please enter a message before sending.");
      return;
    }

    const response = await fetch(`/api/conversations/${selectedConversation.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: draft.trim(), senderRole: "seller" }),
    });

    if (!response.ok) {
      toast.error("Could not send message. Please try again.");
      return;
    }

    const { message } = (await response.json()) as { message: ChatMessage };
    setMessages((current) => [...current, message]);
    setDraft("");
    toast.success("Message sent.");
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

    if (!response.ok) {
      toast.error("Unable to send offer. Try again.");
      return;
    }

    const { message } = (await response.json()) as { message: ChatMessage };
    setMessages((current) => [...current, message]);
    toast.success("Offer sent to buyer.");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden xl:flex w-72 flex-col border-r border-line bg-surface p-6">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">ShopChat Seller</p>
            <h1 className="mt-3 text-2xl font-black text-foreground">Dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enterprise Tier</p>
          </div>
          <nav className="flex flex-1 flex-col gap-2">
            <button className="flex items-center gap-3 rounded-3xl bg-primary-soft px-4 py-3 text-left text-primary transition hover:bg-primary/10">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <span className="font-semibold">Dashboard</span>
            </button>
            <button className="flex items-center gap-3 rounded-3xl px-4 py-3 text-left text-foreground hover:bg-surface-soft transition">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                <MessageSquare className="h-5 w-5" />
              </span>
              <span className="font-semibold">Messages</span>
            </button>
            <button className="flex items-center gap-3 rounded-3xl px-4 py-3 text-left text-foreground hover:bg-surface-soft transition">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                <Package className="h-5 w-5" />
              </span>
              <span className="font-semibold">Inventory</span>
            </button>
            <button className="flex items-center gap-3 rounded-3xl px-4 py-3 text-left text-foreground hover:bg-surface-soft transition">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                <BarChart3 className="h-5 w-5" />
              </span>
              <span className="font-semibold">Analytics</span>
            </button>
            <button className="flex items-center gap-3 rounded-3xl px-4 py-3 text-left text-foreground hover:bg-surface-soft transition">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                <Settings2 className="h-5 w-5" />
              </span>
              <span className="font-semibold">Settings</span>
            </button>
          </nav>
          <div className="mt-8 pt-6 border-t border-line">
            <button
              type="button"
              onClick={() => setAddProductModal(true)}
              className="mb-3 w-full rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4 inline" />
              New Product
            </button>
            <button className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-surface-soft transition">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-600">
                <span className="material-symbols-outlined">help_center</span>
              </span>
              Support
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Seller dashboard</p>
                <h1 className="mt-2 text-3xl font-black text-foreground">Welcome back.</h1>
                <p className="mt-2 text-sm text-muted-foreground">Here’s what’s happening with your store today.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-3xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-foreground hover:bg-surface-soft transition">
                  <span className="material-symbols-outlined">file_download</span>
                  View Reports
                </button>
                <button
                  type="button"
                  onClick={() => setAddProductModal(true)}
                  className="inline-flex items-center gap-2 rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition"
                >
                  <Plus className="h-4 w-4" />
                  List New Product
                </button>
              </div>
            </div>
          </header>

          <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-3xl bg-primary-soft p-3 text-primary">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">+12.5%</span>
                  </div>
                  <p className="mt-5 text-sm text-muted-foreground">Total Sales</p>
                  <p className="mt-2 text-3xl font-bold">$42,890.00</p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-3/4 rounded-full bg-indigo-600" />
                  </div>
                </div>

                <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-3xl bg-secondary-container p-3 text-on-secondary-container">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">+4</span>
                  </div>
                  <p className="mt-5 text-sm text-muted-foreground">Active Conversations</p>
                  <p className="mt-2 text-3xl font-bold">{conversations.length}</p>
                  <p className="mt-2 text-sm text-muted-foreground">Average response time: 3 mins</p>
                </div>

                <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-3xl bg-tertiary-fixed p-3 text-on-tertiary-fixed-variant">
                      <Package className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">8 Pending</span>
                  </div>
                  <p className="mt-5 text-sm text-muted-foreground">New Orders</p>
                  <p className="mt-2 text-3xl font-bold">118</p>
                  <div className="mt-5 flex -space-x-2">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-sm text-slate-600">A</div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-sm text-slate-600">J</div>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-sm text-slate-600">+5</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Growth Insights</p>
                    <h2 className="mt-3 text-xl font-semibold text-foreground">Conversation rates are up by 15% this week.</h2>
                  </div>
                  <div className="rounded-3xl bg-primary-fixed px-4 py-2 text-primary font-semibold">Trending</div>
                </div>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  Responding to messages within 5 minutes has increased checkout conversion by 22% compared to last month.
                </p>
                <button className="mt-6 rounded-full bg-secondary-fixed px-5 py-3 text-sm font-semibold text-on-secondary-fixed transition hover:opacity-90">
                  View Analytics
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Active Conversations</p>
                    <h2 className="mt-3 text-xl font-semibold text-foreground">Buyer inbox</h2>
                  </div>
                  <button className="text-indigo-600 font-semibold hover:underline">View All</button>
                </div>
                <div className="mt-6 space-y-3">
                  {conversations.map((conversation) => {
                    const product = products.find((item) => item.slug === conversation.productSlug);
                    const active = conversation.id === selectedConversation?.id;
                    return (
                      <button
                        key={conversation.id}
                        type="button"
                        onClick={() => setSelectedConversation(conversation)}
                        className={`w-full rounded-3xl border px-4 py-4 text-left transition ${
                          active ? "border-indigo-600 bg-indigo-50" : "border-line bg-white hover:bg-surface-soft"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-3xl bg-slate-100" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-foreground">{conversation.buyerId}</p>
                              <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{conversation.status.replaceAll("_", " ")}</span>
                            </div>
                            <p className="mt-1 truncate text-sm text-muted-foreground">{product?.title || conversation.productSlug}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  {conversations.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-line bg-white p-6 text-center text-sm text-muted-foreground">
                      No active conversations yet.
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Quick actions</p>
                      <h3 className="mt-3 text-lg font-semibold">Seller tools</h3>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <button
                      type="button"
                      onClick={() => setAddProductModal(true)}
                      className="rounded-3xl border border-line bg-white px-4 py-4 text-left text-sm font-semibold text-foreground hover:bg-surface-soft"
                    >
                      + Add product
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewProductsModal(true)}
                      className="rounded-3xl border border-line bg-white px-4 py-4 text-left text-sm font-semibold text-foreground hover:bg-surface-soft"
                    >
                      View inventory
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Selected conversation</p>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{selectedProduct?.title || "No buyer selected"}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedConversation
                      ? `Buyer: ${selectedConversation.buyerId}`
                      : "Pick a conversation to view messages and send a quick response."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-line bg-surface p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Conversation</p>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">Message buyer</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={sendOffer}
                    className="rounded-full border border-secondary px-4 py-3 text-sm font-semibold text-secondary hover:bg-secondary/10"
                  >
                    Send offer
                  </button>
                  <select
                    value={offerProduct}
                    onChange={(event) => setOfferProduct(event.target.value)}
                    className="rounded-full border border-line bg-background px-4 py-3 text-sm"
                  >
                    {products.map((product) => (
                      <option key={product.slug} value={product.slug}>{product.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.senderRole === "seller" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[85%]">
                      <div className="text-xs text-muted-foreground mb-1">{message.senderRole === "seller" ? "You" : selectedConversation?.buyerId}</div>
                      <div className={`rounded-3xl px-4 py-3 text-sm leading-6 ${message.senderRole === "seller" ? "bg-primary text-white" : "bg-white border border-line"}`}>
                        {message.text.includes("OFFER::") ? (
                          <OfferBubble text={message.text} products={products} />
                        ) : (
                          message.text
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {selectedConversation && messages.length === 0 && (
                  <div className="rounded-3xl border border-dashed border-line bg-white p-6 text-center text-sm text-muted-foreground">
                    No messages yet.
                  </div>
                )}
              </div>

              <form onSubmit={sendMessage} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Write a message..."
                  className="min-w-0 flex-1 rounded-3xl border border-line bg-background px-4 py-4 text-sm outline-none focus:border-primary"
                />
                <button className="rounded-3xl bg-primary px-6 py-4 text-sm font-semibold text-white hover:bg-primary/90 transition">
                  Send
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>

      {addProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Add New Product</h2>
                <p className="text-sm text-muted-foreground">Create a product for your shop and make it available to buyers.</p>
              </div>
              <button onClick={() => setAddProductModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <form onSubmit={createProduct} className="mt-6 space-y-4">
              <input name="title" required placeholder="Product name" className="w-full rounded-3xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              <input name="price" required min="1" type="number" placeholder="Price" className="w-full rounded-3xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              <input name="category" placeholder="Category" className="w-full rounded-3xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              <input name="stock" min="1" type="number" placeholder="Stock" className="w-full rounded-3xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              <input name="image" placeholder="Image URL" className="w-full rounded-3xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              <textarea name="description" required placeholder="Description" rows={4} className="w-full rounded-3xl border border-line bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
              <button className="w-full rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary/90 transition">Publish product</button>
            </form>
          </div>
        </div>
      )}

      {viewProductsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-line bg-surface p-6 shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your Inventory</h2>
                <p className="text-sm text-muted-foreground">Review your published products and delete any listing you no longer want.</p>
              </div>
              <button onClick={() => setViewProductsModal(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="mt-6 space-y-4">
              {products.map((product) => (
                <div key={product.slug} className="flex flex-col gap-3 rounded-3xl border border-line bg-white p-4 sm:flex-row sm:items-center">
                  <img src={product.image} alt={product.title} className="h-20 w-20 rounded-3xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{product.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{money(product.price)} · {product.stock || 0} in stock</p>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/product/${product.slug}`} className="rounded-3xl border border-line px-4 py-2 text-sm font-semibold hover:bg-surface-soft">View</Link>
                    <button onClick={() => removeProduct(product.slug)} className="rounded-3xl border border-line px-4 py-2 text-sm font-semibold text-error hover:bg-error/10">Delete</button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="rounded-3xl border border-dashed border-line bg-white p-6 text-center text-sm text-muted-foreground">You haven’t added any products yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
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
