import Link from "next/link";
import { Receipt, ShoppingCart, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function ReceiptPage({ params }: { params: { orderId: string } }) {
  // In a real app, fetch order details by params.orderId
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-primary">ShopChat</Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mb-4 shadow-sm">
              <Receipt className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Order Receipt</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Order Number: <span className="font-semibold text-foreground">#{params.orderId}</span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900 shadow-sm overflow-hidden">
            <div className="p-6 flex items-center gap-4 border-b border-slate-200 dark:border-slate-800">
              <div className="h-16 w-16 rounded-lg overflow-hidden bg-surface-container-low flex-shrink-0 dark:bg-slate-800">
                <img className="h-full w-full object-cover" alt="Elite Series Pro Watch" src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=200&q=80" />
              </div>
              <div className="grow">
                <h3 className="text-lg font-semibold">Elite Series Pro Watch</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Merchant: Premium Tech Hub</p>
              </div>
            </div>
            <div className="px-6 py-4 space-y-3 bg-surface-container-low/50 dark:bg-slate-800/50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Subtotal</span>
                <span className="text-sm text-foreground">$385.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Shipping & Tax</span>
                <span className="text-sm text-foreground">$14.00</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-primary">$399.00</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/chat" className="w-full h-12 bg-primary text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <MessageSquare className="h-5 w-5" />
              Back to Conversation
            </Link>
            <Link href="/marketplace" className="w-full h-12 flex items-center justify-center gap-2 font-semibold text-secondary border border-secondary/20 dark:border-secondary/40 rounded-2xl hover:bg-secondary-container/20 dark:hover:bg-secondary-container/10 transition-colors active:scale-95">
              <ShoppingCart className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
