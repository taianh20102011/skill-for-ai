---
name: open-jev
description: Fast System-1 semantic decision engine and calibrated probability router based on Zefan-Cai/Open-Jev, kyegomez/open-jev, and TypeSafe AI's Jev. Use when AI agents need sub-millisecond typed decisions, routing choices, security gate checks, or calibrated confidence probabilities instead of slow, expensive free-form text generation.
---

# OpenJev (Fast System-1 Semantic Decision Engine)

OpenJev implements high-speed, calibrated decision models. Rather than generating unpredictable text tokens, it outputs structured categorical distributions and typed boolean/enum decisions in single-digit milliseconds.

## 1. Why System-1 Decisions Matter for Agents

| Dimension | Standard LLM Text Gen | OpenJev System-1 |
| :--- | :--- | :--- |
| **Output Type** | Freeform string tokens (Markdown, JSON strings) | Strongly-typed enums / probability distribution |
| **Latency** | 500ms – 4000ms | 5ms – 25ms |
| **Determinism** | Susceptible to hallucination, formatting drift | Mathematically bounded probability thresholds |
| **Cost / Footprint** | High token usage & GPU memory | Lightweight embeddings & linear classifier heads |

---

## 2. Core Agent Use Cases

1. **Tool Router Gate**: Given a user query, instantly calculate probabilities over all 60+ skills to trigger the top-1 skill without calling a slow LLM.
2. **Security Risk Gate**: Classify bash/shell commands into `[SAFE, WARN, BLOCKED]` prior to terminal execution.
3. **Completion Verifier**: Rapidly check if test output satisfies acceptance criteria before marking tasks done.
4. **Agent Branching**: Fast if/else path selection in complex multi-agent DAGs.

---

## 3. Architecture & Code Pattern

```python
import torch
from dataclasses import dataclass

@dataclass
class Decision:
    action: str
    confidence: float
    is_safe: bool

class SystemOneDecisionEngine:
    def __init__(self, categories=["READ", "MUTATE", "CRITICAL_EXEC"]):
        self.categories = categories
        # Lightweight embedding + projection head
        
    def decide(self, prompt: str) -> Decision:
        # Returns calibrated probabilities without auto-regressive decoding
        probs = self._predict_probabilities(prompt)
        top_idx = torch.argmax(probs).item()
        confidence = probs[top_idx].item()
        
        return Decision(
            action=self.categories[top_idx],
            confidence=confidence,
            is_safe=confidence > 0.85 and self.categories[top_idx] != "CRITICAL_EXEC"
        )
```
