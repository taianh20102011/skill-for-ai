---
description: Kiểm toán và tối ưu hóa dự án Web theo bộ quy chuẩn nền tảng hiện đại của Google Chrome DevRel.
globs: *
---

# Lệnh /modern-web-guidance - Quy Chuẩn Web Hiện Đại Google Chrome

Khi người dùng nhập:
```text
/modern-web-guidance [tệp tin | thư mục]
```

Agent sẽ rà soát và nâng cấp mã nguồn web:
1. **CSS Container Queries (`@container`)**: Thay thế các hàm lắng nghe resize JavaScript bằng vùng chứa thích ứng linh hoạt.
2. **CSS Anchor Positioning**: Neo giữ popover, tooltip, context menu thuần túy bằng CSS thay vì thư viện Popper.js cồng kềnh.
3. **Native Dialog & Popover**: Dùng thẻ chuẩn `<dialog>` và thuộc tính `popover` có sẵn trên trình duyệt.
4. **Core Web Vitals**: Kiểm định chỉ số LCP (< 2.5s), INP (< 200ms) và CLS (< 0.1) chống giật cục bố cục.
