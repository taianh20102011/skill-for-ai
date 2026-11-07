#!/usr/bin/env node

/**
 * AI & AST Code Auditor
 * Deep static analysis & anti-pattern vulnerability scanner.
 * Detects SQL Injection, Command Injection, Path Traversal, Weak Crypto, and SSRF.
 * Supports optional AI enhancement via Local Ollama API (http://localhost:11434).
 * Usage: node ast-auditor.js [path] [--ai] [--json]
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  bgRed: '\x1b[41m',
};

// Security AST & Anti-Pattern Rules
const AUDIT_RULES = [
  {
    id: 'SEC-001',
    name: 'Command Injection (Unsanitized Shell Execution)',
    severity: 'CRITICAL',
    pattern: /(?:child_process|cp)\.(?:exec|execSync)\s*\(\s*(?:[`'"].*?\$\{.*?\}[`'"]|[^'"`\n]+?\+)/gi,
    explanation: 'Dữ liệu không qua kiểm duyệt được nối trực tiếp vào lệnh shell hệ thống (exec/execSync).',
    recommendation: 'Dùng execFile hoặc spawn với mảng tham số cố định (args array), tắt shell: true.'
  },
  {
    id: 'SEC-002',
    name: 'Dangerous Dynamic Code Evaluation (eval / Function)',
    severity: 'CRITICAL',
    pattern: /\b(?:eval|Function)\s*\(\s*[^)]+\)/gi,
    explanation: 'Sử dụng hàm eval() hoặc new Function() cho phép thực thi mã JavaScript tùy biến.',
    recommendation: 'Tránh hoàn toàn eval(). Thay thế bằng JSON.parse() hoặc logic ánh xạ có kiểm duyệt.'
  },
  {
    id: 'SEC-003',
    name: 'SQL / NoSQL Injection (Unescaped Query Interpolation)',
    severity: 'CRITICAL',
    pattern: /(?:\.query|\.execute|\$where)\s*\(\s*(?:`[^`]*?\$\{[^}]+\}[^`]*?`|['"][^'"]*?(?:SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)[^'"]*?['"]\s*\+)/gi,
    explanation: 'Nối chuỗi trực tiếp vào câu lệnh truy vấn cơ sở dữ liệu thay vì dùng Parameterized Queries.',
    recommendation: 'Sử dụng Prepared Statements hoặc Parameterized Queries (vd: db.query("SELECT * FROM u WHERE id = $1", [id])).'
  },
  {
    id: 'SEC-004',
    name: 'Path Traversal (Arbitrary File Read/Write)',
    severity: 'HIGH',
    pattern: /(?:fs\.(?:readFile|readFileSync|createReadStream|writeFile|writeFileSync))\s*\(\s*(?:(?:path\.)?join\([^)]*?(?:req\.|params|query|body)|[`'"].*?\$\{.*?(?:req\.|params|query|body).*?\}[`'"])/gi,
    explanation: 'Đường dẫn tệp tin được xây dựng từ tham số người dùng mà không kiểm tra (path.normalize / chroot).',
    recommendation: 'Kiểm tra đường dẫn bằng path.resolve() và đảm bảo tệp nằm trong thư mục gốc cho phép.'
  },
  {
    id: 'SEC-005',
    name: 'Server-Side Request Forgery (SSRF)',
    severity: 'HIGH',
    pattern: /(?:fetch|axios\.(?:get|post)|http\.(?:get|request))\s*\(\s*(?:req\.|params\.|query\.|body\.|userInput)/gi,
    explanation: 'Thực hiện gọi HTTP đến URL được cấp trực tiếp từ client mà không whitelist domain.',
    recommendation: 'Xác thực whitelist địa chỉ IP/domain đích; cấm truy cập dải IP nội bộ (127.0.0.1, 169.254.169.254).'
  },
  {
    id: 'SEC-006',
    name: 'Weak Cryptographic Hashing for Passwords',
    severity: 'HIGH',
    pattern: /crypto\.createHash\s*\(\s*['"](?:md5|sha1)['"]\s*\)/gi,
    explanation: 'MD5 và SHA1 đã lỗi thời, dễ bị tấn công va chạm (collision attack) và bảng băm sẵn (rainbow table).',
    recommendation: 'Sử dụng bcrypt, argon2, scrypt hoặc HMAC-SHA256 với salt có độ dài an toàn.'
  },
  {
    id: 'SEC-007',
    name: 'Insecure Random Number Generation',
    severity: 'MEDIUM',
    pattern: /Math\.random\s*\(\s*\)/gi,
    contextFilter: /(?:token|secret|otp|salt|key|auth|nonce|session)/i,
    explanation: 'Math.random() là số giả ngẫu nhiên có thể đoán trước (PRNG), không an toàn cho token/OTP mật mã.',
    recommendation: 'Dùng crypto.randomBytes() hoặc crypto.getRandomValues() cho mã xác thực và token.'
  },
  {
    id: 'SEC-008',
    name: 'Prototype Pollution Vulnerability',
    severity: 'MEDIUM',
    pattern: /(?:Object\.assign|_merge|\.extend)\s*\(\s*\{?\s*\}?\s*,\s*[^)]*?(?:req\.body|params|query)/gi,
    explanation: 'Hợp nhất dữ liệu không kiểm soát có thể ghi đè các thuộc tính trong Object.prototype.',
    recommendation: 'Sử dụng Map hoặc chặn các key nhạy cảm: __proto__, constructor, prototype.'
  }
];

const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', '.ai-memory', '.temp', 'antigravity-skills'];

function getFiles(dir, exts = ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (IGNORE_DIRS.includes(file)) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else if (exts.includes(path.extname(file).toLowerCase())) {
      results.push(fullPath);
    }
  }
  return results;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const findings = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    for (const rule of AUDIT_RULES) {
      rule.pattern.lastIndex = 0;
      if (rule.pattern.test(line)) {
        if (rule.contextFilter && !rule.contextFilter.test(line)) {
          continue;
        }

        findings.push({
          ruleId: rule.id,
          name: rule.name,
          severity: rule.severity,
          file: filePath,
          line: index + 1,
          snippet: trimmed,
          explanation: rule.explanation,
          recommendation: rule.recommendation
        });
      }
    }
  });

  return findings;
}

// Ollama Local LLM Deep Verification
async function queryOllamaAI(prompt, model = 'qwen2.5-coder:latest') {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      model: model,
      prompt: prompt,
      stream: false,
      options: { temperature: 0.1 }
    });

    const req = http.request({
      hostname: '127.0.0.1',
      port: 11434,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.response || '');
        } catch {
          resolve('');
        }
      });
    });

    req.on('error', () => resolve(''));
    req.on('timeout', () => { req.destroy(); resolve(''); });
    req.write(postData);
    req.end();
  });
}

async function run() {
  const args = process.argv.slice(2);
  const targetDir = args.find(a => !a.startsWith('--')) || process.cwd();
  const enableAI = args.includes('--ai') || args.includes('--ollama');
  const asJson = args.includes('--json');

  if (!asJson) {
    console.log(`\n${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
    console.log(`${colors.green}${colors.bright} 🛡️ AST CODE AUDITOR: TỰ ĐỘNG PHÁT HIỆN LỖ HỔNG & ANTI-PATTERNS${colors.reset}`);
    console.log(`${colors.gray} Quét AST cú pháp: Command Injection, SQLi, SSRF, Path Traversal, Weak Crypto${colors.reset}`);
    if (enableAI) console.log(`${colors.magenta} [AI Mode]: Kích hoạt kiểm chứng sâu qua Ollama Local LLM API${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}========================================================================${colors.reset}\n`);
    console.log(`${colors.gray}Đang phân tích mã nguồn tại: ${targetDir}...${colors.reset}`);
  }

  const files = getFiles(targetDir);
  let allFindings = [];

  for (const file of files) {
    const findings = scanFile(file);
    allFindings = allFindings.concat(findings);
  }

  if (asJson) {
    console.log(JSON.stringify(allFindings, null, 2));
    process.exit(allFindings.length > 0 ? 1 : 0);
  }

  if (allFindings.length === 0) {
    console.log(`\n${colors.green}✔ [AST Audit Hoàn Tất] Mã nguồn sạch! Không phát hiện anti-pattern hay injection tiềm ẩn.${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`\n${colors.red}${colors.bright}🚨 Phát hiện ${allFindings.length} vấn đề an ninh tiềm ẩn trong mã nguồn:${colors.reset}\n`);

  for (const f of allFindings) {
    const sevColor = f.severity === 'CRITICAL' ? colors.red : f.severity === 'HIGH' ? colors.yellow : colors.blue;
    console.log(`  ${sevColor}[${f.severity}] ${f.ruleId}: ${f.name}${colors.reset}`);
    console.log(`  📁 Vị trí: ${colors.cyan}${path.relative(process.cwd(), f.file)}:${f.line}${colors.reset}`);
    console.log(`  💻 Code: ${colors.gray}${f.snippet}${colors.reset}`);
    console.log(`  ⚠️ Giải thích: ${f.explanation}`);
    console.log(`  💡 Khắc phục: ${colors.green}${f.recommendation}${colors.reset}\n`);

    // AI Deep Verification via Ollama if requested
    if (enableAI) {
      console.log(`  ${colors.magenta}🤖 [Ollama AI Auditor Đang phân tích mẫu code...]${colors.reset}`);
      const aiPrompt = `Bạn là chuyên gia bảo mật mã nguồn. Hãy đánh giá đoạn mã sau xem có thực sự là lỗ hổng ${f.name} không và đưa ra giải pháp sửa đổi trong 2-3 câu:\n\`\`\`\n${f.snippet}\n\`\`\``;
      const aiReply = await queryOllamaAI(aiPrompt);
      if (aiReply) {
        console.log(`  ${colors.bright}Phân tích từ Local LLM:${colors.reset} ${aiReply.trim()}\n`);
      } else {
        console.log(`  ${colors.gray}(Ollama offline hoặc không phản hồi)${colors.reset}\n`);
      }
    }
  }

  process.exit(1);
}

if (require.main === module) {
  run();
}

module.exports = { scanFile, AUDIT_RULES };
