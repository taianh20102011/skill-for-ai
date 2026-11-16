---
name: codex-security
description: OpenAI Codex Security standards, repository vulnerability scanning, autonomous patch generation, secret leak prevention, and CI/CD security workflows.
---

# OpenAI Codex Security: Autonomous Repository Hardening

This skill establishes the security scanning, vulnerability investigation, and automated patch generation standards authored by OpenAI (`openai/codex-security`) for AI coding agents.

---

## 1. Security Architecture & Threat Vectors

The Codex Security model inspects code repositories across five attack surfaces:

1. **Injection Vulnerabilities**: SQL injection, Command injection (`child_process.exec`), Template injection (SSTI), and Cross-Site Scripting (XSS).
2. **Broken Authentication & Session Management**: Weak JWT signing, hardcoded salts, missing session revocation hooks.
3. **Insecure Dependencies (SCA)**: Outdated packages with known CVEs, malicious typosquats, prototype pollution.
4. **Hardcoded Secrets & API Keys**: Private keys, database credentials, third-party provider tokens.
5. **Server-Side Request Forgery (SSRF)**: Unsanitized URLs passed to `fetch()`, `axios`, or internal proxy endpoints.

---

## 2. Autonomous Remediation Workflow

When an issue is identified, the agent must follow a strict 4-step remediation loop:

```
+-------------------+      +-------------------+      +-------------------+      +-------------------+
| 1. Reproduce &   | ---> | 2. Surgical       | ---> | 3. Automated Test | ---> | 4. Security       |
| Isolate Failure   |      | Fix / Patch       |      | Verification      |      | Regression Gate   |
+-------------------+      +-------------------+      +-------------------+      +-------------------+
```

### Invariant: Minimal Blast Radius
Never rewrite surrounding, unrelated logic during security fixes. Address the root cause directly:

```typescript
// ❌ VULNERABLE: Direct string interpolation in SQL query
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ SECURE PATCH: Parameterized prepared statement
const query = 'SELECT * FROM users WHERE email = $1';
const result = await db.query(query, [email]);
```

---

## 3. Secret Leak Prevention Checklist

- Enforce `.env` isolation: Never commit environment files or API keys.
- Pre-commit scanning: Ensure hook checks for high-entropy strings, AWS tokens (`AKIA...`), and OpenAI/Anthropic keys (`sk-...`).
- Use runtime environment getters:
  ```typescript
  function getRequiredSecret(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`CRITICAL SECURITY FAILURE: Missing mandatory environment secret: ${key}`);
    }
    return value;
  }
  ```

---

## 4. Verification & Defense-in-Depth

Before claiming task completion on security-related tasks:
- Verify input sanitization and parameter binding.
- Enforce strict Content Security Policy (CSP) headers:
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';
  ```
- Run automated security tests (`npm audit`, `semgrep`, or project test runners).
