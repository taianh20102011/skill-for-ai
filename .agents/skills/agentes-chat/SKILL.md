---
name: agentes-chat
description: Deploy and configure Agentes Chat, an open-source self-hosted team collaboration hub where humans and multi-agent AI teams collaborate in shared channels with MCP tools.
---

# Agentes Chat: Multi-Agent Team Collaboration Hub

This skill governs the deployment, channel orchestration, Model Context Protocol (MCP) tool dispatching, and agent configuration for **Agentes Chat** (`agentes-chat/agentes-chat`).

---

## 1. System Architecture

```
+--------------------------------------------------------------+
|                        Agentes Chat                          |
|             (Self-Hosted Team Collaboration Hub)             |
+------------------------------+-------------------------------+
                               |
        +----------------------+----------------------+
        |                      |                      |
+-------v--------+     +-------v--------+     +-------v--------+
| Shared Channel |     | Direct Message |     |  MCP Tool Bus  |
| (Human + AI)   |     | (1-on-1 Agent) |     | (Browser/Bash) |
+-------+--------+     +-------+--------+     +-------+--------+
        |                      |                      |
+-------v----------------------v----------------------v--------+
|      Multi-Model Backend (Claude, GPT/Codex, Gemini, Grok)   |
+--------------------------------------------------------------+
```

---

## 2. Core Capabilities

- **Unified Multi-Agent Channels**: Bring specialized AI agents into specific topic channels (`#frontend`, `#security-audit`, `#game-dev`) to collaborate directly with human team members.
- **MCP Tool Interoperability**: Agents in chat can invoke native Model Context Protocol (MCP) servers (e.g. Chrome browser automation, Git repos, filesystem tools, database inspectors).
- **Self-Hosted Privacy**: Runs in your own Docker infrastructure or VPS; chat history and credentials never leak to third-party team chat providers.

---

## 3. Quick Deployment (Docker Compose)

```yaml
version: '3.8'

services:
  agentes-chat:
    image: agenteschat/agentes-chat:latest
    container_name: agentes-chat
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/agentes
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    container_name: agentes-db
    restart: unless-stopped
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=agentes
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 4. Configuring Agent Channels & Tool Dispatch

When orchestrating multi-agent discussions in Agentes Chat:
1. **Assign Clear Roles**: Every agent in a channel should have a scoped prompt persona (e.g. *Lead Code Reviewer*, *Penetration Tester*, *Design Critic*).
2. **Turn-Taking Protocol**: Avoid infinite agent loops by requiring explicit @mentions or designated turn handoffs between bots.
3. **Persist Artifacts**: Export significant code solutions or architectural decisions into permanent project documents (`AGENTS.md` / `XAYDUNG_SPEC.md`).
