---
name: autonomous-execution-loop
description: Orchestrates autonomous coding loops, compiler execution, auto stack trace diagnostics, security audits, and memory persistence.
---

# Autonomous Execution & Self-Correction Loop Skill

This skill governs the execution of autonomous coding agents through continuous terminal loops, error correction, static security analysis, and memory caching.

## 1. The Anti-Slop Execution Loop
```
[1. User Input]
       │
       ▼
[2. Query Memory Layer (Mem0 / AGENTS.md)]
       │
       ▼
[3. Deep Reasoning Agent (Thinking Model)]
       │
       ▼
[4. Coder Agent (Cline / Aider)]
       │
       ▼
[5. Auto-Build & Test (Terminal Loop)]
  ├── [Failed] ──► Parse stack trace ──► Feed back to Coder Agent
  └── [Success]
       │
       ▼
[6. Security Audit (Cloudflare Audit + Semgrep + OSV-Scanner)]
  ├── [Warnings] ──► Patch vulnerability
  └── [Passed]
       │
       ▼
[7. Git Commit & Store Knowledge in Memory]
```

## 2. Terminal Loop Commands
- **Frontend**: `pnpm run build` or `npm run type-check`
- **Minecraft/Java**: `./gradlew build`
- **Rust/Tauri**: `cargo check` and `cargo test`
- **Security Audit**: `semgrep scan --config auto` and `osv-scanner .`
