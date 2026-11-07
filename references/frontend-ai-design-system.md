# Modern AI Frontend Design System Specification (Elevated UI/UX)

A high-precision, distraction-free UI/UX specification engineered for world-class AI products and enterprise dashboards (inspired by Linear, Vercel, Raycast).

---

## 1. Visual Geometry & Aesthetics

### 1.1 The 5 Zero-Tolerance Prohibitions
1. ❌ **No Gradients**: Never use multi-stop color transitions or text gradients. All surfaces are crisp solid colors (`#FFFFFF`, `#F8FAFC`, `#0B0F17`, `#111827`).
2. ❌ **No Glassmorphism**: Never use frosted glass (`backdrop-blur`) with translucent layers. Use opaque, high-contrast surface tokens.
3. ❌ **No Card-in-Card Nesting**: Do not place a card component inside another card component. Instead, partition content with 1px border dividers (`border-t border-slate-200 dark:border-slate-800`) or whitespace.
4. ❌ **No Heavy Decorative Drop Shadows**: Never use diffuse, glowing, or multi-stage shadows (`shadow-2xl`, `shadow-blue-500/50`). Rely on crisp 1px borders (`border border-slate-200 dark:border-slate-800`).
5. ❌ **No Random Radii**: All interactive and containment elements (buttons, inputs, cards, dialogs, badges, dropdowns) must strictly have **`6px`** border radius (`rounded-[6px]`).

### 1.2 Bespoke Alabaster Porcelain Light Theme (Luxury Bright Palette)
When building bright, light-themed interfaces, avoid harsh clinical pure white (`#FFFFFF`) or dull muddy grays (`#E5E7EB`). Use the **Alabaster Porcelain & Sapphire Blue** palette:
- **Canvas Background (Airy & Soft)**: `#F7F8FA` (Warm titanium-porcelain, zero glare).
- **Surface Panels & Cards**: Pure crisp porcelain `#FFFFFF` with subpixel grounding.
- **Micro-Dividers & Hairlines**: `#E2E8F0` (light borders), `#F1F5F9` (interior card dividers).
- **Typography Inking**:
  - Headings / Titles: Deep Obsidian Ink `#0F172A` (rich, velvety contrast).
  - Body Copy: Balanced Slate `#334155` (calm, effortless reading).
  - Subtext & Badges: Cool Mist `#64748B`.
- **Signature Accent**: Royal Sapphire Blue (`#2563EB` base, `#1D4ED8` hover, `#DBEAFE` badge tint).

### 1.3 Signature Typography Stack (Editorial Precision)
- **Primary Sans**: `Plus Jakarta Sans` (`font-sans: "'Plus Jakarta Sans', Inter, sans-serif"`).
  - Modern geometric curves, distinctive glyphs, high optical clarity.
  - Headings: `font-bold tracking-[-0.03em] text-[#0F172A]`.
  - Body: `font-normal leading-relaxed text-[#334155]`.
- **Monospace Figures**: `JetBrains Mono` or `Geist Mono` (`font-mono: "'JetBrains Mono', monospace"`).
  - Numbers, metrics, OTP tiles, tokens, timestamps: Always enforce `font-mono tabular-nums`.

---

## 2. Standardized Spacing Scale (4px to 64px)

Strictly enforce this geometric 8-step scale:

| Token | Pixels | Usage |
| :--- | :--- | :--- |
| `1` | `4px` | Micro-spacing: badge inner padding, icon-text gap (`p-1`, `gap-1`). |
| `2` | `8px` | Compact spacing: button vertical padding, dense menu items (`p-2`, `gap-2`). |
| `3` | `12px` | Standard input padding, table cell padding (`py-3`, `gap-3`). |
| `4` | `16px` | Component spacing: card interior padding, toolbar gaps (`p-4`, `gap-4`). |
| `6` | `24px` | Layout spacing: card group gaps, mobile section padding (`p-6`, `gap-6`). |
| `8` | `32px` | Container padding: desktop grid gaps, modal body padding (`p-8`, `gap-8`). |
| `12` | `48px` | Major block spacing: header-to-content separation (`py-12`, `gap-12`). |
| `16` | `64px` | Page section offsets: hero bottom spacing (`py-16`, `gap-16`). |

---

## 3. High-End UI Component Recipes (Tailwind + React)

### 3.1 Tactile Button with 6px Radius & Spring Press
```tsx
import React from "react";

export function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-[6px] text-sm font-medium
                 bg-blue-600 hover:bg-blue-700 text-white
                 border border-blue-600 hover:border-blue-700
                 active:scale-[0.98] transition-all duration-75
                 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:ring-offset-2
                 cursor-pointer select-none"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-[6px] text-sm font-medium
                 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200
                 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700
                 hover:bg-slate-50 dark:hover:bg-slate-800/60
                 active:scale-[0.98] transition-all duration-75
                 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600
                 cursor-pointer select-none"
    >
      {children}
    </button>
  );
}
```

### 3.2 Flattened Card (Zero-Shadow, Crisp 1px Border)
```tsx
export function FlatCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 rounded-[6px] p-6">
      <div className="pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
```

### 3.3 Analytics KPI Counter (Tabular Figures & Clean Indicator)
```tsx
export function StatMetric({ label, value, change, isPositive }: { label: string; value: string; change: string; isPositive: boolean }) {
  return (
    <div className="bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 rounded-[6px] p-4">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 tracking-normal">{label}</p>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 font-mono tabular-nums">
          {value}
        </span>
        <span className={`text-xs font-mono font-medium px-1.5 py-0.5 rounded-[6px] ${
          isPositive 
            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60" 
            : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60"
        }`}>
          {isPositive ? "↑ " : "↓ "}{change}
        </span>
      </div>
    </div>
  );
}
```

### 3.4 High-Precision Input Field
```tsx
export function TextInput({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        {...props}
        className={`h-9 px-3 rounded-[6px] text-sm bg-white dark:bg-slate-950
                   text-slate-900 dark:text-slate-100 placeholder:text-slate-400
                   border transition-colors duration-100
                   focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600
                   ${error 
                     ? "border-rose-500 focus-visible:ring-rose-500" 
                     : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"}`}
      />
      {error && <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</span>}
    </div>
  );
}
```

---

## 4. Humanized Copywriting Guidelines

### 4.1 Banned AI Clichés vs. Natural Human Phrasing
| ❌ Cliché / Robot Talk | ✅ Direct, Empathetic Human Phrasing |
| :--- | :--- |
| *"Delve into our multifaceted analytics"* | *"Xem báo cáo chi tiết"* / *"Check your metrics"* |
| *"Leverage our revolutionary AI-powered paradigm"* | *"Công cụ phân tích tự động"* / *"Automated analytics tool"* |
| *"A testament to our unwavering dedication"* | *"Hệ thống hoạt động ổn định 99.9%"* / *"Reliable 99.9% uptime"* |
| *"Seamlessly streamline your operational pipeline"* | *"Tối ưu hóa quy trình làm việc"* / *"Simplify your workflow"* |
| *"Authentication failed due to credential discrepancy"* | *"Tên đăng nhập hoặc mật khẩu chưa chính xác. Vui lòng thử lại."* |

---

## 5. Admin Portal Setup & Free UI MCP Ecosystem

### 5.1 Initialize shadcn/ui
```bash
pnpm dlx shadcn@latest init -t [framework]
```

### 5.2 Premier 100% Free UI MCP Servers (Zero-Cost, High-Craftsmanship)
Replaces proprietary or paid services like TypeUI:
```bash
# 1. 21st.dev MCP (Over 12,000+ community components & templates)
claude mcp add 21st -- npx -y @21st-dev/mcp

# 2. shadcn/ui MCP (Official blocks, forms, charts, and tables)
claude mcp add shadcn -- npx -y shadcn-mcp

# 3. Magic UI MCP (Interactive animated primitives)
claude mcp add magicui -- npx -y @magicuidesign/mcp
```

### 5.3 Free Component & Template Registries
- [21st.dev](https://21st.dev) — High-aesthetic modern UI blocks.
- [ui.shadcn.com/blocks](https://ui.shadcn.com/blocks) — Official production-ready admin layouts.
- [magicui.design](https://magicui.design) — Animated components and visual effects.
- [ui.aceternity.com](https://ui.aceternity.com) — Modern open-source interactive components.

