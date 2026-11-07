# Animate UI: Motion-Based UI Primitives & Interaction Architecture

> Based on [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui)

Animate UI bridges headless component libraries (**Radix UI, Base UI, React Aria, reka-ui / shadcn-vue**) with **Motion** (`motion/react`, `@animate-ui/react`), animating the foundational primitives with zero API drift while keeping the original library's exact props.

---

## 1. Dual-Engine Architecture: GSAP + Animate UI

In our fullstack ecosystem, **GSAP 25+** and **Animate UI** complement each other seamlessly:

```
+-----------------------------------------------------------------------------------+
|                           Fullstack Frontend Layer                                |
+------------------------------------------+----------------------------------------+
|                                          |                                        |
|   ⚡ GSAP 25+ Engine (Greensock)          |   🎨 Animate UI (Motion Primitives)     |
|   ---------------------------------      |   ---------------------------------    |
|   • Page-level scroll & parallax         |   • Headless Radix / Base UI popups    |
|   • ScrollTrigger & ScrollSmoother 120fps|   • Dialogs, Dropdowns, Sheets, Menus  |
|   • SVG vector morphing & DrawSVG        |   • Micro-press feedback, hover springs|
|   • Complex timeline choreography        |   • Emil Kowalski practical motion     |
|   • Canvas, WebGL, 3D transformations    |   • Lucide / SVG animated icons        |
+------------------------------------------+----------------------------------------+
```

---

## 2. Three Execution Paths

| Scenario | Workflow |
|---|---|
| **A. Existing shadcn/ui components** | Run the CLI codemod: `pnpm dlx @animate-ui/cli@latest animate <component>` |
| **B. Hand-built Radix UI / Base UI** | Swap import to `@animate-ui/react`: e.g. `import * as Dialog from "@animate-ui/react/dialog"` |
| **C. Custom markup or plain elements** | Apply spring tokens, trigger-anchored origins, and recipes from `references/interactions/` |

---

## 3. Emil Kowalski Practical Motion Principles

1. **Trigger-Anchored Origins**: Menus, popovers, and tooltips must expand outwards from their trigger origin (`transformOrigin`), not from an arbitrary center point.
2. **Ease-Out for Enters & Exits**: Enter transitions should arrive swiftly with high initial velocity and soft settle; exits should accelerate away cleanly without lag.
3. **Tactile Press Feedback**: Buttons and interactive controls must have immediate tactile shrinkage (`active:scale-[0.98]`).
4. **Light Blur for State Swaps**: When swapping text, icons, or badges, a slight 2–4px blur bridges the crossfade smoothly.
5. **Reduced Motion Compliance**: Always respect `prefers-reduced-motion` to ensure accessibility.

---

## 4. Key Interaction Recipes Included in `.agents/skills/animate-ui/`

- **Interactions**: `expanding-card`, `filter-grid`, `form-steps`, `reorder`, `skeleton`, `status-button`, `swipe-row`, `count-badge`.
- **Recipes**: `modal`, `sheet`, `menu`, `disclosure`, `toast`, `indicator`, `swap`, `route`.
- **Animated Icons**: Turns any Lucide or custom SVG into an interactive animated icon (`AnimateIcon`).
