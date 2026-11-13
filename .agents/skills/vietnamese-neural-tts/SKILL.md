---
name: vietnamese-neural-tts
description: Vietnamese neural text-to-speech synthesis using VieNeu-TTS and ViFastTTS, phoneme alignment, audio chunking, and subtitle synchronization.
---

# Vietnamese Neural TTS (VieNeu-TTS & ViFastTTS)

This skill provides standards, Python client bindings, and automated pipelines for synthesizing highly natural, expressive Vietnamese voiceovers using **VieNeu-TTS** (deep neural model for regional accents) and **ViFastTTS** (ultra-low latency, streaming neural inference).

---

## 1. Model Profiles & Comparison

| Engine | Latency / RTF | Voice Quality & Accents | Best For |
| :--- | :--- | :--- | :--- |
| **VieNeu-TTS** | High Quality (RTF $\approx 0.3$) | Natural Vietnamese cadence, northern (*Bắc*), central (*Trung*), southern (*Nam*) voices, emotional tone control | Documentary voiceovers, educational courses, cinematic storytelling |
| **ViFastTTS** | Real-time Streaming (RTF $< 0.08$) | Clean, intelligible, optimized for low GPU/CPU footprints | Live agent conversations, automated short-form video pipelines, instant preview |

---

## 2. Text Preprocessing for Vietnamese Phonetics

Before sending raw Vietnamese text to neural models, perform text normalization:

```python
import re

def normalize_vietnamese_text(text: str) -> str:
    # 1. Expand numbers, percentages, and currencies
    text = re.sub(r'(\d+)%', r'\1 phần trăm', text)
    text = re.sub(r'\$(\d+)', r'\1 đô la', text)
    text = re.sub(r'(\d+)k\b', r'\1 nghìn', text)
    
    # 2. Normalize acronyms
    acronyms = {
        'AI': 'A I',
        'API': 'A P I',
        'TTS': 'T T S',
        'UI': 'U I',
        'UX': 'U X'
    }
    for k, v in acronyms.items():
        text = re.sub(rf'\b{k}\b', v, text)
        
    return text.strip()
```

---

## 3. Automated Synthesis Pipeline (Python)

```python
import os
import requests
import json

class VietnameseTTSClient:
    def __init__(self, api_url: str = "http://localhost:8000", engine: str = "vieneu"):
        self.api_url = api_url
        self.engine = engine

    def synthesize(self, text: str, voice: str = "hn_female_1", speed: float = 1.0, output_path: str = "output.mp3") -> str:
        normalized = normalize_vietnamese_text(text)
        payload = {
            "text": normalized,
            "voice": voice,
            "speed": speed,
            "engine": self.engine,
            "format": "mp3"
        }
        
        response = requests.post(f"{self.api_url}/v1/audio/speech", json=payload, stream=True)
        response.raise_for_status()

        with open(output_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
                
        return output_path
```

---

## 4. Subtitle SRT Generation with Word-Level Timestamps

When generating audio for Remotion or FFmpeg video generation, request word-level alignment to automatically output `.srt` subtitles:

```python
def generate_srt(timestamps: list, output_srt: str):
    with open(output_srt, "w", encoding="utf-8") as f:
        for idx, segment in enumerate(timestamps, 1):
            start = format_time(segment["start"])
            end = format_time(segment["end"])
            f.write(f"{idx}\n{start} --> {end}\n{segment['word']}\n\n")
```
