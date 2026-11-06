# CYBERSECURITY DEVELOPER ROADMAP & KNOWLEDGE BLUEPRINT

## 1. Foundation: Network & Systems Architecture
- **TCP/IP & OSI Model**: Packet structures, Handshakes, DNS, DHCP, ARP, Routing protocols.
- **Linux & OS Internals**: Process isolation, namespaces, cgroups, file permissions, memory management.
- **Tools**: Reference CLI mastery from `D:\SKILL_AI\06-security-audit-and-qa\pentesting-reference\the-book-of-secret-knowledge`.

## 2. Application Security (AppSec)
- **OWASP Top 10**: Injection (SQLi, Command), Broken Auth, Sensitive Data Exposure, XML External Entities (XXE), Broken Access Control, Security Misconfiguration, Cross-Site Scripting (XSS), Insecure Deserialization, Known Vulnerable Components, Insufficient Logging.
- **Testing & Payloads**: Reference patterns from `D:\SKILL_AI\06-security-audit-and-qa\pentesting-reference\PayloadsAllTheThings`.
- **Wordlists & Fuzzing**: Reference `D:\SKILL_AI\06-security-audit-and-qa\pentesting-reference\SecLists`.

## 3. Cryptography & Data Protection
- **Symmetric vs Asymmetric**: AES-GCM-256 vs RSA-4096 / Ed25519.
- **Key Derivation & Hashing**: Argon2id, bcrypt, PBKDF2, SHA-256/SHA-3.
- **TLS 1.3 & PKI**: Certificate authorities, mTLS, Perfect Forward Secrecy (PFS).

## 4. DevSecOps & Cloud Security
- **Static Application Security Testing (SAST)**: Semgrep, SonarQube, CodeQL.
- **Software Composition Analysis (SCA)**: Google OSV-Scanner, Dependabot, Snyk.
- **Dynamic Application Security Testing (DAST)**: OWASP ZAP, Burp Suite, Nuclei.
- **Container & Infrastructure as Code**: Trivy, Dockerfile linting, AWS/GCP IAM principle of least privilege.
