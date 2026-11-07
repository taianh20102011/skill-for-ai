#!/usr/bin/env node

/**
 * Semantic Code Search CLI
 * Local natural language code search engine.
 * Allows searching by semantic intent (e.g. "hàm giải mã gói tin packet" or "logic tính khoảng cách sensor").
 * Supports:
 * - Engine A: BM25 / N-gram Semantic Vectorization (100% offline, zero-dependency)
 * - Engine B: Ollama Embeddings API (/api/embeddings with nomic-embed-text or qwen2.5-coder)
 * Usage: node semantic-search.js "<query>" [path] [--ai] [--top <k>]
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

const IGNORED_DIRS = ['node_modules', '.git', 'dist', 'build', '.ai-memory', '.temp', 'antigravity-skills'];
const SEARCH_EXTS = ['.ts', '.js', '.tsx', '.jsx', '.py', '.rs', '.go', '.html', '.css', '.md'];

// Bilingual Synonym Dictionary for Semantic Bridging (Vietnamese <-> Technical English)
const SYNONYMS = {
  'giai ma': ['decode', 'decrypt', 'parse', 'extract', 'unpack', 'digest'],
  'ma hoa': ['encode', 'encrypt', 'hash', 'cipher', 'hmac', 'sha256'],
  'goi tin': ['packet', 'payload', 'buffer', 'frame', 'datagram', 'chunk', 'message'],
  'khoang cach': ['distance', 'range', 'offset', 'gap', 'euclidean', 'delta'],
  'cam bien': ['sensor', 'detector', 'telemetry', 'probe', 'device', 'hardware'],
  'xac thuc': ['auth', 'authenticate', 'verify', 'mfa', 'otp', 'challenge', 'token'],
  'thu hoi': ['revoke', 'invalidate', 'terminate', 'clear', 'expire', 'reset'],
  'phien': ['session', 'token', 'cookie', 'jwt'],
  'cuon': ['scroll', 'smoother', 'trigger', 'parallax', 'wheel'],
  'hieu ung': ['animation', 'motion', 'transition', 'bounce', 'wiggle', 'flip'],
  'bo goc': ['radius', 'rounded', 'corner', 'curve'],
  'nut bam': ['button', 'btn', 'cta', 'trigger', 'click', 'press'],
  'kiem toan': ['audit', 'scanner', 'guard', 'vulnerability', 'check'],
  'co so du lieu': ['database', 'db', 'query', 'sql', 'postgres', 'mongo'],
};

// Normalize Vietnamese string (strip diacritics for matching)
function removeDiacritics(str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

// Tokenize camelCase, snake_case, and natural language words
function tokenize(text) {
  const norm = removeDiacritics(text);
  // Split on delimiters and camelCase boundaries
  const words = norm
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1);

  const tokens = new Set(words);

  // Expand with semantic synonyms
  for (const [key, synList] of Object.entries(SYNONYMS)) {
    if (norm.includes(key)) {
      synList.forEach(s => tokens.add(s));
    }
  }

  return Array.from(tokens);
}

// Extract code blocks / functions from source file
function chunkCode(filePath, content) {
  const lines = content.split('\n');
  const chunks = [];
  let currentChunk = [];
  let startLine = 1;
  let inFunction = false;

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    // Detect function / class / interface / export boundaries
    const isHeader = /^(?:export\s+)?(?:async\s+)?(?:function|class|const|let|var|type|interface)\s+([a-zA-Z0-9_]+)/.test(trimmed) ||
                     /^(?:def|class)\s+([a-zA-Z0-9_]+)/.test(trimmed);

    if (isHeader && currentChunk.length > 0) {
      chunks.push({
        file: filePath,
        startLine,
        endLine: idx,
        code: currentChunk.join('\n')
      });
      currentChunk = [];
      startLine = idx + 1;
    }

    currentChunk.push(line);

    // Keep chunk size manageable (max 40 lines per chunk)
    if (currentChunk.length >= 40) {
      chunks.push({
        file: filePath,
        startLine,
        endLine: idx + 1,
        code: currentChunk.join('\n')
      });
      currentChunk = [];
      startLine = idx + 2;
    }
  });

  if (currentChunk.length > 0) {
    chunks.push({
      file: filePath,
      startLine,
      endLine: lines.length,
      code: currentChunk.join('\n')
    });
  }

  return chunks;
}

// Collect all relevant code chunks across directory
function collectCodeChunks(targetDir) {
  const chunks = [];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      if (IGNORED_DIRS.includes(item)) continue;
      const full = path.join(dir, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (SEARCH_EXTS.includes(path.extname(item).toLowerCase())) {
        try {
          const content = fs.readFileSync(full, 'utf-8');
          chunks.push(...chunkCode(full, content));
        } catch {
          // Skip unreadable files
        }
      }
    }
  }

  walk(targetDir);
  return chunks;
}

// Engine A: BM25 / Weighted Semantic Score
function scoreChunk(chunk, queryTokens) {
  const codeTokens = tokenize(chunk.code);
  const fileTokens = tokenize(chunk.file);

  let score = 0;
  let matchCount = 0;

  for (const q of queryTokens) {
    // Exact or partial token match
    let qScore = 0;
    if (codeTokens.includes(q)) {
      qScore += 3.0;
    } else {
      const partial = codeTokens.some(ct => ct.includes(q) || q.includes(ct));
      if (partial) qScore += 1.5;
    }

    // Extra weight if file path matches query intent
    if (fileTokens.includes(q)) {
      qScore += 2.0;
    }

    if (qScore > 0) {
      score += qScore;
      matchCount++;
    }
  }

  // Bonus for matching multiple query terms
  if (matchCount > 1) {
    score *= (1 + matchCount * 0.3);
  }

  return score;
}

// Engine B: Ollama Embeddings API
async function getOllamaEmbedding(text, model = 'nomic-embed-text') {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ model, prompt: text });
    const req = http.request({
      hostname: '127.0.0.1',
      port: 11434,
      path: '/api/embeddings',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 3000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.embedding || null);
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.write(postData);
    req.end();
  });
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function run() {
  const args = process.argv.slice(2);
  const query = args[0];
  const targetDir = args[1] && !args[1].startsWith('--') ? args[1] : process.cwd();
  const enableAI = args.includes('--ai') || args.includes('--ollama');

  let topK = 5;
  const topIdx = args.indexOf('--top');
  if (topIdx !== -1 && args[topIdx + 1]) {
    topK = parseInt(args[topIdx + 1], 10) || 5;
  }

  if (!query) {
    console.error(`${colors.cyan}Cú pháp: swarm search "<truy vấn bằng ngôn ngữ tự nhiên>" [thư_mục] [--ai] [--top 5]${colors.reset}`);
    console.log(`Ví dụ: ${colors.green}swarm search "xác thực 2fa otp gmail"${colors.reset}`);
    console.log(`       ${colors.green}swarm search "logic tính khoảng cách sensor"${colors.reset}`);
    console.log(`       ${colors.green}swarm search "hàm giải mã gói tin packet"${colors.reset}`);
    process.exit(1);
  }

  console.log(`\n${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
  console.log(`${colors.green}${colors.bright} 🔍 SEMANTIC CODE SEARCH: TÌM KIẾM MÃ NGUỒN THEO NGỮ NGHĨA${colors.reset}`);
  console.log(` Truy vấn: ${colors.yellow}"${query}"${colors.reset}`);
  console.log(` Phạm vi:  ${colors.gray}${targetDir}${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}========================================================================${colors.reset}\n`);

  const queryTokens = tokenize(query);
  console.log(`${colors.gray}Từ khóa ngữ nghĩa nhận diện:${colors.reset} [${queryTokens.join(', ')}]`);

  const chunks = collectCodeChunks(targetDir);
  console.log(`${colors.gray}Đã lập chỉ mục:${colors.reset} ${chunks.length} phân đoạn mã nguồn.\n`);

  let scoredResults = [];

  // Try Neural Embedding if --ai flag is set
  let aiUsed = false;
  if (enableAI) {
    console.log(`${colors.magenta}🧠 Đang tạo vector embedding qua Ollama...${colors.reset}`);
    const queryVec = await getOllamaEmbedding(query);
    if (queryVec) {
      aiUsed = true;
      for (const chunk of chunks.slice(0, 50)) { // limit for speed
        const chunkSummary = chunk.code.slice(0, 300);
        const chunkVec = await getOllamaEmbedding(chunkSummary);
        if (chunkVec) {
          const sim = cosineSimilarity(queryVec, chunkVec);
          scoredResults.push({ chunk, score: sim * 10 });
        }
      }
    }
  }

  // Fallback or Primary: Semantic BM25 / Token scoring
  if (!aiUsed) {
    for (const chunk of chunks) {
      const score = scoreChunk(chunk, queryTokens);
      if (score > 0) {
        scoredResults.push({ chunk, score });
      }
    }
  }

  scoredResults.sort((a, b) => b.score - a.score);
  const topResults = scoredResults.slice(0, topK);

  if (topResults.length === 0) {
    console.log(`${colors.yellow}Không tìm thấy đoạn mã nào khớp với ngữ nghĩa "${query}".${colors.reset}\n`);
    process.exit(0);
  }

  console.log(`${colors.green}${colors.bright}🎯 Tìm thấy ${topResults.length} kết quả phù hợp nhất:${colors.reset}\n`);

  topResults.forEach((res, idx) => {
    const relFile = path.relative(process.cwd(), res.chunk.file);
    const confidence = Math.min(100, Math.round(res.score * 12));
    const lines = res.chunk.code.split('\n');
    const preview = lines.slice(0, 8).join('\n');

    console.log(`${colors.bright}#${idx + 1} [Độ khớp: ${confidence}%]${colors.reset} 📁 ${colors.cyan}${relFile}:${res.chunk.startLine}-${res.chunk.endLine}${colors.reset}`);
    console.log(`${colors.gray}------------------------------------------------------------------------${colors.reset}`);
    console.log(colors.dim + preview + colors.reset);
    if (lines.length > 8) {
      console.log(`${colors.gray}... (+ ${lines.length - 8} dòng khác)${colors.reset}`);
    }
    console.log(`${colors.gray}------------------------------------------------------------------------${colors.reset}\n`);
  });
}

if (require.main === module) {
  run();
}

module.exports = { tokenize, chunkCode, scoreChunk };
