#!/usr/bin/env node

/**
 * Smart Git Hook Installer
 * Automatically installs pre-commit, commit-msg, and pre-push hooks into .git/hooks.
 * Cross-platform: Windows (cmd/bash), macOS, and Linux.
 * Zero external dependencies.
 */

const fs = require('fs');
const path = require('path');
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

function getGitRootDir() {
  try {
    const gitDir = execSync('git rev-parse --git-dir', { encoding: 'utf-8' }).trim();
    return path.resolve(process.cwd(), gitDir);
  } catch {
    console.error(`${colors.red}❌ Thư mục hiện tại không phải là một Git repository. Hãy chạy 'git init' trước.${colors.reset}`);
    process.exit(1);
  }
}

function install() {
  console.log(`\n${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
  console.log(`${colors.green}${colors.bright} 🛡️ CÀI ĐẶT SMART GIT HOOKS & BRANCH GUARD (ZERO-TRUST CODE QUALITY)${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}========================================================================${colors.reset}\n`);

  const gitDir = getGitRootDir();
  const hooksDir = path.join(gitDir, 'hooks');

  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
  }

  // 1. PRE-COMMIT HOOK: Secret Scan + File Size Check + Branch Guard
  const preCommitScript = `#!/usr/bin/env sh
# Smart Git Guard - Pre-Commit Hook
# 1. Branch Guard (prevent accidental commit to protected branches)
node "./scripts/git-guard/branch-guard.js" --commit || exit 1

# 2. Secret Scanner (prevent hardcoded credentials / tokens)
node "./scripts/git-guard/secret-scanner.js" || exit 1

# 3. File Size & Binary Guard (prevent large binaries)
node "./scripts/git-guard/file-size-guard.js" || exit 1
`;

  // 2. COMMIT-MSG HOOK: Conventional Commits
  const commitMsgScript = `#!/usr/bin/env sh
# Smart Git Guard - Commit-Msg Hook (Conventional Commits)
node "./scripts/git-guard/commit-msg-checker.js" "$1" || exit 1
`;

  // 3. PRE-PUSH HOOK: Branch Guard (push check) + File Size Check
  const prePushScript = `#!/usr/bin/env sh
# Smart Git Guard - Pre-Push Hook
# 1. Branch Guard (prevent direct push to main/production)
node "./scripts/git-guard/branch-guard.js" --push || exit 1

# 2. Final Binary / File Size Check
node "./scripts/git-guard/file-size-guard.js" || exit 1
`;

  const hooks = [
    { name: 'pre-commit', content: preCommitScript },
    { name: 'commit-msg', content: commitMsgScript },
    { name: 'pre-push', content: prePushScript }
  ];

  for (const hook of hooks) {
    const hookPath = path.join(hooksDir, hook.name);
    // Write hook file using LF line endings for compatibility with git bash on Windows
    fs.writeFileSync(hookPath, hook.content.replace(/\r\n/g, '\n'), { mode: 0o755 });

    // On Unix-like systems, ensure executable permission
    if (process.platform !== 'win32') {
      try {
        fs.chmodSync(hookPath, 0o755);
      } catch (e) {
        // ignore
      }
    }
    console.log(`  ${colors.green}✔ Đã kích hoạt hook:${colors.reset} ${colors.cyan}.git/hooks/${hook.name}${colors.reset}`);
  }

  console.log(`\n${colors.bright}Bộ 3 lớp bảo vệ Git Guard đã sẵn sàng:${colors.reset}`);
  console.log(`  1. 📝 ${colors.bright}Conventional Commits${colors.reset} : Bắt buộc chuẩn feat/fix/docs... khi commit.`);
  console.log(`  2. 🔑 ${colors.bright}Secret & Token Scanner${colors.reset} : Tự động phát hiện API keys, private keys, passwords.`);
  console.log(`  3. 📦 ${colors.bright}Binary & Size Guard${colors.reset}    : Chặn commit file vượt ngưỡng (>5MB) và file nhị phân nặng.`);
  console.log(`  4. 🛡️ ${colors.bright}Branch Guard${colors.reset}           : Cấm commit/push trực tiếp vào main/master/production.\n`);
}

if (require.main === module) {
  install();
}

module.exports = { install };
