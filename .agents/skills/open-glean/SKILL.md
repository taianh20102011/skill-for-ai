---
name: open-glean
description: Open-source enterprise knowledge workspace, code intelligence, and deep research search platform based on hydra-db/open-glean and facebookincubator/Glean. Use when searching cross-repository symbols, linking heterogeneous workspace documents (Notion, GitHub, local files, Slack), running multi-hop deep research queries, or indexing codebases for structural cross-references and symbol call hierarchies.
---

# Open Glean (Enterprise Knowledge Search & Deep Research Engine)

Open Glean (`hydra-db/open-glean` & `facebookincubator/Glean`) provides a unified search, deep research, and symbol intelligence platform for AI coding agents.

## 1. Core Operating Modes

| Mode | System Origin | Core Capability |
| :--- | :--- | :--- |
| **Enterprise Second Brain** | `hydra-db/open-glean` | Multi-source knowledge indexing (Notion, PDFs, GitHub, local docs) with Deep Research mode and inline citations. |
| **Code Fact & Cross-Reference**| `facebookincubator/Glean` | High-precision AST symbol indexing, call hierarchies, Angle query language, and cross-repo definition resolution. |

---

## 2. Capabilities for AI Agents

1. **Deep Research Agent Mode**: Decomposes complex inquiries into sub-questions, executes parallel searches, reconciles contradictory evidence, and generates referenced synthesis.
2. **Knowledge Graph Exploration**: Visualizes relationships between code modules, architectural decisions, and project specs.
3. **AST Symbol Resolution**: Fast lookup of where classes, types, and methods are defined, overridden, or invoked across monorepos.

---

## 3. Installation & Docker Deployment

```bash
# Clone and run Open Glean local workspace
git clone https://github.com/hydra-db/open-glean.git
cd open-glean
docker compose up -d

# Access local Web UI at http://localhost:3000
# API and MCP endpoints mounted at http://localhost:8080
```

### Direct Agent Querying via MCP / REST:
```bash
curl -X POST http://localhost:8080/v1/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Where is the 2FA HMAC verification logic defined?",
    "scope": "code",
    "deep_research": true
  }'
```
