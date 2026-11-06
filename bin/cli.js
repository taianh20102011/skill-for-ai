#!/usr/bin/env node

/**
 * SKILL-FOR-AI CLI (1-Click Installer)
 * Compatible with: Claude Code, Google Antigravity, Cursor, Codex, OpenCode
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

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
console.log('\x1b[32m%s\x1b[0m', '>>> Universal AI Agent Skills & Anti-Slop Installer <<<\n');

// Target locations for popular agents
const targets = [
  { name: 'Google Antigravity / Gemini CLI', path: path.join(homeDir, '.gemini', 'config', 'skills') },
  { name: 'Claude Code', path: path.join(homeDir, '.claude', 'skills') },
  { name: 'OpenCode / Codex Agents', path: path.join(homeDir, '.agents', 'skills') }
];

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

targets.forEach(target => {
  try {
    console.log(`\x1b[33m[*] Đang cài đặt cho ${target.name} tại: ${target.path}\x1b[0m`);
    copyFolderSync(sourceSkillsDir, target.path);
    console.log(`\x1b[32m[✓] Cài đặt thành công cho ${target.name}!\x1b[0m\n`);
  } catch (err) {
    console.warn(`\x1b[31m[!] Không thể ghi vào ${target.name}: ${err.message}\x1b[0m\n`);
  }
});

// Copy AGENTS.md to current working directory if not present
const currentAgentsMd = path.join(process.cwd(), 'AGENTS.md');
const sourceAgentsMd = path.join(__dirname, '..', 'AGENTS.md');

if (fs.existsSync(sourceAgentsMd) && !fs.existsSync(currentAgentsMd)) {
  fs.copyFileSync(sourceAgentsMd, currentAgentsMd);
  console.log('\x1b[32m[✓] Đã tạo file AGENTS.md chuẩn Anti-Slop ngay tại project hiện tại!\x1b[0m');
}

console.log('\x1b[36m%s\x1b[0m', `
===========================================================
 HOÀN TẤT CÀI ĐẶT BỘ SKILLS VÀ CÂU LỆNH TỰ HÀNH!
 - Dùng lệnh: /xaydung [web|app|plugin|tool] <mô tả>
 - Kho mã nguồn: https://github.com/taianh20102011/skill-for-ai
===========================================================
`);
