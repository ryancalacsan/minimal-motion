# Minimal Motion

A typography-focused, single-page portfolio showcase demonstrating restraint, CSS mastery, and sophisticated micro-interactions. Built with a monochrome palette where typography and motion are the stars.

## Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Animation** — [Motion](https://motion.dev) (formerly Framer Motion)
- **Smooth Scroll** — [Lenis](https://lenis.darkroom.engineering)
- **Styling** — Tailwind CSS v4 (CSS-first config)
- **Theming** — next-themes (light/dark)
- **Fonts** — Syne (display), Inter (body), Instrument Serif (accent)

## Features

- **Scroll-driven variable font animation** — Font weight shifts from 400 to 800 as you scroll, using Syne's variable axis with spring-smoothed interpolation
- **Multiple text reveal modes** — Word-by-word, letter-by-letter, line-by-line, and mask wipe animations triggered on scroll
- **Custom cursor system** — Spring-following cursor with `mix-blend-difference`, morphs between variants (default, text, link, magnetic, hidden)
- **Magnetic hover effects** — Interactive elements pull toward the cursor with spring physics
- **Smooth theme transitions** — Light/dark toggle with spring-animated switch and smooth color transitions across all elements
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
  globals.css          # Tailwind v4 @theme config, design tokens, color variables
  layout.tsx           # Root layout with fonts, theme provider, cursor system
  page.tsx             # Single-page composition
components/
  Hero.tsx             # 3D staggered letter animation with scroll parallax
  TypeInMotion.tsx     # Scroll-driven variable font weight demo
  TextReveal.tsx       # Reusable reveal component (4 modes)
  RevealSection.tsx    # Showcase of all reveal modes
  InteractSection.tsx  # Magnetic buttons, cursor morphing, animated links
  ThemeShowcase.tsx    # Theme toggle centerpiece with color palette
  CustomCursor.tsx     # Spring-following cursor with blend mode
  MagneticElement.tsx  # Reusable magnetic hover wrapper
  SmoothScroll.tsx     # Lenis wrapper with reduced-motion fallback
  ThemeToggle.tsx      # Accessible theme switch
  Footer.tsx           # Tech stack, social links
hooks/
  useMagnetic.ts       # Spring-physics magnetic pull
  useMousePosition.ts  # Mouse tracking
  useMounted.ts        # Hydration-safe mount check
  useTouchDevice.ts    # Touch capability detection
  useReducedMotionSafe.ts  # SSR-safe reduced motion check
context/
  CursorContext.tsx    # Cursor variant state management
lib/
  fonts.ts             # Google Fonts configuration
```

## Deployment

Deployed on [Vercel](https://vercel.com). No environment variables required.
