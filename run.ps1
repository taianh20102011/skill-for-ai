<#
.SYNOPSIS
  Universal One-Liner Runner for Fullstack Swarm Skills.
.DESCRIPTION
  Executes an autonomous agent task using Ollama, OpenCode, or Antigravity with all 52 skills loaded.
.EXAMPLE
  .\run.ps1 "Build modern authentication screen with 2FA Gmail OTP and GSAP"
  .\run.ps1 -Engine ollama -Model qwen2.5-coder:latest "Create interactive Bento Grid"
#>

param (
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Task,

    [Parameter(Position = 1)]
    [ValidateSet("auto", "ollama", "opencode")]
    [string]$Engine = "auto",

    [Parameter(Position = 2)]
    [string]$Model = "qwen2.5-coder:latest"
)

$ErrorActionPreference = "Stop"
$WorkspaceRoot = $PSScriptRoot
$Prompt = "!exec: $Task"

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "🚀 FULLSTACK SWARM UNIVERSAL ONE-LINER RUNNER" -ForegroundColor Green
Write-Host "Task: $Task" -ForegroundColor Yellow
Write-Host "Engine: $Engine | Model: $Model" -ForegroundColor DarkGray
Write-Host "=================================================================" -ForegroundColor Cyan

# Detection logic
if ($Engine -eq "auto") {
    if (Get-Command "opencode" -ErrorAction SilentlyContinue) {
        $Engine = "opencode"
    } elseif (Get-Command "ollama" -ErrorAction SilentlyContinue) {
        $Engine = "ollama"
    } else {
        Write-Host "ℹ️ Neither 'opencode' nor 'ollama' detected in PATH. Defaulting to Modelfile prompt mode." -ForegroundColor Yellow
        $Engine = "ollama"
    }
}

if ($Engine -eq "opencode") {
    Write-Host "👉 Running via OpenCode..." -ForegroundColor Green
    & opencode run "$Prompt"
} elseif ($Engine -eq "ollama") {
    # Check if elite-agent model exists, if not build it
    $existing = & ollama list 2>&1 | Select-String "elite-agent"
    if (-not $existing) {
        Write-Host "⚙️ Creating custom Ollama model 'elite-agent' from Modelfile..." -ForegroundColor Cyan
        & ollama create elite-agent -f "$WorkspaceRoot\Modelfile"
    }
    Write-Host "👉 Running via Ollama (elite-agent)..." -ForegroundColor Green
    & ollama run elite-agent "$Prompt"
}
