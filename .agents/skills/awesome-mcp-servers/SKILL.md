---
name: awesome-mcp-servers
description: Comprehensive curated registry and setup guide for Model Context Protocol (MCP) servers from punkpeye/awesome-mcp-servers. Use when configuring AI agents (Antigravity, Claude Code, Cursor, OpenCode) with external tool servers for databases (Postgres, SQLite, Supabase), browser automation (Playwright, Puppeteer), cloud/DevOps (Docker, Kubernetes, Cloudflare), developer tools (Git, GitHub), and web search (Brave, Tavily).
---

# Awesome MCP Servers (Curated Registry & Agent Hub)

Reference and configuration manual based on [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers).

## 1. Top Tier MCP Servers

| Domain | Server Name | Transport | Purpose |
| :--- | :--- | :--- | :--- |
| **Database** | `@modelcontextprotocol/server-postgres` | stdio / node | Query PostgreSQL schemas, inspect tables, run safe read queries. |
| **Database** | `@modelcontextprotocol/server-sqlite` | stdio / uvx | Zero-config local SQLite inspection and SQL mutations. |
| **Browser** | `@modelcontextprotocol/server-puppeteer` | stdio / npx | Headless browser execution, screenshotting, scraping, console logs. |
| **Browser** | `executeautomation/mcp-playwright` | stdio / npx | Multi-tab Playwright browser automation and E2E verification. |
| **Developer** | `@modelcontextprotocol/server-github` | stdio / npx | GitHub PR review, issues, branch commits, CI run status. |
| **Developer** | `@modelcontextprotocol/server-git` | stdio / uvx | Direct local git repository inspection, diffing, and log checking. |
| **Cloud/DevOps**| `mcp-server-docker` | stdio / uvx | Inspect running Docker containers, images, logs, compose status. |
| **Search** | `@modelcontextprotocol/server-brave-search` | stdio / npx | Real-time privacy-first web and news searching. |
| **Knowledge** | `@modelcontextprotocol/server-memory` | stdio / npx | Graph-based persistent memory entity tracking across sessions. |

---

## 2. Universal Agent Configuration (`.mcp.json`)

To enable MCP servers in this workspace for Claude, Antigravity, or Cursor:

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "./data/app.db"]
    },
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "."]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

---

## 3. Invocation Protocol

* Always prefer local file/database MCP tools before writing mock data.
* Use browser automation servers (Puppeteer/Playwright) to capture visual proof before marking frontend tickets complete.
