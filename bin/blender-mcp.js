#!/usr/bin/env node

/**
 * BLENDER MCP & HEADLESS AUTOMATION CLI
 * Based on ahujasid/mcp-for-blender
 * 
 * Usage:
 *   blender-mcp [setup|run|optimize|status] [options]
 *   node bin/blender-mcp.js [setup|run|optimize|status] [options]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const action = (args[0] || 'status').toLowerCase();

console.log('\x1b[36m%s\x1b[0m', `
  ██████╗ ██╗     ███████╗███╗   ██╗██████╗ ███████╗██████╗     ███╗   ███╗ ██████╗██████╗ 
  ██╔══██╗██║     ██╔════╝████╗  ██║██╔══██╗██╔════╝██╔══██╗    ████╗ ████║██╔════╝██╔══██╗
  ██████╔╝██║     █████╗  ██╔██╗ ██║██║  ██║█████╗  ██████╔╝    ██╔████╔██║██║     ██████╔╝
  ██╔══██╗██║     ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗    ██║╚██╔╝██║██║     ██╔═══╝ 
  ██████╔╝███████╗███████╗██║ ╚████║██████╔╝███████╗██║  ██║    ██║ ╚═╝ ██║╚██████╗██║     
  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝ ╚═════╝╚═╝     
`);
console.log('\x1b[32m%s\x1b[0m', '>>> Model Context Protocol (MCP) & Headless Blender Controller <<<\n');

function findBlenderPath() {
  const commonPaths = [
    'C:\\Program Files\\Blender Foundation\\Blender 4.3\\blender.exe',
    'C:\\Program Files\\Blender Foundation\\Blender 4.2\\blender.exe',
    'C:\\Program Files\\Blender Foundation\\Blender 4.1\\blender.exe',
    'C:\\Program Files\\Blender Foundation\\Blender 4.0\\blender.exe',
    'C:\\Program Files\\Blender Foundation\\Blender\\blender.exe'
  ];

  for (const p of commonPaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

if (action === 'status') {
  console.log(`\x1b[33mBlender Environment Status:\x1b[0m`);
  const bPath = findBlenderPath();
  if (bPath) {
    console.log(`  - Blender Executable : \x1b[32m${bPath}\x1b[0m`);
    try {
      const ver = execSync(`"${bPath}" --version`, { encoding: 'utf8' }).split('\n')[0];
      console.log(`  - Version            : \x1b[36m${ver}\x1b[0m`);
    } catch (e) {}
  } else {
    console.log(`  - Blender Executable : \x1b[33mNot found in default Program Files path.\x1b[0m`);
    console.log(`    (Ensure Blender is installed or added to system PATH)`);
  }

  console.log(`\n\x1b[33mUsage in Terminal:\x1b[0m
  blender-mcp setup                  - Generate MCP Server config for Antigravity & Claude Code
  blender-mcp run <script.py>        - Execute a Python bpy script in headless Blender
  blender-mcp optimize <model.glb>   - Decimate and optimize 3D model for game engines
  blender-mcp status                 - Show Blender detection status
`);
  process.exit(0);
}

if (action === 'setup') {
  const mcpConfig = {
    mcpServers: {
      blender: {
        command: "node",
        args: [path.resolve(__dirname, 'blender-mcp.js'), "server"],
        env: {
          BLENDER_PATH: findBlenderPath() || "blender"
        }
      }
    }
  };

  const mcpPath = path.join(process.cwd(), '.mcp.json');
  fs.writeFileSync(mcpPath, JSON.stringify(mcpConfig, null, 2), 'utf8');
  console.log(`\x1b[32m✔ Successfully created Blender MCP configuration at: ${mcpPath}\x1b[0m`);
  console.log(`Antigravity and Claude Code can now interactively automate Blender!`);
  process.exit(0);
}

if (action === 'optimize') {
  const targetFile = args[1];
  if (!targetFile || !fs.existsSync(targetFile)) {
    console.error(`\x1b[31mError: Target 3D model not found: ${targetFile}\x1b[0m`);
    process.exit(1);
  }

  const bPath = findBlenderPath() || 'blender';
  const ratio = args[2] || '0.5';
  const outFile = targetFile.replace(/\.(glb|gltf|obj)$/, '_optimized.glb');

  console.log(`[*] Optimizing mesh: \x1b[33m${targetFile}\x1b[0m (Decimate ratio: ${ratio})...`);

  const pyScript = `
import bpy
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=r"${path.resolve(targetFile)}")
for obj in bpy.context.scene.objects:
    if obj.type == 'MESH':
        bpy.context.view_layer.objects.active = obj
        mod = obj.modifiers.new(name="Decimate", type='DECIMATE')
        mod.ratio = ${ratio}
        bpy.ops.object.modifier_apply(modifier="Decimate")
bpy.ops.export_scene.gltf(filepath=r"${path.resolve(outFile)}", export_format='GLB')
print("[SUCCESS] Exported to ${path.resolve(outFile)}")
`;

  const tmpScript = path.join(process.cwd(), '__tmp_decimate.py');
  fs.writeFileSync(tmpScript, pyScript, 'utf8');

  try {
    execSync(`"${bPath}" --background --python "${tmpScript}"`, { stdio: 'inherit' });
    console.log(`\x1b[32m✔ Optimized game-ready asset saved: ${outFile}\x1b[0m`);
  } catch (e) {
    console.log(`\x1b[33m[!] Headless Blender run failed (Blender executable missing or exited with error).\x1b[0m`);
  } finally {
    if (fs.existsSync(tmpScript)) fs.unlinkSync(tmpScript);
  }
  process.exit(0);
}

console.log(`Unknown action: ${action}. Run \x1b[36mblender-mcp status\x1b[0m for help.`);
