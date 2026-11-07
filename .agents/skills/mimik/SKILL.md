---
name: mimik
description: Local-first browser workflow recording and automated step-by-step documentation generator from westpoint-io/mimik (Open-source alternative to Scribe, Tango, and Guidde). Use when creating user guides, standard operating procedures (SOPs), QA test reproduction steps, onboarding manuals, or visual documentation with annotated screenshots and automated PII redaction.
---

# Mimik (Automated Visual Workflow Documentation)

Based on [westpoint-io/mimik](https://github.com/westpoint-io/mimik).

## 1. What Mimik Does

* **100% Client-Side & Local-First**: Runs directly in the browser with zero backend telemetry or external storage.
* **Automated Action Capture**: Records user clicks, text input, navigation, and state changes automatically.
* **Smart Blur / PII Redaction**: Automatically blurs sensitive user information (emails, tokens, passwords, credit cards).
* **Annotated Screenshots**: Places high-contrast callout markers and bounding boxes on interacted DOM elements.
* **AI Description Generation**: Uses BYOK LLM (Claude, OpenAI, Gemini, DeepSeek) to write concise instruction copy for each step.
* **Multi-Format Export**: Exports to Markdown (`.md`), HTML, PDF, or video.

---

## 2. Standard SOP / User Guide Markdown Schema

When writing documentation inspired by Mimik:

```markdown
# [Task Title]: Step-by-Step Guide

## Prerequisites
- [URL or initial setup requirement]

---

### Step 1: [Action Description]
- **Target**: Click the [Element Name] button.
- **Visual Cue**: Highlighted in the top navigation bar.
- ![Step 1 Screenshot](docs/images/step-1.png)

### Step 2: [Action Description]
- **Target**: Enter the required verification details.
- **Note**: Ensure inputs conform to validation criteria.
- ![Step 2 Screenshot](docs/images/step-2.png)
```
