#!/usr/bin/env bash
# Universal One-Liner Runner for Fullstack Swarm Skills
# Usage: ./run.sh "Build modern authentication screen with 2FA Gmail OTP and GSAP"

set -e

TASK="$1"
ENGINE="${2:-auto}"
MODEL="${3:-qwen2.5-coder:latest}"

if [ -z "$TASK" ]; then
  echo "Usage: ./run.sh \"<your task>\" [engine: auto|opencode|ollama] [model]"
  exit 1
fi

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPT="!exec: $TASK"

echo "================================================================="
echo "🚀 FULLSTACK SWARM UNIVERSAL ONE-LINER RUNNER"
echo "Task: $TASK"
echo "Engine: $ENGINE"
echo "================================================================="

if [ "$ENGINE" = "auto" ]; then
  if command -v opencode >/dev/null 2>&1; then
    ENGINE="opencode"
  elif command -v ollama >/dev/null 2>&1; then
    ENGINE="ollama"
  else
    ENGINE="ollama"
  fi
fi

if [ "$ENGINE" = "opencode" ]; then
  echo "👉 Executing via OpenCode..."
  opencode run "$PROMPT"
elif [ "$ENGINE" = "ollama" ]; then
  if ! ollama list 2>&1 | grep -q "elite-agent"; then
    echo "⚙️ Creating Ollama model 'elite-agent' from Modelfile..."
    ollama create elite-agent -f "$DIR/Modelfile"
  fi
  echo "👉 Executing via Ollama (elite-agent)..."
  ollama run elite-agent "$PROMPT"
fi
