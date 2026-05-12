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
  TrendingUp,
  Bell,
  X,
  ArrowUpRight,
  ChevronRight,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { ShopChatUserButton } from "@/components/auth/shopchat-user-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { ChatMessage, Conversation, Product } from "@/lib/shopchat-data";

function money(value: number) {
  return `$${value.toLocaleString()}`;
}

const NAV_ITEMS = [
  { icon: ShoppingBag, label: "Dashboard", active: true },
  { icon: MessageSquare, label: "Messages" },
  { icon: Package, label: "Inventory" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings2, label: "Settings" },
];

function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all ${
        active
          ? "bg-primary-soft text-primary font-semibold"
          : "text-muted-foreground hover:bg-surface-soft hover:text-foreground"
      }`}
    >
      <span
        className={`flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 ${
          active
            ? "bg-primary text-white"
            : "bg-surface-strong text-muted-foreground"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      {label}
    </button>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  deltaType = "positive",
  sub,
  progress,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  delta?: string;
  deltaType?: "positive" | "neutral" | "warning";
  sub?: string;
  progress?: number;
}) {
  const deltaColors = {
    positive: "bg-secondary-container text-on-secondary-container",
    neutral:  "bg-primary-soft text-primary",
    warning:  "bg-tertiary-fixed text-on-tertiary-fixed-variant",
  };
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 card-shadow flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-strong text-muted-foreground">
          <Icon className="h-4 w-4" />
        </span>
        {delta && (
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${deltaColors[deltaType]}`}
          >
            <ArrowUpRight className="h-3 w-3" />
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
        {label}
      </p>
      <p className="mt-1.5 text-[28px] font-bold text-foreground leading-none tracking-tight font-mono">
        {value}
      </p>
      {sub && <p className="mt-2 text-xs text-muted-foreground">{sub}</p>}
      {progress !== undefined && (
        <div className="mt-4 h-1 bg-surface-strong rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
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

  const selectedProduct = useMemo(
    () => products.find((p) => p.slug === selectedConversation?.productSlug),
    [products, selectedConversation],
  );

  useEffect(() => {
    if (!selectedConversation) return;
    fetch(`/api/conversations/${selectedConversation.id}/messages`)
      .then((r) => r.json())
      .then((d) => setMessages(d.messages || []))
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
    setProducts((c) => [product, ...c]);
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
    setProducts((c) => c.filter((p) => p.slug !== slug));
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
    setMessages((c) => [...c, message]);
    setDraft("");
  }

  async function sendOffer() {
    if (!selectedConversation || !offerProduct) return;
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
    setMessages((c) => [...c, message]);
    toast.success("Offer sent to buyer.");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">

      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside className="hidden xl:flex w-60 flex-col border-r border-line bg-surface shrink-0 sticky top-0 h-screen overflow-hidden">

        {/* Logo */}
        <div className="px-5 py-4 border-b border-line flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Store className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-foreground leading-none tracking-tight">ShopChat</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-widest">Seller Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 pb-2">
            Main
          </p>
          {NAV_ITEMS.map(({ icon, label, active }) => (
            <NavItem key={label} icon={icon} label={label} active={active} />
          ))}
        </nav>

        {/* Revenue summary + CTA */}
        <div className="px-4 pb-5 space-y-3">
          <div className="rounded-xl border border-line bg-surface-soft p-4">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Monthly Revenue
            </p>
            <p className="mt-1.5 text-2xl font-bold text-foreground tracking-tight font-mono">$42,890</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-secondary font-medium">
              <TrendingUp className="h-3 w-3" />
              +12.5% vs last month
            </div>
            <div className="mt-3 h-1 bg-surface-strong rounded-full overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-primary" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAddProductModal(true)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-primary-strong transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Product
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 flex flex-col">

        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-xl px-6 py-3 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
              <span>ShopChat</span>
              <ChevronRight className="h-3 w-3 opacity-50" />
              <span className="text-foreground font-semibold">Dashboard</span>
            </div>
            <h1 className="mt-0.5 text-[17px] font-bold text-foreground tracking-tight leading-none">
              Welcome back.
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-2 rounded-xl border border-line bg-surface px-3.5 py-2 text-[12px] font-medium text-muted-foreground hover:text-foreground hover:bg-surface-soft transition-colors">
              <BarChart3 className="h-3.5 w-3.5" />
              Reports
            </button>
            <button
              type="button"
              onClick={() => setAddProductModal(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-[12px] font-semibold text-white hover:bg-primary-strong transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">List Product</span>
            </button>
            <button className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-line bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-soft transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <ThemeToggle />
            <ShopChatUserButton />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 px-4 sm:px-6 py-6 space-y-5 max-w-7xl w-full mx-auto">

          {/* ── KPI row ──────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              icon={ShoppingBag}
              label="Total Sales"
              value="$42,890"
              delta="12.5%"
              deltaType="positive"
              progress={75}
            />
            <KpiCard
              icon={MessageSquare}
              label="Conversations"
              value={String(conversations.length)}
              delta="+4 today"
              deltaType="neutral"
              sub="Avg. response: 3 min"
            />
            <KpiCard
              icon={Package}
              label="New Orders"
              value="118"
              delta="8 pending"
              deltaType="warning"
              sub="Updated just now"
            />
            <KpiCard
              icon={TrendingUp}
              label="Conversion"
              value="22%"
              delta="+15% this week"
              deltaType="positive"
              progress={22}
            />
          </div>

          {/* ── Insight + Conversations ───────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-5">

            {/* Insight card */}
            <div className="rounded-2xl border border-line bg-surface p-5 card-shadow flex flex-col">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-secondary uppercase tracking-widest bg-secondary-container px-2.5 py-1 rounded-full w-fit">
                <Zap className="h-2.5 w-2.5" />
                Growth Insight
              </span>
              <h2 className="mt-4 text-[15px] font-bold text-foreground leading-snug tracking-tight">
                Conversation rates are up 15% this week.
              </h2>
              <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed flex-1">
                Responding within 5 minutes has increased checkout conversion by 22% compared to last month.
              </p>
              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between">
                <button className="text-[12px] font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  View full analytics
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />
                  Live data
                </div>
              </div>
            </div>

            {/* Conversations list */}
            <div className="rounded-2xl border border-line bg-surface p-5 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Inbox</p>
                  <h2 className="mt-0.5 text-[15px] font-bold text-foreground tracking-tight">Active Conversations</h2>
                </div>
                <button className="text-[12px] font-semibold text-primary hover:underline">View all</button>
              </div>
              <div className="space-y-1">
                {conversations.map((convo) => {
                  const product = products.find((p) => p.slug === convo.productSlug);
                  const active = convo.id === selectedConversation?.id;
                  const initials = convo.buyerId.slice(0, 2).toUpperCase();
                  return (
                    <button
                      key={convo.id}
                      type="button"
                      onClick={() => setSelectedConversation(convo)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        active
                          ? "bg-primary-soft border border-primary/20"
                          : "hover:bg-surface-soft border border-transparent"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[12px] font-bold border ${
                          active
                            ? "bg-primary text-white border-primary"
                            : "bg-surface-strong text-muted-foreground border-line"
                        }`}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[13px] font-semibold text-foreground truncate">{convo.buyerId}</span>
                          <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0 ${
                              convo.status === "active"
                                ? "bg-secondary-container text-on-secondary-container"
                                : "bg-surface-strong text-muted-foreground"
                            }`}
                          >
                            {convo.status.replace(/_/g, " ")}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-muted-foreground truncate mt-0.5">
                          {product?.title || convo.productSlug}
                        </p>
                      </div>
                    </button>
                  );
                })}
                {conversations.length === 0 && (
                  <div className="rounded-xl border border-dashed border-line bg-surface-soft p-6 text-center text-[13px] text-muted-foreground">
                    No active conversations.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Message thread + sidebar tools ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-5">

            {/* Message panel */}
            <div className="rounded-2xl border border-line bg-surface p-5 card-shadow flex flex-col gap-4">
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Conversation</p>
                <h2 className="mt-0.5 text-[15px] font-bold text-foreground tracking-tight">
                  {selectedProduct?.title || selectedConversation?.buyerId || "Select a conversation"}
                </h2>
                {selectedConversation && (
                  <p className="text-xs text-muted-foreground mt-0.5">Buyer: {selectedConversation.buyerId}</p>
                )}
              </div>

              {/* Offer bar */}
              <div className="flex flex-wrap items-center gap-2 px-3 py-2.5 rounded-xl border border-line bg-surface-soft">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Send offer
                </span>
                <select
                  value={offerProduct}
                  onChange={(e) => setOfferProduct(e.target.value)}
                  className="flex-1 min-w-[120px] bg-surface border border-line rounded-lg px-3 py-1.5 text-[12px] text-foreground outline-none focus:border-primary transition-colors"
                >
                  {products.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.title}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={sendOffer}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-secondary/30 bg-secondary-container text-on-secondary-container text-[12px] font-semibold hover:opacity-80 transition-opacity"
                >
                  <Send className="h-3 w-3" />
                  Send
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-3 min-h-[200px]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.senderRole === "seller" ? "items-end" : "items-start"}`}
                  >
                    <span className="text-[10px] text-muted-foreground font-mono mb-1 px-1">
                      {msg.senderRole === "seller" ? "You" : selectedConversation?.buyerId}
                    </span>
                    <div
                      className={`max-w-[80%] px-4 py-2.5 text-[13.5px] leading-relaxed ${
                        msg.senderRole === "seller"
                          ? "bg-primary text-white rounded-2xl rounded-br-sm"
                          : "bg-surface-strong text-foreground border border-line rounded-2xl rounded-bl-sm"
                      }`}
                    >
                      {msg.text.includes("OFFER::") ? (
                        <OfferBubble text={msg.text} products={products} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                {selectedConversation && messages.length === 0 && (
                  <div className="flex items-center justify-center min-h-[120px] rounded-xl border border-dashed border-line bg-surface-soft text-[13px] text-muted-foreground">
                    No messages yet — start the conversation.
                  </div>
                )}
                {!selectedConversation && (
                  <div className="flex items-center justify-center min-h-[120px] rounded-xl border border-dashed border-line bg-surface-soft text-[13px] text-muted-foreground">
                    Select a conversation to view messages.
                  </div>
                )}
              </div>

              {/* Composer */}
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write a message to the buyer…"
                  className="flex-1 min-w-0 rounded-xl border border-line bg-surface-soft px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-primary-strong transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send
                </button>
              </form>
            </div>

            {/* Sidebar tools */}
            <div className="flex flex-col gap-4">

              {/* Quick actions */}
              <div className="rounded-2xl border border-line bg-surface p-4 card-shadow">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  Quick Actions
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setAddProductModal(true)}
                    className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl border border-line bg-surface-soft text-[12.5px] font-medium text-foreground hover:bg-surface-strong transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                      Add product
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewProductsModal(true)}
                    className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl border border-line bg-surface-soft text-[12.5px] font-medium text-foreground hover:bg-surface-strong transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5 text-muted-foreground" />
                      View inventory
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Selected product preview */}
              <div className="rounded-2xl border border-line bg-surface p-4 card-shadow">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  In Discussion
                </p>
                {selectedProduct ? (
                  <div className="space-y-2">
                    {selectedProduct.image && (
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        className="w-full h-28 object-cover rounded-xl border border-line"
                      />
                    )}
                    <p className="text-[13px] font-bold text-foreground leading-snug tracking-tight">
                      {selectedProduct.title}
                    </p>
                    <p className="text-[12px] font-bold text-primary font-mono">
                      {money(selectedProduct.price)}
                    </p>
                    {selectedProduct.stock !== undefined && (
                      <p className="text-[11px] text-muted-foreground">{selectedProduct.stock} in stock</p>
                    )}
                    <Link
                      href={`/product/${selectedProduct.slug}`}
                      className="mt-1 inline-flex items-center gap-1 text-[11.5px] font-semibold text-primary hover:underline"
                    >
                      View listing <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                ) : (
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    Select a conversation to see the product being discussed.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Add Product Modal ─────────────────────────────── */}
      {addProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/10 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-surface card-shadow p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[16px] font-bold text-foreground tracking-tight">Add New Product</h2>
                <p className="mt-1 text-[12.5px] text-muted-foreground leading-relaxed">
                  Publish a listing and make it available to buyers.
                </p>
              </div>
              <button
                onClick={() => setAddProductModal(false)}
                className="flex items-center justify-center w-7 h-7 rounded-lg border border-line bg-surface-soft text-muted-foreground hover:text-foreground hover:bg-surface-strong transition-colors flex-shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <form onSubmit={createProduct} className="space-y-3">
              {(
                [
                  { name: "title", placeholder: "Product name", required: true },
                  { name: "category", placeholder: "Category" },
                  { name: "image", placeholder: "Image URL" },
                ] as const
              ).map(({ name, placeholder, required }) => (
                <div key={name}>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                    {placeholder}
                  </label>
                  <input
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-line bg-surface-soft px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                    Price ($)
                  </label>
                  <input
                    name="price"
                    required
                    min="1"
                    type="number"
                    placeholder="0.00"
                    className="w-full rounded-xl border border-line bg-surface-soft px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                    Stock
                  </label>
                  <input
                    name="stock"
                    min="1"
                    type="number"
                    placeholder="0"
                    className="w-full rounded-xl border border-line bg-surface-soft px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="Describe your product…"
                  className="w-full rounded-xl border border-line bg-surface-soft px-3.5 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <div className="pt-1 flex gap-3">
                <button
                  type="button"
                  onClick={() => setAddProductModal(false)}
                  className="flex-1 rounded-xl border border-line bg-surface-soft px-4 py-2.5 text-[13px] font-semibold text-foreground hover:bg-surface-strong transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-primary-strong transition-colors"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Inventory Modal ───────────────────────────────── */}
      {viewProductsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/10 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-line bg-surface card-shadow max-h-[82vh] flex flex-col">
            <div className="flex items-start justify-between gap-4 p-6 border-b border-line flex-shrink-0">
              <div>
                <h2 className="text-[16px] font-bold text-foreground tracking-tight">Inventory</h2>
                <p className="mt-1 text-[12.5px] text-muted-foreground">
                  {products.length} product{products.length !== 1 ? "s" : ""} listed
                </p>
              </div>
              <button
                onClick={() => setViewProductsModal(false)}
                className="flex items-center justify-center w-7 h-7 rounded-lg border border-line bg-surface-soft text-muted-foreground hover:text-foreground hover:bg-surface-strong transition-colors flex-shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-6 space-y-3">
              {products.map((product) => (
                <div
                  key={product.slug}
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface-soft p-4 hover:bg-surface-strong transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-14 w-14 rounded-xl object-cover border border-line flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-foreground truncate">{product.title}</p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[12px] font-bold text-primary font-mono">{money(product.price)}</span>
                      <span className="text-[11px] text-muted-foreground">{product.stock ?? 0} in stock</span>
                      {product.category && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-strong text-muted-foreground uppercase tracking-wide border border-line">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/product/${product.slug}`}
                      className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[12px] font-semibold text-foreground hover:bg-surface-strong transition-colors"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeProduct(product.slug)}
                      className="rounded-lg border border-error/20 bg-error/5 px-3 py-1.5 text-[12px] font-semibold text-error hover:bg-error/10 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="rounded-xl border border-dashed border-line bg-surface-soft p-8 text-center text-[13px] text-muted-foreground">
                  No products listed yet.
                </div>
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
  const product = products.find((p) => p.slug === offer);
  if (!product) return <>{note}</>;
  return (
    <div className="space-y-2 text-left">
      <p className="text-sm">{note}</p>
      <div className="rounded-xl border border-white/20 bg-white/10 p-3">
        <div className="flex gap-3 items-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold truncate">{product.title}</p>
            <p className="text-[11px] opacity-70 mt-0.5">{product.priceLabel}</p>
          </div>
        </div>
        <Link
          href={`/payment-success?product=${product.slug}`}
          className="mt-3 flex items-center justify-center w-full rounded-lg bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 text-[12px] font-semibold"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}