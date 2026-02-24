# Minimal Motion

A typography-focused, single-page portfolio showcase demonstrating restraint, CSS mastery, and sophisticated micro-interactions. Built with a monochrome palette where typography and motion are the stars.

**[View Live](https://minimal-motion-gray.vercel.app)**

![Minimal Motion Preview](./preview.png)

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Animation** — [Motion](https://motion.dev) (formerly Framer Motion)
- **Smooth Scroll** — [Lenis](https://lenis.darkroom.engineering)
- **Styling** — Tailwind CSS v4 (CSS-first config)
- **Theming** — next-themes (light/dark)
- **Fonts** — Sora (display), Inter (body), Instrument Serif (accent)

## Features

- **Scroll-driven variable font animation** — Font weight shifts from 400 to 800 as you scroll, using Sora's variable axis with spring-smoothed interpolation
- **Multiple text reveal modes** — Word-by-word, letter-by-letter, line-by-line, and mask wipe animations triggered on scroll
- **Custom cursor system** — Spring-following cursor with `mix-blend-difference`, morphs between variants (default, text, link, magnetic, hidden)
- **Magnetic hover effects** — Interactive elements pull toward the cursor with spring physics
- **Smooth theme transitions** — Light/dark toggle with spring-animated switch and smooth color transitions across all elements
- **Marquee ticker** — CSS-animated text marquee with scroll-velocity skew, responsive speed (faster on mobile)
- **Text stroke section** — Scroll-to-fill outline typography and hover/tap-to-fill interactive words using multi-shadow outline technique
- **Horizontal scroll section** — Sticky 4-panel horizontal scroll with scroll-driven transform and progress indicator
- **Abstract visuals** — SVG geometric shapes that draw on scroll via `pathLength` animation
- **Scroll progress bar** — Fixed 2px bar at top of viewport tracking document scroll
- **Noise grain overlay** — Subtle SVG feTurbulence texture for visual depth
- **Page preloader** — Animated "M" lettermark reveal with session-aware replay prevention
- **Scroll-velocity skew** — Shared hook that tilts elements based on scroll speed for a dynamic feel
- **Mobile-optimized interactions** — Touch-aware tap animations, color-inverting button presses, fire-and-forget discipline link animations, responsive marquee speed
- **Accessible by default** — Reduced motion support, touch device detection, keyboard navigation, WCAG AA color contrast, semantic heading hierarchy

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
  globals.css              # Tailwind v4 @theme config, design tokens, color variables
  layout.tsx               # Root layout with fonts, theme provider, cursor, overlays
  page.tsx                 # Single-page composition
components/
  Hero.tsx                 # 3D staggered letter animation with scroll parallax
  TypeInMotion.tsx         # Scroll-driven variable font weight demo
  TextReveal.tsx           # Reusable reveal component (4 modes)
  RevealSection.tsx        # Showcase of all reveal modes
  TextStrokeSection.tsx    # Outline-to-fill typography (scroll + hover/tap)
  InteractSection.tsx      # Magnetic buttons, cursor morphing, discipline links
  HorizontalScrollSection.tsx  # Sticky horizontal scroll with 4 principle panels
  ThemeShowcase.tsx        # Theme toggle centerpiece with color palette
  AbstractVisuals.tsx      # SVG shapes drawn on scroll
  CTASection.tsx           # Call-to-action with contact link
  MarqueeTicker.tsx        # Infinite-scroll text banner with velocity skew
  ScrollProgressBar.tsx    # Fixed scroll progress indicator
  NoiseOverlay.tsx         # SVG feTurbulence grain texture
  Preloader.tsx            # Animated page entrance
  PageWrapper.tsx          # Preloader integration wrapper
  CustomCursor.tsx         # Spring-following cursor with blend mode
  MagneticElement.tsx      # Reusable magnetic hover wrapper
  SmoothScroll.tsx         # Lenis wrapper with reduced-motion fallback
  ScrollNav.tsx            # Dot navigation for page sections
  ThemeToggle.tsx          # Accessible theme switch
  SectionDivider.tsx       # Visual section separator
  Footer.tsx               # Back-to-top, attribution, tech stack, social links
hooks/
  useMagnetic.ts           # Spring-physics magnetic pull
  useMounted.ts            # Hydration-safe mount check
  useTouchDevice.ts        # Touch capability detection
  useReducedMotionSafe.ts  # SSR-safe reduced motion check
  useScrollVelocitySkew.ts # Scroll velocity to skew transform
context/
  CursorContext.tsx        # Cursor variant state management
lib/
  fonts.ts                 # Google Fonts configuration
```

## Deployment

Deployed on [Vercel](https://minimal-motion-gray.vercel.app). No environment variables required.
