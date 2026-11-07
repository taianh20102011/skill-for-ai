# Top-Tier Free UI MCPs & Component Registries

This guide details the premier **100% free, open-source** Model Context Protocol (MCP) servers and component registries. These replace paid or closed services (like TypeUI) with battle-tested, high-craftsmanship libraries.

---

## 1. The Big Three Free UI MCP Servers

| MCP Server | Registry Scope | Best For | License |
| :--- | :--- | :--- | :--- |
| **`21st.dev` (Formerly Magic MCP)** | 12,000+ community components | High-end modern UI blocks, hero sections, interactive widgets | 100% Free / MIT |
| **`shadcn-mcp`** | Official shadcn/ui components, blocks & charts | Core UI building blocks, dashboard layouts, data tables, forms | 100% Free / MIT |
| **`@magicuidesign/mcp`** | Magic UI animated primitives | Kinetic micro-interactions, animated borders, text effects | 100% Free / MIT |

---

## 2. Installation & Configuration

### 2.1 Claude Code CLI
Run these commands in your terminal:
```bash
# 1. 21st.dev MCP (12,000+ Free Components)
claude mcp add 21st -- npx -y @21st-dev/mcp
# Or via HTTP remote endpoint:
claude mcp add --transport http 21st https://mcp.21st.dev/mcp

# 2. shadcn/ui MCP (Official Blocks, Forms, Charts)
claude mcp add shadcn -- npx -y shadcn-mcp
# Or remote endpoint:
claude mcp add --transport http shadcn https://mcp.shadcnspace.com/mcp

# 3. Magic UI MCP (Animated Components)
claude mcp add magicui -- npx -y @magicuidesign/mcp
```

### 2.2 Antigravity / Cursor / Windsurf Configuration (`mcp.json`)
Add this configuration to your workspace `mcp.json` or `~/.gemini/antigravity/mcp_config.json`:

```json
{
  "mcpServers": {
    "21st": {
      "command": "npx",
      "args": ["-y", "@21st-dev/mcp"]
    },
    "shadcn": {
      "command": "npx",
      "args": ["-y", "shadcn-mcp"]
    },
    "magicui": {
      "command": "npx",
      "args": ["-y", "@magicuidesign/mcp"]
    }
  }
}
```

---

## 3. How to Use with AI Assistants

Once installed, your AI assistant can directly query and pull production-ready UI code:

### 3.1 Fetching from 21st.dev
- *"Search 21st for a minimalist modern stats grid with clean 1px borders"*
- *"Pull the highest-rated pricing section from 21st.dev and adapt it to our 6px radius rule"*

### 3.2 Fetching from shadcn/ui
- *"Use shadcn MCP to add the data-table component with sorting and pagination"*
- *"Install the shadcn dashboard-01 block and remove any card-in-card nesting"*

### 3.3 Fetching from Magic UI
- *"Use Magic UI MCP to retrieve the number-ticker component with tabular-nums"*
- *"Add an animated beam component to illustrate secure data transfer"*

---

## 4. Curated 100% Free Open-Source UI Registries

When looking for ready-to-use free templates and blocks:

1. **[21st.dev](https://21st.dev)**: The largest open-source component registry for AI. Thousands of clean, high-craftsmanship blocks you can copy or inject via MCP.
2. **[ui.shadcn.com/blocks](https://ui.shadcn.com/blocks)**: Production-ready admin dashboards, authentication forms, metrics screens, and sidebars.
3. **[magicui.design](https://magicui.design)**: Free animated components built on Tailwind and Framer Motion / GSAP.
4. **[ui.aceternity.com](https://ui.aceternity.com)**: Premium open-source UI components with smooth interactive flair.
5. **[hyperui.dev](https://hyperui.dev)**: Free open-source Tailwind CSS components for eCommerce, admin, and marketing.

---

## 5. Adaptation Rule for Our Design System

Whenever you pull any template or block from 21st.dev, shadcn, or Magic UI, **strictly conform it to our visual rules**:
1. Change any `rounded-lg`, `rounded-xl`, `rounded-2xl` to **`rounded-[6px]`**.
2. Strip any gradients (`bg-gradient-to-r...`) and replace with solid surface tokens (`bg-white dark:bg-[#0B0F17]`).
3. Strip any `backdrop-blur` glassmorphism and replace with crisp 1px borders (`border border-slate-200 dark:border-slate-800`).
4. Lock all padding and margins to our 4–64px geometric scale.
5. Apply GSAP smooth easing and zero-trust backend authorization to all interactions.
