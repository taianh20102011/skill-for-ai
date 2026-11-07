# GSAP Complete Suite Mastery Reference

This document provides definitive, copy-pasteable implementations and setup methods for the **entire GSAP ecosystem** across npm packages, React hooks, CDN scripts, specialized eases, and all 25+ official plugins.

---

## 1. Complete ES Module Imports & Unified Registration

### Installation via NPM:
```bash
npm install gsap @gsap/react
```

### Full TypeScript / JavaScript Registration:
```typescript
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Eases & EasePack
import { CustomEase } from "gsap/CustomEase";
// CustomBounce requires CustomEase
import { CustomBounce } from "gsap/CustomBounce";
// CustomWiggle requires CustomEase
import { CustomWiggle } from "gsap/CustomWiggle";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

// Plugins
import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";

export function registerAllGSAP() {
  if (typeof window === "undefined") return;

  gsap.registerPlugin(
    useGSAP,
    Draggable,
    DrawSVGPlugin,
    EaselPlugin,
    Flip,
    GSDevTools,
    InertiaPlugin,
    MotionPathHelper,
    MotionPathPlugin,
    MorphSVGPlugin,
    Observer,
    Physics2DPlugin,
    PhysicsPropsPlugin,
    PixiPlugin,
    ScrambleTextPlugin,
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    SplitText,
    TextPlugin,
    RoughEase,
    ExpoScaleEase,
    SlowMo,
    CustomEase,
    CustomBounce,
    CustomWiggle
  );

  // Conditional Debug activation
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("gsapDebug") === "1") {
    GSDevTools.create();
    console.info("[GSAP] GSDevTools & MotionPathHelper active");
  }
}
```

---

## 2. Complete CDN Scripts Setup (HTML / Vanilla JS)

```html
<!-- Core GSAP Library -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>

<!-- All Official Plugins -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/Draggable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/DrawSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/EaselPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/Flip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/GSDevTools.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/InertiaPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/MotionPathHelper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/MotionPathPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/MorphSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/Observer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/Physics2DPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/PhysicsPropsPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/PixiPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrambleTextPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>
<!-- ScrollSmoother requires ScrollTrigger -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollSmoother.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollToPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/TextPlugin.min.js"></script>

<!-- Specialized Eases (EasePack, CustomEase, CustomBounce, CustomWiggle) -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/EasePack.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomEase.min.js"></script>
<!-- CustomBounce requires CustomEase -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomBounce.min.js"></script>
<!-- CustomWiggle requires CustomEase -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/CustomWiggle.min.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(
      Draggable, DrawSVGPlugin, EaselPlugin, Flip, GSDevTools,
      InertiaPlugin, MotionPathHelper, MotionPathPlugin, MorphSVGPlugin,
      Observer, Physics2DPlugin, PhysicsPropsPlugin, PixiPlugin,
      ScrambleTextPlugin, ScrollTrigger, ScrollSmoother, ScrollToPlugin,
      SplitText, TextPlugin, RoughEase, ExpoScaleEase, SlowMo,
      CustomEase, CustomBounce, CustomWiggle
    );
  });
</script>
```

---

## 3. Specialized Easing Engine Recipes

### 3.1 CustomBounce (Realistic Physics Bouncing)
```typescript
// Create a natural rubber ball bounce curve with squish physics
CustomBounce.create("myBounce", {
  strength: 0.7,
  squash: 2,
  squashID: "myBounce-squash"
});

// Animate position with bounce, and scale with squash
gsap.to(".ball", { duration: 2, y: 350, ease: "myBounce" });
gsap.to(".ball", { duration: 2, scaleY: 0.6, scaleX: 1.4, ease: "myBounce-squash", transformOrigin: "bottom center" });
```

### 3.2 CustomWiggle (Haptic Vibration & Alarm Feedback)
```typescript
// Create 6 decaying wiggles for an error shake or bell chime
CustomWiggle.create("hapticWiggle", { wiggles: 6, type: "easeOut" });

export function shakeElement(target: HTMLElement) {
  gsap.to(target, { duration: 0.5, x: 12, ease: "hapticWiggle" });
}
```

### 3.3 SlowMo & RoughEase
```typescript
// Dramatic slow-motion hero zoom: fast enter, ultra-slow middle, fast exit
gsap.to(".hero-media", {
  duration: 4,
  scale: 1.08,
  ease: "slow(0.7, 0.8, false)"
});
```

---

## 4. Canvas & WebGL Integration (PixiPlugin & EaselPlugin)

### PixiPlugin (Hardware-Accelerated WebGL Sprites & Filters)
```typescript
import * as PIXI from "pixi.js";

// Register PixiPlugin with PIXI instance
PixiPlugin.registerPIXI(PIXI);

export function animatePixiSprite(sprite: PIXI.Sprite) {
  gsap.to(sprite, {
    pixi: {
      blur: 0,
      scaleX: 1.2,
      scaleY: 1.2,
      tint: 0x2563EB, // Electric sapphire
      brightness: 1.1
    },
    duration: 1.5,
    ease: "power2.out"
  });
}
```

---

## 5. React Integration with `useGSAP`

Always use `@gsap/react`'s `useGSAP` for automatic cleanup, SSR safety, and scoping:

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function AnimatedHero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Automatically scoped to container!
    gsap.from(".hero-title", {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <h1 className="hero-title font-bold text-2xl tracking-[-0.03em] text-[#0F172A]">
        Hệ Thống Quản Trị Trực Quan
      </h1>
    </div>
  );
}
```
