# AI-Memory Guide: Cross-Agent Long-Term Memory

> Based on [akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory) and [aimemory.sh](https://aimemory.sh)

`ai-memory` provides persistent, cross-agent, git-backed long-term memory for coding agents. You can start a task in Antigravity or Claude Code, pause mid-task, switch to Codex, Cursor, or ChatGPT, and continue seamlessly without re-explaining the architecture, failed attempts, or open questions.

---

## 1. Core Architecture & Invariants

```
+-----------------------------------------------------------------------------------+
|                           AI Agent Swarm Ecosystem                                |
|  [Antigravity] <---> [Claude Code] <---> [Codex] <---> [Cursor] <---> [Gemini]   |
+------------------------------------------+----------------------------------------+
                                           |
                                  Lifecycle Hooks & CLI
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|                                 ai-memory Engine                                  |
|   - Zero-LLM default path (100% free, deterministic, no API keys required)        |
|   - Typed Handoff Protocol (handoff.md, claimed exactly once)                     |
|   - Durable Facts Extraction (file paths, error codes, architectural invariants)  |
|   - Access-Weighted Retention (frequently accessed notes decay slower)             |
|   - Privacy Boundary Sanitizer (strips tokens, secrets, credentials)              |
+------------------------------------------+----------------------------------------+
                                           |
                                           v
+-----------------------------------------------------------------------------------+
|                        Storage: Git-backed Markdown Wiki                          |
|   .ai-memory/                                                                     |
|     ├── handoff.md           <- Active typed task handoff                         |
|     ├── profile.md           <- User habits, package managers, conventions       |
|     └── pages/               <- Human-readable, grep-friendly markdown pages     |
+-----------------------------------------------------------------------------------+
```

---

## 2. Seven Specialized Memory Skills Installed

| Skill Name | Purpose |
|---|---|
| `ai-memory-handoff` | Create, validate, and claim typed session handoffs between agents |
| `ai-memory-durable-pages` | Read and write permanent architectural facts and project invariants |
| `ai-memory-retrieval` | Search project knowledge, past bug fixes, and architectural decisions |
| `ai-memory-learning-maintenance` | Manage memory decay, compact cold episodic notes, resolve contradictions |
| `ai-memory-messaging` | Broadcast and read asynchronous inter-agent messages and progress updates |
| `ai-memory-routing-install` | Configure workspace agent hooks, runtime routing, and CLI daemon |
| `status` | Query current memory health, pending handoffs, and active retention tiers |

---

## 3. The Typed Handoff Protocol

When transferring context between models or sessions:

1. **Format**: Every handoff is written to `handoff.md` with:
   - **Goal & Target State**: What we are trying to achieve.
   - **Current Progress & Invariants**: What is completed, what must not be broken.
   - **Failed Approaches**: What was tried and why it failed (prevents loop repetition).
   - **Immediate Next Steps**: The exact 1-3 tasks for the next agent.
   - **Claim Lock**: Single-consumer ownership to prevent double-execution.
2. **Zero-LLM Capture**:
   - Facts and file paths are indexed deterministically.
   - No external LLM token fees or rate limits.

---

## 4. Cross-Project Profiles

`profile.md` carries your coding habits across repositories:
- Preferred styling: Alabaster Porcelain (`#F7F8FA`), 6px radius, `Plus Jakarta Sans`.
- Preferred animation engine: GSAP with `useGSAP` cleanup.
- Preferred security posture: HMAC-SHA256 MFA, HttpOnly cookies, zero-trust RBAC.
- Preferred code style: Ponytail YAGNI (minimal code footprint, zero bloat).

---

## 5. Quick CLI Reference

```bash
# Check memory daemon status
ai-memory status

# Create a handoff for another agent
ai-memory handoff --to codex --note "Completed MFA backend, need OTP UI tests"

# Search memory for past decisions
ai-memory search "MFA HMAC session revocation"

# Inspect durable pages
ai-memory pages list
```
