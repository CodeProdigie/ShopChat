import Link from "next/link";
import { ArrowLeft, ShoppingBag, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function StorefrontPage() {
  // In a real app, fetch seller/storefront info by params.sellerId
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/marketplace" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-foreground shadow-sm hover:bg-surface-soft transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-semibold tracking-tight">Seller Storefront</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl overflow-hidden border border-line bg-surface">
              <img className="h-full w-full object-cover" alt="Seller avatar" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">TechTime Official</h2>
              <p className="text-sm text-muted-foreground">Top Rated Merchant • 4.2k Sales</p>
            </div>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {/* Example products, in a real app fetch from seller */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm flex flex-col">
              <img src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80" alt="Elite Series Pro Watch" className="rounded-xl mb-4 object-cover h-40 w-full" />
              <h3 className="text-lg font-semibold mb-1">Elite Series Pro Watch</h3>
              <p className="text-sm text-muted-foreground mb-2">$399.00</p>
              <Link href="/product/elite-series-pro-watch" className="inline-flex items-center gap-2 border border-secondary text-secondary font-semibold py-2 px-4 rounded-xl hover:bg-secondary/10 transition-colors">
                <ShoppingBag className="h-4 w-4" />
                View Product
              </Link>
            </div>
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm flex flex-col">
              <img src="https://images.unsplash.com/photo-1512499617640-c2f999058b28?auto=format&fit=crop&w=400&q=80" alt="Sport Mesh Strap" className="rounded-xl mb-4 object-cover h-40 w-full" />
              <h3 className="text-lg font-semibold mb-1">Sport Mesh Strap</h3>
              <p className="text-sm text-muted-foreground mb-2">$29.00</p>
              <Link href="/product/sport-mesh-strap" className="inline-flex items-center gap-2 border border-secondary text-secondary font-semibold py-2 px-4 rounded-xl hover:bg-secondary/10 transition-colors">
                <ShoppingBag className="h-4 w-4" />
                View Product
              </Link>
            </div>
          </div>
          <div className="flex justify-end">
            <Link href="/chat" className="rounded-2xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg hover:-translate-y-0.5 transition-transform flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat with Seller
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
