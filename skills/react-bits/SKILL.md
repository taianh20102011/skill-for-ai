---
name: react-bits
description: Implement modern, high-performance animated React/Next.js components and micro-interactions from React Bits (DavidHDev/react-bits).
---

# React Bits - Animated Component Engineering Skill

This skill provides patterns and catalog access for React Bits (`DavidHDev/react-bits`), a curated collection of lightweight, copy-paste animated React, Tailwind CSS, and WebGL components.

## 1. Component Categories & Patterns
- **Text Animations**:
  - `SplitText`: Staggered letter-by-letter reveal using Framer Motion / GSAP.
  - `BlurText`: Smooth blur filter transitions with spring easing.
  - `DecryptedText`: Cyberpunk-style random glyph decoding effect.
  - `ShinyText`: Subtle metallic sheen traveling across typography.
- **Interactive Backgrounds (WebGL & Canvas)**:
  - `Iridescence`: GLSL chromatic shader distortion canvas.
  - `Aurora`: Fluid gradient meshes with low CPU utilization.
  - `Ballpit`: Matter.js 2D physics spheres with cursor gravity.
  - `Particles`: Dynamic interactive starfields / particle networks.
- **Card & Layout Components**:
  - `SpotlightCard`: Cursor-following radial gradient glow effect.
  - `TiltedCard`: 3D perspective tilt on mouse movement using CSS transforms.
  - `PixelTransition`: Canvas-based pixelation dissolution transitions.

## 2. Anti-Slop Implementation Rules
1. **Never load heavy bundles globally**: Import WebGL/Canvas components with `next/dynamic` or lazy-loading.
2. **Subtle Sheen & Easing**: Use spring damping `tension: 170, friction: 26` to keep motion realistic.
3. **Contrast & Theme**: Ensure background canvases use `#080808` or match dark mode backgrounds without jarring white flash.
