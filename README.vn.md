# ⚡ SKILL-FOR-AI: Ultimate Agentic Skills & Anti-Slop Ecosystem

<div align="center">

[English](./README.md) | **Tiếng Việt** | [Français](./README.fr.md) | [简体中文](./README.zh.md)

</div>

> **Bộ kỹ năng tự hành (Autonomous Agent Skills), hệ thống liên kết đa Agent (Multi-Agent Mesh) và quy chuẩn thiết kế Anti-Slop toàn diện** dành cho các AI Coding Agents: **Claude Code, Google Antigravity, Cursor, OpenAI Codex, OpenCode, Aider, và Cline**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/badge/npm-skill--for--ai-blue.svg)](https://www.npmjs.com/)

---

## 🚀 Cài Đặt 1-Click & Liên Kết Hệ Thống AI

Chỉ cần chạy duy nhất một lệnh trong Terminal:

```bash
npx skill-for-ai
```
*(Hoặc chạy trực tiếp từ GitHub nếu chưa publish: `npx github:taianh20102011/skill-for-ai`)*

Lệnh trên sẽ tự động nạp toàn bộ **90+ Kỹ Năng** vào môi trường Agent của bạn:
* 🔹 **Google Antigravity / Gemini CLI**: `~/.gemini/config/skills`
* 🔹 **Claude Code**: `~/.claude/skills`
* 🔹 **OpenCode / Codex Agents**: `~/.agents/skills`
* 🔹 **Cursor / VS Code**: Tự động sinh `AGENTS.md` và `.cursorrules` ngay tại thư mục làm việc.

---

### 🤖 Cơ Chế Hỏi Quyền & Lựa Chọn Chế Độ Thông Minh
Khi chạy cài đặt, CLI sẽ chủ động hỏi xác nhận của bạn:
1. **Xác nhận kết nối mạng lưới đa Agent**:
   ```text
   ? Bạn có cho phép tự động nối tất cả các AI Agent thành một hệ thống thống nhất không? (Y/n)
   ```
2. **Chọn chế độ vận hành (Operating Mode)**:
   * 🌟 **Senior Dev Mode (Khuyên dùng)**:
     * Kích hoạt triết lý **YAGNI (Ponytail)**: Viết code tối giản, triệt tiêu code rác và abstraction thừa thãi.
     * Tự động chạy terminal build loop (`pnpm build`, `./gradlew build`, `cargo check`), bắt stack trace khi lỗi và tự vá mã nguồn.
     * Tự động kiểm toán bảo mật qua Cloudflare Security Guidelines và OWASP Top 10.
   * 🎓 **Junior Dev Mode**:
     * Chế độ trợ giảng: Hướng dẫn người dùng từng bước một, giải thích chi tiết ý nghĩa từng hàm/biến.
     * Bổ sung nhiều comment chú thích trong code để người học dễ nắm bắt.

---

## 🛠️ Lệnh Tự Hành Siêu Cấp: `/xaydung`

Sau khi cài đặt, bạn chỉ cần gõ lệnh trong khung chat của **Antigravity / Claude Code / Cursor**:

```text
/xaydung web <mô tả ý tưởng web>
/xaydung app <mô tả ứng dụng desktop hoặc mobile>
/xaydung plugin <mô tả tính năng plugin minecraft>
/xaydung tool <mô tả CLI utility hoặc script>
```

### Chu trình tự động chạy ngầm:
1. **Phân tích kiến trúc & Brainstorming**: Lên kế hoạch và đặc tả kỹ thuật chi tiết.
2. **Khởi tạo Scaffold**: Chọn chuẩn stack tối ưu (React/Tailwind/GSAP/Lenis hoặc Tauri v2 / Rust hoặc Paper Adventure).
3. **Thực thi mã nguồn**: Viết code chuẩn theo mode đã chọn (Senior hoặc Junior).
4. **Vòng lặp tự sửa lỗi (Compiler Loop)**: Tự chạy compile, tự đọc stack trace khi lỗi và tự sửa code.
5. **Kiểm toán bảo mật**: Tự động rà soát qua Cloudflare Security Guidelines, OWASP Top 10 và Semgrep SAST.

---

## 📦 Danh Mục Kỹ Năng (90+ Skills Packaged)

### 1. Web UI & Hiệu Ứng Đỉnh Cao (Crafted UI - Zero Slop)
* **`anti-slop-web-ui`**: Triết lý thiết kế sang trọng: Dark mode `#080808`, typography Geist / JetBrains Mono, micro-physics 150-250ms.
* **`react-bits`**: Tích hợp danh mục animated components từ React Bits: *SplitText, DecryptedText, Iridescence, Aurora, Particles, SpotlightCard*.
* **`animate-ui`**: Micro-interactions mượt mà chuẩn Apple/Linear: dialog morphing, smooth tabs, spring physics.
* **`cinematic-3d-web`**: 3D Canvas với R3F, Drei, Three.js, shaders GLSL tối ưu 60 FPS.
* **`gsap-scroll-mastery`**: GSAP ScrollTrigger đồng bộ Lenis Smooth Scroll.
* **`vercel-react-performance`**: Tối ưu Core Web Vitals (LCP < 2s, INP < 150ms, CLS < 0.05).

### 2. Tự Động Hóa Web & Mobile (Browser & Mobile Agents)
* **`browser-use-agent`**: Biến LLM thành Web Agent tự động điều hướng, điền form, cào dữ liệu qua Playwright.
* **`mobile-app-automation-agent`**: Điều khiển và kiểm thử tự động UI Mobile (Android UIAutomator2, iOS XCUITest, Appium, LaVague LAM).

### 3. Minecraft Clean Architecture & AI Sandbox
* **Bộ 13 Kỹ Năng Minecraft**: `minecraft-plugin-dev`, `minecraft-modding`, `minecraft-commands-scripting`, `minecraft-datapack`, `minecraft-server-admin`, `minecraft-worldedit-ops`, v.v.
* **Tích hợp Sandbox**: Kết nối với các dự án `AgentCraft` (văn phòng ảo cho coding agent) và `MindCraft` (Mineflayer bot).

### 4. Kiểm Toán Bảo Mật & Phòng Thủ (Enterprise CyberSecurity)
* **`cloudflare-security-audit`**: Quy chuẩn kiểm toán bảo mật toàn diện từ Cloudflare.
* **`owasp-top-10-audit` & `owasp-security-cheatsheets`**: Kiểm tra và phòng chống 10 lỗ hổng nghiêm trọng theo chuẩn OWASP.
* **`siem-detection-and-blue-team`**: Biên dịch và viết luật giám sát phát hiện tấn công theo chuẩn Sigma YAML; phòng thủ Active Directory.
* **`secret-leak-detection`**: Quét chặn rò rỉ API Keys (OpenAI, AWS, GitHub) trước khi commit.
* **`reverse-engineer-anything` (REA)**: Dịch ngược nhị phân, kiểm tra APK, Electron, WebAssembly.

### 5. Vòng Lặp Lập Trình Tự Hành (Autonomous Loop)
* **`superpowers`**: Brainstorming, lập kế hoạch (`writing-plans`), subagent-driven development, TDD, và verification-before-completion.
* **`ponytail`**: Lazy Senior Dev mode (YAGNI, triệt tiêu code rác, kiểm toán nợ kỹ thuật).
* **`agent-skills-addy`**: Toàn bộ tinh hoa Web Engineering từ Google Chrome Lead (Addy Osmani).

---

## ⚖️ Nguồn Tham Chiếu & Bản Quyền (Attribution & Acknowledgements)

Dự án này tổng hợp, chuẩn hóa và đóng gói các kỹ năng mở dựa trên các công trình xuất sắc từ cộng đồng mã nguồn mở thế giới:

1. **Addy Osmani** - [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (MIT License).
2. **Jesse Vincent (obra)** - [obra/superpowers](https://github.com/obra/superpowers) (MIT License).
3. **Dietrich Gebert** - [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (MIT License).
4. **David Haz (DavidHDev)** - [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) (MIT License).
5. **Skyleen (imskyleen)** - [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui) (MIT License).
6. **Cloudflare Team** - [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) (MIT License).
7. **OWASP Foundation** - [OWASP/CheatSheetSeries](https://github.com/OWASP/CheatSheetSeries) (Creative Commons Attribution-ShareAlike).
8. **SigmaHQ** - [SigmaHQ/sigma](https://github.com/SigmaHQ/sigma) (Detection rules public standard).
9. **Daniel Miessler** - [danielmiessler/SecLists](https://github.com/danielmiessler/SecLists) (MIT License).
10. **Swissky** - [swisskyrepo/PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings) (MIT License).
11. **trimstray** - [trimstray/the-book-of-secret-knowledge](https://github.com/trimstray/the-book-of-secret-knowledge) (MIT License).
12. **Jahrome907** - [Jahrome907/minecraft-agent-skills](https://github.com/Jahrome907/minecraft-agent-skills) (MIT License).
13. **morluto** - [morluto/rea](https://github.com/morluto/rea) (MIT License).
14. **browser-use team** - [browser-use/browser-use](https://github.com/browser-use/browser-use) (MIT License).
15. **Kamran Ahmed** - [kamranahmedse/developer-roadmap](https://github.com/kamranahmedse/developer-roadmap).
16. **Mozilla MDN Contributors** - [mdn/learning-area](https://github.com/mdn/learning-area) (CC0 / CC BY).

---

## 📄 License
Phát hành dưới giấy phép [MIT License](LICENSE).
Tự do sử dụng, chỉnh sửa, tích hợp cho cả mục đích cá nhân lẫn thương mại.
