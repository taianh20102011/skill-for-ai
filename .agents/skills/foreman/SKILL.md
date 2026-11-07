---
name: foreman
description: Terminal-first AI agent supervisor, security guardian, and software factory orchestrator based on tuzlu07x/foreman, thruwire/foreman, and mylukin/agent-foreman. Use when orchestrating multiple coding agents (Claude Code, Cursor, OpenCode, Codex), intercepting and vetting sensitive tool calls (rm -rf, git push -f, secrets exposure), managing agent departments, enforcing single-feature-at-a-time acceptance criteria, or supervising worker agents without hijacking their tool loops.
---

# Foreman (Agent Supervisor, Security Guardian & Factory Orchestrator)

Foreman acts as an authoritative supervisory and mediation layer for AI coding agents. It prevents rogue commands, prompt injection, and half-built features while coordinating autonomous agent teams.

## 1. Core Operating Modes

| Mode | Target Framework | Purpose |
| :--- | :--- | :--- |
| **Terminal Security Guardian** | `tuzlu07x/foreman` | Sits between terminal/MCP agents and the OS; scores risk and intercepts destructive actions. |
| **Factory Supervisor Loop** | `thruwire/foreman` | Runs concurrently alongside worker agents to evaluate acceptance criteria, test evidence, and PR readiness. |
| **Feature Slicing Harness** | `mylukin/agent-foreman`| Enforces single-feature focus, prevents runaway scope, and manages atomic hand-offs. |

---

## 2. Key Architecture Directives

### A. Terminal Guardian & Risk Interception
* **Command Sandboxing**: Intercepts shell commands (`rm`, `drop database`, `curl ... | bash`, hardcoded tokens).
* **Risk Scoring**:
  * `LOW` (read-only, tests, status) $\rightarrow$ Auto-approve.
  * `MEDIUM` (file writes, installs, git commit) $\rightarrow$ Monitored execution.
  * `CRITICAL` (network exfiltration, credential access, destructive writes) $\rightarrow$ Require human approval in terminal.

### B. Agent Factory Supervision (Concurrent Loop)
Foreman does not micro-manage every prompt token. Instead, it monitors worker output:
1. **Goal Verification**: Did the worker satisfy the explicit DoD (Definition of Done)?
2. **Terminal Evidence**: Require actual terminal execution output (passing tests, lint clean) before sign-off.
3. **No Halting Drift**: If a worker loops 3+ times without progress, Foreman revokes the tool token and triggers a fallback strategy.

---

## 3. Foreman CLI & Integration Recipes

```bash
# Start Foreman terminal mediator
npx @foreman/cli watch --safe-mode

# Supervise agent run with strict acceptance criteria
foreman exec "Build 2FA verification screen" --require-test --max-turns 15

# Audit agent tool permission ledger
foreman audit --recent
```

### Python / Node Worker Supervision Loop Pattern:
```typescript
export async function superviseWorker(task: string, workerFn: () => Promise<void>) {
  console.log(`[FOREMAN] Registering task: "${task}"`);
  const startTime = Date.now();
  
  try {
    await workerFn();
    // Validate output evidence
    const passed = await verifyTestProof();
    if (!passed) throw new Error("Worker completed without valid test proof.");
    console.log(`[FOREMAN] Task approved in ${(Date.now() - startTime) / 1000}s`);
  } catch (error) {
    console.error(`[FOREMAN] Intercepted failure: ${error.message}. Triggering systematic rollback.`);
    throw error;
  }
}
```
