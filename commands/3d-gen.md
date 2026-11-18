---
description: Tạo tài nguyên 3D (GLB, OBJ) tự động từ văn bản hoặc hình ảnh sử dụng TRELLIS, Hunyuan3D-2, TripoSR hoặc LLaMA-Mesh.
globs: *
---

# Lệnh /3d-gen - Tạo Tài Nguyên 3D Tự Hành (Autonomous 3D Asset Generator)

Khi người dùng nhập:
```text
/3d-gen <mô tả prompt | đường dẫn ảnh> [--engine trellis|hunyuan|triposr|llama-mesh]
```

Agent sẽ thực hiện chu trình tạo tài nguyên 3D:
1. **Phân tích Input**: Xác định tạo từ hình ảnh 2D (Single-Image-to-3D) hay tạo từ mô tả văn bản (Text-to-3D).
2. **Chọn Engine Tối Ưu**:
   - `trellis`: JeffreyXiang/TRELLIS cho vật thể quang học chân thực (PBR textures, Gaussian Splats).
   - `hunyuan`: Tencent/Hunyuan3D-2 cho vật thể có độ phân giải cao và bề mặt phức tạp.
   - `triposr`: Tốc độ tức thời (<0.5s) cho tạo mẫu nhanh.
   - `llama-mesh`: Tạo trực tiếp mã nguồn polygon OBJ thuần túy không cần tải model nặng.
3. **Tối Ưu Hóa Game (Game-Ready Optimization)**:
   - Giảm số lượng đa giác (Decimation) về 5,000–20,000 tris.
   - Đóng gói PBR Maps (Albedo, Normal, Roughness, Metallic).
   - Định dạng đầu ra: `.glb` / `.obj` sẵn sàng đưa vào Godot 4.x, Unity, hoặc Three.js.
