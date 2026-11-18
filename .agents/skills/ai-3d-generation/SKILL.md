---
name: ai-3d-generation
description: End-to-end AI 3D asset generation pipeline integrating TRELLIS, Tencent Hunyuan3D-2, TripoSR, InstantMesh, 3DTopia-XL, and LLaMA-Mesh via Gradio Client.
---

# Autonomous AI 3D Generation Pipeline

This skill orchestrates state-of-the-art open-source generative 3D models for generating game-ready, production-quality 3D assets (GLB, OBJ, USDZ) from single images or text prompts:

- **JeffreyXiang/TRELLIS**: Structured 3D Latents for high-fidelity Radiance Fields, Gaussian Splats, and Textured Meshes.
- **Tencent/Hunyuan3D-2**: High-resolution geometry and PBR material synthesis from text or images.
- **camenduru/TripoSR-jupyter**: Sub-second feedforward single-image 3D mesh reconstruction (Stability AI & Tripo AI).
- **camenduru/InstantMesh-jupyter**: Sparse-view LRM and multi-view diffusion for watertight 3D meshes.
- **3DTopia/3DTopia-XL**: High-Quality 3D PBR Generation using Triplane-Gaussian and diffusion.
- **OpenGVLab/LLaMA-Mesh**: Direct 3D polygon generation via fine-tuned Language Model tokens (pure OBJ text).

---

## 1. Model Selection Matrix

| Engine | Best For | Typical Latency | Texture Fidelity | Output Format |
| :--- | :--- | :--- | :--- | :--- |
| **TRELLIS** | Organic props, characters, photorealistic assets | 15–30s | ★★★★★ (PBR) | GLB, Gaussian Splat (`.ply`) |
| **Hunyuan3D-2** | Stylized props, complex hard-surface objects | 25–45s | ★★★★★ (4K PBR) | GLB, OBJ + MTL |
| **TripoSR** | Rapid prototyping, background assets, game jams | < 0.5s | ★★★☆☆ (Vertex/UV) | GLB, OBJ |
| **InstantMesh** | Multi-view consistent geometry, watertight solids | 10–20s | ★★★★☆ (Diffuse) | OBJ, GLB |
| **3DTopia-XL** | High-end materials, roughness/metallic maps | 30–60s | ★★★★★ (Full PBR) | GLB with PBR maps |
| **LLaMA-Mesh** | Direct LLM code generation, procedural meshes | 2–5s | ★★☆☆☆ (Geometry) | Raw OBJ text |

---

## 2. Remote Execution via Gradio Client (Zero GPU Overhead)

You do not need a local 24GB VRAM GPU to generate 3D assets. Use `gradio_client` to invoke official cloud spaces or self-hosted API endpoints:

### Python Implementation
```python
from gradio_client import Client, handle_file

# 1. Initialize client for TRELLIS or Hunyuan3D
client = Client("JeffreyXiang/TRELLIS")

# 2. Run inference from image
result = client.predict(
    image=handle_file("concept_art.png"),
    seed=42,
    ss_sampling_steps=12,
    slat_sampling_steps=12,
    ss_guidance_strength=7.5,
    slat_guidance_strength=3.0,
    api_name="/generate"
)

# Returns: [radiance_field_video, gaussian_splat_file, mesh_glb_file]
glb_path = result[2]
print(f"Generated 3D asset saved at: {glb_path}")
```

### Node.js / JavaScript Implementation
```javascript
import { Client } from "@gradio/client";
import fs from "fs";

async function generate3DFromImage(imageBuffer) {
  const app = await Client.connect("JeffreyXiang/TRELLIS");
  const result = await app.predict("/generate", [
    imageBuffer, // blob or file
    42,          // seed
    12,          // steps
    7.5          // guidance
  ]);
  
  const glbUrl = result.data[2].url;
  return glbUrl;
}
```

---

## 3. LLaMA-Mesh: Direct OBJ Generation via LLM

For procedural or low-poly hard surface models, invoke LLaMA-Mesh syntax directly:

```text
v -0.500000 -0.500000 0.500000
v 0.500000 -0.500000 0.500000
v -0.500000 0.500000 0.500000
v 0.500000 0.500000 0.500000
v -0.500000 0.500000 -0.500000
v 0.500000 0.500000 -0.500000
v -0.500000 -0.500000 -0.500000
v 0.500000 -0.500000 -0.500000
f 1 2 4 3
f 3 4 6 5
f 5 6 8 7
f 7 8 2 1
f 2 8 6 4
f 7 1 3 5
```

---

## 4. Game Engine Optimization Guidelines

Always pass raw AI-generated 3D meshes through optimization before embedding in Godot or Unity:
1. **Decimation**: Reduce raw AI vertex count (often 200k–500k tris) down to 5k–25k tris using Blender decimate modifier or PyMeshLab.
2. **Normal Map Baking**: Transfer high-frequency surface detail from the high-poly mesh onto the low-poly game model.
3. **PBR Packing**: Pack Roughness into Green channel and Metallic into Blue channel (standard glTF 2.0 ORM map).
4. **Origin & Scale**: Ensure pivot point is centered at the bottom of the bounding box (`Z=0` or `Y=0`).
