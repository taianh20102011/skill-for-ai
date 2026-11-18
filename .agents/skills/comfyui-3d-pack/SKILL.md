---
name: comfyui-3d-pack
description: Build and automate node-based generative 3D workflows using ComfyUI-3D-Pack for multi-view diffusion, NeRF, 3D Gaussian Splatting, and mesh extraction.
---

# ComfyUI 3D Pack: Generative 3D Node Workflows (`MrForExample/ComfyUI-3D-Pack`)

This skill integrates **ComfyUI-3D-Pack**—an extensive suite of custom nodes for ComfyUI enabling 3D asset generation, multi-view diffusion, Gaussian Splatting, texture projection, and marching cubes mesh reconstruction.

---

## 1. Core Node Categories

| Category | Node Name | Functionality |
| :--- | :--- | :--- |
| **Multi-View Diffusion** | `MVDreamModelLoader`, `SV3D_Conditioning` | Generate 4 to 6 consistent orthogonal/turntable views from a single prompt or image |
| **3D Reconstruction** | `LargeMultiviewGaussianModel`, `TripoSRLoader` | Convert multi-view images into 3D Gaussians or implicit neural fields |
| **Mesh Extraction** | `MeshExtractor_MarchingCubes`, `FlexiCubes` | Extract clean polygonal meshes with topological manifolds from radiance volumes |
| **Texture & Baking** | `BakeTextureFromMultiView`, `UVUnwrapMesh` | Automatically project generated images onto UV coordinates and generate normal/albedo maps |
| **Format Conversion** | `Save3D_GLTF`, `Save3D_PLY`, `Load3D_OBJ` | Export to web-standard GLB/GLTF, point-cloud PLY, and OBJ formats |

---

## 2. Standard End-to-End Workflow Graph

```
[ Input Image ] ──> [ Background Removal (RMBG) ]
                             │
                             ▼
                    [ Multi-View Diffusion (SV3D / Zero123++) ]
                             │ (4-6 Turntable Angles)
                             ▼
                    [ 3D Reconstruction Model (InstantMesh / LRM) ]
                             │
                             ▼
                    [ Mesh Decimation & Normal Baking ]
                             │
                             ▼
                    [ Save3D_GLTF (.glb export) ]
```

---

## 3. Headless ComfyUI API Execution (Python)

Trigger ComfyUI 3D workflows programmatically via the ComfyUI REST API:

```python
import json
import urllib.request

def queue_comfyui_3d_workflow(prompt_graph: dict, server_address="127.0.0.1:8188"):
    data = json.dumps({"prompt": prompt_graph}).encode('utf-8')
    req = urllib.request.Request(f"http://{server_address}/prompt", data=data)
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode('utf-8'))
```

---

## 4. Invariants for 3D Game Asset Generation

When producing assets for game engines (Godot/Unity/Unreal):
1. **Always Remove Background First**: Ensure alpha mask is 100% clean so background pixels are not projected into the 3D volume.
2. **Watertight Polygons**: Verify mesh manifoldness before passing to physics engines or collision generators.
3. **PBR Alignment**: Ensure diffuse textures do not contain baked-in directional lighting or harsh ambient shadows.
