# ⚡ SKILL-FOR-AI: Hệ Sinh Thái 325+ Kỹ Năng Agent, Bộ Game Dev Toàn Diện & /xaydung

<div align="center">

[English](./README.md) | **Tiếng Việt**

</div>

> **Bộ 325+ kỹ năng tự hành (Autonomous Agent Skills), công cụ khởi tạo dự án siêu tốc `/xaydung`, kho tài nguyên & chuẩn làm game toàn diện (Godot / Unity)** dành cho các AI Coding Agents: **Claude Code, Google Antigravity, Cursor, OpenAI Codex, OpenCode, Aider, và Cline**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/badge/npm-skill--for--ai-blue.svg)](https://www.npmjs.com/package/skill-for-ai)

---

## 🚀 Cài Đặt 1-Click & Liên Kết Hệ Thống Đa Agent

Chỉ cần chạy duy nhất một lệnh trong Terminal:

```bash
npx skill-for-ai
```
*(Hoặc chạy tự động bỏ qua xác nhận: `npx skill-for-ai -y`)*

Lệnh trên sẽ tự động cài đặt và liên kết toàn bộ **325+ Kỹ Năng** vào môi trường làm việc của bạn:
* 🔹 **Google Antigravity / Gemini CLI**: `~/.gemini/config/skills`
* 🔹 **Claude Code**: `~/.claude/skills`
* 🔹 **OpenCode / Codex Agents**: `~/.agents/skills`
* 🔹 **Cursor / VS Code**: Tự động sinh `AGENTS.md` và `.cursorrules` ngay tại thư mục dự án hiện tại.

---

## 🛠️ Siêu Lệnh Tự Hành Khởi Tạo Dự Án: `/xaydung`

`skill-for-ai` tích hợp sẵn bộ khung tự động khởi tạo dự án. Bạn có thể gọi trực tiếp trong **Terminal** hoặc **gõ ngay trong khung chat của Antigravity, Claude Code, Cursor**:

```text
/xaydung web <mô tả dự án web>
/xaydung app <mô tả ứng dụng desktop hoặc mobile>
/xaydung game <mô tả tựa game / gameplay>
/xaydung plugin <tính năng plugin minecraft paper/purpur>
/xaydung tool <công cụ CLI hoặc script tự động hóa>
```

### Hoặc chạy trực tiếp từ Terminal:
```bash
xaydung web "SaaS Landing page dark mode với GSAP ScrollTrigger và Lenis"
xaydung app "Ứng dụng ghi chú markdown cho desktop bằng Tauri v2"
xaydung game "Game 2D Roguelite survivor có hitstop, rung màn hình và EventBus"
xaydung plugin "Plugin đồng bộ kinh tế đa server dùng Adventure MiniMessage"
xaydung tool "Công cụ CLI phân tích log tốc độ cao có kèm unit test"
```

### 🏗️ Các Kiến Trúc Tự Động Hóa Hỗ Trợ:
1. **`web`**: React 19 + Tailwind CSS + GSAP 25+ + Lenis Smooth Scroll + Animate UI (Chuẩn Anti-Slop `#080808`, font Geist / Plus Jakarta Sans).
2. **`app`**: Desktop App siêu nhẹ (Tauri v2 + Rust) hoặc Ứng dụng di động (Flutter).
3. **`game`**: Godot 4.3+ GDScript (Static typing bắt buộc, CharacterBody2D/3D, kiến trúc "Call Down, Signal Up", Autoload EventBus, Hitstop 60ms, Camera shake, Coyote time & Jump buffering).
4. **`plugin`**: Minecraft Paper/Purpur Plugin chuẩn doanh nghiệp (Adventure Kyori MiniMessage, Lamp command framework, Triumph-GUI).
5. **`tool`**: Công cụ CLI chuẩn production, tích hợp sẵn vòng lặp tự biên dịch và tự sửa lỗi khi có exception.

---

## 🎮 Bộ Vũ Khí Phát Triển Game (Game Development & Game Feel)

`skill-for-ai` cung cấp toàn bộ quy chuẩn làm game chuyên nghiệp và kho tài nguyên miễn phí:

* **`game-development-godot`**: Chuẩn Godot 4.3+ GDScript, Static Typing bắt buộc (`var hp: int = 100`), tách biệt Node ("Call Down, Signal Up"), cấu trúc dữ liệu Resource (`.tres`), và kiểm thử ngầm không cần mở đồ họa (`godot --headless --quit`).
* **`game-development-unity`**: Chuẩn Unity C#, tối ưu hiệu năng không sinh rác bộ nhớ (Zero-GC Object Pooling `UnityEngine.Pool`), kênh sự kiện ScriptableObjects, và New Input System.
* **`game-design-and-feel`**: Thiết kế Vòng lặp cốt lõi (Core Loop), công thức Cân bằng game (Game Balancing), tài liệu GDD mẫu, và 5 quy chuẩn Game Feel ("Juice"): Rung màn hình (Screen Shake), Dừng khung hình (Hitstop 60ms), Kéo dãn nhân vật (Squash & Stretch), Coyote Time (120ms) & Bộ đệm nhảy (Jump Buffering 100ms).
* **`game-assets-and-audio`**: Danh bạ tài nguyên miễn phí 100% bản quyền thương mại (CC0 / CC-BY):
  * *2D & UI*: [Kenney.nl](https://kenney.nl) (Hơn 20.000 assets CC0), Itch.io free assets, OpenGameArt.org, CraftPix, Game-icons.net (4.000+ vector icons).
  * *3D & Textures*: Quaternius.com (Model Low-poly CC0 có sẵn xương animation), Poly.pizza, Adobe Mixamo (Gắn xương và animation tự động), Poly Haven & AmbientCG (Vật liệu PBR và HDRI CC0).
  * *Âm thanh & BGM*: Freesound.org (CC0), Pixabay SFX & Music, Sonniss GDC (Hàng chục GB âm thanh phòng thu Hollywood miễn phí), Incompetech.
  * *Mã nguồn mẫu GitHub*: `KenneyNL`, `Calinou/awesome-godot`, `ellisonleao/magictools`.
* **`game-engine-mcp-integration`**: Cấp "tay chân" cho AI trực tiếp điều khiển Game Engine:
  * *Godot MCP*: AI tự chạy game headless, tự đọc log debugger khi crash để tự sửa code, tự tạo Scene `.tscn`.
  * *Unity MCP*: AI tương tác Hierarchy, chỉnh sửa Prefab và kiểm tra lỗi Console.
  * *Blender MCP*: AI tự động dựng model 3D qua Python API và xuất file `.glb`.
  * *Aseprite MCP*: AI tự vẽ sprite pixel art và xuất spritesheet tự động.

---

## 🌐 Trung Tâm Điều Khiển Web Dashboard (1-Chạm Là Xong)

```bash
# Khởi chạy từ terminal
skill-for-ai ui
# Hoặc dùng lệnh ngắn gọn
xaydung ui
```
*(Bảng điều khiển chạy cục bộ tại `http://localhost:3333`, hoàn toàn không cần cài thêm thư viện phụ thuộc)*

---

## 📦 Danh Mục Kỹ Năng Đóng Gói (325 Kỹ Năng)

* **Giao Diện Web Cao Cấp (Anti-Slop)**: `anti-slop-web-ui`, `react-bits`, `animate-ui`, `cinematic-3d-web`, `gsap-scroll-mastery`, `vercel-react-performance`.
* **Làm Game Chuyên Nghiệp**: `game-development-godot`, `game-development-unity`, `game-design-and-feel`, `game-assets-and-audio`, `game-engine-mcp-integration`.
* **Tự Động Hóa Web & Mobile**: `browser-use-agent`, `mobile-app-automation-agent`.
* **Kiến Trúc Sạch Minecraft**: 13 kỹ năng Paper/Purpur & modding (`minecraft-plugin-dev`, `minecraft-modding`, `minecraft-commands-scripting`, v.v.).
* **Bảo Mật & Phòng Thủ Doanh Nghiệp**: `cloudflare-security-audit`, `owasp-top-10-audit`, `owasp-security-cheatsheets`, `siem-detection-and-blue-team`, `secret-leak-detection`, `reverse-engineer-anything` (REA).
* **Vòng Lặp Tự Hành**: `superpowers`, `ponytail`, `local-ai-engine` (Ollama/LM Studio offline), `autonomous-execution-loop`.

---

## 📄 License
Phát hành dưới giấy phép [MIT License](LICENSE).  
Tự do sử dụng, chỉnh sửa và tích hợp cho cả mục đích cá nhân lẫn thương mại.
