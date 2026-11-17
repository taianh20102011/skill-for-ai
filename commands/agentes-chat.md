---
description: Khởi tạo và kết nối trung tâm điều phối cộng tác đa Agent tự host Agentes Chat.
globs: *
---

# Lệnh /agentes-chat - Trung Tâm Điều Phối Đa Agent Agentes Chat

Khi người dùng nhập:
```text
/agentes-chat [init|start|status]
```

Agent sẽ:
1. **Khởi tạo Docker Compose**: Cấu hình Agentes Chat cùng Postgres DB và biến môi trường API keys.
2. **Thiết lập kênh đa Agent**: Phân vai cụ thể cho từng Agent theo kênh chuyên biệt (`#frontend`, `#security`, `#gamedev`).
3. **Đấu nối công cụ MCP**: Gắn bus công cụ Model Context Protocol cho các Agent trong kênh chat.
