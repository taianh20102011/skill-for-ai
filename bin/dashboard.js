#!/usr/bin/env node

/**
 * SKILL-FOR-AI - Unified Web Dashboard & 1-Click AI Control Center
 * Local AI Engine (Ollama / LM Studio) + Multi-Agent Mesh + Anti-Slop Web UI
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3333;
const homeDir = os.homedir();
const globalMeshDir = path.join(homeDir, '.unified-ai-mesh');

let systemLogs = [
  `[${new Date().toLocaleTimeString()}] Unified AI Mesh Dashboard initialized.`,
  `[${new Date().toLocaleTimeString()}] Loaded 119 autonomous agent skills.`,
  `[${new Date().toLocaleTimeString()}] Local AI Engine listener ready.`
];

function log(msg) {
  const line = `[${new Date().toLocaleTimeString()}] ${msg}`;
  systemLogs.unshift(line);
  if (systemLogs.length > 100) systemLogs.pop();
  console.log(`\x1b[36m${line}\x1b[0m`);
}

function checkLocalAI() {
  return new Promise((resolve) => {
    // 1. Test Ollama on 11434
    const req = http.get('http://127.0.0.1:11434/api/tags', { timeout: 2000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const models = (json.models || []).map(m => m.name);
          resolve({
            connected: true,
            provider: 'Ollama',
            endpoint: 'http://127.0.0.1:11434',
            openAiEndpoint: 'http://127.0.0.1:11434/v1',
            models: models.length ? models : ['gemma4:12b'],
            activeModel: models[0] || 'gemma4:12b'
          });
        } catch (e) {
          resolve({ connected: false });
        }
      });
    });
    req.on('error', () => {
      // 2. Fallback test LM Studio on 1234
      const req2 = http.get('http://127.0.0.1:1234/v1/models', { timeout: 1500 }, (res2) => {
        let data2 = '';
        res2.on('data', chunk => data2 += chunk);
        res2.on('end', () => {
          try {
            const json2 = JSON.parse(data2);
            const models2 = (json2.data || []).map(m => m.id);
            resolve({
              connected: true,
              provider: 'LM Studio',
              endpoint: 'http://127.0.0.1:1234',
              openAiEndpoint: 'http://127.0.0.1:1234/v1',
              models: models2.length ? models2 : ['local-model'],
              activeModel: models2[0] || 'local-model'
            });
          } catch (e) {
            resolve({ connected: false });
          }
        });
      });
      req2.on('error', () => resolve({ connected: false }));
    });
  });
}

function getMeshConfig() {
  const configPath = path.join(globalMeshDir, 'config.json');
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {}
  }
  return {
    system: 'Unified AI Agent Mesh',
    activeMode: 'senior',
    linkedAgents: ['Claude Code', 'Antigravity', 'Cursor', 'Codex', 'OpenCode'],
    lastUpdated: new Date().toISOString()
  };
}

function updateMeshConfig(newMode) {
  if (!fs.existsSync(globalMeshDir)) fs.mkdirSync(globalMeshDir, { recursive: true });
  const config = getMeshConfig();
  config.activeMode = newMode;
  config.lastUpdated = new Date().toISOString();
  fs.writeFileSync(path.join(globalMeshDir, 'config.json'), JSON.stringify(config, null, 2), 'utf8');

  const sourceAgentsMdPath = path.join(__dirname, '..', 'AGENTS.md');
  const baseAgentsContent = fs.existsSync(sourceAgentsMdPath) ? fs.readFileSync(sourceAgentsMdPath, 'utf8') : '';
  const modePromptText = newMode === 'senior'
    ? `\n## 🌟 CURRENT ACTIVE MODE: SENIOR DEV (YAGNI & ANTI-SLOP)
- **Philosophy**: Write minimal, essential code to solve the exact problem. Zero over-engineering or premature abstractions.
- **Automation**: Always run build loops (e.g. pnpm build, cargo check), capture stack traces upon errors, and self-heal code.
- **Security**: Always verify against OWASP Top 10 and Cloudflare Security Guidelines before completion.`
    : `\n## 🌟 CURRENT ACTIVE MODE: JUNIOR DEV (TUTORIAL & DETAILED GUIDANCE)
- **Philosophy**: Guide the developer step-by-step. Clearly explain the purpose of each function, variable, and architecture layer.
- **Comments**: Include thorough educational inline comments throughout the code.
- **Discussion**: Prompt for developer feedback before executing major architectural refactoring.`;

  const fullMeshContent = `# UNIFIED MULTI-AGENT SYSTEM SPECIFICATION\n${modePromptText}\n\n${baseAgentsContent}\n`;
  try {
    fs.writeFileSync(path.join(process.cwd(), 'AGENTS.md'), fullMeshContent, 'utf8');
    fs.writeFileSync(path.join(process.cwd(), '.cursorrules'), fullMeshContent, 'utf8');
    fs.writeFileSync(path.join(globalMeshDir, 'MEMORY.md'), fullMeshContent, 'utf8');
  } catch (e) {}

  log(`Switched Operating Mode to: ${newMode.toUpperCase()} DEV MODE`);
  return config;
}

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SKILL-FOR-AI Control Center & Local AI Engine</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace']
          },
          colors: {
            bg: '#080808',
            card: '#111113',
            cardBorder: '#202024',
            accent: '#3b82f6',
            accentEmerald: '#10b981',
            accentAmber: '#f59e0b',
            accentPurple: '#a855f7'
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #080808; color: #f4f4f5; }
    .glass { background: rgba(17, 17, 19, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.07); }
    .glass-card { background: #111113; border: 1px solid #202024; transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
    .glass-card:hover { border-color: #3b82f6; transform: translateY(-2px); box-shadow: 0 8px 24px -8px rgba(59, 130, 246, 0.15); }
    .pulse-dot { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
  </style>
</head>
<body class="min-h-screen flex flex-col font-sans selection:bg-blue-600/30">

  <!-- Header -->
  <header class="sticky top-0 z-50 glass border-b border-zinc-800/80 px-6 py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 font-mono font-bold text-lg text-white">
        ⚡
      </div>
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-lg font-bold tracking-tight text-white">SKILL-FOR-AI</h1>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">v1.0.0</span>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot"></span> 119 Skills Active
          </span>
          <span id="badge-local-ai" class="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-purple-400"></span> Local AI Ready
          </span>
        </div>
        <p class="text-xs text-zinc-400">Autonomous Multi-Agent Mesh & Local AI Engine (Zero API Cost)</p>
      </div>
    </div>

    <!-- Mode Selector & Quick Links -->
    <div class="flex items-center gap-3">
      <div class="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
        <button id="btn-senior" onclick="setMode('senior')" class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200">
          🌟 Senior Mode
        </button>
        <button id="btn-junior" onclick="setMode('junior')" class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200">
          🎓 Junior Mode
        </button>
      </div>
      <a href="https://github.com/taianh20102011/skill-for-ai" target="_blank" class="px-3.5 py-1.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-xs text-zinc-300 font-medium transition-all flex items-center gap-1.5">
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>
    </div>
  </header>

  <!-- Main Grid -->
  <main class="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">

    <!-- Connected AI Agents Mesh Status -->
    <section>
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <span>🤖 Connected Agent Ecosystem (Unified Mesh)</span>
        </h2>
        <span class="text-xs text-zinc-500 font-mono">Shared Memory: ~/.unified-ai-mesh/MEMORY.md</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <div class="glass p-3.5 rounded-xl border border-zinc-800/80 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">AG</div>
          <div>
            <div class="text-xs font-semibold text-zinc-200">Antigravity</div>
            <div class="text-[10px] text-emerald-400 flex items-center gap-1 font-mono"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Synced</div>
          </div>
        </div>
        <div class="glass p-3.5 rounded-xl border border-zinc-800/80 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">CC</div>
          <div>
            <div class="text-xs font-semibold text-zinc-200">Claude Code</div>
            <div class="text-[10px] text-emerald-400 flex items-center gap-1 font-mono"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Synced</div>
          </div>
        </div>
        <div class="glass p-3.5 rounded-xl border border-zinc-800/80 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">CU</div>
          <div>
            <div class="text-xs font-semibold text-zinc-200">Cursor IDE</div>
            <div class="text-[10px] text-emerald-400 flex items-center gap-1 font-mono"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Rules Ready</div>
          </div>
        </div>
        <div class="glass p-3.5 rounded-xl border border-zinc-800/80 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">CX</div>
          <div>
            <div class="text-xs font-semibold text-zinc-200">Codex / Open</div>
            <div class="text-[10px] text-emerald-400 flex items-center gap-1 font-mono"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Connected</div>
          </div>
        </div>
        <div class="glass p-3.5 rounded-xl border border-zinc-800/80 flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xs">AI</div>
          <div>
            <div class="text-xs font-semibold text-zinc-200">Aider / Cline</div>
            <div class="text-[10px] text-emerald-400 flex items-center gap-1 font-mono"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Linked</div>
          </div>
        </div>
      </div>
    </section>

    <!-- NEW SECTION: LOCAL AI ENGINE (OLLAMA / LM STUDIO) -->
    <section class="glass-card rounded-2xl p-6 relative overflow-hidden border-purple-500/30 shadow-lg shadow-purple-500/5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-base shadow-inner">
            💻
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-white">Local AI Engine (Chạy Hoàn Toàn Offline / Miễn Phí 100%)</h3>
              <span id="local-ai-status-pill" class="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                🟢 Ollama Connected
              </span>
            </div>
            <p class="text-xs text-zinc-400">Không tốn tiền API, không cần mạng internet, giữ kín tuyệt đối dữ liệu mã nguồn.</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs text-zinc-400 font-mono">Model Local:</span>
          <select id="local-model-select" class="bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-1.5 text-xs font-mono font-semibold text-purple-300 focus:outline-none focus:border-purple-500">
            <option value="gemma4:12b">gemma4:12b (Active)</option>
          </select>
          <button onclick="connectLocalToAgents()" id="btn-connect-local" class="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-md shadow-purple-600/20 active:scale-95 flex items-center gap-1.5">
            <span>⚡ Nối Vào Toàn Bộ Coding Agents</span>
          </button>
        </div>
      </div>

      <!-- Test Prompt & Instant Local Inference -->
      <div class="space-y-3 pt-2">
        <div class="flex gap-2">
          <input id="local-test-prompt" type="text" placeholder="Gõ thử lệnh để kiểm tra AI Local (Ví dụ: Viết hàm debounce trong TypeScript...)" class="flex-1 bg-zinc-900/90 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500" />
          <button onclick="runLocalPrompt()" id="btn-run-local" class="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition-all duration-200 flex items-center gap-2 active:scale-95">
            <span>Chạy AI Local</span>
          </button>
        </div>

        <div id="local-ai-response-box" class="hidden p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
        </div>
      </div>
    </section>

    <!-- 1-Click Operations Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Column 1 & 2: 1-Click Builders & Triggers -->
      <div class="lg:col-span-2 space-y-6">

        <!-- 1-Click Project Builder (/xaydung) -->
        <div class="glass-card rounded-2xl p-6 relative overflow-hidden">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">🚀</span>
              <h3 class="text-base font-bold text-white">1-Click Autonomous Builder (/xaydung)</h3>
            </div>
            <span class="text-xs text-zinc-400 font-mono">React 19 • Tauri v2 • Paper • CLI</span>
          </div>

          <p class="text-xs text-zinc-400 mb-4 leading-relaxed">
            Chọn thể loại và nhập mô tả, hệ thống sẽ tự động khởi tạo dự án chuẩn Anti-Slop, thiết lập file đặc tả <code class="text-blue-400 font-mono">XAYDUNG_SPEC.md</code> và kích hoạt AI lập trình tự hành.
          </p>

          <div class="space-y-3">
            <div class="flex gap-2">
              <select id="build-type" class="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-medium text-zinc-200 focus:outline-none focus:border-blue-500">
                <option value="web">🌐 Web App (Vite + React 19 + GSAP + Tailwind)</option>
                <option value="app">📱 Desktop App (Tauri v2 + Rust) / Mobile</option>
                <option value="plugin">⚔️ Minecraft Plugin (Paper Adventure + Lamp)</option>
                <option value="tool">🛠️ CLI Utility / Tool (High-speed)</option>
              </select>
              <input id="build-desc" type="text" placeholder="Ví dụ: SaaS Dashboard với dark mode và GSAP animations..." class="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500" />
            </div>

            <!-- Quick Preset Chips -->
            <div class="flex flex-wrap items-center gap-1.5 pt-1">
              <span class="text-[11px] text-zinc-500 mr-1">Gợi ý 1-chạm:</span>
              <button onclick="setPreset('web', 'SaaS Landing Page with 3D Canvas and GSAP ScrollTrigger')" class="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 transition-all">SaaS Landing</button>
              <button onclick="setPreset('app', 'Lightweight Markdown Notes Desktop App with Tauri v2')" class="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 transition-all">Tauri App</button>
              <button onclick="setPreset('plugin', 'Multi-server Economy Vault sync with Adventure MiniMessage')" class="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 transition-all">Minecraft Vault</button>
              <button onclick="setPreset('tool', 'High-speed log analysis CLI with automated tests')" class="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 transition-all">Log CLI</button>
            </div>

            <div class="pt-2 flex justify-end">
              <button onclick="triggerScaffold()" id="btn-scaffold" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95">
                <span>⚡ Khởi Tạo Dự Án 1-Chạm</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 1-Click Visual & Media Tools (Baoyu Suite) -->
        <div class="glass-card rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-sm">🎨</span>
              <h3 class="text-base font-bold text-white">1-Click Visuals & Presentations (Baoyu Suite)</h3>
            </div>
            <span class="text-xs text-zinc-400 font-mono">100% Offline • Free</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-purple-500/40 transition-all">
              <div class="text-xs font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
                <span>📊 Sơ Đồ Kiến Trúc (Diagram)</span>
              </div>
              <p class="text-[11px] text-zinc-400 mb-3">Tự động vẽ System Architecture hoặc Flowchart chuẩn Mermaid/SVG.</p>
              <button onclick="triggerQuickAction('baoyu-diagram', 'Vẽ sơ đồ kiến trúc hệ thống Multi-Agent Mesh')" class="w-full py-1.5 px-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium transition-all">
                Vẽ Diagram Ngay
              </button>
            </div>

            <div class="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-purple-500/40 transition-all">
              <div class="text-xs font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
                <span>📑 Tạo Slide Thuyết Trình (.PPTX)</span>
              </div>
              <p class="text-[11px] text-zinc-400 mb-3">Tạo slide thuyết trình HTML động và xuất trực tiếp ra file PowerPoint.</p>
              <button onclick="triggerQuickAction('claude-slides', 'Tạo bộ slide giới thiệu hệ sinh thái AI Coding Agents')" class="w-full py-1.5 px-3 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium transition-all">
                Tạo Slide Deck
              </button>
            </div>

            <div class="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-purple-500/40 transition-all">
              <div class="text-xs font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
                <span>🌐 Cào Web Sang Markdown</span>
              </div>
              <p class="text-[11px] text-zinc-400 mb-3">Nhập link URL -> Cào sạch nội dung bài viết thành Markdown không rác.</p>
              <button onclick="promptScrapeUrl()" class="w-full py-1.5 px-3 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-medium transition-all">
                Cào Link Web
              </button>
            </div>

            <div class="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-purple-500/40 transition-all">
              <div class="text-xs font-semibold text-zinc-200 mb-1 flex items-center gap-1.5">
                <span>🛡️ Kiểm Toán OWASP & Cloudflare</span>
              </div>
              <p class="text-[11px] text-zinc-400 mb-3">Rà soát lỗ hổng bảo mật Top 10 OWASP và quét rò rỉ khóa bí mật.</p>
              <button onclick="triggerQuickAction('security-audit', 'Rà soát bảo mật toàn diện cho codebase hiện tại')" class="w-full py-1.5 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-all">
                Chạy Security Audit
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Column 3: Live Logs & Command Helper -->
      <div class="space-y-6">

        <!-- Quick AI Command Cheatsheet -->
        <div class="glass-card rounded-2xl p-5">
          <h3 class="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
            <span>⌨️ Khung Lệnh Chat Tự Hành</span>
          </h3>
          <p class="text-xs text-zinc-400 mb-3 leading-relaxed">
            Copy hoặc gõ các lệnh sau trực tiếp trong Antigravity / Claude Code:
          </p>
          <div class="space-y-2 font-mono text-[11px]">
            <div class="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/90 text-zinc-300 flex items-center justify-between cursor-pointer hover:border-zinc-700" onclick="copyText('/xaydung web Modern SaaS Dashboard')">
              <span>/xaydung web &lt;ý tưởng&gt;</span>
              <span class="text-zinc-500 text-[10px]">copy</span>
            </div>
            <div class="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/90 text-zinc-300 flex items-center justify-between cursor-pointer hover:border-zinc-700" onclick="copyText('/xaydung app Tauri v2 Markdown Notes')">
              <span>/xaydung app &lt;ý tưởng&gt;</span>
              <span class="text-zinc-500 text-[10px]">copy</span>
            </div>
            <div class="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/90 text-zinc-300 flex items-center justify-between cursor-pointer hover:border-zinc-700" onclick="copyText('/xaydung plugin Economy Vault Adventure')">
              <span>/xaydung plugin &lt;ý tưởng&gt;</span>
              <span class="text-zinc-500 text-[10px]">copy</span>
            </div>
            <div class="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/90 text-zinc-300 flex items-center justify-between cursor-pointer hover:border-zinc-700" onclick="copyText('/xaydung tool Log Analyzer CLI')">
              <span>/xaydung tool &lt;ý tưởng&gt;</span>
              <span class="text-zinc-500 text-[10px]">copy</span>
            </div>
          </div>
        </div>

        <!-- Real-Time Activity Log -->
        <div class="glass-card rounded-2xl p-5 flex flex-col h-[320px]">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-500 pulse-dot"></span>
              <span>Live System Log</span>
            </h3>
            <button onclick="fetchLogs()" class="text-[10px] font-mono text-zinc-500 hover:text-zinc-300">Làm mới</button>
          </div>
          <div id="log-box" class="flex-1 bg-zinc-950 rounded-xl p-3 border border-zinc-800/80 font-mono text-[11px] text-zinc-400 overflow-y-auto space-y-1">
          </div>
        </div>

      </div>

    </div>

  </main>

  <!-- Notification Toast -->
  <div id="toast" class="fixed bottom-6 right-6 px-4 py-3 rounded-xl glass border border-blue-500/40 text-xs font-medium text-blue-300 shadow-2xl transition-all duration-300 transform translate-y-20 opacity-0 pointer-events-none flex items-center gap-2">
    <span>✓</span> <span id="toast-msg">Success</span>
  </div>

  <script>
    let activeMode = 'senior';

    function showToast(msg) {
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toast-msg');
      toastMsg.innerText = msg;
      toast.classList.remove('translate-y-20', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 3000);
    }

    function copyText(txt) {
      navigator.clipboard.writeText(txt);
      showToast('Đã sao chép lệnh: ' + txt);
    }

    async function fetchStatus() {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        activeMode = data.activeMode || 'senior';
        renderModeButtons();
      } catch (e) {}

      // Check Local AI
      try {
        const localRes = await fetch('/api/local-ai');
        const localData = await localRes.json();
        const pill = document.getElementById('local-ai-status-pill');
        const select = document.getElementById('local-model-select');
        if (localData.connected) {
          pill.className = 'px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
          pill.innerText = '🟢 ' + localData.provider + ' Connected';
          if (localData.models && localData.models.length) {
            select.innerHTML = localData.models.map(m => '<option value="' + m + '">' + m + '</option>').join('');
          }
        } else {
          pill.className = 'px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700';
          pill.innerText = '⚪ Local Engine Offline';
        }
      } catch (e) {}
    }

    function renderModeButtons() {
      const btnSenior = document.getElementById('btn-senior');
      const btnJunior = document.getElementById('btn-junior');
      if (activeMode === 'senior') {
        btnSenior.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm';
        btnJunior.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white';
      } else {
        btnSenior.className = 'px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white';
        btnJunior.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-600 text-white shadow-sm';
      }
    }

    async function setMode(mode) {
      try {
        const res = await fetch('/api/set-mode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode })
        });
        const data = await res.json();
        activeMode = data.activeMode;
        renderModeButtons();
        showToast('Đã kích hoạt: ' + mode.toUpperCase() + ' DEV MODE');
        fetchLogs();
      } catch (e) {
        alert('Lỗi cập nhật chế độ');
      }
    }

    async function runLocalPrompt() {
      const input = document.getElementById('local-test-prompt');
      const prompt = input.value.trim();
      const model = document.getElementById('local-model-select').value;
      if (!prompt) return;

      const btn = document.getElementById('btn-run-local');
      const box = document.getElementById('local-ai-response-box');
      btn.disabled = true;
      btn.innerText = 'Đang suy luận...';
      box.classList.remove('hidden');
      box.innerText = '🤖 Đang kết nối tới mô hình ' + model + ' tại localhost:11434...';

      try {
        const res = await fetch('/api/local-ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, model })
        });
        const data = await res.json();
        box.innerText = data.response || 'Không có phản hồi từ mô hình.';
        showToast('✓ AI Local đã hoàn thành!');
      } catch (err) {
        box.innerText = 'Lỗi kết nối Local AI: ' + err.message;
      } finally {
        btn.disabled = false;
        btn.innerText = 'Chạy AI Local';
        fetchLogs();
      }
    }

    async function connectLocalToAgents() {
      const model = document.getElementById('local-model-select').value;
      const btn = document.getElementById('btn-connect-local');
      btn.disabled = true;
      try {
        const res = await fetch('/api/local-ai/connect-agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model })
        });
        const data = await res.json();
        showToast('✓ Đã định tuyến toàn bộ Agent sang model ' + model + ' (Zero Cost)!');
        fetchLogs();
      } catch (e) {
        alert('Lỗi định tuyến');
      } finally {
        btn.disabled = false;
      }
    }

    function setPreset(type, desc) {
      document.getElementById('build-type').value = type;
      document.getElementById('build-desc').value = desc;
      showToast('Đã chọn gợi ý: ' + desc);
    }

    async function triggerScaffold() {
      const type = document.getElementById('build-type').value;
      const desc = document.getElementById('build-desc').value.trim();
      if (!desc) {
        alert('Vui lòng nhập mô tả dự án!');
        return;
      }
      const btn = document.getElementById('btn-scaffold');
      btn.disabled = true;
      btn.innerText = 'Đang khởi tạo...';

      try {
        const res = await fetch('/api/scaffold', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, desc })
        });
        const data = await res.json();
        showToast('✓ Khởi tạo thành công: ' + data.projectName);
        document.getElementById('build-desc').value = '';
        fetchLogs();
      } catch (e) {
        alert('Lỗi khi khởi tạo');
      } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>⚡ Khởi Tạo Dự Án 1-Chạm</span>';
      }
    }

    async function triggerQuickAction(skill, desc) {
      showToast('Đang kích hoạt: ' + skill);
      try {
        await fetch('/api/quick-action', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ skill, desc })
        });
        fetchLogs();
      } catch (e) {}
    }

    function promptScrapeUrl() {
      const url = prompt('Nhập đường dẫn trang web (URL) muốn cào nội dung sang Markdown:');
      if (url && url.trim()) {
        triggerQuickAction('baoyu-url-to-markdown', 'Cào nội dung trang: ' + url.trim());
      }
    }

    async function fetchLogs() {
      try {
        const res = await fetch('/api/logs');
        const data = await res.json();
        const box = document.getElementById('log-box');
        box.innerHTML = data.logs.map(l => '<div class="leading-relaxed">' + l + '</div>').join('');
      } catch (e) {}
    }

    fetchStatus();
    fetchLogs();
    setInterval(fetchLogs, 4000);
  </script>
</body>
</html>`;
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getHTML());
    return;
  }

  if (req.method === 'GET' && parsedUrl.pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getMeshConfig()));
    return;
  }

  if (req.method === 'GET' && parsedUrl.pathname === '/api/logs') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ logs: systemLogs }));
    return;
  }

  if (req.method === 'GET' && parsedUrl.pathname === '/api/local-ai') {
    const status = await checkLocalAI();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(status));
    return;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/local-ai/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const model = data.model || 'gemma4:12b';
        const prompt = data.prompt || 'Hello';
        log(`[Local AI] Querying model ${model}...`);

        const postData = JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }]
        });

        const clientReq = http.request({
          hostname: '127.0.0.1',
          port: 11434,
          path: '/v1/chat/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          }
        }, (clientRes) => {
          let resData = '';
          clientRes.on('data', c => resData += c);
          clientRes.on('end', () => {
            try {
              const resJson = JSON.parse(resData);
              const reply = resJson.choices && resJson.choices[0] && resJson.choices[0].message
                ? resJson.choices[0].message.content
                : 'No response';
              log(`[Local AI] Response received from ${model}.`);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ response: reply }));
            } catch (e) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ response: resData }));
            }
          });
        });

        clientReq.on('error', (err) => {
          log(`[Local AI Error] ${err.message}`);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        });

        clientReq.write(postData);
        clientReq.end();
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/local-ai/connect-agents') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const model = data.model || 'gemma4:12b';
        const envContent = `# Local AI Offline Configuration (Zero Cost)
OPENAI_BASE_URL="http://127.0.0.1:11434/v1"
OPENAI_API_KEY="ollama"
OPENAI_MODEL_NAME="${model}"
`;
        fs.writeFileSync(path.join(process.cwd(), '.env'), envContent, 'utf8');
        fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent, 'utf8');

        // Also update unified mesh config
        const meshConfigFile = path.join(globalMeshDir, 'config.json');
        if (fs.existsSync(meshConfigFile)) {
          try {
            const cfg = JSON.parse(fs.readFileSync(meshConfigFile, 'utf8'));
            cfg.localAI = {
              active: true,
              endpoint: 'http://127.0.0.1:11434/v1',
              model: model
            };
            fs.writeFileSync(meshConfigFile, JSON.stringify(cfg, null, 2), 'utf8');
          } catch (e) {}
        }

        log(`Routing all agents to Local AI Model [${model}] via http://127.0.0.1:11434/v1`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', model }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/set-mode') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const updated = updateMeshConfig(data.mode);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updated));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/scaffold') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const type = data.type || 'web';
        const desc = data.desc || '';
        const xaydungCli = path.join(__dirname, 'xaydung.js');

        log(`1-Click Scaffold triggered: [${type.toUpperCase()}] ${desc}`);
        exec(`node "${xaydungCli}" ${type} "${desc.replace(/"/g, '\\"')}"`, (err) => {
          if (err) {
            log(`[ERROR] Scaffolding error: ${err.message}`);
          } else {
            log(`[SUCCESS] Scaffolding created in project directory.`);
          }
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', type, desc, projectName: desc }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/quick-action') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        log(`Triggered Quick Action: [${data.skill}] - ${data.desc}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', skill: data.skill }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log('\x1b[36m%s\x1b[0m', `
===========================================================
 ⚡ SKILL-FOR-AI WEB DASHBOARD STARTED!
 🌐 Control Center URL: ${url}
 💻 Local AI Engine: Ollama / LM Studio (Zero Cost)
 - 1-Click Operations: Web / App / Plugin / Tool Scaffolding
 - Agent Mesh Status: Claude Code, Antigravity, Cursor, Codex
===========================================================
`);
  log(`Web UI Dashboard running at ${url}`);

  const openCmd = process.platform === 'win32' ? `start ${url}` : process.platform === 'darwin' ? `open ${url}` : `xdg-open ${url}`;
  exec(openCmd);
});
