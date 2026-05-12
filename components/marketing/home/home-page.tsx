"use client";

import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  CreditCard,
  Globe2,
  MessageSquareText,
  Menu,
  PlayCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import { Show } from "@clerk/nextjs";
import { AuthModal } from "@/components/auth/auth-modal";
import { ShopChatUserButton } from "@/components/auth/shopchat-user-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const brandLogos = [
  "Shopify",
  "Stripe",
  "NIKE",
  "GLOSSIER",
  "Allbirds",
  "Warby Parker",
];

const testimonials = [
  {
    quote:
      "ShopChat has completely redefined our sales funnel. Being able to close $500 orders directly in a DM without a single redirect is a game changer. Our conversion rate jumped 45% in the first month.",
    name: "Sarah Chen",
    role: "Founder, Velox Studio",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1-NwT34XTF1cZ-AUAvzmlm1B7a817Q-wT2KNSGAXqst5fymyKr_nRP8HB4Z9LKnwdxEOMUHMmqvoh5RwuJamtL5WwbozoFqIC6amydhiMmwWZo8iSmCUVCZBTpjRucG_dtOKCTfW7eCWKBDkHucqvJlTNYRIFkkunJvOR7hYFlwAShqPnXPxOmS3b0m_PowgMJNdZ9xpLih02T7amGnF0ELvjHna0mMe84lckk_oObmsjzNxbyEYnKVVFrvr0ryjUPnWzqO2I6B6f",
  },
  {
    quote:
      "The real-time translation feature is incredible. We're based in the US but selling to Europe and Asia without a dedicated local support team. It just works, seamlessly.",
    name: "Marcus Thompson",
    role: "E-commerce Lead, Aura Home",
    initial: "M",
  },
  {
    quote:
      "Finally, a commerce platform that actually understands how people want to buy today. The UI is stunning and the merchant dashboard gives us all the data we need.",
    name: "James Wilson",
    role: "Marketing Director, Solstice",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCcK2DRQtxIU9JEkE7BZ4gmMFKiWZ6SkUzKE8i3M2s0hcg0UbPDk8ipnqfxqIzT9fvOiSCqeVYV4HF9MnbX3cO1YkVYLeRdltjXoPQLleqGGpj9Mpn5zDMDTKngUN4QEuYuP3kFAFETQCJw89UHEjfblyH_XB7gCsh6U5vrEQ2h-Y6EPnvCLh8P5CbnS8fUFyxvB1PVFDgs0TmNdfgF7iJyyvQmsemHhYyhvG08oktjF5aTUfN5R_p0tQAwJGIdmDKgm22Wb_ZH-s9Z",
  },
];

const pricing = [
  {
    eyebrow: "Basic",
    name: "Free",
    price: "Free",
    cta: "Get Started",
    featured: false,
    items: [
      "List up to 10 products",
      "Unlimited chats",
      "5% transaction fee",
    ],
  },
  {
    eyebrow: "Professional",
    name: "Professional",
    price: "$19",
    suffix: "/mo",
    cta: "Start 14-Day Free Trial",
    featured: true,
    items: [
      "Unlimited products",
      "Unlimited chats",
      "2% transaction fee",
      "Auto-responses",
      "Analytics dashboard",
    ],
  },
];

const processSteps = [
  "Buyer browses and taps Ask Seller.",
  "Conversation covers fit, custom requests, and delivery timing.",
  "Seller sends a payment link directly inside the thread.",
  "Order updates show up as system messages until delivery.",
];

type FeatureTone = "primary" | "secondary" | "accent";

type FeatureCard = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: FeatureTone;
};

const featureCards: FeatureCard[] = [
  {
    title: "Browse",
    description:
      "Interactive catalogs that live inside the conversation, so buyers can keep exploring without leaving the thread.",
    icon: ShoppingBag,
    tone: "primary",
  },
  {
    title: "Inquire",
    description:
      "Ask about customization, shipping, sizing, or inventory before the purchase momentum disappears.",
    icon: MessageSquareText,
    tone: "secondary",
  },
  {
    title: "Converse",
    description:
      "Real conversations build trust, especially for higher-consideration products and custom orders.",
    icon: Sparkles,
    tone: "accent",
  },
  {
    title: "Transact",
    description:
      "Send payment links directly in chat and turn active conversations into completed orders with less friction.",
    icon: CreditCard,
    tone: "primary",
  },
];

const coreFlowImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAGkry7m5rekI86fRc9DCMtyJ1ZL8f933cDS8TpBzNgDvDaYjTKgoAO8KBpuyaHNvM56feemw5DCRzErM7ywsI7yyZXb00NWdqBAdL7mdBCFalIesTYPwVxGSGOvtY84jRe3zzNFUejGFnNPa53mhRwGPlt2J_TjsGlvpXmZVNilgbxqTw47GHZCyMznyvHSayxO08rXl7mUYIY4Iin7YEbDwA8zHaHJtgxUT1jGknX_D9PE7tP6OaFzQgoPpL1TEJqDMwm6owdfzgx";

const heroAvatars = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkUAkteM0874mihyg_p_x9yEKn4c8JvYBmTf7mdVcvRdTjiaeG4WDVBlEay0ZbOMvRfWSOujnHpa5i6ENe6FEhPNuPNb5YGh-83OF4HaTxnrreduSQCt6CQMI3tOx_RLFQz8NxYBn0QY0XI6S7w0xv4djHyEZkhaTvNupEhlDNVwCdUse5SqVjzJYgts1qpvEz1BBLLPfytl6pZ68QhWYhx_SAVs5t4mWCFtRObARYfqY9BUXCCV4X0UVrVwt5WX_wbpD0Vvwtnq5V",
    alt: "Merchant portrait one",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP6AlYJrgR1vBNcKqpNN3iBkAQ56GVF1T-U20p-Q_w4brxljBrd8lYlzAt4tCyHXJTCx6iQ2zIxMb69e8kjTMLNyioS33RgKT4CKXf2RQEHd0O0I-ozZKghbZZc6m5QJdr13X1g7XzdF2ZTmBR7tIkQM56C2oxa8LACl2WNPr_oTyBSc7BGl6AdXEbf9rc36DKhgt0k7LKlgQim86zHU9sLBATTyNqxBL4XI8AMzhBrBy8jq05_zEkSB92Gim2Bks_QkLfg0cQpggf",
    alt: "Merchant portrait two",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkPiJoO9Y_KbvgIucYDEe4kB-TOPbiTi6UV4szm20W3lXwTuftKgVyF7hZT_kYAKnJV2J0gozBXDVQDOmg_pCQY2chWsjF8ZeCqxQvO2d2-jrDZcV6_h7Pw4Zw31adrmH3YKp5oNzjlqEFksOFrj_VtjETeJUNR5nrVCHNESEkDC03BHO283BlvoTQ2bK02RGkidsBgZ70LCs32cmlpjnZLdMixLCmikTkDEILDhle-VZ-Tq7fpps6s1g7U_ZzkdwtY-y69b28lBLI",
    alt: "Merchant portrait three",
  },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <MessageSquareText className="h-5 w-5" />
      </div>
      <div>
        <p className="text-lg font-extrabold tracking-tight">ShopChat</p>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Conversational Commerce
        </p>
      </div>
    </div>
  );
}

function ToneIcon({
  tone,
  children,
}: {
  tone: "primary" | "secondary" | "accent";
  children: React.ReactNode;
}) {
  const className =
    tone === "secondary"
      ? "bg-secondary-soft text-secondary"
      : tone === "accent"
        ? "bg-[color:color-mix(in_srgb,var(--accent)_18%,white)] text-[color:var(--accent)]"
        : "bg-primary-soft text-primary";

  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

const navItems = [
  { href: "/marketplace", label: "Marketplace", primary: true },
  { href: "#pricing", label: "Pricing" },
  { href: "#features", label: "Solutions" },
  { href: "#reviews", label: "Reviews" },
];

type AuthMode = "sign-in" | "sign-up";

function HomeHeader({ openAuth }: { openAuth: (mode: AuthMode) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface-elevated backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <BrandMark />

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
          {navItems.map((item) => (
            item.primary ? (
              <Link key={item.label} href={item.href} className="text-primary">
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="hover:text-foreground">
                {item.label}
              </a>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`hamburger-button relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface/90 text-foreground transition hover:bg-surface-soft lg:hidden ${menuOpen ? "open" : ""}`}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((state) => !state)}
          >
            <Menu className={`hamburger-icon absolute inset-0 m-auto h-5 w-5 transition duration-200 ${menuOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"}`} aria-hidden="true" />
            <X className={`hamburger-icon absolute inset-0 m-auto h-5 w-5 transition duration-200 ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} aria-hidden="true" />
            <span className="sr-only">{menuOpen ? "Close navigation menu" : "Open navigation menu"}</span>
          </button>

          <ThemeToggle />
          <Show when="signed-out">
            <button
              type="button"
              onClick={() => openAuth("sign-in")}
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-surface-soft hover:text-foreground sm:inline-flex"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => openAuth("sign-up")}
              className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white glow-shadow hover:-translate-y-0.5 sm:inline-flex"
            >
              Get Started
            </button>
          </Show>
          <Show when="signed-in">
            <ShopChatUserButton />
          </Show>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-nav-panel lg:hidden ${menuOpen ? "open" : ""}`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-b-3xl border-t border-line bg-surface/95 px-4 pb-6 pt-5 backdrop-blur-sm shadow-2xl sm:px-6">
          <nav className="flex flex-col gap-3 text-sm font-medium text-muted-foreground">
            {navItems.map((item) => (
              item.primary ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-primary transition hover:bg-surface-soft hover:text-primary-strong"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 transition hover:bg-surface-soft hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
          </nav>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openAuth("sign-in");
              }}
              className="rounded-2xl border border-line bg-surface px-4 py-3 text-center text-sm font-semibold text-muted-foreground transition hover:bg-surface-soft hover:text-foreground"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openAuth("sign-up");
              }}
              className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection({ openAuth }: { openAuth: (mode: AuthMode) => void }) {
  return (
    <section
      id="hero"
      className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:pb-24 lg:px-8 lg:pt-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
        <div className="order-last flex flex-col gap-6 lg:order-first">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-[-0.05em] text-foreground sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-[1.08]">
            The commerce platform where{" "}
            <span className="text-primary">chat is the checkout.</span>
          </h1>

          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Eliminate friction in your sales funnel. ShopChat combines
            enterprise-grade messaging with instant checkout links, turning
            casual conversations into confirmed orders in seconds.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => openAuth("sign-up")}
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-4 text-base font-semibold text-white glow-shadow hover:-translate-y-0.5"
            >
              Start Selling Free
            </button>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-secondary/40 bg-surface px-7 py-4 text-base font-semibold text-secondary hover:bg-secondary-soft/30"
            >
              <PlayCircle className="h-4 w-4" />
              View Demo
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex -space-x-3">
              {heroAvatars.map((avatar) => (
                <Image
                  key={avatar.src}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by 2,500+ modern merchants
            </p>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <div className="relative mx-auto max-w-[38rem]">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-primary/12 blur-3xl" />
            <div className="card-shadow relative overflow-hidden rounded-[2rem] border border-line bg-surface p-4 sm:p-6">
              <div className="space-y-4">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-surface-soft px-4 py-3 text-sm leading-6">
                  Hey! Is the &quot;Onyx Collection&quot; jacket still in stock in
                  Medium?
                </div>

                <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm leading-6 text-white">
                  Yes, it is! Would you like me to reserve it for you? I can send
                  a checkout link right here.
                </div>

                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-surface-soft px-4 py-3 text-sm leading-6">
                  Perfect, yes please!
                </div>

                <div className="rounded-[1.5rem] border border-secondary/20 bg-secondary-soft p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface text-secondary">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Onyx Jacket - Medium
                        </p>
                        <p className="text-xs text-muted-foreground">$189.00 USD</p>
                      </div>
                    </div>
                    <button className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-white">
                      Pay Now
                    </button>
                  </div>
                </div>

                <div className="ml-auto flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-xs font-semibold text-secondary">
                  <Check className="h-3.5 w-3.5" />
                  Order #9012 Confirmed
                </div>
              </div>
            </div>

            <div className="card-shadow absolute -bottom-5 right-0 hidden items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 md:flex">
              <span className="h-3 w-3 rounded-full bg-secondary" />
              <p className="text-sm font-semibold text-foreground">
                Sales increased 42% via chat
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandStripSection() {
  const repeatedBrands = [...brandLogos, ...brandLogos];

  return (
    <section className="border-y border-line bg-[color:color-mix(in_srgb,var(--surface)_84%,transparent)] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Trusted by the world&apos;s most innovative brands
        </p>

        <div className="mt-6 hidden md:block">
          <div className="logo-marquee">
            <div className="logo-marquee-track gap-8 pr-8">
              {repeatedBrands.map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  className="flex min-w-[10rem] items-center justify-center rounded-2xl border border-line bg-surface px-6 py-4 card-shadow"
                >
                  <span
                    className={`text-lg font-black text-foreground/75 ${
                      brand === "NIKE"
                        ? "italic tracking-tight"
                        : brand === "Warby Parker"
                          ? "text-base uppercase tracking-[-0.03em]"
                          : brand === "GLOSSIER"
                            ? "tracking-tight"
                            : ""
                    }`}
                  >
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
          {brandLogos.map((brand) => (
            <div
              key={brand}
              className="rounded-2xl border border-line bg-surface px-4 py-3 text-center text-sm font-bold text-foreground/80"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          Capabilities
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Designed for the flow of conversation
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Our four-pillar approach ensures you never lose a customer between the
          hello and the thank you.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="rounded-[1.75rem] border border-line bg-surface p-7 card-shadow"
            >
              <ToneIcon tone={card.tone}>
                <Icon className="h-5 w-5" />
              </ToneIcon>
              <h3 className="mt-5 text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {card.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      id="process"
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-10 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/30 bg-primary-strong text-white card-shadow">
        <Image
          src={coreFlowImage}
          alt="Conversational commerce environment"
          fill
          className="object-cover opacity-25 mix-blend-screen"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(55,48,163,0.92),rgba(45,37,133,0.9))]" />

        <div className="relative z-10 grid gap-10 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Core flow
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From discovery to delivery, the same conversation keeps moving the
              sale.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/80">
              This is the behavior we want every screen to reinforce: fewer
              context switches, more trust, and more completed orders.
            </p>
            <a
              href="#reviews"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary-strong hover:bg-slate-100"
            >
              Read the Case Studies
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                  Step {index + 1}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/90 sm:text-base">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Wall of Love
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          What our users say
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Join 10,000+ brands scaling their conversational revenue with
          ShopChat.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.name}
            className="flex h-full flex-col rounded-[1.9rem] border border-line bg-surface p-7 card-shadow"
          >
            <div className="flex gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, index) => (
                <Sparkles key={index} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>

            <p className="mt-5 flex-1 text-base leading-8 text-muted-foreground">
              &quot;{testimonial.quote}&quot;
            </p>

            <div className="mt-8 flex items-center gap-4 border-t border-line pt-5">
              {"image" in testimonial && testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-line object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-[linear-gradient(135deg,rgba(115,105,255,0.2),rgba(24,198,179,0.2))] font-bold text-primary">
                  {"initial" in testimonial ? testimonial.initial : "M"}
                </div>
              )}
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureStatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="rounded-[2rem] border border-line bg-surface p-7 card-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <Store className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold">
            In-chat inventory for real conversations
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-8 text-muted-foreground">
            Sellers can browse and drop product cards directly into the
            conversation. Real-time stock levels ensure you never sell what you
            don&apos;t have.
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary">
            Learn more
            <ArrowRight className="h-4 w-4" />
          </div>
        </article>

        <article className="rounded-[2rem] border border-primary/30 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_85%,transparent),color-mix(in_srgb,var(--primary-strong)_68%,var(--accent)_32%))] p-7 text-white card-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold">Secure Checkout</h3>
          <p className="mt-3 text-sm leading-7 text-white/80">
            One-tap payments integrated directly into the chat flow, so buyers
            can commit while trust is highest.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/12 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
            <ShieldCheck className="h-3.5 w-3.5" />
            PCI Level 1 Compliant
          </div>
        </article>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
        <article className="rounded-[2rem] border border-line bg-surface p-7 card-shadow">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-soft text-secondary">
            <ChartNoAxesCombined className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold">Conversion Insights</h3>
          <p className="mt-3 text-base leading-8 text-muted-foreground">
            Track which conversation openers lead to sales and optimize your
            merchant scripts around what actually converts.
          </p>
        </article>

        <article className="rounded-[2rem] border border-line bg-surface p-7 card-shadow">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_18rem]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Globe2 className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold">Global Scale</h3>
              <p className="mt-3 text-base leading-8 text-muted-foreground">
                Supports 140+ currencies and automatically translates messages
                between buyers and sellers in real time.
              </p>
            </div>

            <div className="relative h-44 overflow-hidden rounded-[1.5rem] border border-line">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJggh8Y9DL7jHuTUoqGOVp2jtT0ZcmD2kjFFrrIJkF1Gw12Y--3z47w6rYUKa56WZ77XdB2DtVkltk1o22iHy5t4ZLb8KUFMwFwSWV6PEtxz0BSZNbZ4JbD9AOYm8Qtmw3tz-7FweGp8tUigqeIXgc51v_EpUxpJfTUlJhXA9zFekBPb5wj-tUZZab8v-qKYjE_O2t4LANuzsffg9m4EjXdycPK6Lu0kNaS52R0iFf-m3ZfovgSFcns2k1LFhRyTJ7bUkGPRb15RU8"
                alt="Global conversational commerce illustration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 288px"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function PricingSection({ openAuth }: { openAuth: (mode: AuthMode) => void }) {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Scalable pricing for every stage
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Simple, transparent, and built to grow with your volume.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
        {pricing.map((plan) => (
          <article
            key={plan.name}
            className={`relative rounded-[2rem] border bg-surface p-8 card-shadow sm:p-10 ${
              plan.featured ? "border-primary lg:-translate-y-2" : "border-line"
            }`}
          >
            {plan.featured ? (
              <span className="absolute right-8 top-0 -translate-y-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Recommended
              </span>
            ) : null}

            <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {plan.eyebrow}
            </span>
            <h3 className="mt-6 text-5xl font-extrabold tracking-tight text-foreground">
              {plan.price}
              {plan.suffix ? (
                <span className="ml-1 text-lg font-medium text-muted-foreground">
                  {plan.suffix}
                </span>
              ) : null}
            </h3>
            <p className="mt-3 text-base font-semibold text-foreground">{plan.name}</p>

            <ul className="mt-8 space-y-4">
              {plan.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7">
                  <Check className="mt-1 h-4 w-4 text-secondary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => openAuth("sign-up")}
              className={`mt-10 inline-flex w-full items-center justify-center rounded-xl px-6 py-4 text-sm font-semibold ${
                plan.featured
                  ? "bg-primary text-white glow-shadow"
                  : "border border-line bg-surface text-foreground hover:bg-surface-soft"
              }`}
            >
              {plan.cta}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-[color:color-mix(in_srgb,var(--surface)_88%,transparent)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1.25fr_repeat(3,0.75fr)] lg:px-8">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
            The future of commerce is not a grid of products. It&apos;s a
            conversation where trust, customization, and payment happen in one
            place.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Product</p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <a href="#features" className="block hover:text-foreground">
              Marketplace
            </a>
            <a href="#pricing" className="block hover:text-foreground">
              Pricing
            </a>
            <a href="#reviews" className="block hover:text-foreground">
              Success Stories
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Resources</p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <a href="#process" className="block hover:text-foreground">
              Core Flow
            </a>
            <a href="#hero" className="block hover:text-foreground">
              Demo
            </a>
            <a href="#reviews" className="block hover:text-foreground">
              Reviews
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Company</p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>About</p>
            <p>Careers</p>
            <p>Contact</p>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>(c) 2026 ShopChat. Screen-first build in progress.</p>
          <p>Built from the plan folder references in light and dark mode.</p>
        </div>
      </div>
    </footer>
  );
}

export function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in");
  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <div className="page-shell min-h-screen">
      <HomeHeader openAuth={openAuth} />
      <main>
        <HeroSection openAuth={openAuth} />
        <BrandStripSection />
        <FeaturesSection />
        <ProcessSection />
        <TestimonialsSection />
        <FeatureStatsSection />
        <PricingSection openAuth={openAuth} />
      </main>
      <Footer />
      <AuthModal
        mode={authMode}
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onModeChange={setAuthMode}
      />
    </div>
  );
}
