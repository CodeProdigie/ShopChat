"use client";

import Link from "next/link";
import {
  CheckCircle,
  MessageSquare,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { Order, Product } from "@/lib/shopchat-data";

const navItems = [
  { label: "Chat", icon: MessageSquare },
  { label: "Orders", icon: Receipt },
  { label: "Catalog", icon: ShoppingCart },
  { label: "Profile", icon: User },
];

export function PaymentSuccessPage({ order, product }: { order: Order; product: Product }) {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-primary"
          >
            ShopChat
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-lg">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule="evenodd"
                  d="M12 1C6.477 1 2 5.477 2 11s4.477 10 10 10 10-4.477 10-10S17.523 1 12 1zm0 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-28 md:pb-0 px-4 py-8 sm:px-6 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          {/* Success Icon & Headline */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-fixed text-primary rounded-full mb-4 shadow-sm dark:bg-primary-fixed/20">
              <CheckCircle className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Payment Successful
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Order Number:{" "}
                <span className="font-semibold text-foreground">
                  #{order.id}
                </span>
              </p>
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="p-6 flex items-center gap-4 border-b border-slate-200 dark:border-slate-800">
              <div className="h-20 w-20 rounded-lg overflow-hidden bg-surface-container-low shrink-0 dark:bg-slate-800">
                <img
                  className="h-full w-full object-cover"
                  alt={product.title}
                  src={product.image}
                />
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">
                  {product.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Merchant: {product.seller}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 space-y-3 bg-surface-container-low/50 dark:bg-slate-800/50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Subtotal
                </span>
                <span className="text-sm text-foreground">${(order.total - 14).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Shipping & Tax
                </span>
                <span className="text-sm text-foreground">$14.00</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/chat"
              className="w-full h-12 bg-primary text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <MessageSquare className="h-5 w-5" />
              Back to Conversation
            </Link>
            <Link href={`/receipt/${order.id}`} className="w-full h-12 flex items-center justify-center gap-2 font-semibold text-secondary border border-secondary/20 dark:border-secondary/40 rounded-2xl hover:bg-secondary-container/20 dark:hover:bg-secondary-container/10 transition-colors active:scale-95">
              <Receipt className="h-5 w-5" />
              View Receipt
            </Link>
          </div>

          {/* Success Chips */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <div className="px-3 py-1.5 bg-secondary-container/30 dark:bg-secondary-container/20 text-secondary dark:text-secondary-fixed rounded-full text-xs font-semibold flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Secured by ShopChat
            </div>
            <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-semibold flex items-center gap-1">
              <ShoppingBag className="h-3 w-3" />
              Estimated delivery in 2 days
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === 1; // Orders is highlighted
          return (
            <button
              key={item.label}
              className={`flex flex-col items-center justify-center text-xs font-semibold ${
                isActive
                  ? "text-primary"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
