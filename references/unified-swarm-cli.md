# Universal Swarm CLI: Bộ Điều Khiển CLI Hợp Nhất Đa Model AI

> **Lệnh toàn cục**: `swarm <task>` hoặc `swarm-cli <task>`
> **Được cài đặt toàn hệ thống**: Đã liên kết qua `npm link`
> **Hỗ trợ hợp nhất**: **OpenCode**, **Antigravity**, **Ollama**, **Claude Code**, **Qoder**, **Cursor**

---

## 1. Mục Đích & Kiến Trúc Hợp Nhất (Unified CLI Mesh)

Thay vì phải chạy từng công cụ riêng biệt với các câu lệnh khác nhau, **`swarm`** là một CLI duy nhất đóng vai trò **Bộ điều phối trung tâm (Central Orchestrator)**:
- Tự động nhận diện các engine AI đang cài trên máy bạn (**OpenCode**, **Ollama**, **Claude**, **Antigravity**).
- Tự động tiêm tiền tố đặc lệnh `!exec:` để kích hoạt trọn vẹn **52 kỹ năng**: Alabaster Porcelain UI, GSAP 25+, Bảo mật 2FA OTP, Ponytail YAGNI và Andrej Karpathy.
- Đồng bộ hóa bộ nhớ phiên làm việc qua `.ai-memory/handoff.md`.

---

## 2. Bảng Lệnh CLI Chi Tiết

| Lệnh | Ý nghĩa & Hành vi |
|---|---|
| `swarm "<nhiệm vụ>"` | Tự động chọn AI engine tốt nhất có sẵn trên máy và thực thi với toàn bộ 52 kỹ năng. |
| `swarm run "<nhiệm vụ>" -e opencode` | Ép buộc chạy qua **OpenCode** với cờ cấu hình đầy đủ. |
| `swarm run "<nhiệm vụ>" -e ollama` | Ép buộc chạy offline qua **Ollama** với model tối ưu `elite-agent`. |
| `swarm run "<nhiệm vụ>" -e claude` | Ép buộc chạy qua **Claude Code CLI**. |
| `swarm status` | Quét toàn bộ hệ thống, hiển thị đường dẫn và trạng thái của OpenCode, Ollama, Claude, Qoder, MCP. |
| `swarm link [thư_mục]` | Tiêm toàn bộ cấu hình 52 kỹ năng (`AGENTS.md`, `.mcp.json`, `.cursorrules`, `.opencode/`) vào bất kỳ dự án nào. |
| `swarm handoff --to <engine>` | Tạo điểm ngắt phiên để chuyển giao ngữ cảnh sang AI khác (từ Antigravity sang Ollama hoặc OpenCode). |
| `swarm serve` | Khởi chạy server giao diện Porcelain Studio tại `http://localhost:3000`. |
| `swarm mcp` | Khởi chạy server MCP stdio để các ứng dụng khác kết nối. |
| `swarm help` | Hiển thị hướng dẫn sử dụng nhanh. |

---

## 3. Ví Dụ Thực Tế

```bash
# 1. Kiểm tra trạng thái các AI trên máy
swarm status

# 2. Ra lệnh cho AI tự động làm việc (Auto engine)
swarm "xây dựng trang đăng nhập 2FA Gmail OTP với Alabaster UI"

# 3. Chạy cục bộ offline hoàn toàn bằng Ollama
swarm run "viết thuật toán phân quyền RBAC" -e ollama

# 4. Tiêm bộ kỹ năng vào một thư mục dự án mới
swarm link d:/du-an-moi
```
