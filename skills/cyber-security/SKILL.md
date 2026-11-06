---
name: cyber-security
description: "PhD-Level Cybersecurity AI Knowledge Base & Security Operations (based on Vyber07/cyber-security). Use for penetration testing, red teaming, blue teaming/SOC, web API vulnerabilities, real-time CVE lookup, cloud/container security, and AI/LLM adversarial defense."
---

# 🛡️ Cybersecurity AI Knowledge Base (PhD-Level)
*Based on the comprehensive dataset `Vyber07/cyber-security` (Apache-2.0 License, 500+ security domains, 16+ GB corpus).*

This skill provides state-of-the-art offensive and defensive security expertise, threat modeling, vulnerability intelligence, and adversarial AI defense.

---

## 🎯 Core Domains & Capabilities

### 1. Offensive Security & Red Teaming (Bug Bounty & Pentesting)
- **Web & API Security**: In-depth analysis of OWASP Top 10 + API Top 10 (Broken Object Level Authorization / IDOR, SSRF, SQL Injection, NoSQLi, GraphQL injection, JWT vulnerabilities, Race Conditions).
- **Vulnerability Intelligence**: Real-time CVE analysis, OSS-Fuzz reproduction, zero-day mitigation patterns.
- **Exploitation & PoC Verification**: Safe local vulnerability validation without production disruption.

### 2. Defensive Security & Blue Teaming (SOC & Forensics)
- **Zero-Trust Hardening**: Least-privilege IAM, mTLS, strict RBAC, short-lived tokens, HMAC-SHA256 OTP verification.
- **Digital Forensics & Incident Response**: Log analysis, memory analysis, anomaly detection, IOC (Indicators of Compromise) extraction.
- **WAF & Rate Limiting**: Cloudflare edge rules, IP reputation scoring, Bot Fight mode, payload inspection.

### 3. AI & LLM Adversarial Security
- **Prompt Injection & Jailbreaks**: Direct/indirect prompt injection defense, system prompt leak prevention.
- **Agent Interception**: Tool call tampering, unauthorized command execution in bash/powershell, SSRF via agent fetch tools.
- **Adversarial ML**: Data poisoning, model inversion, embedding evasion attacks.

---

## 💻 Querying the Knowledge Base via Python / Hugging Face

To stream or query subsets from `Vyber07/cyber-security` without downloading the full 16GB+ corpus:

```python
from datasets import load_dataset

# Stream specific category (e.g. web security, cve, or ai security)
dataset = load_dataset(
    "Vyber07/cyber-security", 
    data_files="web-security/web-security-phd-level.json",
    split="train", 
    streaming=True
)

for entry in dataset.take(5):
    print(f"Domain: {entry.get('domain', 'N/A')}")
    print(f"Concept: {entry.get('title', 'N/A')}")
    print(f"Mitigation: {entry.get('mitigation', 'N/A')}\n")
```

---

## ⚡ Integration with Universal Swarm Pipeline

When triggered during an `!exec:` or `/swarm:` workflow:
1. **Threat Modeling**: Review application routes, API contracts, and database mutations against STRIDE.
2. **Static Code Review**: Scan for unescaped queries, weak crypto, plaintext secrets, and missing session revocations.
3. **Agent Sandbox Check**: Ensure subagent commands are bounded and cannot mutate external files.
