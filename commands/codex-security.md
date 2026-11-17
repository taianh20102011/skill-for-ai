---
description: Quét lỗ hổng bảo mật và tự động tạo bản vá phẫu thuật bán kính hẹp theo tiêu chuẩn OpenAI Codex.
globs: *
---

# Lệnh /codex-security - Kiểm Toán & Vá Lỗ Hổng Bảo Mật OpenAI Codex

Khi người dùng nhập:
```text
/codex-security [tệp tin | thư mục]
```

Agent sẽ thực thi chu trình rà quét và khắc phục:
1. **Rò rỉ khóa bảo mật**: Quét API Key (OpenAI, Anthropic, AWS, GitHub Token, Private Key).
2. **Lỗ hổng tiêm lệnh & mã (Injection)**: SQL Injection, Command Injection (`exec`, `eval`), XSS.
3. **Bản vá phẫu thuật (Minimal Blast Radius)**: Tạo bản vá chính xác đúng vị trí lỗi, không làm xáo trộn code xung quanh.
4. **Kiểm thử hồi quy tự động**: Xác nhận bản vá pass bài test an ninh trước khi kết thúc.
