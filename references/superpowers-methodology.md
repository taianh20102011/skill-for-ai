# Superpowers: Systematic Software Engineering Methodology for Coding Agents

> Based on [obra/superpowers](https://github.com/obra/superpowers) by Jesse Vincent

Superpowers is a complete software engineering discipline for AI coding agents across Claude Code, Antigravity, OpenAI Codex, Cursor, Gemini, and Devin. Instead of rushing to write untested code or jumping to conclusions, the agent operates with rigorous senior engineering practices.

---

## 1. The Core Lifecycle

```
[Idea / Request]
       │
       ▼
1. 💡 Brainstorming (`brainstorming`)
   - Teases out real user goals & edge cases
   - Displays spec in digestible, bite-sized chunks
   - Solicits user approval before a single line of code
       │
       ▼
2. 📝 Writing Plans (`writing-plans`)
   - Detailed task-by-task execution roadmap
   - Clear enough for a junior dev with no project context
   - Enforces true red/green TDD and Ponytail YAGNI
       │
       ▼
3. 🤖 Subagent-Driven Development (`subagent-driven-development` / `dispatching-parallel-agents`)
   - Breaks work into isolated task units
   - Dispatches subagents (parallel or sequential)
   - Performs automated peer review after every task
       │
       ▼
4. 🧪 Test-Driven Development (`test-driven-development`)
   - Write failing test first (RED)
   - Verify failure mode
   - Write the smallest possible code to pass (GREEN)
   - Refactor with tests protecting invariants
       │
       ▼
5. 🔍 Systematic Debugging (`systematic-debugging`)
   - No guessing or random trial-and-error
   - Hypothesize, isolate root cause, verify with telemetry
       │
       ▼
6. ✅ Verification Before Completion (`verification-before-completion`)
   - Never declare "done" without concrete terminal evidence
   - Run linter, test suite, and edge case validations
       │
       ▼
7. 🚀 Branch Finishing & Code Review (`finishing-a-development-branch`, `requesting-code-review`)
   - Clean git commits, worktree cleanup, pull request readiness
```

---

## 2. All 15 Superpowers Skills Installed

| Skill Name | Purpose |
|---|---|
| `using-superpowers` | Primary routing skill: ensures the agent checks for and invokes relevant skills before any response or action |
| `brainstorming` | Interactive spec extraction, architectural alternatives, chunked user validation |
| `writing-plans` | Converts specs into structured, testable, phased implementation blueprints |
| `executing-plans` | Executes written plans step-by-step with continuous progress checks |
| `subagent-driven-development` | Orchestrates specialized subagents for task execution and verification |
| `dispatching-parallel-agents` | Spawns multiple subagents in parallel for independent components |
| `test-driven-development` | Enforces strict Red-Green-Refactor discipline |
| `systematic-debugging` | 4-phase root-cause diagnosis without flailing or random changes |
| `verification-before-completion` | Hard evidence verification gate before presenting results to user |
| `requesting-code-review` | Formal self-audit and subagent review of newly written code |
| `receiving-code-review` | Systematic triage and resolution of review comments |
| `using-git-worktrees` | Safe, isolated workspace branches without polluting main working tree |
| `finishing-a-development-branch` | Clean commits, merge conflict checks, and PR preparation |
| `writing-skills` | Meta-skill to author and structure new reusable skills |
| `diagnosing-superpowers` | Self-test and troubleshoot skill discovery and invocation |

---

## 3. The 1% Rule (`using-superpowers`)

> **"If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill."**

- **Process skills come first**: `brainstorming` and `systematic-debugging` establish the strategy; domain skills (`frontend-design`, `gsap-engine`, `auth-mfa-service`) execute the implementation.
- **Red Flags to eliminate**:
  - *"This is just a simple question"* ➡️ Questions are tasks. Check skills.
  - *"Let me explore the codebase first"* ➡️ Skills tell you HOW to explore.
  - *"The skill is overkill"* ➡️ Simple things become complex.
  - *"I'll just do this one thing first"* ➡️ Check BEFORE doing anything.
