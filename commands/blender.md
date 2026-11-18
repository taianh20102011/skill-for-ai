---
description: Điều khiển và tự động hóa Blender qua Model Context Protocol (MCP) và kịch bản bpy headless.
globs: *
---

# Lệnh /blender - Tự Động Hóa Blender & Điều Khiển MCP

Khi người dùng nhập:
```text
/blender [setup|run|optimize] <tệp tin>
```

Agent sẽ thực hiện:
1. **Thiết lập MCP Server**: Đấu nối Blender MCP (`ahujasid/mcp-for-blender`) vào Antigravity / Claude Code để tương tác trực tiếp với không gian 3D.
2. **Chạy kịch bản Headless (`bpy`)**: Viết và chạy script Python tự động tạo hình, làm mịn lưới, gắn xương (rigging) và xuất asset.
3. **Tối ưu hóa đa giác (`optimize`)**: Tự động giảm đa giác (Decimate Modifier) và bake normal map trước khi xuất ra `.glb`.
