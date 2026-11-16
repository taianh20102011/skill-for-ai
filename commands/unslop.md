---
description: Thực hiện kiểm toán và loại bỏ rác giao diện AI (AI Slop) qua 9 bước tuần tự chuẩn nhà thiết kế.
globs: *
---

# Lệnh /unslop - Khử Rác Giao Diện AI (De-Slopping UI)

Khi người dùng nhập:
```text
/unslop [tệp tin | đường dẫn URL | component]
```

Agent sẽ thực hiện kiểm tra và thiết kế lại giao diện theo đúng 9 bước tuần tự từ `heydamir/unslop`:

1. **Spacing Pass**: Chuẩn hóa hệ lưới 4px/8px, loại bỏ khoảng cách tùy tiện.
2. **Color Pass**: Triệt tiêu màu tím neon, gradient AI vô nghĩa; thay bằng bảng màu kiềm chế có tính định danh cao.
3. **Icons Pass**: Xóa toàn bộ emoji chèn vô tội vạ trong nhãn nút và tiêu đề; đồng bộ một bộ icon duy nhất (Lucide / Radix).
4. **Copy Pass**: Viết lại văn bản rõ ràng, tự nhiên, gạch bỏ các sáo ngữ quảng cáo rỗng tuếch (*"Supercharge", "Unleash"*).
5. **Typography Pass**: Phân cấp kích cỡ chữ rõ rệt, siết tracking cho tiêu đề lớn, dùng font cao cấp (*Plus Jakarta Sans / Geist*).
6. **Layout Pass**: Sắp đặt luồng thị giác có trọng tâm, dành không gian thở (whitespace) cho nội dung.
7. **Details Pass**: Dùng viền 1px phay CNC sắc sảo (`border border-[#E2E8F0]`) và bo góc đồng nhất (`rounded-[6px]`).
8. **Visuals Pass**: Thay thế các hình minh họa 3D bong bóng vô hồn bằng sơ đồ kiến trúc chuẩn hoặc ảnh mockup thực tế.
9. **Motion Pass**: Áp dụng vật lý lò xo 150–250ms tự nhiên, dứt khoát.
