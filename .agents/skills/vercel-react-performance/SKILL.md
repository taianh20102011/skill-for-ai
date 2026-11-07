---
name: vercel-react-performance
description: Optimize React and Next.js applications for elite performance, minimal bundle size, and Core Web Vitals (LCP, INP, CLS).
---

# Vercel React & Next.js Performance Optimization Skill

This skill enforces high-performance engineering patterns in React, Next.js (App Router), and TypeScript applications.

## 1. Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.0s
- **INP (Interaction to Next Paint)**: < 150ms
- **CLS (Cumulative Layout Shift)**: < 0.05

## 2. Key Architecture Patterns
1. **Server Components by Default**: Push data-fetching to React Server Components (RSC); use `'use client'` only at leaf components requiring user interactivity or browser APIs.
2. **Dynamic Imports & Code Splitting**: Heavy animation libraries (GSAP, Three.js, Lucide icon barrels) MUST be lazy-loaded:
```tsx
import dynamic from 'next/dynamic';

const Canvas3D = dynamic(() => import('@/components/Canvas3D'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#080808]" />,
});
```
3. **Transition Management (`useTransition`)**: Wrap state updates that trigger re-renders of large lists in `startTransition` to prevent blocking the main thread and keeping INP low.
4. **Font Optimization**: Use `next/font` with `display: 'swap'` and `subsets: ['latin']` to eliminate Flash of Invisible Text (FOIT).
5. **Asset Caching**: Use immutable cache headers for hashed static bundles (`Cache-Control: public, max-age=31536000, immutable`).
