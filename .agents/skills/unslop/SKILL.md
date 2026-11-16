---
name: unslop
description: Audit and de-slop AI-generated interfaces. Refine generic AI UI (purple gradients, glowing borders, shouty copy) into intentional, human-crafted design using 9 ordered passes.
---

# Unslop: De-Slopping AI-Generated User Interfaces

This skill encodes the design review and de-slopping pipeline created by Damir Sokolovsky (`heydamir/unslop`) for AI coding agents (Claude Code, Google Antigravity, Cursor, Codex).

---

## 1. What is "AI Slop" in UI?

AI models have strong statistical tendencies to generate stereotypical UI patterns:
- ❌ **Purple / Violet / Cyan Glowing Gradients**: Used indiscriminately on buttons, backgrounds, and hero text.
- ❌ **Glassmorphism Overuse**: Transparent cards with blurry backdrops (`backdrop-blur-md`) stacked upon each other.
- ❌ **Random Emoji Labels**: Placed before every heading, button, and navigation link (`🚀 Launch`, `💡 Features`, `⚡ Fast`).
- ❌ **Shouty Marketing Clichés**: Headers like *"Supercharge Your Workflow"*, *"Unleash the Power of AI"*, *"Next-Gen 10x Platform"*.
- ❌ **Uneven Spacing & Padding**: Mismatched `gap`, inconsistent padding across sibling cards, and poor typographic hierarchy.

---

## 2. The 9 Ordered Review Passes

When invoked (via `/unslop` or during UI polish), execute these 9 sequential passes:

```
+---------------+     +---------------+     +---------------+
| 1. SPACING    | --> | 2. COLOR      | --> | 3. ICONS      |
+-------+-------+     +-------+-------+     +-------+-------+
        |                     |                     |
+-------v-------+     +-------v-------+     +-------v-------+
| 4. COPY       | --> | 5. TYPOGRAPHY | --> | 6. LAYOUT     |
+-------+-------+     +-------+-------+     +-------+-------+
        |                     |                     |
+-------v-------+     +-------v-------+     +-------v-------+
| 7. DETAILS    | --> | 8. VISUALS    | --> | 9. MOTION     |
+---------------+     +---------------+     +---------------+
```

### Pass 1: Spacing
- Enforce a strict 4px / 8px spatial grid.
- Ensure consistent padding within components (`p-4` or `p-6`) and uniform margins between sections (`my-12` or `my-16`).
- Eliminate arbitrary pixel margins (`mt-[17px]`).

### Pass 2: Color
- Replace generic neon purples with an intentional, restrained palette (e.g. Alabaster Porcelain canvas `#F7F8FA`, zinc ink `#0F172A`, focused sapphire `#2563EB`).
- Ensure all text passes WCAG AA contrast (minimum 4.5:1 for body, 3:1 for large text).
- Remove unmotivated gradient borders (`bg-gradient-to-r from-purple-500 to-pink-500`).

### Pass 3: Icons
- Strip out random emojis from UI labels.
- Standardize on a single icon library (e.g. Lucide Icons, Radix Icons, Heroicons).
- Ensure consistent stroke width (1.5px or 2px) and optical alignment.

### Pass 4: Copy
- Replace hollow AI buzzwords with clear, functional descriptions of what the product actually does.
- Eliminate shouty phrasing; use calm, confident, professional language.

### Pass 5: Typography
- Establish a clear type scale: Hero (36–48px), H1 (28–32px), H2 (20–24px), Body (14–16px), Caption (12px).
- Set appropriate tracking (`tracking-tight` for large headings, `tracking-normal` for body).
- Use high-quality typefaces: *Plus Jakarta Sans*, *Geist*, or *Inter* for UI; *JetBrains Mono* with `tabular-nums` for data.

### Pass 6: Layout
- Establish clear visual hierarchy: primary action must be immediately identifiable.
- Give content room to breathe; increase whitespace rather than filling every void with decorative shapes.

### Pass 7: Details
- Replace fuzzy drop shadows with CNC-milled 1px borders (`border border-[#E2E8F0]` or `border border-zinc-800`).
- Use consistent border radius across all cards and buttons (strictly `rounded-[6px]`).

### Pass 8: Visuals
- Replace generic AI-generated 3D blobs with sharp diagrams, clean product mockups, or functional typography.

### Pass 9: Motion
- Replace jarring or linear animations with physical spring physics (150–250ms duration, natural easing like `cubic-bezier(0.16, 1, 0.3, 1)` or GSAP `power2.out`).
