---
description: Tự động khởi tạo và xây dựng toàn diện dự án Web, App, Game, Video, Minecraft Plugin, hoặc Desktop Tool theo chuẩn Anti-Slop.
globs: *
---

# Lệnh /xaydung - Kiến Trúc Sư Tự Hành (Autonomous Builder)

Khi người dùng nhập:
```text
/xaydung web <mô tả dự án>
/xaydung app <mô tả ứng dụng>
/xaydung game <mô tả tựa game>
/xaydung video <mô tả video / motion graphics>
/xaydung plugin <mô tả plugin minecraft>
/xaydung tool <mô tả công cụ / CLI>
```

Agent sẽ ngay lập tức kích hoạt chu trình tự động hóa toàn diện:

## 1. Phân Tích & Chọn Stack Chuẩn
- **`web`**: Next.js / Vite + React 19 + Tailwind CSS + shadcn/ui (Monochrome palette `#080808`) + GSAP ScrollTrigger + Lenis Smooth Scroll + Animate UI / React Bits components.
- **`app`**:
  - *Desktop*: Tauri v2 (Rust Core siêu nhẹ <15MB RAM) + React/Tailwind.
  - *Mobile*: Flutter (Impeller engine, BLoC/Riverpod) hoặc React Native (New Architecture JSI, NativeWind).
- **`game`**:
  - *Engine*: Godot 4.3+ GDScript (Static Typing, `CharacterBody2D/3D`, `await`, `instantiate()`) hoặc Unity 6+ (C#, zero-GC pooling).
  - *Kiến trúc*: Decoupled "Call Down, Signal Up", Autoload EventBus, Custom Resource (.tres) data models.
  - *Game Feel (Juice)*: Hitstop (60ms freeze), Camera shake, Coyote Time, Jump buffering, Squash & stretch.
  - *Kho tài nguyên*: Kenney.nl (CC0), Quaternius (CC0), Freesound.org audio.
- **`video`**:
  - *Framework*: Remotion (React 19 + TypeScript) + Three.js (`@remotion/three`) + GSAP Timelines.
  - *Đồ họa Toán học*: 3Blue1Brown Manim (`manim`), LaTeX formulas (`MathTex`), geometric transforms.
  - *Âm thanh & Voiceover*: Vietnamese Neural TTS (VieNeu-TTS / ViFastTTS) + FFmpeg auto-ducking + subtitle burning.
  - *Render*: Xuất MP4 60FPS không cần giao diện đồ họa (headless).
- **`plugin`**: Paper / Purpur Minecraft Plugin kiến trúc sạch: Adventure Kyori (MiniMessage hex), Triumph-GUI phân trang, Lamp Annotation Commands, Lucko Helper Schedulers.
- **`tool`**: Node/Python/Rust CLI Tool với auto-test loop và command palette.

## 2. Kích Hoạt Vòng Lặp Xây Dựng (Autonomous Execution Loop)
1. **Brainstorming & Planning**: Tự tạo checklist tính năng, tài liệu GDD (Game Design Document) hoặc Spec và cấu trúc thư mục.
2. **Scaffold Boilerplate**: Khởi tạo cấu trúc file sạch, cài dependency chuẩn.
3. **Thực thi code**: Viết code sạch, tối giản theo chuẩn Senior Dev (YAGNI - Ponytail), không tạo code thừa.
4. **Compile & Test Loop**: Tự chạy terminal (`pnpm build`, `godot --headless --quit`, `remotion render`, `./gradlew build`, hoặc `cargo check`), đọc lỗi compiler trong stack trace và tự sửa đến khi build pass.
5. **Security Audit**: Tự chạy `semgrep scan` và đối chiếu `OWASP Top 10` + `Cloudflare Security Audit`.
6. **Bàn giao kết quả**: Báo cáo các file đã tạo, hướng dẫn khởi chạy 1-click cho người dùng.
