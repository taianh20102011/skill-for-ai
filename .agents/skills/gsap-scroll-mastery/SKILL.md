---
name: gsap-scroll-mastery
description: Implement cinematic scroll-driven animations, pinned sections, scrubbed timelines, and Lenis smooth scrolling with GSAP ScrollTrigger.
---

# GSAP ScrollTrigger & Smooth Physics Mastery Skill

This skill governs scroll-driven animations, parallax layers, pinned storytelling, and continuous timeline scrubbing on modern web apps.

## 1. Golden Rules of Anti-Slop Motion
1. **Never hijack scroll abruptly**: Use Lenis for smooth normalized wheel events; do NOT use outdated scroll-locking hacks.
2. **Scrub with Dampening**: Always provide a smoothing factor in ScrollTrigger (e.g., `scrub: 1` or `scrub: 1.5`) to eliminate jumpiness.
3. **Hardware Acceleration**: Only animate `x`, `y`, `scale`, and `opacity` (CSS transforms). Avoid animating `top`, `left`, `width`, or `height`.
4. **Cleanup**: Always clean up ScrollTrigger instances on unmount (`ctx.revert()` inside `gsap.context()`).

## 2. Standard React / Next.js Setup
```tsx
'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PinnedHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        cardRef.current,
        { scale: 0.8, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#080808] text-white">
      <div ref={cardRef} className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#0d0f12] p-8 shadow-2xl">
        <h2 className="text-4xl font-bold tracking-tight">Crafted Motion</h2>
      </div>
    </section>
  );
}
```
