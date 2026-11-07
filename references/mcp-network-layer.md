# Universal Swarm MCP: Mạng Lưới MCP Kết Nối Toàn Bộ Kỹ Năng & AI

> **Mô hình**: Model Context Protocol (MCP) Server chuẩn JSON-RPC 2.0 stdio
> **Đường dẫn**: `d:\skill\mcp-server\index.js`
> **Cấu hình**: `d:\skill\.mcp.json`

Server này hoạt động như một **Mạng Lưới Lớp (Network Mesh Layer)** kết nối mọi nền tảng AI (**Antigravity, OpenCode, Ollama, Claude Code, Cursor, Codex**) với nhau thông qua chuẩn giao thức MCP của Anthropic.

---

## 1. Cơ chế Hoạt động của Mạng Lưới (AI Mesh Architecture)

```
       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
       │   Antigravity   │       │    OpenCode     │       │  Ollama (Local) │
       └────────┬────────┘       └────────┬────────┘       └────────┬────────┘
                │                         │                         │
                └───────────────────┐     │     ┌───────────────────┘
                                    ▼     ▼     ▼
               +----------------------------------------------------+
               |           Universal Swarm MCP Hub (Port/Stdio)     |
               |             (d:\skill\mcp-server\index.js)         |
               +-------------------------+--------------------------+
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
[🛠️ MCP Tools]                  [📚 MCP Resources]               [🧠 Cross Memory]
• swarm_execute                 • skill://tree                    • .ai-memory/
• get_alabaster_ui_component    • skill://tokens/alabaster          handoff.md
• audit_security_and_mfa        • skill://security/invariants       (Bàn giao phiên
• ponytail_clean_bloat          • skill://gsap/bundle               xuyên model)
• ai_memory_handoff
```

---

## 2. Danh sách MCP Tools Được Cung Cấp

1. **`swarm_execute`**:
   - Tự động phối hợp 52 kỹ năng: Phân rã bài toán, áp dụng UI Alabaster 6px, GSAP 25+, bảo mật 2FA OTP, và lọc code Ponytail YAGNI.
2. **`get_alabaster_ui_component`**:
   - Sinh code component chuẩn Alabaster Porcelain (`#F7F8FA`, bo góc 6px, viền Sub-pixel 1px CNC, Plus Jakarta Sans).
3. **`audit_security_and_mfa`**:
   - Kiểm toán lỗ hổng mã nguồn, ép kiểm tra mã OTP Gmail qua HMAC-SHA256, thu hồi phiên cũ và Zero-Trust RBAC.
4. **`ponytail_clean_bloat`**:
   - Áp dụng nguyên lý Ponytail & Karpathy: gọt giũa -53% code thừa, xóa bỏ abstraction vô bổ, chỉ giữ code phẫu thuật chính xác.
5. **`ai_memory_handoff`**:
   - Tạo file bàn giao phiên làm việc `.ai-memory/handoff.md` để chuyển tiếp giữa các model.
6. **`query_skills_catalog`**:
   - Truy vấn toàn bộ danh mục cây 52 kỹ năng.

---

## 3. Cách Kết Nối Từng Nền Tảng Vào Mạng Lưới

### A. Đối với Antigravity
Đã được đăng ký sẵn tại: `C:\Users\Tin\.gemini\antigravity\mcp\universal_swarm_mcp\`. Antigravity có thể gọi trực tiếp các công cụ này dưới dạng native tools.

### B. Đối với OpenCode & Cursor
Đã tạo file cấu hình chuẩn: [`d:\skill\.mcp.json`](file:///d:/skill/.mcp.json):
```json
{
  "mcpServers": {
    "universal-swarm": {
      "command": "node",
      "args": ["d:/skill/mcp-server/index.js"]
    }
  }
}
```

### C. Đối với Claude Code & Claude Desktop
Thêm vào file cấu hình Claude Desktop:
```json
{
  "mcpServers": {
    "universal-swarm": {
      "command": "node",
      "args": ["d:/skill/mcp-server/index.js"]
    }
  }
}
```

### D. Đối với Ollama
Các ứng dụng chat kết nối Ollama có hỗ trợ MCP (như LibreChat, Open WebUI, AnythingLLM, Cline) chỉ cần trỏ lệnh khởi chạy stdio vào:
`node d:/skill/mcp-server/index.js`
Model cục bộ của Ollama sẽ ngay lập tức nhìn thấy toàn bộ các công cụ và tài nguyên của hệ sinh thái 52 kỹ năng.
