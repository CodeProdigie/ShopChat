"use client";

import { useState } from "react";
import type { SVGProps } from "react";
import {
  BarChart3,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  ShoppingBag,
  TrendingUp,
  X,
  LogOut,
  HelpCircle,
  FileText,
  Zap,
  Package,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const conversations = [
  {
    id: 1,
    name: "Alex Rivera",
    message: '"Is the premium model still available for bulk shipping?"',
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    status: "online",
    badge: "Unread",
    badgeColor: "bg-primary text-white",
    time: "2m ago",
  },
  {
    id: 2,
    name: "Jordan Smith",
    message: '"Payment sent! Please confirm receipt of funds."',
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    status: "offline",
    badge: "Waiting for Payment",
    badgeColor: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    time: "1h ago",
  },
  {
    id: 3,
    name: "Anonymous User #882",
    message: '"Can you provide more details on the return policy?"',
    avatar: null,
    status: "offline",
    badge: "Processing",
    badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
    time: "3h ago",
  },
];

const sideNavItems = [
  { label: "Dashboard", icon: BarChart3, active: true },
  { label: "Messages", icon: MessageSquare, active: false },
  { label: "Inventory", icon: Package, active: false },
  { label: "Analytics", icon: TrendingUp, active: false },
  { label: "Settings", icon: Settings, active: false },
];

const bottomNavItems = [
  { label: "Support", icon: HelpCircle },
  { label: "Logout", icon: LogOut },
];

export function SellerDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 text-foreground dark:text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 border-r border-slate-200 dark:border-slate-800 bg-surface dark:bg-slate-950 flex-col p-4 gap-2 z-40">
        <div className="mb-8 px-4 py-2">
          <h1 className="text-lg font-bold text-primary">ShopChat Seller</h1>
          <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
            Enterprise Tier
          </p>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {sideNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-semibold ${
                  item.active
                    ? "bg-primary/10 dark:bg-primary/20 text-primary"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1">
          <button className="w-full bg-primary-container text-white py-3 rounded-xl font-semibold mb-4 hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4 inline mr-2" />
            New Product
          </button>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-all text-sm"
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-lg font-bold text-primary">ShopChat</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg"
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <nav className="px-4 py-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            {sideNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-semibold ${
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 md:p-8 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Seller Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Welcome back. Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-lg font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
              <FileText className="h-5 w-5" />
              View Reports
            </button>
            <button className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
              <Plus className="h-5 w-5" />
              List New Product
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Sales Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg text-primary">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-secondary flex items-center gap-1">
                +12.5% <TrendingUp className="h-4 w-4" />
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-2">
              Total Sales
            </p>
            <h2 className="text-3xl font-bold mb-4">$42,890.00</h2>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4"></div>
            </div>
          </div>

          {/* Active Conversations Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-secondary-container/30 dark:bg-secondary-container/20 rounded-lg text-secondary">
                <MessageSquare className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-secondary flex items-center gap-1">
                +4 <MessageSquare className="h-4 w-4" />
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-2">
              Active Conversations
            </p>
            <h2 className="text-3xl font-bold mb-4">24</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Average response time: 3 mins
            </p>
          </div>

          {/* New Orders Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-tertiary-fixed/30 dark:bg-tertiary-fixed/20 rounded-lg text-on-tertiary-fixed">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                8 Pending
              </span>
            </div>
            <p className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-2">
              New Orders
            </p>
            <h2 className="text-3xl font-bold mb-4">118</h2>
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                alt="Customer"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900"
                alt="Customer"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
              />
              <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                +5
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Conversations */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-xl font-bold">Active Conversations</h3>
                <button className="text-primary font-semibold hover:underline text-sm">
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {conv.avatar ? (
                          <img
                            className="w-12 h-12 rounded-full object-cover"
                            alt={conv.name}
                            src={conv.avatar}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                            <ShoppingBag className="h-6 w-6" />
                          </div>
                        )}
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                            conv.status === "online"
                              ? "bg-secondary"
                              : "bg-slate-300"
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-foreground">
                          {conv.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                          {conv.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${conv.badgeColor}`}
                      >
                        {conv.badge}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {conv.time}
                      </span>
                      <ChevronRight className="h-5 w-5 text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Growth Insights */}
            <div className="bg-linear-to-br from-primary to-primary-container text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2">Growth Insights</h4>
                <p className="text-sm opacity-90 mb-4">
                  Your sales are 15% higher than last month. Ready to scale?
                </p>
                <button className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-colors text-sm">
                  Upgrade Tier
                </button>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-container/40 rounded-full blur-3xl"></div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
              <h3 className="text-sm uppercase tracking-wider text-foreground font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col items-center gap-2 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/20 group">
                  <Package className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-xs text-center font-semibold text-slate-700 dark:text-slate-300">
                    Add Stock
                  </span>
                </button>
                <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col items-center gap-2 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/20 group">
                  <MessageSquare className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-xs text-center font-semibold text-slate-700 dark:text-slate-300">
                    Set Auto-Reply
                  </span>
                </button>
                <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col items-center gap-2 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/20 group">
                  <FileText className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-xs text-center font-semibold text-slate-700 dark:text-slate-300">
                    View Reports
                  </span>
                </button>
                <button className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col items-center gap-2 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/20 group">
                  <TrendingUp className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-xs text-center font-semibold text-slate-700 dark:text-slate-300">
                    Analytics
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
