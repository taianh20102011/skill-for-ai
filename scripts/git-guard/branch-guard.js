#!/usr/bin/env node

/**
 * Smart Branch Guard
 * Protects critical production branches (main, master, prod) from direct, accidental commits or pushes.
 * Enforces feature-branch workflows.
 * Usage: node branch-guard.js [--commit | --push]
 */

const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

const PROTECTED_BRANCHES = [
  'main',
  'master',
  'production',
  'prod',
  'release'
];

function getCurrentBranch() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
    return branch;
  } catch {
    return 'unknown';
  }
}

function isProtectedBranch(branchName) {
  if (PROTECTED_BRANCHES.includes(branchName)) return true;
  if (branchName.startsWith('release/')) return true;
  return false;
}

function run() {
  const args = process.argv.slice(2);
  const action = args.includes('--push') ? 'push' : 'commit';
  const currentBranch = getCurrentBranch();

  // Allow bypass via environment variable
  if (process.env.GIT_GUARD_ALLOW_MAIN === '1' || process.env.ALLOW_DIRECT_COMMIT === 'true') {
    console.log(`${colors.yellow}⚠️ [Branch Guard] Phát hiện cờ bypass GIT_GUARD_ALLOW_MAIN=1. Cho phép thao tác trên '${currentBranch}'.${colors.reset}`);
    process.exit(0);
  }

  if (isProtectedBranch(currentBranch)) {
    console.log(`\n${colors.red}${colors.bright}========================================================================${colors.reset}`);
    console.log(`${colors.red}${colors.bright} 🛡️ [BRANCH GUARD BỊ CHẶN] CẤM THAO TÁC TRỰC TIẾP TRÊN NHÁNH '${currentBranch.toUpperCase()}'${colors.reset}`);
    console.log(`${colors.red}${colors.bright}========================================================================${colors.reset}\n`);

    console.log(`Bạn đang chuẩn bị thực hiện hành động ${colors.yellow}${action.toUpperCase()}${colors.reset} trực tiếp vào nhánh bảo vệ ${colors.red}'${currentBranch}'${colors.reset}.`);
    console.log(`Quy chuẩn kỹ sư yêu cầu làm việc trên nhánh tính năng và tạo Pull Request (PR) để kiểm toán bảo mật.\n`);

    console.log(`${colors.bright}Cách xử lý đúng chuẩn:${colors.reset}`);
    console.log(`  1. Tạo nhánh tính năng mới và chuyển sang nhánh đó:`);
    console.log(`     ${colors.cyan}git checkout -b feat/ten-tinh-nang-moi${colors.reset}`);
    console.log(`  2. Sau đó thực hiện lại lệnh commit / push.`);
    console.log(`  3. Nếu bắt buộc phải commit trực tiếp vào ${currentBranch} (Hotfix khẩn cấp), hãy chạy:`);
    console.log(`     ${colors.gray}GIT_GUARD_ALLOW_MAIN=1 git ${action}${colors.reset}\n`);

    process.exit(1);
  } else {
    console.log(`${colors.green}✔ [Branch Guard] Nhánh làm việc an toàn: '${currentBranch}'${colors.reset}`);
    process.exit(0);
  }
}

if (require.main === module) {
  run();
}

module.exports = { getCurrentBranch, isProtectedBranch, PROTECTED_BRANCHES };
