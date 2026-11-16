---
name: modern-web-guidance
description: Enforce Google Chrome's official modern web platform standards, browser compatibility, CSS container queries, anchor positioning, view transitions, and Core Web Vitals.
---

# Google Chrome: Modern Web Guidance

This skill encodes the standards, modern APIs, and quality criteria authored by the Google Chrome team (`GoogleChrome/modern-web-guidance`) to steer AI coding agents away from obsolete web patterns.

---

## 1. Modern Layout & CSS Capabilities

Stop using legacy layout workarounds (e.g. JavaScript window-resize listeners for component breakpoints or absolute positioning math). Use standard web platform features:

### 1.1 CSS Container Queries (`@container`)
Base layout decisions on the container width, not the global viewport:

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 480px) {
  .card-layout {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
  }
}
```

### 1.2 CSS Anchor Positioning (`anchor-name` & `position-anchor`)
Anchor popovers, tooltips, and floating menus directly to elements in pure CSS without Popper.js or Floating UI:

```css
.anchor-btn {
  anchor-name: --my-anchor;
}

.tooltip {
  position: absolute;
  position-anchor: --my-anchor;
  top: anchor(bottom);
  left: anchor(center);
  transform: translateX(-50%);
}
```

### 1.3 CSS `:has()` Selector
Eliminate JavaScript state toggles for parent styling based on child state:

```css
/* Style parent form card when any input inside is invalid */
.form-card:has(:invalid) {
  border-color: #ef4444;
}
```

---

## 2. Modern Native UI Primitives

### 2.1 Popover API (`popover`)
Use native browser popovers instead of custom portal overlays:

```html
<button popovertarget="menu">Open Menu</button>

<div id="menu" popover>
  <p>Light-dismiss, top-layer rendering, and Esc key support built in natively.</p>
</div>
```

### 2.2 Native Dialog Element (`<dialog>`)
Always use native `<dialog>` for modal interactions with `dialog.showModal()`, which automatically handles backdrop, focus trapping, and top-layer stacking.

---

## 3. Native Smooth Animations & Transitions

### 3.1 View Transitions API (`document.startViewTransition`)
Seamless DOM state transitions without heavy animation libraries:

```javascript
function updateDOM(newContent) {
  if (!document.startViewTransition) {
    applyContent(newContent);
    return;
  }
  document.startViewTransition(() => {
    applyContent(newContent);
  });
}
```

### 3.2 CSS Scroll-Driven Animations
Drive progress animations directly from scroll position off the main thread:

```css
@keyframes progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.progress-bar {
  animation: progress linear;
  animation-timeline: scroll();
  transform-origin: left;
}
```

---

## 4. Core Web Vitals Optimization Guidelines

| Metric | Target Threshold | Primary Antidotes |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | $\le 2.5\text{s}$ | Preload hero images (`<link rel="preload">`), use WebP/AVIF, set `fetchpriority="high"`, eliminate render-blocking CSS/JS. |
| **INP (Interaction to Next Paint)** | $\le 200\text{ms}$ | Yield to main thread via `scheduler.yield()` or `setTimeout(0)`, debounce inputs, avoid long tasks (>50ms). |
| **CLS (Cumulative Layout Shift)** | $\le 0.1$ | Always set explicit `width` and `height` (or `aspect-ratio`) on images/embeds, reserve layout space for dynamic ads/banners. |
