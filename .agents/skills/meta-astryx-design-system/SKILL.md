---
name: meta-astryx-design-system
description: Design and build modern web applications using Meta's Astryx design system (@astryxdesign/core), CLI (@astryxdesign/cli), StyleX, and MCP server.
---

# Meta Astryx Design System (`meta/astryx`)

This skill governs the standards, component architecture, styling conventions, and AI MCP integration for **Astryx**, Meta's open-source design system powering thousands of internal applications over 8+ years.

---

## 1. Overview & Core Philosophy

- **Repository**: [github.com/meta/astryx](https://github.com/meta/astryx)
- **Built for Humans & AI Agents**: Both developers and AI coding assistants (Google Antigravity, Claude Code, Cursor) share the exact same component schemas, token definitions, and CLI tooling.
- **Engine**: React 19+ powered by Meta's compile-time CSS engine (**StyleX**), with pre-compiled CSS custom properties so consumers do not need complex build plugins.
- **150+ Accessible Primitives**: High-performance, zero-slop accessible components.
- **Cascade-Based Theming**: Multiple built-in themes (*neutral*, *matcha*, *gothic*, *y2k*, dark/light) implemented via CSS custom property overrides in the cascade—zero React tree re-renders when switching modes.
- **Open Internals (Swizzling)**: Any component can be ejected/swizzled directly into your codebase via `npx astryx swizzle <Component>`.

---

## 2. Installation & Quick Start

```bash
# Install core package (React 19+)
npm install @astryxdesign/core react@^19 react-dom@^19

# Initialize Astryx context in your project
npx @astryxdesign/cli init
```

### Import Styles in Root (`main.tsx` or `layout.tsx`)
```tsx
import '@astryxdesign/core/styles.css';
import '@astryxdesign/core/themes/neutral.css';
```

---

## 3. Component Architecture & Patterns

```tsx
import React, { useState } from 'react';
import { Button, Card, Dialog, Input, Stack, Text, Badge } from '@astryxdesign/core';

export function UserProfileCard({ name, role }: { name: string; role: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Card variant="elevated" className="max-w-md p-6 rounded-[6px] border border-[var(--color-border)]">
      <Stack gap="md" align="start">
        <Stack direction="row" justify="between" className="w-full">
          <Text size="xl" weight="bold">{name}</Text>
          <Badge tone="accent">{role}</Badge>
        </Stack>

        <Text tone="muted" size="sm">
          Authenticated with Meta Astryx Design Tokens.
        </Text>

        <Button variant="primary" onClick={() => setOpen(true)}>
          Edit Settings
        </Button>
      </Stack>

      <Dialog open={open} onOpenChange={setOpen} title="Edit Profile">
        <Stack gap="md" className="py-4">
          <Input label="Display Name" defaultValue={name} />
          <Button variant="solid" onClick={() => setOpen(false)}>Save Changes</Button>
        </Stack>
      </Dialog>
    </Card>
  );
}
```

---

## 4. Theming & Dark Mode (Cascade Invariant)

Astryx switches themes instantly at the CSS cascade level:

```html
<!-- Light Mode -->
<html data-theme="neutral" data-mode="light">

<!-- Dark Mode (Instant switch without React re-render) -->
<html data-theme="neutral" data-mode="dark">

<!-- Specialty Theme -->
<html data-theme="matcha" data-mode="dark">
```

### Custom Design Tokens Override
```css
:root {
  --color-brand-primary: #2563eb;
  --radius-component: 6px;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## 5. Astryx CLI Commands (`@astryxdesign/cli`)

| Command | Purpose |
| :--- | :--- |
| `npx astryx init` | Bootstrap context files (`AGENTS.md`, design system rules) for AI agents |
| `npx astryx components list` | List all 150+ available components with props schema |
| `npx astryx swizzle <Component>` | Eject a component's source code directly into `src/components/` for full customization |
| `npx astryx templates list` | View ready-to-use page templates (Dashboard, Settings, Auth, Analytics) |
| `npx astryx mcp` | Launch the Astryx Model Context Protocol server for AI assistants |

---

## 6. MCP Server Integration (Zero-Hallucination Agent Coding)

Equip coding agents with the Astryx MCP server so they reference verified component props, tokens, and layouts without hallucinating:

### Add to MCP Configuration (`mcp_config.json` / `.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "astryx": {
      "command": "npx",
      "args": ["-y", "@astryxdesign/cli", "mcp"]
    }
  }
}
```

### Autonomous Agent Workflow:
1. When generating UI, query the Astryx MCP server for exact component API and tokens.
2. Compose interfaces using verified Astryx primitives.
3. Validate layout accessibility and cascade theme compatibility.
