---
name: magic-ui
description: 150+ free and open-source animated components for landing pages and dashboards by Dillion Verma (magicui.design). Use when building modern SaaS landing pages, interactive Bento grids, animated beams, interactive 3D globes, marquee tickers, border beams, shimmer buttons, and particle ripples. Enforces strict Alabaster Porcelain invariants (6px radius, #FFFFFF cards, CNC sub-pixel 1px border, no glassmorphism).
---

# Magic UI (150+ Animated Landing & Dashboard Components)

[Magic UI](https://magicui.design) is a collection of 150+ animated components built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 1. Top Component Portfolio

| Component | Description | Install Recipe |
| :--- | :--- | :--- |
| **`Bento Grid`** | Asymmetrical responsive feature grid with interactive hover states. | `npx shadcn@latest add @magicui/bento-grid` |
| **`Animated Beam`** | Animated bidirectional SVG pulse beam connecting UI nodes/icons. | `npx shadcn@latest add @magicui/animated-beam` |
| **`Globe`** | Interactive WebGL 3D rotating globe showing international connections. | `npx shadcn@latest add @magicui/globe` |
| **`Marquee`** | Infinite auto-scrolling ticker for logos, testimonials, or tickers. | `npx shadcn@latest add @magicui/marquee` |
| **`Border Beam`** | Moving glowing sub-pixel gradient line traveling around container border. | `npx shadcn@latest add @magicui/border-beam` |
| **`Shimmer Button`**| Tactile high-conversion CTA button with rotating specular shimmer. | `npx shadcn@latest add @magicui/shimmer-button` |
| **`Meteors`** | Falling shooting stars background animation. | `npx shadcn@latest add @magicui/meteors` |
| **`Dot Pattern`** | Subtle geometric background dot matrix with radial mask. | `npx shadcn@latest add @magicui/dot-pattern` |
| **`Orbiting Circles`**| Concentric rotating icon orbits around a central focal node. | `npx shadcn@latest add @magicui/orbiting-circles` |

---

## 2. Adaptation to Alabaster Porcelain Invariants

* **Border Radius**: Strictly **`rounded-[6px]`** (`6px`). Replace all `rounded-2xl` or `rounded-xl`.
* **Surface**: White `#FFFFFF` card, Alabaster `#F7F8FA` page canvas.
* **CNC Border**: `border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)]`.
* **Typography**: `Plus Jakarta Sans` for labels/headings, `JetBrains Mono` for data tags.
* **Colors**: Sapphire `#2563EB` for active beams and icons; `#0F172A` for primary ink.

---

## 3. Production Recipe: Alabaster Bento Grid

```tsx
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export const PorcelainBentoGrid = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  );
};

export const PorcelainBentoCard = ({
  name,
  className = "",
  background,
  Icon,
  description,
  href,
  cta = "Learn more",
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ElementType;
  description: string;
  href?: string;
  cta?: string;
}) => {
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden bg-white rounded-[6px] border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)] p-6 hover:border-[#CBD5E1] transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity">
        {background}
      </div>
      <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-[6px] bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="relative z-10 space-y-1">
        <h3 className="text-sm font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">{name}</h3>
        <p className="text-xs text-[#64748B] line-clamp-2">{description}</p>
        {href && (
          <a href={href} className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] pt-2 hover:underline">
            {cta} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>
    </div>
  );
};
```
