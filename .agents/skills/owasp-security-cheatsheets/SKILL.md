---
name: owasp-security-cheatsheets
description: Access, query, and enforce defensive security architectures and remediation guidelines based on the official OWASP CheatSheet Series.
---

# OWASP Defensive Security & Hardening Knowledge Base Skill

This skill anchors all architectural security decisions, input sanitization rules, and vulnerability remediation strategies in the official **OWASP CheatSheet Series** stored locally at `D:\SKILL_AI\06-security-audit-and-qa\owasp-cheatsheet-series`.

## 1. Key Defensive Domains
- **Authentication & Sessions**:
  - Implement Argon2id or bcrypt (work factor >= 12) for credential hashing.
  - Enforce session cookie flags: `HttpOnly`, `Secure`, `SameSite=Strict`.
  - Invalidate session IDs upon privilege change and logouts.
- **Injection Defense**:
  - SQL: Exclusive use of parameterized prepared statements / ORMs with parameter binding.
  - Command: Avoid shell invocation (`sh -c`, `cmd.exe`); use array-passed arguments with explicit binary paths.
  - HTML/XSS: Context-aware output encoding (HTML body, attribute, JavaScript variable contexts).
- **REST & Microservices**:
  - Enforce CORS strict origin whitelisting (never `Access-Control-Allow-Origin: *` with credentials).
  - Use Security Headers: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`.
  - Rate limiting and payload size limits on incoming JSON/Multipart bodies.

## 2. Verification Protocol
Before approving pull requests or final code implementations, the agent references specific cheatsheet files in `D:\SKILL_AI\06-security-audit-and-qa\owasp-cheatsheet-series\cheatsheets\` to verify implementation compliance.
