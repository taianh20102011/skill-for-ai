---
name: hindsight
description: Continuous learning and long-term memory system for AI agents based on vectorize-io/hindsight. Uses the Retain, Recall, Reflect loop and native MCP server to help agents learn from past outcomes, refine strategies, remember user preferences, and avoid repeating previous mistakes across sessions without context bloat.
---

# Hindsight (Continuous Learning & Long-Term Agent Memory)

Hindsight (`vectorize-io/hindsight`) gives AI agents an evolving mental model. Rather than dumping raw chat transcripts into a vector database, Hindsight extracts facts, tracks outcomes, synthesizes patterns, and updates beliefs across sessions.

## 1. The Core Loop: Retain $\rightarrow$ Recall $\rightarrow$ Reflect

1. **Retain**: At the end of a session or task milestone, extract key outcomes, failed experiments, and architectural decisions.
2. **Recall**: When presented with a new problem, query past experiences for related patterns and known pitfalls.
3. **Reflect**: Periodically consolidate episodic observations into durable rules and mental models.

---

## 2. Installation & Running the MCP Server

Install Hindsight via Python / Docker:
```bash
# In-process library
uv pip install hindsight-all

# Or run via Docker Compose with Postgres/pgvector backend
docker run -d -p 8000:8000 ghcr.io/vectorize-io/hindsight:latest
```

### Configure MCP Server in `.mcp.json`:
```json
{
  "mcpServers": {
    "hindsight": {
      "command": "uvx",
      "args": ["hindsight-mcp"],
      "env": {
        "HINDSIGHT_API_URL": "http://localhost:8000"
      }
    }
  }
}
```

---

## 3. Agent Usage Example

```typescript
// Retain durable fact after fixing a stubborn bug
await hindsight.retain({
  category: "architecture",
  summary: "Vite Tailwind 4 requires @tailwindcss/vite plugin without postcss config",
  outcome: "Fixed CSS compilation error by removing legacy postcss.config.js",
  tags: ["vite", "tailwind4", "css"]
});

// Recall relevant learnings before starting feature
const memories = await hindsight.recall({
  query: "How to configure Tailwind with Vite 8?",
  limit: 3
});
```
