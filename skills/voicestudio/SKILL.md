---
name: voicestudio
description: 100% local-first voice cloning, voice design, video dubbing, Whisper speech-to-text, and audiobook narration studio in 646 languages from debpalash/voicestudio (Open-source alternative to ElevenLabs). Use when needing local audio synthesis, custom voice generation, automated video localization, speech transcription, or connecting VoiceStudio's local REST API and MCP server to AI agents.
---

# VoiceStudio (Local AI Voice Cloning, Dubbing & Speech Studio)

Based on [debpalash/voicestudio](https://github.com/debpalash/voicestudio).

## 1. Capabilities Overview

* **Zero-Shot Voice Cloning**: Clone voices from 3–10 seconds of clean reference audio.
* **Voice Design**: Generate novel human voices using natural language prompts (tone, accent, speed, gender, emotion).
* **Video Dubbing & Translation**: Automatic vocal separation, translation, and lip-timed audio dubbing.
* **Whisper Dictation & STT**: Floating dictation widget for high-accuracy local speech-to-text.
* **Long-Form Audiobooks**: Multi-speaker project management and batch generation.
* **100% Local-First**: Hardware acceleration via NVIDIA CUDA, AMD ROCm, Apple Silicon Metal (MPS), or Vulkan GGUF. Zero cloud dependency.

---

## 2. API & MCP Integration

VoiceStudio exposes an OpenAI-compatible REST API at `http://localhost:3900`:

```bash
# Generate Speech:
curl http://localhost:3900/v1/audio/speech \
  -H "Content-Type: application/json" \
  -d '{"model":"tts-1","voice":"alloy","input":"Hello, this is VoiceStudio speaking locally.","response_format":"wav"}' \
  --output speech.wav

# Transcribe Audio (Whisper):
curl http://localhost:3900/v1/audio/transcriptions \
  -F file=@audio.wav \
  -F model=whisper-1
```

### MCP Endpoint
Mounts an MCP endpoint at `http://localhost:3900/mcp` for direct agent interaction.
