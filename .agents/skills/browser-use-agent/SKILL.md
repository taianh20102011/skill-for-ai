---
name: browser-use-agent
description: Transform LLMs into autonomous web agents to navigate, click, fill forms, and extract structured data using browser-use and Playwright.
---

# Browser-Use Autonomous Web Agent Skill

This skill provides patterns and architecture to operate web automation agents using the `browser-use` framework and Playwright.

## 1. Core Architecture
- **DOM State Tree**: Parses accessibility trees and interactive elements with coordinate bounding boxes.
- **Action Primitives**: Click, scroll, input text, open tab, wait for network idle, capture screenshot.
- **Vision Integration**: Feeds full-page or viewport snapshots to vision-capable models (Gemini Flash/Pro, Claude 3.5 Sonnet) for visual verification.

## 2. Standard Code Pattern (Python)
```python
import asyncio
from browser_use import Agent
from langchain_google_genai import ChatGoogleGenerativeAI

async def run_web_agent(task_prompt: str):
    llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash")
    agent = Agent(
        task=task_prompt,
        llm=llm,
        use_vision=True
    )
    result = await agent.run()
    return result

if __name__ == "__main__":
    asyncio.run(run_web_agent("Search GitHub for trending AI agent skills and extract top 3 repo names"))
```

## 3. Best Practices
- Always enable headless mode in production; use headed mode only for interactive authentication sessions.
- Implement exponential backoff for rate-limited endpoints.
- Sanitize extracted data against malicious prompt injection embedded in webpage DOM text.
