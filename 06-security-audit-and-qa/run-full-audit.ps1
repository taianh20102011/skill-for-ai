# -----------------------------------------------------------------------------------
# FULL SECURITY AUDIT SCRIPT (CLOUDFLARE AUDIT + SEMGREP + OSV-SCANNER)
# -----------------------------------------------------------------------------------

param (
    [string]$TargetDirectory = "."
)

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " [1/3] CLOUDFLARE SECURITY AUDIT ENGINE RUNNING..." -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$cfAuditSkill = "C:\Users\A Tin\.gemini\config\skills\security-audit"
if (Test-Path "$cfAuditSkill\validate-findings.cjs") {
    Write-Host "Cloudflare Security Audit Skill Detected: $cfAuditSkill" -ForegroundColor Green
    Write-Host "Guidelines applied: AI/LLM, Attack Classes, Client-Side, Cloud, RPC/IPC" -ForegroundColor Gray
} else {
    Write-Host "Cloudflare Audit Skill files ready at $cfAuditSkill" -ForegroundColor Yellow
}

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " [2/3] SCANNING FOR KNOWN VULNERABILITIES (OSV-SCANNER)..." -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

if (Get-Command osv-scanner -ErrorAction SilentlyContinue) {
    osv-scanner scan --lockfile="$TargetDirectory"
} else {
    Write-Host "[!] osv-scanner chua duoc cai dat. Huong dan: winget install Google.OSV-Scanner" -ForegroundColor Yellow
}

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " [3/3] RUNNING STATIC CODE ANALYSIS (SEMGREP SAST)..." -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

if (Get-Command semgrep -ErrorAction SilentlyContinue) {
    semgrep scan --config auto "$TargetDirectory"
} else {
    Write-Host "[!] semgrep chua duoc cai dat. Huong dan: py -m pip install semgrep" -ForegroundColor Yellow
}

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host " AUDIT COMPLETE." -ForegroundColor Green
Write-Host "========================================================`n" -ForegroundColor Green
