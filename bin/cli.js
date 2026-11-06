#!/usr/bin/env node

/**
 * SKILL-FOR-AI CLI (Universal Agentic Mesh & Installer)
 * Compatible with: Claude Code, Google Antigravity, Cursor, Codex, OpenCode
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

if (process.argv.includes('ui') || process.argv.includes('dashboard')) {
  require('./dashboard.js');
  return;
}

const homeDir = os.homedir();
const sourceSkillsDir = path.join(__dirname, '..', 'skills');

console.log('\x1b[36m%s\x1b[0m', `
  ███████╗██╗  ██╗██╗██╗     ██╗         ███████╗ ██████╗ ██████╗      █████╗ ██╗
  ██╔════╝██║ ██╔╝██║██║     ██║         ██╔════╝██╔═══██╗██╔══██╗    ██╔══██╗██║
  ███████╗█████╔╝ ██║██║     ██║  █████╗ █████╗  ██║   ██║██████╔╝    ███████║██║
  ╚════██║██╔═██╗ ██║██║     ██║  ╚════╝ ██╔══╝  ██║   ██║██╔══██╗    ██╔══██║██║
  ███████║██║  ██╗██║███████╗███████╗    ██║     ╚██████╔╝██║  ██║    ██║  ██║██║
  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝
`);
console.log('\x1b[32m%s\x1b[0m', '>>> Universal AI Agent Skills & Multi-Agent Mesh Installer <<<\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    if (element === '.git' || element === 'node_modules' || element === '.DS_Store') return;
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    try {
      if (fs.lstatSync(fromPath).isDirectory()) {
        copyFolderSync(fromPath, toPath);
      } else {
        fs.copyFileSync(fromPath, toPath);
      }
    } catch (e) {
      // Ignore individual file lock errors
    }
  });
}

async function main() {
  console.log('\x1b[33m[!] UNIFIED MULTI-AGENT MESH INTEGRATION:\x1b[0m');
  console.log('    Automatically bridges Claude Code, Antigravity, Cursor, Codex, and OpenCode');
  console.log('    so all AI agents share the same skills, memory layer, and engineering standards.\n');

  const answerConnect = await ask('\x1b[36m? Connect all AI Agents into a unified multi-agent system? (Y/n): \x1b[0m');
  const allowConnect = !answerConnect || answerConnect.trim().toLowerCase() === 'y' || answerConnect.trim().toLowerCase() === 'yes';

  let selectedMode = 'senior';

  if (allowConnect) {
    console.log('\n\x1b[33m[*] SELECT OPERATING MODE:\x1b[0m');
    console.log('    \x1b[32m[1] Senior Dev Mode (Recommended):\x1b[0m YAGNI philosophy, Anti-Slop, self-healing compiler loops, auto security audits.');
    console.log('    \x1b[34m[2] Junior Dev Mode:\x1b[0m Step-by-step mentorship, in-depth logic explanations, comprehensive code comments.\n');
    
    const modeChoice = await ask('\x1b[36m? Enter your choice (1 or 2, default is 1): \x1b[0m');
    if (modeChoice.trim() === '2') {
      selectedMode = 'junior';
      console.log('\n\x1b[34m>>> Active: JUNIOR DEV MODE (Tutorial & In-Depth Mentorship)\x1b[0m\n');
    } else {
      selectedMode = 'senior';
      console.log('\n\x1b[32m>>> Active: SENIOR DEV MODE (YAGNI, Anti-Slop & Autonomous Self-Healing)\x1b[0m\n');
    }
  } else {
    console.log('\n\x1b[35m>>> Standalone Mode: Installing skills independently without cross-agent mesh.\x1b[0m\n');
  }

  // 1. Install Skills to Agent Platforms
  const targets = [
    { name: 'Google Antigravity / Gemini CLI', path: path.join(homeDir, '.gemini', 'config', 'skills') },
    { name: 'Claude Code', path: path.join(homeDir, '.claude', 'skills') },
    { name: 'OpenCode / Codex Agents', path: path.join(homeDir, '.agents', 'skills') }
  ];

  targets.forEach(target => {
    try {
      console.log(`\x1b[33m[*] Installing for ${target.name} at: ${target.path}\x1b[0m`);
      copyFolderSync(sourceSkillsDir, target.path);
      console.log(`\x1b[32m[✓] Successfully installed for ${target.name}!\x1b[0m\n`);
    } catch (err) {
      console.warn(`\x1b[31m[!] Could not write to ${target.name}: ${err.message}\x1b[0m\n`);
    }
  });

  // 2. Generate Mesh Config & Synchronize AGENTS.md + .cursorrules
  const modePromptText = selectedMode === 'senior' 
    ? `\n## 🌟 CURRENT ACTIVE MODE: SENIOR DEV (YAGNI & ANTI-SLOP)
- **Philosophy**: Write minimal, essential code to solve the exact problem. Zero over-engineering or premature abstractions.
- **Automation**: Always run build loops (e.g. pnpm build, cargo check), capture stack traces upon errors, and self-heal code.
- **Security**: Always verify against OWASP Top 10 and Cloudflare Security Guidelines before completion.`
    : `\n## 🌟 CURRENT ACTIVE MODE: JUNIOR DEV (TUTORIAL & DETAILED GUIDANCE)
- **Philosophy**: Guide the developer step-by-step. Clearly explain the purpose of each function, variable, and architecture layer.
- **Comments**: Include thorough educational inline comments throughout the code.
- **Discussion**: Prompt for developer feedback before executing major architectural refactoring.`;

  const sourceAgentsMdPath = path.join(__dirname, '..', 'AGENTS.md');
  let baseAgentsContent = fs.existsSync(sourceAgentsMdPath) ? fs.readFileSync(sourceAgentsMdPath, 'utf8') : '';

  const fullMeshContent = `# UNIFIED MULTI-AGENT SYSTEM SPECIFICATION
${modePromptText}

${baseAgentsContent}
`;

  // Write AGENTS.md and .cursorrules in current project
  fs.writeFileSync(path.join(process.cwd(), 'AGENTS.md'), fullMeshContent, 'utf8');
  fs.writeFileSync(path.join(process.cwd(), '.cursorrules'), fullMeshContent, 'utf8');
  console.log('\x1b[32m[✓] Synchronized AGENTS.md and .cursorrules for current workspace!\x1b[0m');

  // If mesh allowed, create bridge in global directory
  if (allowConnect) {
    const globalMeshDir = path.join(homeDir, '.unified-ai-mesh');
    if (!fs.existsSync(globalMeshDir)) fs.mkdirSync(globalMeshDir, { recursive: true });

    const meshConfig = {
      system: 'Unified AI Agent Mesh',
      version: '1.0.0',
      activeMode: selectedMode,
      linkedAgents: ['Claude Code', 'Antigravity', 'Cursor', 'Codex', 'OpenCode'],
      sharedMemoryPath: path.join(globalMeshDir, 'MEMORY.md'),
      lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(path.join(globalMeshDir, 'config.json'), JSON.stringify(meshConfig, null, 2), 'utf8');
    fs.writeFileSync(path.join(globalMeshDir, 'MEMORY.md'), fullMeshContent, 'utf8');
    console.log(`\x1b[32m[✓] Activated Unified Multi-Agent Mesh at: ${globalMeshDir}\x1b[0m`);
  }

  console.log('\x1b[36m%s\x1b[0m', `
===========================================================
 SETUP COMPLETE - AUTONOMOUS AI SYSTEM READY!
 - Active Mode: ${selectedMode.toUpperCase()} DEV MODE
 - Web Dashboard: skill-for-ai ui (http://localhost:3333)
 - Build Command: /xaydung [web|app|plugin|tool] <description>
 - Repository: https://github.com/taianh20102011/skill-for-ai
===========================================================
`);

  const answerUI = await ask('\x1b[36m? Launch Web UI Dashboard to control the AI system via 1-click web interface? (Y/n): \x1b[0m');
  const launchUI = !answerUI || answerUI.trim().toLowerCase() === 'y' || answerUI.trim().toLowerCase() === 'yes';

  rl.close();

  if (launchUI) {
    require('./dashboard.js');
  }
}

main().catch(err => {
  console.error('\x1b[31m[X] Installation error:\x1b[0m', err);
  rl.close();
  process.exit(1);
});
