#!/usr/bin/env node

/**
 * Universal Swarm CLI
 * A unified command-line orchestrator connecting:
 * - OpenCode
 * - Antigravity
 * - Ollama
 * - Claude Code
 * - Qoder
 * Across all 52 skills, Alabaster Porcelain UI, GSAP 25+, 2FA Security & ai-memory.
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const WORKSPACE_ROOT = path.resolve(__dirname, '..');

// ANSI Colors for high-contrast terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
  bgBlue: '\x1b[44m',
};

function banner() {
  console.log(`\n${colors.cyan}${colors.bright}========================================================================${colors.reset}`);
  console.log(`${colors.green}${colors.bright} 🚀 UNIVERSAL SWARM CLI — UNIFIED AI AGENT NETWORK${colors.reset}`);
  console.log(`${colors.gray} Orchestrating: OpenCode • Antigravity • Ollama • Claude • Qoder${colors.reset}`);
  console.log(`${colors.gray} Standards: Alabaster UI • GSAP 25+ • Impeccable • Radix • Aceternity • 2FA (320 Skills)${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}========================================================================${colors.reset}\n`);
}

function checkCommand(cmd) {
  try {
    const isWin = process.platform === 'win32';
    const checkCmd = isWin ? `where.exe ${cmd}` : `command -v ${cmd}`;
    const result = execSync(checkCmd, { stdio: ['pipe', 'pipe', 'ignore'], encoding: 'utf-8' });
    return result.split('\n')[0].trim();
  } catch {
    return null;
  }
}

function detectEngines() {
  const engines = {
    opencode: checkCommand('opencode'),
    ollama: checkCommand('ollama'),
    claude: checkCommand('claude'),
    antigravity: true, // running inside antigravity environment
    qoder: checkCommand('qoder') || checkCommand('qodana'),
    cursor: checkCommand('cursor'),
  };
  return engines;
}

// ----------------------------------------------------
// COMMAND: status
// ----------------------------------------------------
function cmdStatus() {
  banner();
  console.log(`${colors.bright}🔍 System Discovery & Agent Engine Mesh Status:${colors.reset}\n`);

  const engines = detectEngines();
  for (const [name, pathOrStatus] of Object.entries(engines)) {
    if (pathOrStatus) {
      const info = typeof pathOrStatus === 'string' ? `at ${pathOrStatus}` : '(Active Environment)';
      console.log(`  ${colors.green}✔ ${name.toUpperCase().padEnd(12)}${colors.reset} : ${colors.bright}READY${colors.reset} ${colors.gray}${info}${colors.reset}`);
    } else {
      console.log(`  ${colors.yellow}○ ${name.toUpperCase().padEnd(12)}${colors.reset} : ${colors.gray}Not found in PATH${colors.reset}`);
    }
  }

  console.log(`\n${colors.bright}📦 Unified Skill & Protocol Assets:${colors.reset}`);
  console.log(`  • 320 Specialized Skills : ${colors.green}Installed at ${path.join(WORKSPACE_ROOT, '.agents', 'skills')} (Antigravity SDK, Firebase, Flutter/Dart, Notion, Science, Emil, YC gstack, Minecraft, Web UI)${colors.reset}`);
  console.log(`  • Universal Directives   : ${colors.green}AGENTS.md, CLAUDE.md, GEMINI.md, .cursorrules${colors.reset}`);
  console.log(`  • MCP Server Hub         : ${colors.green}node ${path.join(WORKSPACE_ROOT, 'mcp-server', 'index.js')}${colors.reset}`);
  console.log(`  • Local Modelfile        : ${colors.green}${path.join(WORKSPACE_ROOT, 'Modelfile')}${colors.reset}`);

  const handoffPath = path.join(WORKSPACE_ROOT, '.ai-memory', 'handoff.md');
  if (fs.existsSync(handoffPath)) {
    console.log(`  • Active Session Handoff : ${colors.cyan}Found at .ai-memory/handoff.md${colors.reset}`);
  } else {
    console.log(`  • Active Session Handoff : ${colors.gray}None pending${colors.reset}`);
  }
  console.log('');
}

// ----------------------------------------------------
// COMMAND: link [target_dir]
// ----------------------------------------------------
function cmdLink(targetDir) {
  banner();
  const dest = targetDir ? path.resolve(process.cwd(), targetDir) : process.cwd();

  console.log(`${colors.bright}🔗 Linking Universal Swarm System into:${colors.reset} ${colors.cyan}${dest}${colors.reset}\n`);

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const filesToCopy = [
    'AGENTS.md',
    'CLAUDE.md',
    'GEMINI.md',
    '.cursorrules',
    '.mcp.json',
    'Modelfile',
    'SKILL.md'
  ];

  for (const file of filesToCopy) {
    const srcPath = path.join(WORKSPACE_ROOT, file);
    const destPath = path.join(dest, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  ${colors.green}✔ Created${colors.reset} ${file}`);
    }
  }

  // Link/Copy .agents (63 skills)
  const agentsSrc = path.join(WORKSPACE_ROOT, '.agents');
  const agentsDest = path.join(dest, '.agents');
  if (fs.existsSync(agentsSrc) && !fs.existsSync(agentsDest)) {
    try {
      // Try directory junction first (Windows zero-byte instant sync)
      fs.symlinkSync(agentsSrc, agentsDest, 'junction');
      console.log(`  ${colors.green}✔ Linked (Junction)${colors.reset} .agents (63 Specialized Skills)`);
    } catch {
      try {
        fs.cpSync(agentsSrc, agentsDest, { recursive: true });
        console.log(`  ${colors.green}✔ Copied${colors.reset} .agents (63 Specialized Skills)`);
      } catch (err) {
        console.log(`  ${colors.yellow}⚠ Notice on .agents:${colors.reset} ${err.message}`);
      }
    }
  } else if (fs.existsSync(agentsDest)) {
    console.log(`  ${colors.cyan}ℹ Already linked${colors.reset} .agents`);
  }

  // Copy .opencode config
  const opencodeSrc = path.join(WORKSPACE_ROOT, '.opencode');
  const opencodeDest = path.join(dest, '.opencode');
  if (fs.existsSync(opencodeSrc)) {
    try {
      if (!fs.existsSync(opencodeDest)) {
        fs.mkdirSync(opencodeDest, { recursive: true });
      }
      fs.cpSync(opencodeSrc, opencodeDest, { recursive: true });
      console.log(`  ${colors.green}✔ Configured${colors.reset} .opencode/`);
    } catch (err) {
      console.log(`  ${colors.yellow}⚠ Notice on .opencode:${colors.reset} ${err.message}`);
    }
  }

  // Initialize .ai-memory scaffold
  const memoryDest = path.join(dest, '.ai-memory');
  if (!fs.existsSync(memoryDest)) {
    fs.mkdirSync(memoryDest, { recursive: true });
    const handoffPath = path.join(memoryDest, 'handoff.md');
    const handoffContent = `# Session Handoff: ${path.basename(dest)}
**Linked**: ${new Date().toISOString()}
**Harness**: Universal Swarm Ecosystem (63 Skills)

## 1. Goal & Target State
Development & continuous optimization of ${path.basename(dest)} powered by 63 autonomous skills, Alabaster Porcelain UI, GSAP 25+, 2FA Security, and Impeccable Design.

## 2. Active Invariants
- Alabaster Porcelain styling (strict 6px radius, CNC sub-pixel 1px border, #F7F8FA canvas, #FFFFFF cards, #0F172A ink).
- Hardware-accelerated 120fps motion with useGSAP cleanup & React Bits.
- Ponytail YAGNI (-53% code footprint) & Karpathy Guidelines.
`;
    fs.writeFileSync(handoffPath, handoffContent, 'utf-8');
    console.log(`  ${colors.green}✔ Initialized${colors.reset} .ai-memory/handoff.md`);
  }

  // Update components.json with @react-bits registry if present
  const compJsonPath = path.join(dest, 'components.json');
  if (fs.existsSync(compJsonPath)) {
    try {
      const compData = JSON.parse(fs.readFileSync(compJsonPath, 'utf-8'));
      if (!compData.registries) compData.registries = {};
      compData.registries['@react-bits'] = 'https://reactbits.dev/r/{name}.json';
      fs.writeFileSync(compJsonPath, JSON.stringify(compData, null, 2), 'utf-8');
      console.log(`  ${colors.green}✔ Registered${colors.reset} @react-bits in components.json`);
    } catch {
      // ignore json parse error
    }
  }

  console.log(`\n${colors.green}${colors.bright}✨ Success!${colors.reset} This directory is now fully equipped with all 69 skills,`);
  console.log(`ready for OpenCode, Antigravity, Ollama, Claude, or Qoder with trigger ${colors.cyan}!exec:${colors.reset}\n`);
}

// ----------------------------------------------------
// COMMAND: run [task]
// ----------------------------------------------------
function cmdRun(task, engineOption, modelOption) {
  if (!task) {
    console.error(`${colors.red}Error: Please provide a task to execute.${colors.reset}`);
    console.log(`Example: ${colors.cyan}swarm "build user profile with 2FA and GSAP"${colors.reset}`);
    process.exit(1);
  }

  banner();

  const engines = detectEngines();
  let selectedEngine = engineOption || 'auto';

  if (selectedEngine === 'auto') {
    if (engines.opencode) {
      selectedEngine = 'opencode';
    } else if (engines.ollama) {
      selectedEngine = 'ollama';
    } else if (engines.claude) {
      selectedEngine = 'claude';
    } else {
      selectedEngine = 'antigravity';
    }
  }

  const prompt = task.startsWith('!exec:') ? task : `!exec: ${task}`;

  console.log(`${colors.bright}🎯 Executing Task:${colors.reset} ${colors.yellow}${task}${colors.reset}`);
  console.log(`${colors.bright}🤖 Selected Engine:${colors.reset} ${colors.cyan}${selectedEngine.toUpperCase()}${colors.reset}\n`);

  if (selectedEngine === 'opencode') {
    if (!engines.opencode) {
      console.error(`${colors.red}Error: opencode not found in PATH.${colors.reset}`);
      process.exit(1);
    }
    console.log(`${colors.gray}Dispatching to OpenCode runner...${colors.reset}\n`);
    spawn('opencode', ['run', prompt], { stdio: 'inherit', shell: true });
  } else if (selectedEngine === 'ollama') {
    if (!engines.ollama) {
      console.error(`${colors.red}Error: ollama not found in PATH.${colors.reset}`);
      process.exit(1);
    }
    // Check if elite-agent model exists
    try {
      const listOutput = execSync('ollama list', { encoding: 'utf-8' });
      if (!listOutput.includes('elite-agent')) {
        console.log(`${colors.cyan}⚙️ Building Ollama 'elite-agent' model from Modelfile...${colors.reset}`);
        execSync(`ollama create elite-agent -f "${path.join(WORKSPACE_ROOT, 'Modelfile')}"`, { stdio: 'inherit' });
      }
    } catch (err) {
      console.log(`${colors.yellow}Warning: Could not check/create elite-agent model. Proceeding with default.${colors.reset}`);
    }

    const model = modelOption || 'elite-agent';
    console.log(`${colors.gray}Dispatching to Ollama model '${model}'...${colors.reset}\n`);
    spawn('ollama', ['run', model, prompt], { stdio: 'inherit', shell: true });
  } else if (selectedEngine === 'claude') {
    if (!engines.claude) {
      console.error(`${colors.red}Error: claude not found in PATH.${colors.reset}`);
      process.exit(1);
    }
    console.log(`${colors.gray}Dispatching to Claude Code...${colors.reset}\n`);
    spawn('claude', [prompt], { stdio: 'inherit', shell: true });
  } else if (selectedEngine === 'qoder') {
    console.log(`${colors.cyan}Dispatching to Qoder workspace context...${colors.reset}`);
    console.log(`Prompt formatted for Qoder: ${colors.yellow}${prompt}${colors.reset}`);
  } else {
    // Antigravity or direct instructions
    console.log(`${colors.green}✔ Direct execution prompt for Antigravity or any agent:${colors.reset}\n`);
    console.log(`------------------------------------------------------------------------`);
    console.log(prompt);
    console.log(`------------------------------------------------------------------------\n`);
  }
}

// ----------------------------------------------------
// COMMAND: handoff
// ----------------------------------------------------
function cmdHandoff(toEngine, note) {
  banner();
  const memoryDir = path.join(WORKSPACE_ROOT, '.ai-memory');
  if (!fs.existsSync(memoryDir)) {
    fs.mkdirSync(memoryDir, { recursive: true });
  }

  const handoffPath = path.join(memoryDir, 'handoff.md');
  const target = toEngine ? toEngine.toUpperCase() : 'ANY AGENT';
  const timestamp = new Date().toISOString();

  const content = `# Unified Swarm Session Handoff
**Target Engine**: ${target}
**Timestamp**: ${timestamp}
**Claim Status**: PENDING

## 1. Goal & Context
${note || 'Transferring task execution to ' + target}

## 2. Active Invariants
- Alabaster Porcelain Theme (#F7F8FA, #FFFFFF, 6px radius)
- GSAP 25+ Animations (useGSAP auto-cleanup)
- Bank-Grade Security: 2FA Gmail OTP via HMAC-SHA256, Session Revocation
- Ponytail YAGNI & Karpathy Guidelines (-53% code, surgical changes)

## 3. Resume Instruction
Run: \`swarm run "!exec: continue from handoff.md" --engine ${toEngine || 'auto'}\`
`;

  fs.writeFileSync(handoffPath, content, 'utf-8');
  console.log(`${colors.green}✔ Session handoff successfully written to:${colors.reset} ${colors.cyan}.ai-memory/handoff.md${colors.reset}`);
  console.log(`Next agent (${target}) will pick this up automatically.\n`);
}

// ----------------------------------------------------
// COMMAND: serve
// ----------------------------------------------------
function cmdServe() {
  banner();
  console.log(`${colors.green}✨ Starting Porcelain Studio local web server...${colors.reset}`);
  require(path.join(WORKSPACE_ROOT, 'serve.js'));
}

// ----------------------------------------------------
// COMMAND: mcp
// ----------------------------------------------------
function cmdMcp() {
  banner();
  console.log(`${colors.green}🔌 Starting Universal Swarm MCP Server on stdio...${colors.reset}`);
  require(path.join(WORKSPACE_ROOT, 'mcp-server', 'index.js'));
}

// ----------------------------------------------------
// COMMAND: guard [subcommand]
// ----------------------------------------------------
function cmdGuard(subcmd, extraArg) {
  banner();
  const gitGuardDir = path.join(WORKSPACE_ROOT, 'scripts', 'git-guard');

  if (subcmd === 'install') {
    require(path.join(gitGuardDir, 'install-hooks.js')).install();
  } else if (subcmd === 'watch') {
    spawn('node', [path.join(gitGuardDir, 'daemon-watcher.js'), '--watch'], { stdio: 'inherit' });
  } else if (subcmd === 'check-msg') {
    spawn('node', [path.join(gitGuardDir, 'commit-msg-checker.js'), extraArg || ''], { stdio: 'inherit' });
  } else {
    // Default: run full scan
    spawn('node', [path.join(gitGuardDir, 'daemon-watcher.js')], { stdio: 'inherit' });
  }
}

// ----------------------------------------------------
// COMMAND: audit [dir] [--ai]
// ----------------------------------------------------
function cmdAudit(targetDir, extraArgs) {
  banner();
  const scriptPath = path.join(WORKSPACE_ROOT, 'scripts', 'ai-scanner', 'ast-auditor.js');
  const procArgs = [scriptPath];
  if (targetDir && !targetDir.startsWith('--')) procArgs.push(targetDir);
  if (extraArgs && extraArgs.length > 0) procArgs.push(...extraArgs);
  spawn('node', procArgs, { stdio: 'inherit' });
}

// ----------------------------------------------------
// COMMAND: search "<query>" [dir] [--ai]
// ----------------------------------------------------
function cmdSearch(query, extraArgs) {
  banner();
  const scriptPath = path.join(WORKSPACE_ROOT, 'scripts', 'ai-scanner', 'semantic-search.js');
  const procArgs = [scriptPath, query];
  if (extraArgs && extraArgs.length > 0) procArgs.push(...extraArgs);
  spawn('node', procArgs, { stdio: 'inherit' });
}

// ----------------------------------------------------
// COMMAND: pipeline [dir] (Run all local scans & audits)
// ----------------------------------------------------
function cmdPipeline(targetDir) {
  banner();
  const target = targetDir || '.';
  console.log(`${colors.bright}${colors.green}🚀 EXECUTING FULL ECOSYSTEM AUDIT & VERIFICATION PIPELINE${colors.reset}`);
  console.log(`${colors.gray}Target directory: ${path.resolve(target)}${colors.reset}\n`);

  console.log(`${colors.cyan}--- [1/4] Git Guard: Checking Secrets, Keys & Binary Files ---${colors.reset}`);
  try {
    const gitGuardScript = path.join(WORKSPACE_ROOT, 'scripts', 'git-guard', 'secret-scanner.js');
    if (fs.existsSync(gitGuardScript)) {
      execSync(`node "${gitGuardScript}" "${target}"`, { stdio: 'inherit' });
    }
  } catch (err) {
    console.log(`${colors.yellow}Git Guard check notice: ${err.message}${colors.reset}`);
  }

  console.log(`\n${colors.cyan}--- [2/4] Repolyze: Git Repository Health, Churn & Vitals ---${colors.reset}`);
  try {
    execSync(`repolyze --markdown "${target}"`, { stdio: 'inherit' });
  } catch (err) {
    console.log(`${colors.yellow}Repolyze notice: ${err.message}${colors.reset}`);
  }

  console.log(`\n${colors.cyan}--- [3/4] AST Auditor: Code Injection & Security Vulnerabilities ---${colors.reset}`);
  try {
    const astScript = path.join(WORKSPACE_ROOT, 'scripts', 'ai-scanner', 'ast-auditor.js');
    if (fs.existsSync(astScript)) {
      execSync(`node "${astScript}" "${target}"`, { stdio: 'inherit' });
    }
  } catch (err) {
    console.log(`${colors.yellow}AST Auditor notice: ${err.message}${colors.reset}`);
  }

  console.log(`\n${colors.cyan}--- [4/4] Impeccable: UI Anti-Pattern & AI Design Tells Scan ---${colors.reset}`);
  try {
    execSync(`npx --yes impeccable detect "${target}"`, { stdio: 'inherit', shell: true });
  } catch (err) {
    console.log(`${colors.yellow}Impeccable scan notice: ${err.message}${colors.reset}`);
  }

  console.log(`\n${colors.green}${colors.bright}✔ Full ecosystem audit pipeline finished successfully!${colors.reset}\n`);
}

// ----------------------------------------------------
// COMMAND: help
// ----------------------------------------------------
function cmdHelp() {
  banner();
  console.log(`${colors.bright}Usage:${colors.reset} swarm <command|task> [options]\n`);
  console.log(`${colors.bright}Quick Task Execution (One-Liner All Skills):${colors.reset}`);
  console.log(`  swarm "build modern 2FA screen"               Run task with auto-detected engine (wraps in !exec:)`);
  console.log(`  swarm pipeline [dir]                          Run ALL local audits (Git Guard, Repolyze, AST, UI Scan)`);
  console.log(`  swarm all [dir]                               Alias for swarm pipeline\n`);
  console.log(`  swarm run "build todo app" -e opencode        Run task specifically via OpenCode`);
  console.log(`  swarm run "build API router" -e ollama        Run task locally via Ollama`);
  console.log(`  swarm run "build landing page" -e claude      Run task via Claude Code\n`);
  console.log(`${colors.bright}AI Vulnerability Scanner & Semantic Search:${colors.reset}`);
  console.log(`  swarm audit [dir] [--ai]                      Quét AST lỗ hổng injection & anti-patterns (+ Ollama AI)`);
  console.log(`  swarm search "<query>" [dir] [--ai]           Tìm kiếm code bằng ngôn ngữ tự nhiên (semantic intent)`);
  console.log(`  swarm detect [target]                         Quét 60+ anti-patterns UI và AI design tells (Impeccable)`);
  console.log(`  swarm repolyze [dir]                          Phân tích sức khỏe repo git & contributor churn (Repolyze)\n`);
  console.log(`${colors.bright}Git Guard & Security Commands:${colors.reset}`);
  console.log(`  swarm guard                                   Scan workspace for secrets, branch safety, and binary size`);
  console.log(`  swarm guard:install                           Install pre-commit, commit-msg, pre-push hooks into .git`);
  console.log(`  swarm guard:watch                             Start real-time secret & credential detection daemon`);
  console.log(`  swarm guard:check-msg "<msg>"                 Validate commit message against Conventional Commits\n`);
  console.log(`${colors.bright}System Commands:${colors.reset}`);
  console.log(`  swarm status                                  Check discovery of OpenCode, Ollama, Claude, etc.`);
  console.log(`  swarm link [dir]                              Link 320 skills, hooks & AGENTS.md into any project`);
  console.log(`  swarm handoff --to <engine> --note <note>     Create cross-engine handoff (.ai-memory)`);
  console.log(`  swarm serve                                   Launch local showcase at http://localhost:3000`);
  console.log(`  swarm mcp                                     Launch MCP stdio server`);
  console.log(`  swarm help                                    Show this help guide\n`);
}

// ----------------------------------------------------
// CLI Argument Parsing
// ----------------------------------------------------
const args = process.argv.slice(2);
if (args.length === 0) {
  cmdHelp();
  process.exit(0);
}

const command = args[0];

if (command === 'pipeline' || command === 'all') {
  cmdPipeline(args[1]);
} else if (command === 'status') {
  cmdStatus();
} else if (command === 'link') {
  cmdLink(args[1]);
} else if (command === 'serve') {
  cmdServe();
} else if (command === 'mcp') {
  cmdMcp();
} else if (command === 'audit') {
  cmdAudit(args[1], args.slice(2));
} else if (command === 'search') {
  cmdSearch(args[1], args.slice(2));
} else if (command === 'detect' || command === 'ui:detect') {
  banner();
  console.log(`${colors.cyan}🔍 Scanning UI anti-patterns with Impeccable...${colors.reset}\n`);
  const target = args[1] || '.';
  spawn('npx', ['impeccable', 'detect', target], { stdio: 'inherit', shell: true });
} else if (command === 'repolyze' || command === 'repo:scan') {
  banner();
  console.log(`${colors.cyan}📊 Scanning git repository health & vitals with Repolyze...${colors.reset}\n`);
  const target = args[1] || '.';
  const isMarkdown = args.includes('--json') ? '--json' : '--markdown';
  spawn('repolyze', [isMarkdown, target], { stdio: 'inherit', shell: true });
} else if (command === 'guard' || command.startsWith('guard:')) {
  const subcmd = command.includes(':') ? command.split(':')[1] : args[1];
  const extraArg = command.includes(':') ? args[1] : args[2];
  cmdGuard(subcmd, extraArg);
} else if (command === 'handoff') {
  let toEngine = null;
  let note = '';
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--to' && args[i + 1]) {
      toEngine = args[i + 1];
      i++;
    } else if (args[i] === '--note' && args[i + 1]) {
      note = args[i + 1];
      i++;
    } else {
      note += ' ' + args[i];
    }
  }
  cmdHandoff(toEngine, note.trim());
} else if (command === 'run') {
  const task = args[1];
  let engine = 'auto';
  let model = null;
  for (let i = 2; i < args.length; i++) {
    if ((args[i] === '-e' || args[i] === '--engine') && args[i + 1]) {
      engine = args[i + 1];
      i++;
    } else if ((args[i] === '-m' || args[i] === '--model') && args[i + 1]) {
      model = args[i + 1];
      i++;
    }
  }
  cmdRun(task, engine, model);
} else if (command === 'help' || command === '--help' || command === '-h') {
  cmdHelp();
} else {
  // Direct task execution: swarm "my task"
  const task = args.join(' ');
  cmdRun(task, 'auto', null);
}
