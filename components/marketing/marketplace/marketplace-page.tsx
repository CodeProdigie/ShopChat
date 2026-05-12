"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bell,
  Home,
  MessageSquare,
  Search,
  Settings2,
  ShoppingCart,
  Store,
  Star,
  Tag,
  User,
  Wallet,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ShopChatUserButton } from "@/components/auth/shopchat-user-button";
import type { Product } from "@/lib/shopchat-data";

const sideNavItems = [
  { label: "Dashboard", icon: Home },
  { label: "Orders", icon: ShoppingCart },
  { label: "Inventory", icon: Store },
  { label: "Messages", icon: MessageSquare },
  { label: "Settings", icon: Settings2 },
];

const bottomNavItems = [
  { label: "Home", icon: Home, active: false },
  { label: "Market", icon: Store, active: true },
  { label: "Chat", icon: MessageSquare, active: false },
  { label: "Profile", icon: User, active: false },
];

export function MarketplacePage({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("all");
  const [rating, setRating] = useState("all");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category || "General")))],
    [products],
  );
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = [product.title, product.description, product.seller]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      const matchesPrice =
        price === "all" ||
        (price === "under-200" && product.price < 200) ||
        (price === "200-500" && product.price >= 200 && product.price <= 500) ||
        (price === "over-500" && product.price > 500);
      const matchesRating = rating === "all" || product.rating >= Number(rating);

      return matchesQuery && matchesCategory && matchesPrice && matchesRating;
    });
  }, [category, price, products, query, rating]);

  return (
    <div className="min-h-screen bg-surface-soft text-foreground">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-8">
          <ShopChatUserButton />
          <div className="hidden md:flex items-center gap-4 bg-surface-soft px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm text-foreground placeholder:text-slate-400"
              placeholder="Search marketplace..."
              type="text"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a className="text-indigo-700 dark:text-indigo-300 border-b-2 border-indigo-700 dark:border-indigo-300 pb-1" href="#">
            Marketplace
          </a>
          <a className="hover:text-indigo-600 dark:hover:text-indigo-300" href="#">
            Analytics
          </a>
          <a className="hover:text-indigo-600 dark:hover:text-indigo-300" href="#">
            Merchants
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-slate-200 dark:border-slate-800 bg-surface dark:bg-slate-950 pt-20 z-40">
          <div className="px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-700 flex items-center justify-center text-white">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-indigo-800 dark:text-indigo-300">ShopChat Pro</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Enterprise Suite</p>
            </div>
          </div>

          <nav className="flex-1 px-4 mt-6 space-y-1">
            {sideNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all rounded-xl"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
              );
            })}
          </nav>

          <div className="p-4 m-4 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
            <p className="text-xs font-medium opacity-80">Current Plan: Basic</p>
            <p className="text-sm font-bold mt-1">Upgrade Plan</p>
            <button className="mt-3 w-full bg-white text-indigo-700 py-2 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">
              Go Unlimited
            </button>
          </div>
        </aside>

        <main className="flex-1 lg:ml-64 min-h-screen px-4 py-6 md:px-8 md:py-8 pb-26">
          <section className="max-w-7xl mx-auto mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h1 className="text-5xl font-bold tracking-tight text-foreground">Marketplace</h1>
                <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
                  Browse unique items from our verified merchant network.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm font-semibold">
                  <Tag className="h-4 w-4 text-indigo-600" />
                  <select value={category} onChange={(event) => setCategory(event.target.value)} className="min-w-0 bg-transparent outline-none">
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm font-semibold">
                  <Wallet className="h-4 w-4 text-indigo-600" />
                  <select value={price} onChange={(event) => setPrice(event.target.value)} className="min-w-0 bg-transparent outline-none">
                    <option value="all">Any price</option>
                    <option value="under-200">Under $200</option>
                    <option value="200-500">$200 - $500</option>
                    <option value="over-500">Over $500</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm font-semibold">
                  <Star className="h-4 w-4 text-indigo-600" />
                  <select value={rating} onChange={(event) => setRating(event.target.value)} className="min-w-0 bg-transparent outline-none">
                    <option value="all">Any rating</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.8">4.8+</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mb-6 flex md:hidden items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Search marketplace..."
                type="text"
              />
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <article
                  key={product.title}
                  className="group bg-surface dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.badge ? (
                      <div className="absolute top-4 right-4 bg-white/90 text-indigo-700 text-xs font-bold uppercase tracking-[0.16em] px-3 py-1 rounded-full backdrop-blur-md">
                        {product.badge}
                      </div>
                    ) : null}
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h2 className="text-xl font-semibold text-foreground">{product.title}</h2>
                      <span className="text-xl font-bold text-indigo-700">{product.priceLabel}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{product.description}</p>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-900" />
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{product.seller}</span>
                      </div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="flex items-center gap-2 border border-secondary text-secondary font-semibold py-2 px-4 rounded-xl hover:bg-secondary/10 transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        View
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {filteredProducts.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-line bg-surface p-10 text-center text-muted-foreground">
                No products match those filters yet.
              </div>
            ) : null}
          </section>
        </main>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className={`flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-wider transition-transform duration-200 ${
                item.active ? "text-indigo-700 dark:text-indigo-300 scale-110" : "text-slate-400 dark:text-slate-500"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <footer className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-slate-100 dark:border-slate-900 bg-surface dark:bg-slate-950 lg:ml-64 lg:w-[calc(100%-16rem)]">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <span className="font-bold text-indigo-700 dark:text-indigo-300">ShopChat</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">© 2024 ShopChat Technologies Inc.</p>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          <a className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors" href="#">
            Help Center
          </a>
          <a className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors" href="#">
            API Docs
          </a>
        </div>
      </footer>
    </div>
  );
}
