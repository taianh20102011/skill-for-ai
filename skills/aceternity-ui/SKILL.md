---
name: aceternity-ui
description: Trending animated React, Tailwind CSS, and Framer Motion components by Manu Arora (ui.aceternity.com). Use when building modern hero sections, 3D cards, lamp effects, canvas reveals, background beams, tracing beams, sparkles, and interactive visual showcases. Enforces adaptation to Alabaster Porcelain styling (strict 6px border radius, #FFFFFF card, #F7F8FA canvas, CNC 1px border, no glassmorphism).
---

# Aceternity UI (Trending Animated Components)

[Aceternity UI](https://ui.aceternity.com) is a library of animated components built with Tailwind CSS and Framer Motion by Manu Arora.

## 1. Top Component Portfolio

| Component | Description | Install Recipe |
| :--- | :--- | :--- |
| **`Lamp Effect`** | Cinematic top-down illuminated light cone for landing page Hero headers. | `npx shadcn@latest add "https://ui.aceternity.com/r/lamp"` |
| **`3D Card / 3D Pin`** | Perspective tilt card with 3D translation on hover and focal point pin. | `npx shadcn@latest add "https://ui.aceternity.com/r/3d-card"` |
| **`Background Beams`** | Ambient animated vector light beams traveling across a dark or light canvas. | `npx shadcn@latest add "https://ui.aceternity.com/r/background-beams"` |
| **`Tracing Beam`** | SVG beam that traces user scroll progress along a content timeline. | `npx shadcn@latest add "https://ui.aceternity.com/r/tracing-beam"` |
| **`Canvas Reveal`** | Dot-matrix canvas shader revealing underlying content on hover. | `npx shadcn@latest add "https://ui.aceternity.com/r/canvas-reveal-effect"` |
| **`Sparkles Core`** | Lightweight interactive canvas particle sparkles background. | `npx shadcn@latest add "https://ui.aceternity.com/r/sparkles"` |
| **`Vortex`** | High-energy swirling particle storm background (WebGL/Three.js). | `npx shadcn@latest add "https://ui.aceternity.com/r/vortex"` |
| **`Hover Border Gradient`**| Dynamic sub-pixel luminous gradient orbiting card boundary on hover. | `npx shadcn@latest add "https://ui.aceternity.com/r/hover-border-gradient"` |

---

## 2. Adaptation to Alabaster Porcelain Invariants

Aceternity UI defaults to heavy dark-mode backgrounds (`#000000`) and rounded borders (`rounded-2xl`, `rounded-3xl`). When incorporating into this ecosystem:

1. **Border Radius**: Replace all `rounded-xl`, `rounded-2xl`, `rounded-3xl` with **`rounded-[6px]`**.
2. **Colors**:
   - Canvas: **`#F7F8FA`** (Alabaster Porcelain).
   - Card: **`#FFFFFF`** with CNC border `border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)]`.
   - Primary Ink: **`#0F172A`**, Muted: **`#64748B`**, Sapphire Accent: **`#2563EB`**.
3. **No Glassmorphism**: Remove `backdrop-blur-md` on content cards; use clean solid porcelain surfaces.

---

## 3. Production Recipe: Alabaster 3D Card

```tsx
import React, { createContext, useState, useContext, useRef } from "react";

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}]);

export const Porcelain3DCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div style={{ perspective: "1000px" }} className="flex items-center justify-center">
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`bg-white rounded-[6px] border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)] transition-all duration-200 ease-linear ${className}`}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};
```
