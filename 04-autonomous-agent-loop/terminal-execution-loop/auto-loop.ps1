# -----------------------------------------------------------------------------------
# THE ANTI-SLOP AUTONOMOUS BUILD & SELF-CORRECTION LOOP
# -----------------------------------------------------------------------------------

param (
    [string]$ProjectType = "auto", # auto, web, java, rust
    [int]$MaxRetries = 3
)

Write-Host ">>> KHOI CHAY VONG LAP TU DONG (TERMINAL EXECUTION LOOP) <<<" -ForegroundColor Cyan

function Detect-ProjectType {
    if (Test-Path "package.json") { return "web" }
    if ((Test-Path "pom.xml") -or (Test-Path "build.gradle") -or (Test-Path "build.gradle.kts")) { return "java" }
    if (Test-Path "Cargo.toml") { return "rust" }
    return "unknown"
}

if ($ProjectType -eq "auto") {
    $ProjectType = Detect-ProjectType
}

Write-Host "Phat hien project type: $ProjectType" -ForegroundColor Yellow

$attempt = 1
$buildSuccess = $false

while ($attempt -le $MaxRetries -and -not $buildSuccess) {
    Write-Host "`n--- Lan thu $attempt / $MaxRetries ---" -ForegroundColor Cyan
    
    switch ($ProjectType) {
        "web" {
            pnpm run build
        }
        "java" {
            if (Test-Path "gradlew.bat") { .\gradlew.bat build } else { mvn clean package }
        }
        "rust" {
            cargo check
        }
        default {
            Write-Host "Chua ro loai du an. Chay kiem tra cu phap tong quat." -ForegroundColor Gray
            break
        }
    }

    if ($LASTEXITCODE -eq 0) {
        $buildSuccess = $true
        Write-Host "`n>>> BUILD THANH CONG! CHUYEN QUA BUOC SECURITY AUDIT..." -ForegroundColor Green
    } else {
        Write-Host "`n[!] BUILD THAT BAI (Exit Code: $LASTEXITCODE). NHAT STACK TRACE DE FIX..." -ForegroundColor Red
        $attempt++
        if ($attempt -le $MaxRetries) {
            Write-Host "Agent dang tu phan tich loi va tien hanh sua lai code..." -ForegroundColor Yellow
        }
    }
}

if ($buildSuccess) {
    Write-Host "`n>>> CHAY SECURITY AUDIT..." -ForegroundColor Cyan
    & "D:\SKILL_AI\06-security-audit-and-qa\run-full-audit.ps1"
} else {
    Write-Host "`n[X] DUNG VONG LAP: Khong the tu sua sau $MaxRetries lan thu." -ForegroundColor Red
}
