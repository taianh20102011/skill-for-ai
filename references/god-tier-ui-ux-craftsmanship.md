# God-Tier UI/UX Craftsmanship & Autonomous Transformation Protocol

This document defines the mathematical, visual, and kinetic principles that elevate interfaces from "standard modern" to **God-Tier / Luxury Precision Grade** (the tier of Linear, Apple HIG, Raycast, and Teenage Engineering), accompanied by the **Autonomous AI Transformation Engine**.

---

## 1. Mathematical Visual Geometry & Sub-pixel Precision

### 1.1 The CNC-Milled Sub-pixel 1px Border Formula
Never use thick or blurry drop shadows. To achieve the physical look of anodized aluminum and polished titanium:

**Dark Mode Sub-pixel Border Formula:**
```css
/* Gives a sharp, laser-cut physical bevel without gradients or glassmorphism */
box-shadow: 
  inset 0 1px 0 0 rgba(255, 255, 255, 0.08),  /* 1px top rim highlight */
  0 0 0 1px rgba(255, 255, 255, 0.06),          /* Crisp perimeter border */
  0 2px 4px 0 rgba(0, 0, 0, 0.40);             /* Micro grounding depth */
border-radius: 6px;
background-color: #0D0F14;
```

**Light Mode Sub-pixel Border Formula:**
```css
box-shadow:
  inset 0 1px 0 0 rgba(255, 255, 255, 0.90),  /* Pure white inner top bevel */
  0 0 0 1px rgba(15, 23, 42, 0.08),            /* Slate perimeter hairline */
  0 1px 2px 0 rgba(15, 23, 42, 0.04);          /* Subtle surface anchor */
border-radius: 6px;
background-color: #FFFFFF;
```

### 1.2 Deep Obsidian Space Palette (Atmospheric Depth)
True luxury dark mode is never pitch flat `#000000` (which is dead and causes eye strain) nor gray `#333333` (which looks cheap):
- **Void Level 0 (Body Background)**: `#08090C` (99% darkness with 1% blue-slate undertone).
- **Surface Level 1 (Panels & Shells)**: `#0D0F14` (Crisp contrast against void).
- **Surface Level 2 (Interactive Cards & Inputs)**: `#13161F`.
- **Surface Level 3 (Hover States & Active Badges)**: `#1B1F2C`.
- **Laser Blue Focus**: `#2563EB` (Restrained, high-frequency emission).

---

## 2. Advanced GSAP Kinetic Physics (Soul in Motion)

### 2.1 The Quintessential "Linear" Elastic Easing Curve
Discard generic `ease-in-out` transitions. Use GSAP's CustomEase formula for organic deceleration with a micro-snap:
```typescript
// Rapid acceleration with gentle organic settling (zero bounce, maximum polish)
gsap.registerPlugin(CustomEase);
CustomEase.create("luxurySnap", "M0,0 C0.16,1 0.3,1 1,1");
```

### 2.2 Cursor-Tracked 1px Spotlight Border (Pure Math, No Glassmorphism)
Cards track the cursor's coordinates to illuminate their 1px perimeter border dynamically:

```typescript
export function initSpotlightBorders(cardSelector = ".spotlight-card") {
  const cards = document.querySelectorAll<HTMLElement>(cardSelector);
  
  window.addEventListener("pointermove", (e) => {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}
```
**CSS Implementation:**
```css
.spotlight-card {
  position: relative;
  background: #0D0F14;
  border-radius: 6px;
  overflow: hidden;
}

.spotlight-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 7px;
  padding: 1px;
  background: radial-gradient(
    180px circle at var(--mouse-x, -200px) var(--mouse-y, -200px),
    rgba(59, 130, 246, 0.4),
    transparent 80%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

### 2.3 Magnetic Interactive Elements (`quickTo`)
High-priority buttons and badges pull subtly towards the cursor when hovered:
```typescript
export function initMagneticElements(selector = ".magnetic-btn") {
  const elements = document.querySelectorAll<HTMLElement>(selector);

  elements.forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power2.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" });

    el.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.25; // Pull strength
      const y = (clientY - (top + height / 2)) * 0.25;
      xTo(x);
      yTo(y);
    });

    el.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}
```

### 2.4 Morphing Segmented Control (GSAP Flip Indicator)
Tab navigation switches with a fluid, continuous pill indicator:
```typescript
export function initSegmentedTabs(containerSelector: string) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const indicator = container.querySelector(".active-pill");
  const tabs = container.querySelectorAll(".tab-item");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const state = Flip.getState(indicator);
      tab.appendChild(indicator);
      Flip.from(state, {
        duration: 0.35,
        ease: "power3.out",
      });
    });
  });
}
```

---

## 3. Autonomous AI Transformation Engine ("AI Tự Hóa Hết")

Whenever the user provides raw requirements, messy code, or an existing project, the AI **must automatically execute this 7-step transformation pipeline** without asking for permission:

```
[Raw User Input / Code]
         │
         ▼
 1. Structural Flattening ───────► Eradicate nested cards & glassmorphism
         │
         ▼
 2. Precision Geometry ──────────► Lock border-radius to 6px; enforce 4-64px spacing
         │
         ▼
 3. Optical Typography ──────────► Inject tracking-tight & font-mono tabular-nums
         │
         ▼
 4. Kinetic Animation ───────────► Wire GSAP ScrollSmoother, Flip tabs, & micro-haptics
         │
         ▼
 5. Component Synthesis ─────────► Auto-inject free blocks from 21st.dev / shadcn
         │
         ▼
 6. Zero-Trust Security ─────────► Enforce server RBAC, ID obfuscation, & Turnstile
         │
         ▼
 7. Production Hardening ────────► Disable sourcemaps, mangle symbols, add Cloudflare WAF
         │
         ▼
[God-Tier Production Deliverable]
```

### Autonomous Rules for the AI:
1. **Never Return "Placeholder" Code**: Every component must be fully implemented, with complete state handling, keyboard accessibility (`onKeyDown`, `aria-label`), and responsive design.
2. **Never Leave Raw Numbers**: Every metric must be formatted with `Intl.NumberFormat` and wrapped in `tabular-nums`.
3. **Never Leave Generic Error Messages**: Every error state must provide actionable humanized guidance.
4. **Never Leave Unprotected Endpoints**: Every API route must contain server-side session checks, Zod schema validation, and ID obfuscation.
