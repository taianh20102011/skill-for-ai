---
name: react-bits
description: React Bits animated component library (215+ free animated components, text animations, micro-interactions, and 3D/canvas backgrounds for React, Next.js, and Vite). Use when asked to add animated text, split text, blurry text, magnetic buttons, tilted cards, spotlights, particle backgrounds, fluid cursors, rubber sliders, ballpits, or creative interactive components. Supports automated installation via `npx shadcn@latest add @react-bits/<Component>-TS-TW` or `npx jsrepo@latest add https://reactbits.dev/r/<Component>-TS-TW`, and enforces strict Alabaster Porcelain theme invariants (6px radius, CNC 1px border, no glassmorphism).
---

# React Bits (215+ Animated Components & Backgrounds)

React Bits is an open-source library of 215+ animated components, interactive details, and WebGL/canvas backgrounds for React, Next.js, and Vite by David Haz (`reactbits.dev`).

## 1. Installation Methods

React Bits components ship in 4 flavors:
- **`TS-TW`**: TypeScript + Tailwind CSS (Recommended for modern React/Next.js)
- **`JS-TW`**: JavaScript + Tailwind CSS
- **`TS-CSS`**: TypeScript + Vanilla CSS
- **`JS-CSS`**: JavaScript + Vanilla CSS

### Method A: Via shadcn CLI (Recommended)
```bash
npx shadcn@latest add @react-bits/<ComponentName>-TS-TW
```

Examples:
```bash
# Text animations
npx shadcn@latest add @react-bits/SplitText-TS-TW
npx shadcn@latest add @react-bits/TrueFocus-TS-TW
npx shadcn@latest add @react-bits/DecryptedText-TS-TW
npx shadcn@latest add @react-bits/ShinyText-TS-TW
npx shadcn@latest add @react-bits/BlurText-TS-TW

# Animations & Cursors
npx shadcn@latest add @react-bits/Magnet-TS-TW
npx shadcn@latest add @react-bits/StarBorder-TS-TW
npx shadcn@latest add @react-bits/SplashCursor-TS-TW
npx shadcn@latest add @react-bits/ClickSpark-TS-TW

# Cards & UI Components
npx shadcn@latest add @react-bits/TiltedCard-TS-TW
npx shadcn@latest add @react-bits/SpotlightCard-TS-TW
npx shadcn@latest add @react-bits/ElasticSlider-TS-TW
npx shadcn@latest add @react-bits/Dock-TS-TW
npx shadcn@latest add @react-bits/Stack-TS-TW

# Backgrounds
npx shadcn@latest add @react-bits/Ballpit-TS-TW
npx shadcn@latest add @react-bits/Hyperspeed-TS-TW
npx shadcn@latest add @react-bits/Squares-TS-TW
npx shadcn@latest add @react-bits/Aurora-TS-TW
npx shadcn@latest add @react-bits/Waves-TS-TW
```

### Method B: Via jsrepo
```bash
npx jsrepo@latest add https://reactbits.dev/r/<ComponentName>-TS-TW
```

### Method C: Configure in `components.json` for AI Agents
Add `@react-bits` to registries in `components.json`:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
}
```

---

## 2. Core Categories & Catalog Overview

### A. Text Animations (33+ components)
- `SplitText`: Staggered letter or word entrance with physics spring or GSAP ease.
- `TrueFocus`: Elegant blur effect where hovered words snap into high-contrast focus inside an animated bounding box.
- `DecryptedText`: Cyberpunk character scrambling decryption transition.
- `BlurText`: Gradual optical blur-to-sharp animation on word entrance.
- `ShinyText`: High-precision metallic shimmer traveling across typographic headers.
- `RotatingText`: Dynamic 3D or vertical rolling text cycler.
- `CountUp`: Tabular numeric ticker with decimal formatting.
- `VariableProximity`: Dynamic typographic weight/width morphing driven by cursor distance.

### B. Animations & Cursor Effects (38+ components)
- `Magnet`: Elements subtly pull toward cursor when hovered (`strength`, `radius`).
- `StarBorder`: Moving sub-pixel luminous border traveling around card perimeter.
- `SplashCursor`: Interactive fluid simulation liquid trails following pointer.
- `ClickSpark`: Micro-particle burst radiating from click locus.
- `GlareHover`: Dynamic reflection flare responding to mouse coordinates.
- `BlobCursor`: Organic fluid metaball cursor following pointer with elastic physics.

### C. Components & Layouts (48+ components)
- `TiltedCard`: 3D perspective tilt card tracking mouse coordinates with glare and depth.
- `SpotlightCard`: Sub-pixel radial beam following mouse over card surface and border.
- `ElasticSlider`: Satisfying rubber-band drag slider with dynamic bounce.
- `Dock`: macOS-inspired magnification icon toolbar.
- `Stack`: Draggable / flickable card stack with inertial throw physics.
- `BentoGrid`: High-order asymmetric Bento grid blocks with integrated hover motion.

### D. Micro-Interactions (34+ components)
- `SpringCheck`: Bouncy tactile checkbox toggle with spring recoil.
- `SquishSwitch`: Organic jelly-like squish toggle switch.
- `HoldButton`: Long-press radial progress button for high-risk actions.
- `SwipeToast`: Inertial swipe-to-dismiss notification toast.
- `VoicePill`: Animated microphone audio frequency visualizer pill.

### E. Backgrounds & Shaders (63+ components)
- `Ballpit`: 2D/3D physics ball pit with gravity, collision, and pointer repulsion.
- `Hyperspeed`: High-speed neon starfield / warp tunnel (Three.js / WebGL).
- `Squares`: Minimalist interactive grid squares with hover illumination.
- `Aurora`: Ethereal northern lights flowing ambient illumination.
- `Waves`: Harmonic geometric sine wave surface generator.

---

## 3. Strict Alabaster Porcelain Design Invariants

When adapting React Bits components into this repository or client projects, **ALWAYS enforce the active visual rules**:

| Rule | Default React Bits | Alabaster Porcelain Required Adaptation |
| :--- | :--- | :--- |
| **Border Radius** | `rounded-xl`, `rounded-2xl`, `rounded-3xl` | **Strictly `rounded-[6px]`** (`6px`) on cards, buttons, containers. |
| **Canvas Color** | `#000000` / `#09090b` (Dark default) | **`#F7F8FA`** Alabaster porcelain canvas. |
| **Card Surface** | Dark gray / translucent | **`#FFFFFF`** pure white cards with CNC sub-pixel border: `border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)]`. |
| **Typography** | Inter or Sans-serif | **`Plus Jakarta Sans`** for UI, **`JetBrains Mono`** with `tabular-nums` for counters/metrics. |
| **Ink / Text** | `#FFFFFF` | Primary ink: **`#0F172A`**, Secondary muted: **`#64748B`**. |
| **Accent Tone** | Multicolored / Neon | **Sapphire `#2563EB`** / Deep Navy `#1E3A8A`. |
| **Gradients** | Heavy radial gradients | ❌ **No heavy gradients**. Use clean flat porcelain surfaces or subtle monochromatic noise. |
| **Glassmorphism** | `backdrop-blur-md bg-white/10` | ❌ **No glassmorphism**. Use solid `#FFFFFF` cards with CNC-milled 1px border. |

---

## 4. Example: Adapting `SpotlightCard` to Alabaster Porcelain

```tsx
import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(37, 99, 235, 0.08)", // Sapphire accent 8%
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden bg-white rounded-[6px] border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-[#CBD5E1] ${className}`}
      {...props}
    >
      {/* CNC Sub-pixel spotlight highlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-[6px]"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 text-[#0F172A]">{children}</div>
    </div>
  );
};
```
