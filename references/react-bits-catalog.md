# React Bits Catalog & Adaptation Reference Guide

> **Official Source**: [reactbits.dev](https://reactbits.dev) by David Haz (`DavidHDev/react-bits`)
> **Ecosystem Standard**: Enforces **Alabaster Porcelain** (`#F7F8FA` canvas, `#FFFFFF` cards, `#0F172A` ink, `#2563EB` sapphire accent, strictly **`rounded-[6px]`**, CNC 1px sub-pixel border, and **zero glassmorphism**).

---

## ⚡ Quick Start: Adding Components

React Bits components can be added directly using shadcn CLI or jsrepo into any React, Next.js, or Vite project:

```bash
# General Syntax:
npx shadcn@latest add @react-bits/<ComponentName>-<Flavor>

# Flavors:
# - TS-TW: TypeScript + Tailwind CSS (Standard)
# - JS-TW: JavaScript + Tailwind CSS
# - TS-CSS: TypeScript + Plain CSS
# - JS-CSS: JavaScript + Plain CSS
```

---

## 1. Text Animations (33+ Components)

| Component | Description | Install Command |
| :--- | :--- | :--- |
| **`SplitText`** | Splits text into words or characters with staggered spring or GSAP entrance. | `npx shadcn@latest add @react-bits/SplitText-TS-TW` |
| **`TrueFocus`** | Words remain softly blurred until hovered, snapping into razor-sharp focus inside a box. | `npx shadcn@latest add @react-bits/TrueFocus-TS-TW` |
| **`DecryptedText`** | Cyberpunk alphanumeric character scrambler that resolves into target text. | `npx shadcn@latest add @react-bits/DecryptedText-TS-TW` |
| **`BlurText`** | Progressive optical Gaussian blur-to-sharp animation on word entrance. | `npx shadcn@latest add @react-bits/BlurText-TS-TW` |
| **`ShinyText`** | Elegant sub-pixel metallic light shimmer traveling across typography. | `npx shadcn@latest add @react-bits/ShinyText-TS-TW` |
| **`RotatingText`** | 3D vertical or horizontal word flipper for hero headlines. | `npx shadcn@latest add @react-bits/RotatingText-TS-TW` |
| **`CountUp`** | Smooth tabular numeric counter with customizable duration and easing. | `npx shadcn@latest add @react-bits/CountUp-TS-TW` |
| **`VariableProximity`**| Font weight and width dynamically scale based on cursor proximity. | `npx shadcn@latest add @react-bits/VariableProximity-TS-TW` |
| **`ScrollVelocity`** | Infinite marquee text ticker whose speed reacts to page scroll velocity. | `npx shadcn@latest add @react-bits/ScrollVelocity-TS-TW` |
| **`TextPressure`** | Interactive SVG text that stretches and bends under cursor force. | `npx shadcn@latest add @react-bits/TextPressure-TS-TW` |

---

## 2. Animations & Cursor Effects (38+ Components)

| Component | Description | Install Command |
| :--- | :--- | :--- |
| **`Magnet`** | Button or element pulls toward the cursor within a defined radius. | `npx shadcn@latest add @react-bits/Magnet-TS-TW` |
| **`StarBorder`** | Luminous sub-pixel traveling beam orbiting the perimeter of a card. | `npx shadcn@latest add @react-bits/StarBorder-TS-TW` |
| **`SplashCursor`** | WebGL fluid simulation with smoke / fluid trails tracking cursor motion. | `npx shadcn@latest add @react-bits/SplashCursor-TS-TW` |
| **`ClickSpark`** | Micro-interaction particle burst exploding from click position. | `npx shadcn@latest add @react-bits/ClickSpark-TS-TW` |
| **`BlobCursor`** | Elastic metaball fluid bubble following the pointer with spring recoil. | `npx shadcn@latest add @react-bits/BlobCursor-TS-TW` |
| **`PixelTrail`** | Retro digital pixel trail resolving behind moving mouse coordinates. | `npx shadcn@latest add @react-bits/PixelTrail-TS-TW` |
| **`GlareHover`** | Dynamic 3D specular light glare tracking mouse position over a surface. | `npx shadcn@latest add @react-bits/GlareHover-TS-TW` |
| **`Crosshair`** | Precision technical crosshair reticle tracking pointer coordinates. | `npx shadcn@latest add @react-bits/Crosshair-TS-TW` |

---

## 3. UI Components & Layouts (48+ Components)

| Component | Description | Install Command |
| :--- | :--- | :--- |
| **`TiltedCard`** | 3D perspective tilt card tracking mouse coordinates with glare & parallax. | `npx shadcn@latest add @react-bits/TiltedCard-TS-TW` |
| **`SpotlightCard`** | Sub-pixel radial beam following mouse over card surface and border. | `npx shadcn@latest add @react-bits/SpotlightCard-TS-TW` |
| **`ElasticSlider`** | Rubber-band physics drag slider with overshoot bounce. | `npx shadcn@latest add @react-bits/ElasticSlider-TS-TW` |
| **`Dock`** | macOS-style icon magnification bar with smooth distance interpolation. | `npx shadcn@latest add @react-bits/Dock-TS-TW` |
| **`Stack`** | Draggable and swipeable card stack with inertial throw mechanics. | `npx shadcn@latest add @react-bits/Stack-TS-TW` |
| **`BentoGrid`** | Asymmetric modular Bento layout cards with synchronized motion states. | `npx shadcn@latest add @react-bits/BentoGrid-TS-TW` |
| **`CircularGallery`**| 3D rotating cylindrical image showcase using WebGL or CSS 3D transforms. | `npx shadcn@latest add @react-bits/CircularGallery-TS-TW` |
| **`DecayCard`** | Card that reacts to cursor drag with decay physics and damping. | `npx shadcn@latest add @react-bits/DecayCard-TS-TW` |

---

## 4. Micro-Interactions (34+ Components)

| Component | Description | Install Command |
| :--- | :--- | :--- |
| **`SpringCheck`** | Bouncy checkbox toggle with spring-loaded checkmark animation. | `npx shadcn@latest add @react-bits/SpringCheck-TS-TW` |
| **`SquishSwitch`** | Organic jelly-like squish toggle switch. | `npx shadcn@latest add @react-bits/SquishSwitch-TS-TW` |
| **`HoldButton`** | Long-press progress ring button for critical destructive actions. | `npx shadcn@latest add @react-bits/HoldButton-TS-TW` |
| **`SwipeToast`** | Inertial drag-to-dismiss toast notification. | `npx shadcn@latest add @react-bits/SwipeToast-TS-TW` |
| **`PulseHeart`** | Micro-interaction heart like button with particle pulse. | `npx shadcn@latest add @react-bits/PulseHeart-TS-TW` |
| **`VoicePill`** | Dynamic audio waveform pill visualizer for microphone states. | `npx shadcn@latest add @react-bits/VoicePill-TS-TW` |

---

## 5. Backgrounds & Canvas Shaders (63+ Components)

| Component | Description | Install Command |
| :--- | :--- | :--- |
| **`Ballpit`** | 2D/3D physics ball pit with gravity, collisions, and pointer repulsion. | `npx shadcn@latest add @react-bits/Ballpit-TS-TW` |
| **`Hyperspeed`** | High-speed neon starfield / warp tunnel (Three.js / WebGL). | `npx shadcn@latest add @react-bits/Hyperspeed-TS-TW` |
| **`Squares`** | Minimalist interactive grid squares with hover illumination. | `npx shadcn@latest add @react-bits/Squares-TS-TW` |
| **`Aurora`** | Ethereal northern lights flowing ambient illumination. | `npx shadcn@latest add @react-bits/Aurora-TS-TW` |
| **`Waves`** | Harmonic geometric sine wave surface generator. | `npx shadcn@latest add @react-bits/Waves-TS-TW` |
| **`Threads`** | Organic interwoven flowing thread lines. | `npx shadcn@latest add @react-bits/Threads-TS-TW` |
| **`Dither`** | Retro 1-bit or 2-bit Floyd-Steinberg dither shader canvas. | `npx shadcn@latest add @react-bits/Dither-TS-TW` |

---

## 6. Alabaster Porcelain Theme Adaptations

Every component pulled from React Bits must be refined before delivery to client applications:

1. **Border Radius**: Replace all `rounded-2xl`, `rounded-xl`, or `rounded-3xl` with `rounded-[6px]`.
2. **Surface & Border**:
   ```tsx
   // Alabaster Card Invariant:
   className="bg-white rounded-[6px] border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)]"
   ```
3. **Ink & Typography**:
   ```tsx
   // Typography Invariant:
   className="font-['Plus_Jakarta_Sans',sans-serif] text-[#0F172A]"
   // Tabular Numbers (Counters / Metrics):
   className="font-['JetBrains_Mono',monospace] tabular-nums text-[#0F172A]"
   ```
4. **Accent Color**:
   Replace arbitrary pink/purple/green glows with Sapphire `#2563EB` (light mode) or Deep Navy `#1E3A8A`.
5. **Prohibitions**:
   - ❌ Never use CSS `backdrop-filter: blur(...)` / glassmorphism on primary UI cards.
   - ❌ Never nest cards inside other cards.
   - ❌ Never use heavy saturated multi-color linear gradients across backgrounds.
