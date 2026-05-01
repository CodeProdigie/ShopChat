---
name: ShopChat Design System
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd8e3'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2fc'
  surface-container: '#f0ecf6'
  surface-container-high: '#eae6f1'
  surface-container-highest: '#e4e1eb'
  on-surface: '#1b1b22'
  on-surface-variant: '#464553'
  inverse-surface: '#303037'
  inverse-on-surface: '#f3eff9'
  outline: '#777584'
  outline-variant: '#c8c4d5'
  surface-tint: '#544fc0'
  primary: '#1f108e'
  on-primary: '#ffffff'
  primary-container: '#3730a3'
  on-primary-container: '#a9a7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#511c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#752c00'
  on-tertiary-container: '#fe9562'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3b35a7'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb694'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7a3003'
  background: '#fcf8ff'
  on-background: '#1b1b22'
  surface-variant: '#e4e1eb'
typography:
  h1:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is anchored in a **Corporate / Modern** aesthetic, optimized for the high-stakes environment of enterprise commerce. It prioritizes clarity and efficiency, ensuring that the conversational interface never feels cluttered or overwhelming. The visual language balances innovation with reliability, using a refined color palette and generous whitespace to create a sense of calm authority.

The target audience consists of both large-scale merchants and modern consumers. The UI evokes a sense of "Effortless Expertise"—it feels sophisticated enough for a power user but remains intuitive and welcoming for a first-time shopper. By combining minimalist layouts with tactile-inspired components, the design system bridges the gap between transactional software and human conversation.

## Colors
This design system utilizes a palette centered on "Trust Indigo" and "Conversational Teal." 

- **Primary (Indigo):** Used for core actions, branding elements, and navigational anchors. It represents the "trust" and "enterprise" nature of the platform.
- **Secondary (Teal):** Reserved for conversational highlights, success states, and positive growth indicators. It provides a soft, approachable contrast to the deep Indigo.
- **Neutrals:** A sophisticated range of Slates and Grays ensures that content remains readable and the hierarchy stays clear across both light and dark modes.

In **Light Mode**, surfaces are airy and predominantly white to maximize the "professional" feel. In **Dark Mode**, we avoid pure black (#000) in favor of deep navy slates to maintain high contrast while reducing eye strain during extended commerce management sessions.

## Typography
The design system exclusively uses **Inter**, a typeface designed for screens and functional clarity. The hierarchy is strictly enforced through weight and scale to manage the information density inherent in conversational commerce.

- **Headlines:** Use tighter letter spacing and heavier weights to anchor the page.
- **Body Text:** Uses a generous 1.6 line height to ensure long chat logs and product descriptions remain legible.
- **Labels:** Small caps or medium weights are used for metadata, status tags, and micro-copy to differentiate them from actionable text.

## Layout & Spacing
The design system employs a **Fluid 12-column grid** for dashboard views and a centered, focused layout for chat interfaces. We follow an **8px base unit** for all spacing and sizing.

- **Margins:** Default to 24px on mobile and 40px+ on desktop to provide ample "breathing room."
- **Rhythm:** Vertical rhythm is maintained by using multiples of 8px for component gaps (e.g., 16px between message bubbles, 24px between sections).
- **Whitespace:** It is treated as a first-class citizen to prevent the "enterprise density" trap, allowing users to focus on one customer interaction at a time.

## Elevation & Depth
Depth in the design system is conveyed through **Tonal Layering** and **Ambient Shadows**.

1.  **The Base Layer:** The primary background color (Light or Dark).
2.  **The Content Layer:** Cards and chat containers sit on this layer. In Light Mode, they use a subtle 1px border (`#E2E8F0`) and a very soft, diffused shadow (`y: 4px, b: 12px, opacity: 0.05`). 
3.  **The Interaction Layer:** Modals, dropdowns, and active tooltips. These use a more pronounced shadow to create clear separation from the background.
4.  **Glassmorphism:** Used sparingly for sticky headers and chat input backgrounds to maintain context of the content scrolling beneath, using a 12px backdrop blur.

## Shapes
The design system utilizes a **Rounded** shape language to soften the "enterprise" feel and make the conversational elements feel more organic.

- **Standard Components:** Buttons, Input fields, and Cards utilize a `0.5rem` (8px) radius.
- **Large Containers:** Modals and large sections use a `1rem` (16px) radius.
- **Message Bubbles:** A specialized shape is used: 12px on three corners, with the "tail" corner at 4px to indicate the speaker, following the `rounded-xl` logic for the outer curve.

## Components
Consistent application of these components ensures the platform feels unified:

- **Buttons:** Primary buttons use the Indigo palette with white text. Secondary buttons use a ghost style with a subtle Teal border to indicate conversational "soft" actions.
- **Input Fields:** Large, 48px height inputs with 8px corner radius. Focus states are indicated by a 2px Teal glow to signify the "active" conversational state.
- **Message Bubbles:** Agent messages are Indigo (White text); Customer messages are Neutral Gray/Slate; System/Success messages are Teal.
- **Chips & Tags:** Small, rounded-pill shapes used for order status (e.g., "Shipped," "Refunded").
- **Cards:** Used for product carousels within the chat. They feature a subtle hover state that lifts the card (increased shadow) to encourage interaction.
- **Quick Replies:** Ghost-style buttons that sit above the chat input, allowing for rapid, one-tap customer responses.