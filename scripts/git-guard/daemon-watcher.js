#!/usr/bin/env node

/**
 * Smart Git Guard Watcher & Daemon
 * Continuously monitors workspace or runs comprehensive health checks.
 * Usage: node daemon-watcher.js [--watch | --check]
 */

const fs = require('fs');
const path = require('path');
const { scanFile } = require('./secret-scanner');
const { checkFiles, formatBytes } = require('./file-size-guard');
const { validateCommitMessage } = require('./commit-msg-checker');
const { getCurrentBranch, isProtectedBranch } = require('./branch-guard');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function runComprehensiveAudit() {
  console.log(`\n${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
  console.log(`${colors.green}${colors.bright} 🛡️ SMART GIT GUARD: TOÀN DIỆN KIỂM TOÁN AN TOÀN NHÁNH & MÃ NGUỒN${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}========================================================================${colors.reset}\n`);

  // 1. Branch Check
  const branch = getCurrentBranch();
  const protectedB = isProtectedBranch(branch);
  console.log(`${colors.bright}1. Kiểm Tra Nhánh (Branch Guard):${colors.reset}`);
  if (protectedB) {
    console.log(`  ${colors.yellow}⚠️ CẢNH BÁO: Bạn đang ở trên nhánh được bảo vệ '${branch}'. Tránh commit trực tiếp!${colors.reset}`);
  } else {
    console.log(`  ${colors.green}✔ Nhánh hiện tại: '${branch}' (An toàn cho phát triển feature).${colors.reset}`);
  }

  // 2. Secret Scan
  console.log(`\n${colors.bright}2. Kiểm Tra Rò Rỉ Secret / Token (Secret Scanner):${colors.reset}`);
  const secretFindings = scanFile(process.cwd());
  if (secretFindings.length === 0) {
    console.log(`  ${colors.green}✔ Không phát hiện secret/token hardcode trong thư mục làm việc.${colors.reset}`);
  } else {
    console.log(`  ${colors.red}❌ Phát hiện ${secretFindings.length} điểm nghi vấn lộ token/secret! Hãy kiểm tra lại.${colors.reset}`);
  }

  // 3. Binary & File Size Guard
  console.log(`\n${colors.bright}3. Kiểm Tra Kích Thước Tệp (Binary Guard):${colors.reset}`);
  const sizeViolations = checkFiles([
    'index.html',
    'serve.js',
    'package.json',
    'Modelfile',
    'SKILL.md'
  ]);
  if (sizeViolations.length === 0) {
    console.log(`  ${colors.green}✔ Tất cả các tệp cốt lõi đều nhẹ, chuẩn YAGNI, không chứa binary nặng.${colors.reset}`);
  }

  console.log(`\n${colors.green}${colors.bright}✨ Kiểm toán hoàn tất! Toàn bộ Git Guard đang sẵn sàng bảo vệ commit.${colors.reset}\n`);
}

function startWatcher() {
  console.log(`${colors.cyan}👁️ [Git Guard Daemon] Đang theo dõi thay đổi trong thư mục làm việc... (Bấm Ctrl+C để dừng)${colors.reset}`);
  let debounceTimer = null;

  fs.watch(process.cwd(), { recursive: true }, (eventType, filename) => {
    if (!filename || filename.includes('.git') || filename.includes('node_modules')) return;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const fullPath = path.join(process.cwd(), filename);
      if (fs.existsSync(fullPath) && !fs.statSync(fullPath).isDirectory()) {
        const findings = scanFile(fullPath);
        if (findings.length > 0) {
          console.log(`\n${colors.red}🚨 [CẢNH BÁO THỜI GIAN THỰC] Vừa phát hiện secret tại ${filename}!${colors.reset}`);
        }
      }
    }, 500);
  });
}

const args = process.argv.slice(2);
if (args.includes('--watch')) {
  startWatcher();
} else {
  runComprehensiveAudit();
}
