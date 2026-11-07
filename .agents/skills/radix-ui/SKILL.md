---
name: radix-ui
description: Headless, accessible UI component primitives for React and Next.js (Dialog, DropdownMenu, Popover, Tooltip, Select, Tabs, Accordion, Slider, NavigationMenu). Use when building robust, accessible design systems, modal dialogs, accessible forms, keyboard-navigable interfaces, and headless UI structures conforming to WAI-ARIA standards. Enforces Alabaster Porcelain styling (strict 6px radius, CNC 1px border, #FFFFFF card, #0F172A text).
---

# Radix UI (Accessible Headless Primitives)

[Radix UI](https://www.radix-ui.com) is the gold standard for unstyled, accessible UI component primitives in React, serving as the foundation of shadcn/ui.

## 1. Core Primitives & Packages

| Primitive | Package | Key Capabilities |
| :--- | :--- | :--- |
| **Dialog / Modal** | `@radix-ui/react-dialog` | Focus trapping, screen reader announcement, backdrop click, Escape key close. |
| **Dropdown Menu** | `@radix-ui/react-dropdown-menu` | Nested submenus, radio/checkbox items, full keyboard arrow navigation. |
| **Popover** | `@radix-ui/react-popover` | Anchored floating panels with collision detection and smart placement. |
| **Tooltip** | `@radix-ui/react-tooltip` | Hover/focus delayed micro-tips with configurable skip-delay. |
| **Select** | `@radix-ui/react-select` | Custom accessible select matching native select behavior, type-ahead search. |
| **Tabs** | `@radix-ui/react-tabs` | Accessible tabbed views with automatic/manual keyboard activation. |
| **Accordion** | `@radix-ui/react-accordion` | Single or multi-expand collapsible sections with smooth height transitions. |
| **Slider** | `@radix-ui/react-slider` | Single or range sliders with keyboard step navigation. |
| **Scroll Area** | `@radix-ui/react-scroll-area` | Cross-browser custom scrollbars with native scrolling performance. |

---

## 2. Installation

Install primitives individually or with shadcn/ui:
```bash
# Direct install:
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover

# Or with shadcn (installs Radix underneath):
npx shadcn@latest add dialog dropdown-menu popover tooltip select tabs
```

---

## 3. Strict Alabaster Porcelain Styling Guidelines

All Radix primitives MUST be styled with the project's visual invariants:
* **Border Radius**: Strictly **`rounded-[6px]`** (`6px`). Never use `rounded-xl` or `rounded-2xl`.
* **Surface**: `#FFFFFF` card background, `#F7F8FA` page canvas.
* **Borders & Shadows**:
  ```tsx
  className="bg-white rounded-[6px] border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)]"
  ```
* **Typography & Ink**: `Plus Jakarta Sans` for labels, primary text `#0F172A`, muted `#64748B`.
* **Prohibitions**: ❌ No glassmorphism (`backdrop-blur`), ❌ No gradients, ❌ No nested cards.

---

## 4. Production Recipe: Accessible Dialog in Alabaster Porcelain

```tsx
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function PorcelainDialog({ trigger, title, description, children }: {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#0F172A]/30 backdrop-fade-in z-50 transition-opacity" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[6px] border border-[#E2E8F0] shadow-[0_10px_25px_-5px_rgba(15,23,42,0.1),0_8px_10px_-6px_rgba(15,23,42,0.05)] p-6 z-50 focus:outline-none">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <Dialog.Title className="text-base font-bold text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Close" className="text-[#64748B] hover:text-[#0F172A] p-1 rounded-[6px] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>
          {description && (
            <Dialog.Description className="text-xs text-[#64748B] mt-2">
              {description}
            </Dialog.Description>
          )}
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```
