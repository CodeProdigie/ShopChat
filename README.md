# ShopChat

ShopChat is a conversational commerce platform where chat is the primary buying experience.

Instead of separating product discovery, checkout, support, and order updates into different systems, ShopChat keeps the full buyer-seller journey inside one thread: product questions, negotiation, customization, payment, fulfillment updates, and post-purchase reviews.

## Product Vision

Think "Etsy meets WhatsApp Business":

- Sellers list products in a marketplace.
- Buyers browse products and start a direct conversation with the seller.
- Chat is not a support add-on; it is the core transaction surface.
- Orders can be initiated from the conversation through a payment link.
- Order milestones are posted back into the same thread as system messages.

## Core User Flow

1. Buyer browses products.
2. Buyer opens a product and clicks `Ask Seller`.
3. Buyer and seller chat about fit, customization, delivery, and pricing.
4. Seller sends a payment link, or buyer chooses `Buy Now`.
5. Payment is processed through Polar.
6. An order is created and attached to the conversation.
7. Status updates such as `Order confirmed`, `Shipped`, and `Delivered` appear in chat.
8. Buyer can leave a review and share photos in the same thread.

## Business Model

### Free Tier

- Up to 10 listed products
- Unlimited chats
- 5% transaction fee

### Paid Tier

- $19/month
- Unlimited products
- 2% transaction fee
- Auto-responses
- Analytics dashboard

## Phase 1 Scope

We will start with the smallest version that proves the core idea:

- Authentication for buyers and sellers
- Seller storefront and product listings
- Product detail page with `Ask Seller`
- Real-time one-to-one messaging
- Basic order creation from chat
- Polar payment link flow
- Order status updates rendered as chat messages
- Seller plan enforcement for free vs paid tier

Out of scope for the first release:

- Group chats
- In-app video or voice
- Advanced search and recommendation systems
- Full dispute resolution tooling
- Multi-vendor cart checkout
- Rich media messaging beyond a simple planned extension path

## Design Source Of Truth

The `plan/` folder is the visual and UX source of truth while we build the primary screens.

### Shared references

- [plan/shopchat_design_system/DESIGN.md](plan/shopchat_design_system/DESIGN.md): colors, typography, spacing, elevation, and component rules
- [plan/shopchat_product_requirements.md](plan/shopchat_product_requirements.md): product overview and UX requirements

### Screen references available now

- Landing / home:
  - `shopchat_landing_page_desktop`
  - `shopchat_landing_page_dark_mode`
  - `shopchat_landing_page_mobile`
  - `shopchat_landing_page_mobile_dark_mode`
  - `shopchat_landing_page_with_social_proof_*`
  - `shopchat_mobile_landing_with_social_proof_*`
- Marketplace:
  - `shopchat_marketplace_desktop`
  - `shopchat_marketplace_tablet`
  - `shopchat_marketplace_mobile`
  - `shopchat_marketplace_dark_mode`
  - `shopchat_marketplace_mobile_dark_mode`
- Product detail:
  - `product_detail_pro_watch_mobile`
  - `product_detail_pro_watch_mobile_dark_mode`
- Chat:
  - `shopchat_buyer_seller_chat_dark_mode_1`
  - `shopchat_buyer_seller_chat_dark_mode_2`
  - `shopchat_buyer_seller_chat_mobile`
- Seller dashboard:
  - `shopchat_seller_dashboard_desktop`
  - `shopchat_seller_dashboard_dark_mode`
  - `shopchat_seller_dashboard_mobile`
  - `shopchat_seller_dashboard_mobile_dark_mode`
- Payment success:
  - `payment_success_light_mode`
  - `payment_success_dark_mode`

### Design implementation rules

- Both light and dark mode are first-class requirements.
- Responsive behavior must follow the provided mobile, tablet, and desktop references where available.
- If a visual mock and business rule disagree, business rules in this README win while the mock guides layout and style.
- Shared tokens should be centralized so future screens stay visually aligned.

## Technical Direction

Current stack in the repo:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

Planned platform architecture:

- Frontend: Next.js App Router for marketplace, product pages, inbox, checkout return states, and seller dashboard
- Backend: Next.js server capabilities for APIs/actions plus dedicated realtime messaging infrastructure
- Database: relational schema for users, products, conversations, messages, orders, subscriptions, and payouts
- Realtime: WebSocket-based chat, presence, typing indicators, and system event delivery
- Payments: Polar for subscriptions and transaction/payment flows
- Storage: product and chat media storage added after text-first messaging is stable
- Auth: role-aware authentication for buyers and sellers

## Domain Model

Primary entities:

- `User`
- `SellerProfile`
- `Product`
- `Conversation`
- `ConversationParticipant`
- `Message`
- `Order`
- `OrderStatusEvent`
- `Subscription`
- `Payment`
- `Review`

Key relationships:

- A seller owns many products.
- A buyer and seller can have multiple conversations, usually anchored to products or orders.
- A conversation contains user messages and system messages.
- An order belongs to a conversation and references a buyer, seller, and product context.
- Subscription state affects product limits and fee calculations.

## Milestone Plan

### Milestone 0: Screen Foundation

- Replace starter UI with ShopChat brand direction
- Implement shared light and dark mode tokens from the design system
- Set up route structure and reusable component folders
- Build screens from the `plan/` folder before backend integration

### Milestone 1: Core Screens

- Home / landing
- Marketplace
- Product detail
- Buyer / seller chat
- Seller dashboard
- Payment success

### Milestone 2: Application Foundation

- Define database schema and migration strategy
- Establish auth approach and user roles
- Add seed data for local development
- Prepare payment and subscription integration boundaries

### Milestone 3: Marketplace Basics

- Build homepage and product discovery flow
- Build seller product CRUD
- Build product detail page
- Add `Ask Seller` entry point
- Enforce free-tier product listing cap

### Milestone 4: Chat First Experience

- Create conversations from product pages
- Build inbox and thread UI
- Add real-time messaging
- Add typing and read-state primitives
- Add system messages for commerce events

### Milestone 5: Commerce in Chat

- Add seller-generated payment links
- Connect Polar payment success flow to order creation
- Show order cards inside conversation threads
- Add order timeline states: confirmed, shipped, delivered

### Milestone 6: Seller Monetization

- Add subscription management
- Apply free vs paid plan rules
- Calculate transaction fees
- Add basic seller analytics dashboard
- Add auto-response support for paid sellers

### Milestone 7: Trust and Retention

- Add reviews tied to completed orders
- Add post-purchase thread prompts
- Add moderation/reporting basics
- Add notifications for important order and chat events

## Engineering Plan

We will work like a senior engineering team with clear delivery slices, stable branching, and review discipline.

### Gitflow Approach

- `main`: production-ready code only
- `develop`: integration branch for completed feature work
- `feature/*`: one feature or vertical slice per branch
- `release/*`: stabilization branch before launch
- `hotfix/*`: production fixes from `main`

### Working Agreement

- Keep pull requests small and focused.
- Prefer vertical slices over broad unfinished infrastructure.
- Every feature branch should leave the app runnable.
- Document architectural decisions in the repo as they arise.
- Add tests for business-critical flows, especially payments, permissions, and order state transitions.
- Avoid coupling chat UI to payment/provider specifics.

## Frontend Build Structure

We are using the Next.js App Router and following the local Next.js docs for file-based routing and route groups.

### Routing conventions

- `app/layout.tsx`: root layout
- `app/(marketing)/page.tsx`: home route at `/`
- Future screens should be added as proper `page.tsx` files under route segments
- Route groups such as `(marketing)` should organize routes without changing URLs

### Component conventions

- Shared components live in top-level `components/`
- Marketing screen components live in `components/marketing/`
- Screen composition should stay outside `app/` where possible so `app/` remains focused on routing

## Screen-First Delivery Order

Before auth, database, payments, and restrictions, we are finishing the primary product screens.

1. Home / landing screen
2. Marketplace screen
3. Product detail screen
4. Buyer / seller chat screen
5. Seller dashboard screen
6. Payment success screen
7. Then auth, database, realtime, payments, and plan enforcement

## Suggested Build Order

1. Shared design tokens, theme support, and route structure
2. Home screen
3. Marketplace screen
4. Product detail screen
5. Buyer / seller chat screen
6. Seller dashboard screen
7. Payment success screen
8. Auth and user roles
9. Database schema and data layer
10. Real-time messaging
11. Polar payment link workflow
12. Order state machine and system messages
13. Subscription enforcement
14. Analytics, auto-responses, and review system

## Definition of Done

A milestone is done when:

- The feature works end-to-end locally
- Core happy path is tested
- Loading and error states are present
- Permissions and plan limits are enforced
- Code is reviewed and merged through the agreed branch flow
- README and environment documentation remain accurate

## Immediate Next Step

Current execution path:

- build the home screen from the `plan/` references
- continue screen-by-screen through marketplace, product detail, chat, seller dashboard, and payment success
- after screen coverage is complete, move into auth, database, payments, and restrictions
