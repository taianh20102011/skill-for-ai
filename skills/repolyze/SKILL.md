---
name: repolyze
description: Git source code repository analyzer, health auditor, and codebase intelligence tool based on lirantal/repolyze and MxCorpIn/Repolyze. Use when auditing git repositories for maintainership, team bus factor, code ownership, commit patterns, contributor churn, or generating structured Markdown/JSON reports optimized for LLM consumption.
---

# Repolyze (Repository Health & Git Intelligence Analyzer)

Repolyze inspects a repository's git history, contributor dynamics, and file mutation frequencies to diagnose project vitals and detect maintenance risks.

## 1. Installation & CLI Usage

The `repolyze` binary is installed globally:
```bash
# Run quick health scan in current repository
repolyze

# Output LLM-optimized Markdown report (directly feedable into AI context)
repolyze --markdown

# Output structured JSON schema (for automated scripts and CI pipelines)
repolyze --json > .ai-memory/repo-vitals.json

# Scan a target directory
repolyze --markdown /path/to/project
```

---

## 2. Core Metrics & Signal Diagnostics

| Signal Category | What It Measures | Why It Matters for AI Agents |
| :--- | :--- | :--- |
| **Bus Factor & Ownership** | Concentration of commits per author across modules. | Identifies fragile modules where only one person knows the logic. |
| **Churn & Volatility** | Files rewritten frequently within short time windows. | Points directly to unstable components or buggy hot-spots. |
| **Commit Cadence** | Time delta between releases and commit recency. | Flags abandoned or stale dependencies. |
| **Code Age & Decay** | Files untouched for > 12 months with high incoming imports. | Stable foundations vs technical debt candidates. |

---

## 3. Integrating Repolyze into Swarm & Agent Workflows

Use Repolyze before proposing architectural refactors:
1. **Pre-Flight Inspection**: Run `repolyze --markdown` to identify who wrote the code and which files are actively churning.
2. **Safe Surgical Edits**: Avoid refactoring files with high contributor churn unless specifically requested.
3. **Persist Facts**: Store the repo vitals report into `.ai-memory/` for cross-agent continuity.
