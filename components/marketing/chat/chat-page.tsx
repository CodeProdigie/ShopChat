"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { io, type Socket } from "socket.io-client";
import {
  ArrowLeft,
  Home,
  Info,
  Menu,
  MessageCircle,
  Send,
  ShoppingBag,
  Smile,
  User,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { ChatMessage, Conversation, Product } from "@/lib/shopchat-data";

const quickReplies = [
  "Sounds good!",
  "Can I see more photos?",
  "Is price negotiable?",
];

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/marketplace", label: "Shop", icon: ShoppingBag },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "#", label: "Account", icon: User },
];

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ChatPage({
  conversation,
  initialMessages,
  product,
}: {
  conversation: Conversation;
  initialMessages: ChatMessage[];
  product: Product;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const socket = useMemo<Socket | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return io({ path: "/api/socket", autoConnect: false });
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.connect();
    socket.emit("conversation:join", conversation.id);
    socket.on("message:new", (message: ChatMessage) => {
      setMessages((current) =>
        current.some((item) => item.id === message.id) ? current : [...current, message],
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [conversation.id, socket]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();

    if (!text) {
      return;
    }

    setDraft("");
    const response = await fetch(`/api/conversations/${conversation.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, senderRole: "buyer" }),
    });

    if (!response.ok) {
      setDraft(text);
      return;
    }

    const { message } = (await response.json()) as { message: ChatMessage };
    setMessages((current) => [...current, message]);
    socket?.emit("message:send", { conversationId: conversation.id, message });
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-100 via-slate-50 to-white text-foreground dark:bg-linear-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm dark:bg-slate-950/95 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/marketplace"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-foreground shadow-sm hover:bg-surface-soft transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.seller}
                  className="h-12 w-12 rounded-3xl object-cover border-2 border-primary-container"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-secondary border-2 border-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{product.seller}</span>
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{product.title}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-foreground shadow-sm hover:bg-surface-soft transition dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative">
        <main className="pb-44">
          <div className="mx-auto max-w-3xl px-4 py-6 space-y-6 sm:px-6">
            <div className="flex justify-center">
              <span className="bg-slate-100 text-[10px] uppercase tracking-[0.24em] text-slate-600 px-3 py-1 rounded-full shadow-sm dark:bg-slate-800 dark:text-slate-300">
                Today
              </span>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderRole === "buyer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-7 ${
                    message.senderRole === "buyer"
                      ? "bg-indigo-600 text-white rounded-3xl rounded-tr-none shadow-lg shadow-indigo-500/10"
                      : message.senderRole === "system"
                        ? "bg-secondary/10 border border-secondary/20 text-secondary rounded-3xl shadow-sm"
                        : "bg-slate-50 border border-slate-200 rounded-3xl rounded-tl-none shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100"
                  }`}
                >
                  {message.text.includes("OFFER::") ? (
                    <OfferBubble text={message.text} product={product} />
                  ) : (
                    <p>{message.text}</p>
                  )}
                </div>
                <span className="mt-1 ml-2 text-[10px] text-slate-400">{formatTime(message.createdAt)}</span>
              </div>
            ))}
            {messages.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
                Start a fresh conversation with {product.seller} about {product.title}.
              </div>
            ) : null}

            {messages.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden dark:border-slate-800 dark:bg-slate-900">
                <div className="flex gap-4 p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-20 w-20 rounded-3xl object-cover bg-slate-100 dark:bg-slate-800"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-indigo-700 font-semibold">
                        Order {conversation.orderId || "#Draft"}
                      </span>
                      <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-700">
                        Pending Payment
                      </span>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{product.title}</h2>
                    <p className="mt-1 text-sm font-bold text-indigo-700">{product.priceLabel}.00</p>
                  </div>
                </div>
                <div className="bg-slate-100 p-3 flex gap-2 dark:bg-slate-900/80">
                  <Link
                    href={`/payment-success?conversation=${conversation.id}`}
                    className="flex-1 rounded-3xl bg-indigo-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-transform hover:-translate-y-0.5 active:scale-95"
                  >
                    Buy Now
                  </Link>
                  <button className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
                    <Info className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {messages.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">Quick replies</span>
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => setDraft(reply)}
                      className="whitespace-nowrap rounded-full border border-secondary text-secondary bg-white px-4 py-2 text-xs font-semibold hover:bg-secondary/10 transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-4 py-4 shadow-[0_-24px_48px_-32px_rgba(15,23,42,0.12)]">
          <div className="mx-auto max-w-3xl">
            <form onSubmit={sendMessage} className="flex items-end gap-3">
              <button className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-indigo-700 active:scale-95 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:border-slate-700">
                <Smile className="h-5 w-5" />
              </button>
              <div className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm focus-within:border-indigo-300 transition-all dark:border-slate-800 dark:bg-slate-900">
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  className="w-full resize-none bg-transparent border-0 text-sm leading-6 text-slate-900 placeholder:text-slate-500 focus:ring-0 dark:text-slate-100 dark:placeholder:text-slate-400"
                  placeholder="Type a message..."
                  rows={1}
                />
              </div>
              <button type="submit" className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-700 text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95">
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm lg:w-80 lg:max-w-md border-l border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Navigation</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Main Menu</h2>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-foreground shadow-sm hover:bg-surface-soft transition lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-surface px-4 py-4 text-base font-semibold text-foreground shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-5 w-5 text-indigo-600" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-4xl bg-slate-50 p-5 text-sm text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
          <p className="font-semibold text-slate-900 dark:text-white">Live order support</p>
          <p className="mt-2 leading-6">
            This chat is connected to your seller with Socket.IO-powered live delivery for new messages.
          </p>
        </div>
      </aside>
    </div>
  );
}

function OfferBubble({ text, product }: { text: string; product: Product }) {
  const [note] = text.split("\n\nOFFER::");

  return (
    <div className="space-y-3 text-left">
      <p>{note}</p>
      <div className="rounded-2xl bg-white p-3 text-slate-900">
        <div className="flex gap-3">
          <img src={product.image} alt={product.title} className="h-16 w-16 rounded-xl object-cover" />
          <div>
            <p className="font-semibold">{product.title}</p>
            <p className="text-sm text-slate-500">{product.priceLabel}.00</p>
          </div>
        </div>
        <Link href={`/payment-success?product=${product.slug}`} className="mt-3 inline-flex w-full justify-center rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">
          Buy Now
        </Link>
      </div>
    </div>
  );
}
