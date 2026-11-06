---
name: owasp-top-10-audit
description: Audit web applications, APIs, and microservices against the OWASP Top 10 vulnerabilities (Injection, Auth, SSRF, BOLA, Misconfigurations).
---

# OWASP Top 10 Web Application Security Audit Skill

This skill provides an automated audit protocol to detect, analyze, and remediate the most critical web application security risks.

## 1. The OWASP Top 10 Checklist
- **A01: Broken Access Control**: Verify RBAC/ABAC on all API endpoints. Ensure users cannot access or mutate resources belonging to other tenants/users (IDOR/BOLA).
- **A02: Cryptographic Failures**: Ensure passwords use Argon2id or bcrypt (cost factor >= 12). Ensure data in transit uses TLS 1.3. Prevent sensitive data leakage in logs.
- **A03: Injection**:
  - SQL: Use parameterized queries / ORM prepared statements exclusively. Never concatenate strings into raw SQL.
  - Command: Never pass unsanitized input to `child_process.exec` or `Runtime.getRuntime().exec()`.
  - XSS: Use modern React/Vue auto-escaping. Audit `dangerouslySetInnerHTML`.
- **A04: Insecure Design**: Ensure rate-limiting, CAPTCHA on brute-force sensitive forms, and defense-in-depth patterns.
- **A05: Security Misconfiguration**: Check for debug modes left enabled in production, default credentials, exposed `/metrics` or `/actuator` endpoints, and missing security headers (`CSP`, `HSTS`, `X-Frame-Options`).
- **A06: Vulnerable and Outdated Components**: Audit `package.json`, `pom.xml`, `Cargo.lock` against CVE databases via `osv-scanner`.
- **A07: Identification and Authentication Failures**: Enforce strong password policies, secure session cookies (`HttpOnly`, `Secure`, `SameSite=Strict`), and multi-factor authentication.
- **A08: Software and Data Integrity Failures**: Verify integrity hashes on CDNs (`integrity="sha384-..."`), sign CI/CD artifacts, protect against prototype pollution.
- **A09: Security Logging and Monitoring Failures**: Ensure audit trails exist for critical operations (login failures, privilege escalation, transaction mutations).
- **A10: Server-Side Request Forgery (SSRF)**: Validate and whitelist target URLs before fetching server-side. Disallow internal metadata IP access (`169.254.169.254`, `127.0.0.1`, `localhost`).
