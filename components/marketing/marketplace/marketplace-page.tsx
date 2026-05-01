import Link from "next/link";
import {
  Bell,
  Camera,
  Headphones,
  Home,
  Lamp,
  MessageSquare,
  Search,
  Settings2,
  ShoppingCart,
  Store,
  Star,
  Tag,
  User,
  Wallet,
  Watch,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const products = [
  {
    slug: "tactile-pro-keyboard",
    title: "Tactile Pro Keyboard",
    price: "$189",
    description: "Premium mechanical switches with customizable RGB and aluminum chassis.",
    seller: "KeyMods Co.",
    badge: "New Arrival",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "sonic-studio-over-ear",
    title: "Sonic Studio Over-Ear",
    price: "$299",
    description: "Active noise cancellation with 40-hour battery life and spatial audio support.",
    seller: "AudioHaus",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Arc Minimalist Lamp",
    price: "$125",
    description: "Adjustable brightness with touch-sensitive controls and sleek matte finish.",
    seller: "Lume Design",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Nova Smart Watch",
    price: "$450",
    description: "Next-gen health tracking and seamless integration with the ShopChat ecosystem.",
    seller: "NovaTech",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Nexus Ergonomic Chair",
    price: "$520",
    description: "Full lumbar support and breathable mesh for peak performance during long hours.",
    seller: "WorkFlow Studio",
    badge: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "profocus-50mm-prime",
    title: "ProFocus 50mm Prime",
    price: "$1,299",
    description: "Ultra-fast aperture f/1.2 lens for stunning bokeh and low-light photography.",
    seller: "LensCraft",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1495433324511-bf8e92934d90?auto=format&fit=crop&w=1200&q=80",
  },
];

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

const filters = [
  { label: "Categories", icon: Tag },
  { label: "Price Range", icon: Wallet },
  { label: "Seller Rating", icon: Star },
];

export function MarketplacePage() {
  return (
    <div className="min-h-screen bg-surface-soft text-foreground">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-black tracking-tight text-indigo-700 dark:text-indigo-400">
            ShopChat
          </Link>
          <div className="hidden md:flex items-center gap-4 bg-surface-soft px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800">
            <Search className="h-5 w-5 text-slate-400" />
            <input
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
          <img
            alt="User Profile"
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80"
            className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
          />
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

              <div className="flex flex-wrap gap-4">
                {filters.map((filter) => {
                  const FilterIcon = filter.icon;
                  return (
                    <button
                      key={filter.label}
                      type="button"
                      className="bg-surface dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <FilterIcon className="h-4 w-4 text-indigo-600" />
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
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
                      <span className="text-xl font-bold text-indigo-700">{product.price}</span>
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
                        Ask Seller
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
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
