# ⚡ SKILL-FOR-AI: Hệ Sinh Thái 331+ Kỹ Năng Agent, Bộ Làm Video Lập Trình & /xaydung

<div align="center">

[English](./README.md) | **Tiếng Việt**

</div>

> **Bộ 331+ kỹ năng tự hành (Autonomous Agent Skills), công cụ khởi tạo dự án siêu tốc `/xaydung`, bộ công nghệ làm video lập trình (Remotion, 3Blue1Brown Manim, HyperFrames, VieNeu-TTS, ViFastTTS, FFmpeg) và Game Dev toàn diện** dành cho các AI Coding Agents: **Claude Code, Google Antigravity, Cursor, OpenAI Codex, OpenCode, Aider, và Cline**.

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

Lệnh trên sẽ tự động cài đặt và liên kết toàn bộ **331+ Kỹ Năng** vào môi trường làm việc của bạn:
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
/xaydung video <mô tả kịch bản video / đồ họa toán học>
/xaydung plugin <tính năng plugin minecraft paper/purpur>
/xaydung tool <công cụ CLI hoặc script tự động hóa>
```

### Hoặc chạy trực tiếp từ Terminal:
```bash
xaydung web "SaaS Landing page dark mode với GSAP ScrollTrigger và Lenis"
xaydung app "Ứng dụng ghi chú markdown cho desktop bằng Tauri v2"
xaydung game "Game 2D Roguelite survivor có hitstop, rung màn hình và EventBus"
xaydung video "Video chứng minh giải tích toán học 3D có thuyết minh tiếng Việt"
xaydung plugin "Plugin đồng bộ kinh tế đa server dùng Adventure MiniMessage"
xaydung tool "Công cụ CLI phân tích log tốc độ cao có kèm unit test"
```

### 🏗️ Các Kiến Trúc Tự Động Hóa Hỗ Trợ:
1. **`web`**: React 19 + Tailwind CSS + GSAP 25+ + Lenis Smooth Scroll + Animate UI (Chuẩn Anti-Slop `#080808`, font Geist / Plus Jakarta Sans).
2. **`app`**: Desktop App siêu nhẹ (Tauri v2 + Rust) hoặc Ứng dụng di động (Flutter).
3. **`game`**: Godot 4.3+ GDScript (Static typing bắt buộc, CharacterBody2D/3D, kiến trúc "Call Down, Signal Up", Autoload EventBus, Hitstop 60ms, Camera shake, Coyote time & Jump buffering).
4. **`video`**: Video lập trình bằng mã nguồn với Remotion (React 19 + Three.js), hoạt họa toán học 3Blue1Brown Manim, thuyết minh AI tiếng Việt (VieNeu-TTS / ViFastTTS) và tự động né âm (audio ducking) qua FFmpeg.
5. **`plugin`**: Minecraft Paper/Purpur Plugin chuẩn doanh nghiệp (Adventure Kyori MiniMessage, Lamp command framework, Triumph-GUI).
6. **`tool`**: Công cụ CLI chuẩn production, tích hợp sẵn vòng lặp tự biên dịch và tự sửa lỗi khi có exception.

---

## 🎬 Bộ Công Nghệ Video Lập Trình, Toán Học & Giọng Đọc AI

* **`programmatic-video-remotion`**: Tạo video hoàn toàn bằng code React 19 qua Remotion, nhúng 3D Three.js (`@remotion/three`), vật lý lò xo (spring physics) chuẩn xác từng frame, xuất video MP4 tự động.
* **`math-animation-manim`**: Engine hoạt họa toán học của 3Blue1Brown: biến đổi mượt mà công thức LaTeX (`TransformMatchingTex`), vẽ đồ thị hàm số và không gian 3D.
* **`vietnamese-neural-tts`**: Tạo giọng đọc AI tiếng Việt tự nhiên chuẩn vùng miền (Bắc/Trung/Nam) bằng **VieNeu-TTS** và **ViFastTTS** (streaming thời gian thực), chuẩn hóa số/ký hiệu, tự động sinh phụ đề `.srt` bám sát từng từ.
* **`media-pipeline-ffmpeg`**: Quy trình xử lý video/audio qua FFmpeg: tự động giảm nhạc nền khi có giọng đọc (`sidechaincompress` audio ducking), dập cứng phụ đề, tăng tốc phần cứng NVENC, cắt định dạng 16:9 sang 9:16 Shorts/Reels/TikTok.
* **`motion-graphics-hyperframes`**: HyperFrames, GSAP Timelines, và Three.js render canvas 60fps không phụ thuộc vào thời gian thực để xuất video đồ họa chuyển động sắc nét.

---

## 🎮 Bộ Vũ Khí Phát Triển Game (Game Development & Game Feel)

* **`game-development-godot`**: Chuẩn Godot 4.3+ GDScript, Static Typing bắt buộc, tách biệt Node ("Call Down, Signal Up"), cấu trúc dữ liệu Resource (`.tres`), và kiểm thử ngầm (`godot --headless --quit`).
* **`game-development-unity`**: Chuẩn Unity C#, tối ưu hiệu năng không sinh rác bộ nhớ (Zero-GC Object Pooling `UnityEngine.Pool`), kênh sự kiện ScriptableObjects, và New Input System.
* **`game-design-and-feel`**: Thiết kế Core Loop, viết GDD mẫu, công thức cân bằng game, và 5 chuẩn Game Feel ("Juice"): Rung màn hình, Dừng khung hình (Hitstop 60ms), Kéo dãn (Squash & Stretch), Coyote Time (120ms) & Bộ đệm nhảy (Jump Buffering 100ms).
* **`game-assets-and-audio`**: Danh bạ tài nguyên miễn phí 100% bản quyền thương mại (Kenney.nl, Quaternius Low-poly 3D, Adobe Mixamo, Poly Haven, AmbientCG, Freesound, Sonniss GDC).
* **`game-engine-mcp-integration`**: Cấp "tay chân" cho AI trực tiếp điều khiển Game Engine (Godot MCP, Unity MCP, Blender MCP, Aseprite MCP).

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

## 📦 Danh Mục Kỹ Năng Đóng Gói (331 Kỹ Năng)

* **Video Lập Trình & Đồ Họa Toán Học**: `programmatic-video-remotion`, `math-animation-manim`, `vietnamese-neural-tts`, `media-pipeline-ffmpeg`, `motion-graphics-hyperframes`.
* **Làm Game Chuyên Nghiệp**: `game-development-godot`, `game-development-unity`, `game-design-and-feel`, `game-assets-and-audio`, `game-engine-mcp-integration`.
* **Giao Diện Web Cao Cấp (Anti-Slop)**: `anti-slop-web-ui`, `react-bits`, `animate-ui`, `cinematic-3d-web`, `gsap-scroll-mastery`, `vercel-react-performance`.
* **Tự Động Hóa Web & Mobile**: `browser-use-agent`, `mobile-app-automation-agent`.
* **Kiến Trúc Sạch Minecraft**: 13 kỹ năng Paper/Purpur & modding (`minecraft-plugin-dev`, `minecraft-modding`, `minecraft-commands-scripting`, v.v.).
* **Bảo Mật & Phòng Thủ Doanh Nghiệp**: `cloudflare-security-audit`, `owasp-top-10-audit`, `owasp-security-cheatsheets`, `siem-detection-and-blue-team`, `secret-leak-detection`, `reverse-engineer-anything` (REA).
* **Vòng Lặp Tự Hành**: `superpowers`, `ponytail`, `local-ai-engine` (Ollama/LM Studio offline), `autonomous-execution-loop`.

---

## 📄 License
Phát hành dưới giấy phép [MIT License](LICENSE).  
Tự do sử dụng, chỉnh sửa và tích hợp cho cả mục đích cá nhân lẫn thương mại.
