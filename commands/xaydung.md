---
description: Tự động khởi tạo và xây dựng toàn diện dự án Web, App, Minecraft Plugin, hoặc Desktop Tool theo chuẩn Anti-Slop.
globs: *
---

# Lệnh /xaydung - Kiến Trúc Sư Tự Hành (Autonomous Builder)

Khi người dùng nhập:
```text
/xaydung web <mô tả dự án>
/xaydung app <mô tả ứng dụng>
/xaydung plugin <mô tả plugin minecraft>
/xaydung tool <mô tả công cụ / CLI>
```

Agent sẽ ngay lập tức kích hoạt chu trình 6 bước tự động:

## 1. Phân Tích & Chọn Stack Chuẩn
- **`web`**: Next.js / Vite + React 19 + Tailwind CSS + shadcn/ui (Monochrome palette `#080808`) + GSAP ScrollTrigger + Lenis Smooth Scroll + Animate UI / React Bits components.
- **`app`**:
  - *Desktop*: Tauri v2 (Rust Core siêu nhẹ <15MB RAM) + React/Tailwind.
  - *Mobile*: Flutter (Impeller engine, BLoC/Riverpod) hoặc React Native (New Architecture JSI, NativeWind).
- **`plugin`**: Paper / Purpur Minecraft Plugin kiến trúc sạch: Adventure Kyori (MiniMessage hex), Triumph-GUI phân trang, Lamp Annotation Commands, Lucko Helper Schedulers.
- **`tool`**: Node/Python/Rust CLI Tool với auto-test loop và command palette.

## 2. Kích Hoạt Vòng Lặp Xây Dựng (Autonomous Execution Loop)
1. **Brainstorming & Planning**: Tự tạo checklist tính năng và cấu trúc thư mục.
2. **Scaffold Boilerplate**: Khởi tạo cấu trúc file sạch, cài dependency chuẩn.
3. **Thực thi code**: Viết code sạch, tối giản theo chuẩn Senior Dev (YAGNI - Ponytail), không tạo code thừa.
4. **Compile & Test Loop**: Tự chạy terminal (`pnpm build`, `./gradlew build`, hoặc `cargo check`), đọc lỗi compiler trong stack trace và tự sửa đến khi build pass.
5. **Security Audit**: Tự chạy `semgrep scan` và đối chiếu `OWASP Top 10` + `Cloudflare Security Audit`.
6. **Bàn giao kết quả**: Báo cáo các file đã tạo, hướng dẫn khởi chạy 1-click cho người dùng.
