import Link from "next/link";
import {
  ArrowLeft,
  BatteryCharging,
  Droplet,
  Heart,
  MessageSquare,
  Search,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
    alt: "Elite Series Pro Watch front view",
  },
  {
    src: "https://images.unsplash.com/photo-1512850189-8a6a1e0cc9c5?auto=format&fit=crop&w=1200&q=80",
    alt: "Elite Series Pro Watch side profile",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    alt: "Elite Series Pro Watch on charging stand",
  },
];

const recommendations = [
  {
    title: "Sport Mesh Strap",
    price: "$29.00",
    image: "https://images.unsplash.com/photo-1512499617640-c2f999058b28?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Pro Fast Charger",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
  },
];

export function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-surface-soft text-foreground">
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/95 backdrop-blur-md border-b border-line shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/marketplace"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-foreground shadow-sm hover:bg-surface-soft transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold tracking-tight">ShopChat</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-foreground shadow-sm hover:bg-surface-soft transition">
              <Share2 className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <div className="h-11 w-11 overflow-hidden rounded-2xl border border-line bg-surface">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                alt="Seller avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-32">
        <section className="bg-surface-container-lowest py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-4xl border border-line bg-surface shadow-sm">
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                {heroImages.map((image) => (
                  <div key={image.src} className="flex-none w-full aspect-square snap-center p-4 sm:p-6">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain rounded-3xl shadow-xl"
                    />
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-2">
                {heroImages.map((_, index) => (
                  <span key={index} className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                ))}
              </div>

              <button className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center text-error hover:scale-105 transition-transform">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-on-secondary-container">
                  New Arrival
                </span>
                <div className="ml-auto flex items-center gap-2 rounded-full bg-surface px-3 py-2 text-sm text-slate-600 shadow-sm border border-line">
                  <Star className="h-4 w-4 text-amber-500" />
                  4.9
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Elite Series Pro Watch</h2>
              <p className="text-3xl font-semibold text-primary">$399.00</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-surface-container-low p-5">
                <div className="flex items-center gap-3 text-secondary">
                  <BatteryCharging className="h-5 w-5" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Battery Life</p>
                    <p className="font-semibold">48 Hours</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-line bg-surface-container-low p-5">
                <div className="flex items-center gap-3 text-secondary">
                  <Droplet className="h-5 w-5" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant">Water Resistance</p>
                    <p className="font-semibold">100 Meters</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-3xl border border-line bg-surface p-6">
              <h3 className="text-sm uppercase tracking-[0.2em] text-on-surface-variant">Description</h3>
              <p className="text-sm leading-7 text-muted-foreground">
                Engineered for peak performance, the Elite Series Pro features a robust Grade 5 titanium case and a scratch-resistant sapphire crystal display. Experience seamless integration with your lifestyle through advanced health tracking and crystal-clear communication features.
              </p>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-2xl border border-line bg-surface">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                    alt="Seller avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">TechTime Official</p>
                  <p className="text-sm text-muted-foreground">Top Rated Merchant • 4.2k Sales</p>
                </div>
                <button className="ml-auto rounded-2xl border border-indigo-700 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors">
                  View Store
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Frequently Bought Together</h3>
                <button className="text-sm font-semibold text-primary hover:text-primary-strong transition-colors">See all</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {recommendations.map((item) => (
                  <div key={item.title} className="flex-none w-48 rounded-3xl border border-line bg-surface p-4 shadow-sm">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-surface-container-low">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <p className="mt-3 text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-base font-bold text-primary">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 border-t border-line px-4 py-4 backdrop-blur-md shadow-[0_-12px_24px_-6px_rgba(15,23,42,0.12)]">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <button className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary-container text-on-secondary-container shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95">
            <ShoppingCart className="h-6 w-6" />
          </button>
          <button className="flex-1 rounded-3xl bg-primary px-4 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95">
            <MessageSquare className="mr-2 h-5 w-5 inline" />
            Ask Seller about this Item
          </button>
        </div>
      </div>
    </div>
  );
}
