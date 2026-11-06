#!/usr/bin/env node

/**
 * SKILL-FOR-AI CLI (Universal Agentic Mesh & Installer)
 * Compatible with: Claude Code, Google Antigravity, Cursor, Codex, OpenCode
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

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
  console.log('\x1b[33m[!] TÍNH NĂNG MẠNG LƯỚI ĐA AGENT (UNIFIED AI AGENT MESH):\x1b[0m');
  console.log('    Tự động kết nối Claude Code, Antigravity, Cursor, Codex, OpenCode');
  console.log('    để các Agent cùng chia sẻ chung một bộ nhớ, kỹ năng và quy chuẩn code.\n');

  const answerConnect = await ask('\x1b[36m? Bạn có cho phép tự động nối tất cả các AI Agent thành một hệ thống thống nhất không? (Y/n): \x1b[0m');
  const allowConnect = !answerConnect || answerConnect.trim().toLowerCase() === 'y' || answerConnect.trim().toLowerCase() === 'yes';

  let selectedMode = 'senior';

  if (allowConnect) {
    console.log('\n\x1b[33m[*] CHỌN CHẾ ĐỘ VẬN HÀNH (OPERATING MODE):\x1b[0m');
    console.log('    \x1b[32m[1] Senior Mode (Khuyên dùng):\x1b[0m Triệt tiêu code rác (YAGNI), Anti-Slop, tự sửa lỗi, tự audit bảo mật.');
    console.log('    \x1b[34m[2] Junior Mode:\x1b[0m Hướng dẫn từng bước, giải thích chi tiết, thêm nhiều comment chú thích code.\n');
    
    const modeChoice = await ask('\x1b[36m? Nhập lựa chọn của bạn (1 hoặc 2, mặc định là 1): \x1b[0m');
    if (modeChoice.trim() === '2') {
      selectedMode = 'junior';
      console.log('\n\x1b[34m>>> Đã chọn: JUNIOR DEV MODE (Giải thích cặn kẽ & Hướng dẫn từng bước)\x1b[0m\n');
    } else {
      selectedMode = 'senior';
      console.log('\n\x1b[32m>>> Đã chọn: SENIOR DEV MODE (YAGNI, Chống Slop & Tự động hoá cấp cao)\x1b[0m\n');
    }
  } else {
    console.log('\n\x1b[35m>>> Chế độ độc lập: Chỉ cài đặt bộ skills riêng biệt không ghép mạng.\x1b[0m\n');
  }

  // 1. Cài đặt bộ Skills vào các Agent Platforms
  const targets = [
    { name: 'Google Antigravity / Gemini CLI', path: path.join(homeDir, '.gemini', 'config', 'skills') },
    { name: 'Claude Code', path: path.join(homeDir, '.claude', 'skills') },
    { name: 'OpenCode / Codex Agents', path: path.join(homeDir, '.agents', 'skills') }
  ];

  targets.forEach(target => {
    try {
      console.log(`\x1b[33m[*] Đang cài đặt cho ${target.name} tại: ${target.path}\x1b[0m`);
      copyFolderSync(sourceSkillsDir, target.path);
      console.log(`\x1b[32m[✓] Cài đặt thành công cho ${target.name}!\x1b[0m\n`);
    } catch (err) {
      console.warn(`\x1b[31m[!] Không thể ghi vào ${target.name}: ${err.message}\x1b[0m\n`);
    }
  });

  // 2. Tạo cấu hình Mesh & Đồng bộ AGENTS.md + .cursorrules
  const modePromptText = selectedMode === 'senior' 
    ? `\n## 🌟 CURRENT ACTIVE MODE: SENIOR DEV (YAGNI & ANTI-SLOP)
- **Triết lý**: Viết code tối giản nhất có thể để giải quyết đúng bài toán. Cấm over-engineering hoặc tạo abstraction thừa thãi.
- **Tự động hoá**: Luôn tự chạy build loop, bắt stack trace khi lỗi và tự sửa code.
- **Bảo mật**: Luôn quét OWASP Top 10 và Cloudflare Security Guidelines trước khi hoàn thành.`
    : `\n## 🌟 CURRENT ACTIVE MODE: JUNIOR DEV (TUTORIAL & DETAILED GUIDANCE)
- **Triết lý**: Hướng dẫn người dùng từng bước một. Giải thích rõ ràng ý nghĩa của từng hàm, biến và khối code.
- **Comment**: Bổ sung chú thích (comments) chi tiết trong code để người học dễ theo dõi.
- **Thảo luận**: Hỏi ý kiến người dùng trước khi thực hiện các thay đổi lớn về mặt kiến trúc.`;

  const sourceAgentsMdPath = path.join(__dirname, '..', 'AGENTS.md');
  let baseAgentsContent = fs.existsSync(sourceAgentsMdPath) ? fs.readFileSync(sourceAgentsMdPath, 'utf8') : '';

  const fullMeshContent = `# UNIFIED MULTI-AGENT SYSTEM SPECIFICATION
${modePromptText}

${baseAgentsContent}
`;

  // Ghi AGENTS.md và .cursorrules tại thư mục hiện tại
  fs.writeFileSync(path.join(process.cwd(), 'AGENTS.md'), fullMeshContent, 'utf8');
  fs.writeFileSync(path.join(process.cwd(), '.cursorrules'), fullMeshContent, 'utf8');
  console.log('\x1b[32m[✓] Đã tạo file AGENTS.md và .cursorrules đồng bộ cho dự án hiện tại!\x1b[0m');

  // Nếu kết nối hệ thống, tạo cầu nối trong các thư mục global
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
    console.log(`\x1b[32m[✓] Đã kích hoạt Mạng Lưới Hợp Nhất (Unified Mesh) tại: ${globalMeshDir}\x1b[0m`);
  }

  console.log('\x1b[36m%s\x1b[0m', `
===========================================================
 HOÀN TẤT THIẾT LẬP HỆ THỐNG AI TỰ HÀNH!
 - Chế độ: ${selectedMode.toUpperCase()} DEV MODE
 - Lệnh xây dựng: /xaydung [web|app|plugin|tool] <mô tả>
 - Kho mã nguồn: https://github.com/taianh20102011/skill-for-ai
===========================================================
`);

  rl.close();
}

main().catch(err => {
  console.error('\x1b[31m[X] Lỗi cài đặt:\x1b[0m', err);
  rl.close();
  process.exit(1);
});
