---
name: game-engine-mcp-integration
description: Setup and operation of Model Context Protocol (MCP) servers for game engines (Godot MCP, Unity MCP, Blender MCP, Aseprite MCP) for headless editing, live debugging, and asset pipelines.
---

# Game Engine MCP Integration (Hands & Eyes for Coding Agents)

This skill provides configuration, protocol bindings, and operational workflows to equip AI Coding Agents (Antigravity CLI, Claude Code, Cursor, OpenCode) with real-time control over game engines and DCC tools.

---

## 1. Supported Game Engine & DCC MCP Servers

```
+-------------------------------------------------------------+
|                     AI Coding Agent                         |
|      (Claude Code / Antigravity / Cursor / OpenCode)        |
+------------------------------+------------------------------+
                               | Model Context Protocol (MCP)
        +----------------------+----------------------+
        |                      |                      |
+-------v--------+     +-------v--------+     +-------v--------+
|   Godot MCP    |     |   Unity MCP    |     |  Blender MCP   |
| (Headless CLI, |     |  (Hierarchy,   |     |  (Python API,  |
| Debugger logs, |     |  Prefabs, Play |     |  3D Modeling,  |
| .tscn edit)    |     |  Console logs) |     |  GLB export)   |
+----------------+     +----------------+     +----------------+
```

### 1.1 Godot MCP (`Coding-Solo/godot-mcp` or `ee0pdt/Godot-MCP`)
- **Capabilities**:
  - Run Godot project in `--headless` mode.
  - Read debug console & stack traces when exceptions or crashes occur.
  - Parse and generate `.tscn` (Scene) files without manual UI clicks.
  - Attach GDScript files to Scene nodes and configure `@export` properties.

### 1.2 Unity MCP (`justinpbarnett/unity-mcp` or `IvanMurzak/Unity-MCP`)
- **Capabilities**:
  - Inspect GameObject hierarchy.
  - Instantiate and configure Prefabs.
  - Trigger Play Mode and monitor Console errors.
  - Run unit tests through the Unity Test Framework.

### 1.3 Blender MCP (`ahujasid/blender-mcp`)
- **Capabilities**:
  - Programmatically create 3D meshes using Blender's `bpy` Python API.
  - Assign PBR materials and bake textures.
  - Auto-export assets to `.glb` or `.fbx` in the game's asset directory.

### 1.4 Aseprite MCP (`diivi/aseprite-mcp`)
- **Capabilities**:
  - Programmatically create pixel art frames and layers.
  - Auto-pack animations into `.png` spritesheets with `.json` metadata.

---

## 2. MCP Client Configuration

Add these servers to your agent's MCP configuration (`~/.gemini/antigravity/mcp_config.json`, `.cursor/mcp.json`, or `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "godot": {
      "command": "node",
      "args": ["/path/to/godot-mcp/build/index.js"],
      "env": {
        "GODOT_BIN": "godot"
      }
    },
    "unity": {
      "command": "node",
      "args": ["/path/to/unity-mcp/dist/index.js"]
    },
    "blender": {
      "command": "python",
      "args": ["-m", "blender_mcp_server"],
      "env": {
        "BLENDER_PATH": "C:\\Program Files\\Blender Foundation\\Blender\\blender.exe"
      }
    }
  }
}
```

---

## 3. Autonomous Diagnostic Loop

When an engine error occurs:
1. Agent queries the Engine MCP server for active console logs (`get_runtime_errors` or `read_console_log`).
2. Extracts file path, line number, and stack trace.
3. Applies surgical fix to GDScript/C# code.
4. Triggers headless validation (`godot --headless --quit` or Unity test runner).
5. Confirms resolution before proceeding.
