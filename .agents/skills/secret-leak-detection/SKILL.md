---
name: secret-leak-detection
description: Scan source code, commit history, and configuration files for exposed secrets, API keys, private tokens, and credentials.
---

# Secret Leak Detection & Prevention Skill

This skill enforces zero-tolerance credential leakage in codebases before commits or push operations.

## 1. High-Entropy Secret Patterns
- **OpenAI / Anthropic**: `sk-ant-[a-zA-Z0-9_-]{90,}`, `sk-[a-zA-Z0-9]{48}`
- **GitHub Tokens**: `ghp_[a-zA-Z0-9]{36}`, `github_pat_[a-zA-Z0-9_]{82}`
- **Google Cloud / Firebase**: `AIza[0-9A-Za-z\\-_]{35}`
- **AWS Access Keys**: `AKIA[0-9A-Z]{16}`
- **Private Keys**: `-----BEGIN (RSA|EC|DSA|OPENSSH) PRIVATE KEY-----`

## 2. Pre-Commit Enforcement Script
Audit before staging:
```powershell
# Quick regex scan for secrets in staged files
$patterns = @(
    "ghp_[a-zA-Z0-9]{36}",
    "AKIA[0-9A-Z]{16}",
    "AIza[0-9A-Za-z\-_]{35}",
    "-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----",
    "sk-[a-zA-Z0-9]{40,}"
)

foreach ($pattern in $patterns) {
    $matches = Get-ChildItem -Recurse -File -Exclude "*.git*", "node_modules", "dist", "*.log" | Select-String -Pattern $pattern
    if ($matches) {
        Write-Host "[DANGER] Secret detected matching $pattern!" -ForegroundColor Red
        $matches | ForEach-Object { Write-Host "$($_.Path):$($_.LineNumber)" -ForegroundColor Yellow }
        exit 1
    }
}
Write-Host "No secrets leaked in scan." -ForegroundColor Green
```
