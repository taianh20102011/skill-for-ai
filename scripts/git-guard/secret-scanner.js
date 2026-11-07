#!/usr/bin/env node

/**
 * Smart Secret Scanner Guard
 * Automatically scans staged files or directories for hardcoded secrets, tokens, private keys, and passwords.
 * Zero external dependencies.
 * Usage: node secret-scanner.js [--all | --staged | <file-or-dir>]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bgRed: '\x1b[41m',
};

// High-confidence regular expressions for active production secrets
const SECRET_PATTERNS = [
  {
    name: 'AWS Access Key ID',
    regex: /\b(AKIA[0-9A-Z]{16})\b/g,
    severity: 'CRITICAL'
  },
  {
    name: 'AWS Secret Access Key',
    regex: /(?:aws_secret_access_key|aws_secret_key|secret_access_key)\s*[:=]\s*['"]?([0-9a-zA-Z/+]{40})['"]?/gi,
    severity: 'CRITICAL'
  },
  {
    name: 'GitHub Personal Access Token',
    regex: /\b(ghp_[0-9a-zA-Z]{36}|github_pat_[0-9a-zA-Z_]{82})\b/g,
    severity: 'CRITICAL'
  },
  {
    name: 'OpenAI API Key',
    regex: /\b(sk-[a-zA-Z0-9T3BlbkFJ]{20,}|sk-proj-[a-zA-Z0-9_-]{40,})\b/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Anthropic Claude API Key',
    regex: /\b(sk-ant-[a-zA-Z0-9-_]{30,})\b/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Google Gemini / Firebase API Key',
    regex: /\b(AIza[0-9A-Za-z-_]{35})\b/g,
    severity: 'HIGH'
  },
  {
    name: 'Private Cryptographic Key',
    regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Slack Token',
    regex: /\b(xox[baprs]-[0-9a-zA-Z-]{10,})\b/g,
    severity: 'HIGH'
  },
  {
    name: 'Stripe Live Secret Key',
    regex: /\b(sk_live_[0-9a-zA-Z]{24}|rk_live_[0-9a-zA-Z]{24})\b/g,
    severity: 'CRITICAL'
  },
  {
    name: 'Database Connection URI with Password',
    regex: /(?:postgres|postgresql|mysql|mongodb|redis|mongodb\+srv):\/\/[^:\s]+:([^@\s]{3,})@[a-zA-Z0-9.-]+/gi,
    severity: 'CRITICAL'
  },
  {
    name: 'Generic API Secret / Password Assignment',
    regex: /(?:password|client_secret|api_secret|auth_token|secret_key)\s*[:=]\s*['"]([^'"]{12,})['"]/gi,
    severity: 'MEDIUM'
  }
];

// Files and directories to ignore
const IGNORED_PATHS = [
  /node_modules/,
  /\.git\//,
  /\.ai-memory/,
  /\.env\.example$/,
  /\.env\.template$/,
  /package-lock\.json$/,
  /pnpm-lock\.yaml$/,
  /yarn\.lock$/,
  /\.min\.js$/,
  /\.map$/,
  /secret-scanner\.js$/, // self
];

// Placeholders considered safe (false positive suppression)
const SAFE_PLACEHOLDERS = [
  'your_api_key',
  'your_secret_here',
  'xxxx',
  'placeholder',
  'test_token',
  'dummy_key',
  'sample_password',
  'insert_here',
  'change_me',
  'secret-salt-2026', // demo salt
  'e3b0c44298fc1c149afbf4c8996fb924',
];

function isIgnored(filePath) {
  const norm = filePath.replace(/\\/g, '/');
  return IGNORED_PATHS.some(re => re.test(norm));
}

function isSafePlaceholder(val) {
  const lower = val.toLowerCase();
  return SAFE_PLACEHOLDERS.some(p => lower.includes(p));
}

function maskSecret(secret) {
  if (secret.length <= 8) return '****';
  return secret.slice(0, 4) + '...' + secret.slice(-4);
}

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf-8' });
    return output.split('\n').map(f => f.trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function scanContent(content, filePath) {
  const findings = [];
  const lines = content.split('\n');

  lines.forEach((line, lineIndex) => {
    // Skip empty lines or pure comments with dummy text
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') && trimmed.includes('example')) return;

    for (const pattern of SECRET_PATTERNS) {
      pattern.regex.lastIndex = 0;
      let match;
      while ((match = pattern.regex.exec(line)) !== null) {
        const matchedValue = match[1] || match[0];

        if (isSafePlaceholder(matchedValue)) {
          continue;
        }

        findings.push({
          file: filePath,
          line: lineIndex + 1,
          type: pattern.name,
          severity: pattern.severity,
          snippet: line.trim(),
          masked: maskSecret(matchedValue)
        });
      }
    }
  });

  return findings;
}

function scanFile(filePath) {
  if (isIgnored(filePath) || !fs.existsSync(filePath)) return [];
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    return scanDirectory(filePath);
  }
  // Skip binary files
  if (stat.size > 2 * 1024 * 1024) return [];

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return scanContent(content, filePath);
  } catch {
    return [];
  }
}

function scanDirectory(dirPath) {
  let allFindings = [];
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const full = path.join(dirPath, item);
    if (isIgnored(full)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      allFindings = allFindings.concat(scanDirectory(full));
    } else {
      allFindings = allFindings.concat(scanFile(full));
    }
  }
  return allFindings;
}

function run() {
  const args = process.argv.slice(2);
  let filesToScan = [];
  let mode = 'staged';

  if (args.includes('--all')) {
    mode = 'all';
    filesToScan = [process.cwd()];
  } else if (args[0] && !args[0].startsWith('--')) {
    filesToScan = [args[0]];
  } else {
    filesToScan = getStagedFiles();
  }

  console.log(`${colors.cyan}${colors.bright}🔍 [Secret Guard] Quét mã nguồn kiểm tra lộ token / secret (${mode} mode)...${colors.reset}`);

  let totalFindings = [];

  if (mode === 'staged' && filesToScan.length === 0) {
    console.log(`${colors.green}✔ Không có file staged nào cần quét.${colors.reset}`);
    process.exit(0);
  }

  for (const file of filesToScan) {
    const findings = scanFile(file);
    totalFindings = totalFindings.concat(findings);
  }

  if (totalFindings.length === 0) {
    console.log(`${colors.green}✔ [Secret Guard] Hoàn tất: 0 phát hiện lộ lọt secret/token trong các file đã chọn.${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`\n${colors.red}${colors.bright}========================================================================${colors.reset}`);
    console.log(`${colors.red}${colors.bright} 🚨 [NGUY HIỂM] PHÁT HIỆN SECRET / TOKEN BỊ HARDCODE TRONG CODE${colors.reset}`);
    console.log(`${colors.red}${colors.bright}========================================================================${colors.reset}\n`);

    totalFindings.forEach(f => {
      console.log(`  ${colors.red}[${f.severity}]${colors.reset} ${colors.bright}${f.type}${colors.reset}`);
      console.log(`  📁 File: ${colors.yellow}${f.file}:${f.line}${colors.reset}`);
      console.log(`  🔑 Masked: ${colors.gray}${f.masked}${colors.reset}`);
      console.log(`  📝 Đoạn code: ${colors.dim}${f.snippet}${colors.reset}\n`);
    });

    console.log(`${colors.bright}Hành động khắc phục bắt buộc:${colors.reset}`);
    console.log(`  1. Đưa các token/secret trên vào file ${colors.cyan}.env${colors.reset} và thêm vào ${colors.cyan}.gitignore${colors.reset}.`);
    console.log(`  2. Dùng biến môi trường ${colors.cyan}process.env.MY_SECRET${colors.reset} thay vì gõ trực tiếp.`);
    console.log(`  3. Nếu token này đã bị lộ lên internet, hãy tiến hành thu hồi (REVOKE) ngay lập tức!\n`);

    process.exit(1);
  }
}

if (require.main === module) {
  run();
}

module.exports = { scanContent, scanFile, SECRET_PATTERNS };
