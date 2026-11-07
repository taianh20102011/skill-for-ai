---
name: anti-slop-web-ui
description: Design and implement high-end Web UIs using React, Tailwind, GSAP, R3F, Lenis, shadcn/ui, and Animate UI with strict Anti-Slop principles.
---

# Anti-Slop Web UI & High-End Interactions Skill

This skill guides the design and implementation of modern, crafted web user interfaces with realistic micro-physics, depth, and smooth animations, avoiding generic AI-generated slop.

## 1. Core Stack
- **Styling**: Tailwind CSS + shadcn/ui (customized, never default presets)
- **Physics & Motion**: GSAP (`power3.out`, `expo.out`), Framer Motion
- **Smooth Scroll**: `@studio-freight/lenis` (Lenis) synchronized with GSAP ScrollTrigger
- **3D Graphics**: `@react-three/fiber` (R3F) and `@react-three/drei`
- **Micro-Interactions**: ibelick `motion-primitives`, MagicUI, Aceternity UI, Animate UI (`imskyleen/animate-ui`)

## 2. Anti-Slop Visual Guidelines
- **Palette**: Dark background `#080808` or `#0d0f12`. Maximum 1 accent color (Emerald `#10b981`, Amber `#f59e0b`, or Monochrome). Never use saturated neon purple/pink gradients.
- **Typography**: Geist / Plus Jakarta Sans for body and headings. Geist Mono / JetBrains Mono for numbers, tables, code.
- **Micro-Physics**: Interaction timing 150ms-250ms. Use spring physics with proper damping, or GSAP `power3.out`.
- **GPU Optimization**: Use `transform`, `opacity`, and `will-change: transform`. Prevent layout thrashing and heavy CSS repaints.

## 3. Reference Boilerplates
- Lenis + GSAP initialization:
```typescript
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```
