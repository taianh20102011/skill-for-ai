# AGENTS.md — Universal Agent Autonomous Directives

> **Governing Standards**: Antigravity, Claude Code, OpenAI Codex, Cursor, Gemini, Devin, OpenCode.
> This file is loaded automatically by coding agents. Adhere to these directives unconditionally.

---

## 🚀 Universal One-Liner Trigger: `!exec: <task>` or `/swarm: <task>`

Whenever a prompt starts with `!exec:` or `/swarm:`, IMMEDIATELY execute all 331 skills end-to-end:
1. **Spec & Architecture**: Autonomous decomposition, edge cases handled.
2. **Minimalist Code Discipline**: Ponytail YAGNI (-53% code) & Karpathy Guidelines (surgical changes, think before coding).
3. **Alabaster Porcelain + GSAP 25+**: 6px radius, CNC sub-pixel 1px border, Plus Jakarta Sans, hardware-accelerated 120fps motion.
4. **Bank-Grade Security**: 2FA Gmail OTP (HMAC-SHA256), session revocation, zero-trust RBAC.
5. **Terminal Proof & Continuity**: Verify tests, persist durable architectural facts in `.ai-memory/`.

---

## ⚡ 1. Primary Behavioral Directive: The 1% Rule (`using-superpowers`)

Before writing ANY code, generating files, or proposing architecture:
1. **Skill Discovery**: If there is even a 1% chance a skill applies, invoke it immediately.
2. **Priority Order**:
   - Process skills FIRST: `superpowers:brainstorming` (clarify spec in bite-sized chunks) or `superpowers:systematic-debugging` (root-cause isolation).
   - Domain execution skills NEXT: `modern-fullstack-gsap-security`, `frontend-design`, `game-development-godot`, `programmatic-video-remotion`, `math-animation-manim`, `cloudflare-security-audit`.
   - Quality gates LAST: `karpathy-guidelines`, `ponytail`, `verification-before-completion`.

---

## 💎 2. Visual & Frontend Invariants (Alabaster Porcelain + GSAP)

Every UI component built in this repository MUST strictly follow:
- **Theme**: Alabaster Porcelain canvas `#F7F8FA`, cards `#FFFFFF`, ink `#0F172A`, sapphire accent `#2563EB`.
- **Absolute Prohibitions**: ❌ No Gradients, ❌ No Glassmorphism, ❌ No Nested Cards, ❌ No Random Shadows.
- **Strict Border Radius**: Strictly **`rounded-[6px]`** (`6px`) on every component.
- **CNC-Milled Sub-pixel 1px Border**:
  - Light: `border border-[#E2E8F0] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)]`
- **Typography**: `Plus Jakarta Sans` for UI, `JetBrains Mono` with `tabular-nums` for code/numbers.
- **GSAP 25+ Engine**: Hardware-accelerated 120fps animations wrapped in `useGSAP` with auto-cleanup. Use `ScrollSmoother`, `ScrollTrigger`, `Flip`, `DrawSVG`, `CustomBounce`, and `CustomWiggle`.

---

## 🎮 3. Game Development Directives (Godot 4.3+ / Unity / Web Game)

Whenever working on Game Development tasks:
- **Godot 4.x Strict Syntax**: Use `CharacterBody2D/3D`, `await`, `instantiate()`, `@export`, `@onready`. NEVER use Godot 3 syntax (`yield`, `KinematicBody2D`, `instance()`, `export var`).
- **Static Typing**: Enforce explicit static typing on all GDScript variables and functions (`func take_damage(amount: int) -> void:`).
- **Architecture**: Enforce "Call Down, Signal Up" decoupling. Use an Autoload `EventBus` for cross-system events. Use custom `Resource` (`.tres`) for data models.
- **Game Feel ("Juice") Invariants**: Every combat/interaction MUST feature juice: hitstop micro-freeze (60ms), trauma-based camera shake, squash & stretch tweens, coyote time (120ms), and jump buffering (100ms).
- **Headless Verification Loop**: Run `godot --headless --quit` before claiming task completion to verify zero parse/syntax errors.

---

## 🎬 4. Programmatic Video & Motion Graphics Directives (Remotion / Manim / HyperFrames / TTS)

Whenever working on programmatic video, mathematical animations, or media processing:
- **Remotion Standards**: Use `useCurrentFrame()`, `useVideoConfig()`, `interpolate()` with clamping, and `spring()` for frame-accurate rendering. Embed 3D canvas via `@remotion/three` & Three.js.
- **Manim Standards**: Use Manim Community (`manim`). Implement LaTeX formula morphing via `TransformMatchingTex`. Animate graphs with `Axes.plot()` and `get_area()`.
- **Vietnamese Neural Voiceover**: Synthesize speech via `VieNeu-TTS` (natural regional cadence) or `ViFastTTS` (streaming inference). Normalize numbers, currency, and acronyms before synthesis.
- **FFmpeg Invariants**: Enforce `sidechaincompress` audio ducking to lower BGM automatically during voiceover. Render with visual lossless H.264 (CRF 18) or NVENC.

---

## 🛡️ 5. Bank-Grade Security Invariants

- **Mandatory 2FA**: Admin & sensitive actions require 6-digit numeric Gmail OTP verified via `HMAC-SHA256` (10-min expiration, max 5 attempts, IP-bound).
- **Session Revocation**: Password reset increments `sessionVersion`, immediately invalidating all active sessions.
- **Zero-Trust RBAC**: Server-side role checks on all mutations; never trust client-side claims.
- **Cookies**: `HttpOnly; Secure; SameSite=Strict; Path=/`.
- **ID Obfuscation**: Never expose autoincrement integer IDs. Use UUID v4 or Hashids.

---

## ☕ 6. Code Discipline: Karpathy & Ponytail

- **Think Before Coding**: Surface assumptions explicitly. Present tradeoffs.
- **Simplicity First & YAGNI**: The minimum code that solves the user's task. No speculative boilerplate.
- **Surgical Changes**: Touch only what you must. Match existing style. Never modify adjacent working code.
- **Goal-Driven Execution**: Define test criteria upfront. Never claim completion without terminal proof.

---

## 🧠 7. Cross-Agent Continuity (`ai-memory`)

- When handing off tasks across models or sessions, update or read `handoff.md` with:
  1. Goal & Target State
  2. Active Invariants
  3. Failed Approaches (prevents loops)
  4. Immediate Next Tasks
- All knowledge is persisted in `.ai-memory/` as plain markdown without external LLM token fees.
