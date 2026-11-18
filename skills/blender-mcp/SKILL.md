---
name: blender-mcp
description: Control Blender 4.x/5.x programmatically via Model Context Protocol (MCP) and headless bpy Python scripting for 3D modeling, UV unwrapping, PBR texture baking, and GLTF export.
---

# Blender MCP & Headless Python Automation (`ahujasid/mcp-for-blender`)

This skill integrates the Model Context Protocol (MCP) server for Blender (`ahujasid/mcp-for-blender`), allowing AI coding agents to interact with Blender directly—creating 3D primitives, modifying vertex data, applying shaders, baking textures, and exporting optimized assets for web (Three.js) or game engines (Godot/Unity).

---

## 1. Architecture: MCP Server + Blender Addon

```
+--------------------+        JSON-RPC / stdio        +------------------------+
|  AI Coding Agent   | <===========================> | Blender MCP Server     |
| (Antigravity/Codex)|                               | (ahujasid/mcp-for-blender)
+--------------------+                               +-----------+------------+
                                                                 | TCP Socket (9876)
                                                                 v
                                                     +------------------------+
                                                     | Blender (GUI/Headless) |
                                                     | bpy Python Environment |
                                                     +------------------------+
```

---

## 2. Core MCP Tool Capabilities

| Tool Name | Parameters | Purpose |
| :--- | :--- | :--- |
| `blender_execute_script` | `code: string` | Run arbitrary `bpy` Python script inside the active Blender instance |
| `blender_get_scene_info` | None | Returns list of objects, polygon counts, materials, and active camera |
| `blender_create_primitive` | `type, size, location` | Add Cube, Sphere, Cylinder, Plane, Torus, or Monkey |
| `blender_apply_modifier` | `object, modifier_type` | Apply Decimate, Subsurf, Bevel, Remesh, or Solidify |
| `blender_export_asset` | `filepath, format` | Export scene or selected objects as `.glb`, `.fbx`, or `.obj` |
| `blender_render_frame` | `camera, filepath` | Render a high-resolution Cycles / Eevee frame of the model |

---

## 3. Headless Script Execution Patterns (`bpy`)

When Blender is not running as an active GUI server, run automation via headless CLI:

```bash
blender --background --python optimize_mesh.py -- input.glb output.glb 0.25
```

### Automated Mesh Optimization & Decimation Script (`optimize_mesh.py`)
```python
import bpy
import sys

argv = sys.argv[sys.argv.index("--") + 1:]
input_file = argv[0]
output_file = argv[1]
ratio = float(argv[2]) if len(argv) > 2 else 0.5

# 1. Clear default scene
bpy.ops.wm.read_factory_settings(use_empty=True)

# 2. Import model
if input_file.endswith('.glb') or input_file.endswith('.gltf'):
    bpy.ops.import_scene.gltf(filepath=input_file)
elif input_file.endswith('.obj'):
    bpy.ops.wm.obj_import(filepath=input_file)

# 3. Apply Decimate Modifier to all meshes
for obj in bpy.context.scene.objects:
    if obj.type == 'MESH':
        bpy.context.view_layer.objects.active = obj
        mod = obj.modifiers.new(name="Decimate", type='DECIMATE')
        mod.ratio = ratio
        bpy.ops.object.modifier_apply(modifier="Decimate")

# 4. Export clean glTF
bpy.ops.export_scene.gltf(filepath=output_file, export_format='GLB')
print(f"Decimated mesh exported successfully to: {output_file}")
```

---

## 4. MCP Configuration for Coding Agents

In your global `.mcp.json` or Antigravity configuration:

```json
{
  "mcpServers": {
    "blender": {
      "command": "node",
      "args": ["d:/skill/bin/blender-mcp.js", "server"]
    }
  }
}
```
