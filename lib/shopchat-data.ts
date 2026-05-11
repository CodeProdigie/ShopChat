export type Product = {
  slug: string;
  title: string;
  price: number;
  priceLabel: string;
  description: string;
  sellerId: string;
  seller: string;
  badge?: string | null;
  image: string;
  rating: number;
  sales: string;
  specs?: { label: string; value: string }[];
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: "buyer" | "seller" | "system";
  text: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  productSlug: string;
  buyerId: string;
  sellerId: string;
  status: "active" | "pending_payment" | "ordered";
  orderId?: string;
};

export type Order = {
  id: string;
  conversationId: string;
  productSlug: string;
  buyerId: string;
  sellerId: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  total: number;
};

export const demoProducts: Product[] = [
  {
    slug: "tactile-pro-keyboard",
    title: "Tactile Pro Keyboard",
    price: 189,
    priceLabel: "$189",
    description:
      "Premium mechanical switches with customizable RGB, an aluminum chassis, and seller support for custom keycap bundles.",
    sellerId: "seller-keymods",
    seller: "KeyMods Co.",
    badge: "New Arrival",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    sales: "2.1k Sales",
    specs: [
      { label: "Switches", value: "Hot-swap tactile" },
      { label: "Build", value: "Aluminum frame" },
    ],
  },
  {
    slug: "sonic-studio-over-ear",
    title: "Sonic Studio Over-Ear",
    price: 299,
    priceLabel: "$299",
    description:
      "Active noise cancellation with 40-hour battery life, spatial audio, and replacement ear pad options.",
    sellerId: "seller-audiohaus",
    seller: "AudioHaus",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    sales: "6.8k Sales",
    specs: [
      { label: "Battery Life", value: "40 Hours" },
      { label: "Audio", value: "Spatial ANC" },
    ],
  },
  {
    slug: "arc-minimalist-lamp",
    title: "Arc Minimalist Lamp",
    price: 125,
    priceLabel: "$125",
    description:
      "Adjustable brightness with touch-sensitive controls and a sleek matte finish for focused workspaces.",
    sellerId: "seller-lume",
    seller: "Lume Design",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    sales: "980 Sales",
    specs: [
      { label: "Brightness", value: "4 Levels" },
      { label: "Finish", value: "Matte graphite" },
    ],
  },
  {
    slug: "nova-smart-watch",
    title: "Nova Smart Watch",
    price: 450,
    priceLabel: "$450",
    description:
      "Next-gen health tracking, titanium casing, and direct seller help for strap sizing before checkout.",
    sellerId: "seller-novatech",
    seller: "NovaTech",
    badge: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    sales: "4.2k Sales",
    specs: [
      { label: "Battery Life", value: "48 Hours" },
      { label: "Water Resistance", value: "100 Meters" },
    ],
  },
  {
    slug: "nexus-ergonomic-chair",
    title: "Nexus Ergonomic Chair",
    price: 520,
    priceLabel: "$520",
    description:
      "Full lumbar support and breathable mesh for long work sessions, with chat-based delivery scheduling.",
    sellerId: "seller-workflow",
    seller: "WorkFlow Studio",
    badge: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    sales: "1.7k Sales",
    specs: [
      { label: "Support", value: "4D lumbar" },
      { label: "Material", value: "Breathable mesh" },
    ],
  },
  {
    slug: "profocus-50mm-prime",
    title: "ProFocus 50mm Prime",
    price: 1299,
    priceLabel: "$1,299",
    description:
      "Ultra-fast f/1.2 prime lens for portraits, low-light work, and seller-guided camera compatibility checks.",
    sellerId: "seller-lenscraft",
    seller: "LensCraft",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    sales: "840 Sales",
    specs: [
      { label: "Aperture", value: "f/1.2" },
      { label: "Mount", value: "Full-frame" },
    ],
  },
];

export const demoConversation: Conversation = {
  id: "demo-conversation",
  productSlug: "nova-smart-watch",
  buyerId: "demo-buyer",
  sellerId: "seller-novatech",
  status: "pending_payment",
  orderId: "ORD-7721",
};

export const demoMessages: ChatMessage[] = [
  {
    id: "m1",
    conversationId: demoConversation.id,
    senderId: "demo-buyer",
    senderRole: "buyer",
    text: "Hi Alex! Is the Nova Smart Watch still available for immediate shipping?",
    createdAt: "2026-05-12T09:24:00.000Z",
  },
  {
    id: "m2",
    conversationId: demoConversation.id,
    senderId: "seller-novatech",
    senderRole: "seller",
    text: "Yes, it is. If you order within the next hour, I can ship it today and it usually arrives in 2 days.",
    createdAt: "2026-05-12T09:26:00.000Z",
  },
  {
    id: "m3",
    conversationId: demoConversation.id,
    senderId: "demo-buyer",
    senderRole: "buyer",
    text: "Perfect. Is the titanium case scratch resistant?",
    createdAt: "2026-05-12T09:28:00.000Z",
  },
  {
    id: "m4",
    conversationId: demoConversation.id,
    senderId: "seller-novatech",
    senderRole: "seller",
    text: "It uses a sapphire crystal and Grade 5 titanium, so it handles daily wear very well.",
    createdAt: "2026-05-12T09:30:00.000Z",
  },
];

export const demoOrder: Order = {
  id: "ORD-7721",
  conversationId: demoConversation.id,
  productSlug: "nova-smart-watch",
  buyerId: "demo-buyer",
  sellerId: "seller-novatech",
  status: "confirmed",
  total: 399,
};
