---
name: local-ai-engine
description: Run and orchestrate local AI models (Ollama, LM Studio, vLLM, DeepSeek R1, Qwen 2.5 Coder, Gemma 4, Llama 3) directly inside autonomous agent workflows with zero external API costs.
---

# 💻 Local AI Engine: Offline & Autonomous Agent Orchestration

## When to Use This Skill
- Running AI coding agents (Antigravity, Cursor, Claude Code, Aider, OpenCode) with **zero API cost**.
- Operating in air-gapped, offline, or private enterprise environments where code must never leave localhost.
- Connecting to local Ollama (`http://localhost:11434`) or LM Studio (`http://localhost:1234`).

## 1. Local AI Endpoints & Compatibility
Local engines expose OpenAI-compatible REST APIs:
- **Ollama**: `http://127.0.0.1:11434/v1`
  - Model tags: `GET /api/tags`
  - Chat completions: `POST /v1/chat/completions`
- **LM Studio**: `http://127.0.0.1:1234/v1`
  - Models: `GET /v1/models`

## 2. Recommended Coding Models (Local-First)
1. **`qwen2.5-coder:7b` / `14b` / `32b`**: Elite benchmark performance for software engineering, refactoring, and multi-file code editing.
2. **`deepseek-r1:7b` / `14b`**: Deep step-by-step reasoning and algorithmic verification.
3. **`gemma4:12b`**: Multimodal capabilities, long-context support, and balanced coding performance.
4. **`llama3.3:70b`** (or `llama3.1:8b`): General instruction following and structured JSON outputs.

## 3. 1-Click Environment Setup for Agents
To connect coding agents to your local Ollama:

```bash
# In your terminal or .env
export OPENAI_BASE_URL="http://localhost:11434/v1"
export OPENAI_API_KEY="ollama"
export OPENAI_MODEL_NAME="gemma4:12b"
```

For Windows PowerShell:
```powershell
$env:OPENAI_BASE_URL = "http://localhost:11434/v1"
$env:OPENAI_API_KEY = "ollama"
$env:OPENAI_MODEL_NAME = "gemma4:12b"
```

## 4. Local Execution Protocol (Zero-Slop Guidelines)
When delegating tasks to local models:
- **Temperature**: Keep `0.1` - `0.3` for deterministic, syntactically correct code generation.
- **Context Management**: Combine with the `headroom` skill to compress tool logs and avoid overflowing the local context window.
- **Self-Healing Loop**: Feed compiler errors directly back to the local model to iterate until `pnpm build` or `./gradlew build` exits with code 0.
