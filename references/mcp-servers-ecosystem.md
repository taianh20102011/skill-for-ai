# Model Context Protocol (MCP) Ecosystem & Server Guide

> Based on [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) and [anthropics/skills](https://github.com/anthropics/skills) (`mcp-builder`)

The Model Context Protocol (MCP) allows AI agents to securely connect to external development tools, databases, filesystem contexts, and APIs via a standard JSON-RPC 2.0 protocol over stdio or SSE.

---

## 1. Official Core MCP Servers Overview

| Server | Command / Package | Primary Capabilities |
|---|---|---|
| **Filesystem** | `npx -y @modelcontextprotocol/server-filesystem <dir>` | Read, write, list files safely inside authorized directory sandboxes |
| **Fetch** | `uvx mcp-server-fetch` | Convert web pages into clean markdown for token-efficient agent ingestion |
| **Git** | `uvx mcp-server-git` | Read git history, branch status, commit diffs, and staged changes |
| **GitHub** | `npx -y @modelcontextprotocol/server-github` | Search repositories, manage issues, read PR diffs, and manage branches |
| **Memory** | `npx -y @modelcontextprotocol/server-memory` | Graph-based entity memory storage for facts and relations |
| **PostgreSQL** | `npx -y @modelcontextprotocol/server-postgres <db-uri>` | Inspect database schemas, run read-only queries with safety limits |
| **SQLite** | `uvx mcp-server-sqlite --db-path <path>` | Zero-configuration local database inspection and analysis |
| **Sequential Thinking** | `npx -y @modelcontextprotocol/server-sequential-thinking` | Structured chain-of-thought reflection and hypothesis revision |

---

## 2. Recommended Antigravity / Claude MCP Configuration

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "d:/skill"]
    },
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"]
    },
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "d:/skill"]
    },
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

## 3. Building Custom High-Performance MCP Servers (`mcp-builder`)

When creating a new custom MCP server (using TypeScript or Python):
1. **Define Schema with Zod**: Every tool must have an explicit input schema with typed descriptions.
2. **Handle Errors Gracefully**: Return `{ isError: true, content: [{ type: "text", text: "..." }] }` instead of crashing the stdio process.
3. **Stream Large Payloads**: For multi-megabyte payloads, paginate or truncate to keep agent context within bounds.
4. **Enforce Security Boundaries**: Never allow unvalidated shell execution or path traversal outside designated project roots.
