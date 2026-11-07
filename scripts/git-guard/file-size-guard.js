#!/usr/bin/env node

/**
 * Smart File Size & Binary Guard
 * Checks staged files for excessive size and dangerous binary formats before commit/push.
 * Prevents bloating git history with large files.
 * Zero external dependencies.
 * Usage: node file-size-guard.js [--all | --staged | <file>]
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

// Configurable threshold: Default 5 MB
const DEFAULT_MAX_SIZE_MB = 5;
const MAX_BYTES = (parseFloat(process.env.GIT_GUARD_MAX_FILE_SIZE_MB) || DEFAULT_MAX_SIZE_MB) * 1024 * 1024;

// Dangerous / Heavy binary extensions that should usually be in .gitignore or Git LFS
const RESTRICTED_BINARY_EXTS = [
  // Executables & Libraries
  '.exe', '.dll', '.so', '.dylib', '.bin',
  // Compressed Archives
  '.zip', '.tar', '.gz', '.tgz', '.7z', '.rar', '.iso', '.dmg',
  // Video & Large Audio
  '.mp4', '.mov', '.avi', '.mkv', '.wav', '.flac',
  // Heavy AI Model Weights & Datasets
  '.ckpt', '.safetensors', '.pt', '.pth', '.bin', '.h5', '.onnx', '.parquet',
  // Database dumps
  '.sql.gz', '.dump', '.sqlite'
];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf-8' });
    return output.split('\n').map(f => f.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function checkFiles(fileList) {
  const violations = [];

  for (const relPath of fileList) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (!fs.existsSync(fullPath)) continue;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) continue;

    const ext = path.extname(relPath).toLowerCase();
    const size = stat.size;

    // Check size limit
    if (size > MAX_BYTES) {
      violations.push({
        file: relPath,
        size,
        reason: `Dung lượng vượt ngưỡng (${formatBytes(size)} > ${formatBytes(MAX_BYTES)})`,
        isError: true
      });
      continue;
    }

    // Check restricted binary extensions
    if (RESTRICTED_BINARY_EXTS.includes(ext)) {
      // If binary is over 500KB, treat as error, otherwise warning
      const isLargeBinary = size > 500 * 1024;
      violations.push({
        file: relPath,
        size,
        reason: `Định dạng file nhị phân ${ext} không nên commit trực tiếp vào git (${formatBytes(size)})`,
        isError: isLargeBinary
      });
    }
  }

  return violations;
}

function run() {
  const args = process.argv.slice(2);
  let filesToCheck = [];

  if (args.includes('--all')) {
    // Scan all git tracked files
    try {
      const output = execSync('git ls-files', { encoding: 'utf-8' });
      filesToCheck = output.split('\n').map(f => f.trim()).filter(Boolean);
    } catch {
      filesToCheck = [];
    }
  } else if (args[0] && !args[0].startsWith('--')) {
    filesToCheck = [args[0]];
  } else {
    filesToCheck = getStagedFiles();
  }

  console.log(`${colors.cyan}${colors.bright}📦 [Binary Guard] Kiểm tra dung lượng và file nhị phân (ngưỡng: ${formatBytes(MAX_BYTES)})...${colors.reset}`);

  if (filesToCheck.length === 0) {
    console.log(`${colors.green}✔ Không có file staged nào cần kiểm tra dung lượng.${colors.reset}`);
    process.exit(0);
  }

  const violations = checkFiles(filesToCheck);
  const errors = violations.filter(v => v.isError);
  const warnings = violations.filter(v => !v.isError);

  if (warnings.length > 0) {
    console.log(`\n${colors.yellow}${colors.bright}⚠️ CẢNH BÁO TỆP TIN NHỊ PHÂN:${colors.reset}`);
    warnings.forEach(w => {
      console.log(`  ${colors.yellow}• ${w.file}${colors.reset} [${formatBytes(w.size)}] : ${w.reason}`);
    });
  }

  if (errors.length === 0) {
    console.log(`${colors.green}✔ [Binary Guard] Đạt yêu cầu: Tất cả các file đều nằm trong giới hạn dung lượng cho phép.${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`\n${colors.red}${colors.bright}========================================================================${colors.reset}`);
    console.log(`${colors.red}${colors.bright} ❌ [BINARY GUARD BỊ CHẶN] PHÁT HIỆN FILE DUNG LƯỢNG QUÁ LỚN / FILE NHỊ PHÂN${colors.reset}`);
    console.log(`${colors.red}${colors.bright}========================================================================${colors.reset}\n`);

    errors.forEach(e => {
      console.log(`  📁 File: ${colors.yellow}${e.file}${colors.reset}`);
      console.log(`  ⚖️ Dung lượng: ${colors.red}${formatBytes(e.size)}${colors.reset}`);
      console.log(`  🚫 Lý do: ${e.reason}\n`);
    });

    console.log(`${colors.bright}Hướng dẫn xử lý chuẩn kỹ sư:${colors.reset}`);
    console.log(`  1. Sử dụng ${colors.cyan}Git LFS (Large File Storage)${colors.reset} cho các file media/weights:`);
    console.log(`     ${colors.dim}git lfs track "*.mp4"${colors.reset}`);
    console.log(`  2. Thêm file vào ${colors.cyan}.gitignore${colors.reset} và hủy stage file:`);
    console.log(`     ${colors.dim}git restore --staged <file>${colors.reset}`);
    console.log(`  3. Nếu buộc phải commit file này (ngoại lệ), chạy với biến bypass:`);
    console.log(`     ${colors.dim}GIT_GUARD_MAX_FILE_SIZE_MB=50 git commit -m "..."${colors.reset}\n`);

    process.exit(1);
  }
}

if (require.main === module) {
  run();
}

module.exports = { checkFiles, formatBytes, DEFAULT_MAX_SIZE_MB };
