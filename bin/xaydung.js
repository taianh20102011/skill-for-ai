#!/usr/bin/env node

/**
 * XAYDUNG CLI - Autonomous Project Builder & Scaffolder
 * Usage in Terminal: xaydung <web|app|game|video|plugin|tool> [description]
 * Usage in AI Chat:  /xaydung <web|app|game|video|plugin|tool> <description>
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const type = args[0] ? args[0].toLowerCase() : null;
const description = args.slice(1).join(' ');

if (type === 'ui' || type === 'dashboard') {
  require('./dashboard.js');
  return;
}

console.log('\x1b[36m%s\x1b[0m', `
  ██╗  ██╗ █████╗ ██╗   ██╗██████╗ ██╗   ██╗███╗   ██╗ ██████╗ 
  ╚██╗██╔╝██╔══██╗╚██╗ ██╔╝██╔══██╗██║   ██║████╗  ██║██╔════╝ 
   ╚███╔╝ ███████║ ╚████╔╝ ██║  ██║██║   ██║██╔██╗ ██║██║  ███╗
   ██╔██╗ ██╔══██║  ╚██╔╝  ██║  ██║██║   ██║██║╚██╗██║██║   ██║
  ██╔╝ ██╗██║  ██║   ██║   ██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ 
`);
console.log('\x1b[32m%s\x1b[0m', '>>> Autonomous Project Builder & Anti-Slop Scaffolder <<<\n');

if (!type || !['web', 'app', 'game', 'video', 'plugin', 'tool'].includes(type)) {
  console.log(`\x1b[33mUsage in Terminal:\x1b[0m
  xaydung <web|app|game|video|plugin|tool> [description]

\x1b[33mUsage in AI Chat (Antigravity / Claude Code / Cursor):\x1b[0m
  Type \x1b[32m/xaydung <web|app|game|video|plugin|tool> <description>\x1b[0m directly in the chat box!

\x1b[33mAvailable Project Types:\x1b[0m
  \x1b[36mweb\x1b[0m     - React 19 + Tailwind CSS + GSAP + Lenis + Animate UI (Anti-Slop)
  \x1b[36mapp\x1b[0m     - Lightweight Desktop App (Tauri v2 + Rust) or Mobile (Flutter)
  \x1b[36mgame\x1b[0m    - Godot 4.3+ GDScript (Call Down Signal Up, Game Feel Juice, EventBus)
  \x1b[36mvideo\x1b[0m   - Programmatic Video (Remotion + Three.js + GSAP + Neural TTS)
  \x1b[36mplugin\x1b[0m  - Clean Minecraft Paper/Purpur Plugin (Adventure + Lamp + Triumph-GUI)
  \x1b[36mtool\x1b[0m    - Production-grade CLI Tool / Utility with automated testing loop

\x1b[33mExamples:\x1b[0m
  xaydung web "SaaS Landing page with dark mode and GSAP ScrollTrigger"
  xaydung app "Modern desktop markdown notes app with Tauri v2"
  xaydung game "2D Roguelite survivor game with hitstop, screen shake and EventBus"
  xaydung video "Mathematical animation video with 3D canvas and Vietnamese voiceover"
  xaydung plugin "Multi-server economy synchronization with Adventure MiniMessage"
  xaydung tool "High-speed log analysis CLI with automated test suite"
`);
  process.exit(0);
}

const projectName = description 
  ? description.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 30) || `${type}-project`
  : `${type}-project`;

const targetDir = path.join(process.cwd(), projectName);

console.log(`\x1b[33m[*] Project Type:\x1b[0m ${type.toUpperCase()}`);
console.log(`\x1b[33m[*] Description:\x1b[0m  ${description || 'Standard anti-slop architecture'}`);
console.log(`\x1b[33m[*] Target Path:\x1b[0m  ${targetDir}\n`);

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Generate Architecture Specification (XAYDUNG_SPEC.md)
const specContent = `# AUTONOMOUS BUILD SPECIFICATION: ${projectName.toUpperCase()}

- **Project Type**: ${type.toUpperCase()}
- **Prompt / Description**: ${description || 'Standard high-performance anti-slop build'}
- **Created At**: ${new Date().toISOString()}

## 🏗️ Architecture Stack
${
  type === 'web'
    ? `- **Frontend**: Vite + React 19 + Tailwind CSS
- **Design Standard**: Anti-Slop Aesthetic (Dark mode #080808, Geist typography, 150-250ms spring physics)
- **Animation**: GSAP ScrollTrigger + Lenis Smooth Scroll + Animate UI components
- **Performance**: Target Core Web Vitals (LCP < 2s, INP < 150ms, CLS < 0.05)`
    : type === 'app'
    ? `- **Desktop Core**: Tauri v2 (Rust Core <15MB RAM, ultra-light binary)
- **Frontend UI**: React + Tailwind + GSAP
- **Packaging**: Cross-platform desktop release (Windows, macOS, Linux)`
    : type === 'game'
    ? `- **Engine & Syntax**: Godot 4.3+ (Strict GDScript with Static Typing)
- **Architecture**: Decoupled "Call Down, Signal Up", Autoload EventBus, custom Resource (.tres) data models
- **Game Feel ("Juice")**: Screen shake, Hitstop micro-pause (60ms), Squash & stretch, Coyote Time & Jump Buffering
- **Asset Directory**: Kenney.nl (CC0), Quaternius (CC0), Freesound.org audio
- **Verification Loop**: Headless compilation check (godot --headless --quit)`
    : type === 'video'
    ? `- **Video Engine**: Remotion (React 19 + TypeScript) + Three.js (@remotion/three)
- **Animation & Transitions**: Deterministic frame-accurate spring physics, GSAP Timelines
- **Audio & Voiceover**: Vietnamese Neural TTS (VieNeu-TTS / ViFastTTS) + FFmpeg auto-ducking
- **Resolution**: 1920x1080 (16:9 Landscape) or 1080x1920 (9:16 Shorts/Reels/TikTok)
- **CLI Rendering**: Headless MP4 output with H.264 / NVENC encoding`
    : type === 'plugin'
    ? `- **Server API**: Paper / Purpur 1.21.x / 26.x
- **Chat & UI**: Adventure Kyori MiniMessage (Hex gradients, custom fonts)
- **Commands**: Revxrsal Lamp Annotation Framework with auto-completion
- **Schedulers & Storage**: Lucko Helper + Triumph-GUI paginated menus`
    : `- **Runtime**: Node.js / Rust CLI
- **Architecture**: Clean command parser, zero unnecessary dependencies
- **Reliability**: Automated unit tests and compiler self-healing loop`
}

## 📋 Autonomous Execution Checklist
- [x] Initial Scaffolding and Directory Setup
- [ ] Implement Core Architecture & Entry Point
- [ ] Inject Autonomous Coding Directives (AGENTS.md)
- [ ] Run Automated Compilation / Syntax Check
- [ ] Execute Security & Quality Audit (OWASP / YAGNI)
`;

fs.writeFileSync(path.join(targetDir, 'XAYDUNG_SPEC.md'), specContent, 'utf8');

// 2. Generate starter project files
if (type === 'web') {
  const pkgJson = {
    name: projectName,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    dependencies: {
      'react': '^19.0.0',
      'react-dom': '^19.0.0',
      'lucide-react': '^1.0.0'
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.3.0',
      'autoprefixer': '^10.4.20',
      'postcss': '^8.4.49',
      'tailwindcss': '^3.4.17',
      'vite': '^6.0.0'
    }
  };
  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkgJson, null, 2), 'utf8');

  const srcDir = path.join(targetDir, 'src');
  fs.mkdirSync(srcDir, { recursive: true });

  const appJsx = `import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 flex flex-col items-center justify-center p-8 selection:bg-zinc-800 selection:text-white">
      <div className="max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Crafted with Anti-Slop Specifications
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          ${description || 'Autonomous Web Experience'}
        </h1>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
          High-performance interface synchronized with GSAP ScrollTrigger and Lenis Smooth Scroll.
        </p>
        <div className="pt-4 flex items-center justify-center gap-4">
          <button className="px-6 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 font-medium hover:bg-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
            Get Started
          </button>
          <button className="px-6 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-zinc-300 font-medium transition-all duration-200 hover:bg-zinc-900">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(srcDir, 'App.jsx'), appJsx, 'utf8');

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${description || 'Anti-Slop Web App'}</title>
  </head>
  <body class="bg-[#080808]">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtml, 'utf8');

  const mainJsx = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
  fs.writeFileSync(path.join(srcDir, 'main.jsx'), mainJsx, 'utf8');
  fs.writeFileSync(path.join(srcDir, 'index.css'), `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`, 'utf8');

  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#080808'
      }
    }
  },
  plugins: []
};
`;
  fs.writeFileSync(path.join(targetDir, 'tailwind.config.js'), tailwindConfig, 'utf8');

  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});
`;
  fs.writeFileSync(path.join(targetDir, 'vite.config.js'), viteConfig, 'utf8');
} else if (type === 'game') {
  const scriptsDir = path.join(targetDir, 'scripts');
  const scenesDir = path.join(targetDir, 'scenes');
  const assetsDir = path.join(targetDir, 'assets');
  fs.mkdirSync(scriptsDir, { recursive: true });
  fs.mkdirSync(scenesDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });

  const projectGodot = `; Engine configuration file.
; Generated autonomously by skill-for-ai /xaydung

config_version=5

[application]

config/name="${projectName}"
run/main_scene="res://scenes/main.tscn"
config/features=PackedStringArray("4.3", "Forward Plus")

[autoload]

EventBus="*res://scripts/event_bus.gd"

[display]

window/size/viewport_width=1280
window/size/viewport_height=720
window/stretch/mode="canvas_items"
window/stretch/aspect="keep"

[rendering]

renderer/rendering_method="forward_plus"
`;
  fs.writeFileSync(path.join(targetDir, 'project.godot'), projectGodot, 'utf8');

  const eventBusGd = `extends Node

# Global EventBus Autoload for decoupled cross-system communication
signal player_spawned(player: CharacterBody2D)
signal player_health_changed(current: int, max: int)
signal screen_shake_requested(intensity: float, duration: float)
signal score_updated(new_score: int)
`;
  fs.writeFileSync(path.join(scriptsDir, 'event_bus.gd'), eventBusGd, 'utf8');

  const playerGd = `extends CharacterBody2D

signal health_changed(current: int, max: int)
signal died()

@export var move_speed: float = 280.0
@export var jump_impulse: float = -420.0
@export var gravity: float = 980.0
@export var max_health: int = 100

var current_health: int = 100
var is_invulnerable: bool = false

# Juice & Game Feel: Coyote Time & Jump Buffer
var coyote_timer: float = 0.0
var jump_buffer_timer: float = 0.0
const COYOTE_TIME_MAX: float = 0.12
const JUMP_BUFFER_MAX: float = 0.10

@onready var collision_shape: CollisionShape2D = $CollisionShape2D

func _ready() -> void:
    current_health = max_health
    EventBus.player_spawned.emit(self)

func _physics_process(delta: float) -> void:
    # Gravity
    if not is_on_floor():
        velocity.y += gravity * delta
        coyote_timer -= delta
    else:
        coyote_timer = COYOTE_TIME_MAX

    # Input handling
    var direction: float = Input.get_axis("ui_left", "ui_right")
    velocity.x = direction * move_speed

    # Jump Buffer
    if Input.is_action_just_pressed("ui_accept"):
        jump_buffer_timer = JUMP_BUFFER_MAX
    else:
        jump_buffer_timer -= delta

    # Jump Execution
    if jump_buffer_timer > 0.0 and coyote_timer > 0.0:
        velocity.y = jump_impulse
        jump_buffer_timer = 0.0
        coyote_timer = 0.0
        # Juice: Squash & Stretch
        _apply_squash_and_stretch(Vector2(0.8, 1.25))

    move_and_slide()

func take_damage(amount: int) -> void:
    if is_invulnerable:
        return
    current_health = clampi(current_health - amount, 0, max_health)
    health_changed.emit(current_health, max_health)
    EventBus.player_health_changed.emit(current_health, max_health)
    EventBus.screen_shake_requested.emit(8.0, 0.2)
    _apply_hitstop(0.06)

    if current_health <= 0:
        died.emit()

func _apply_hitstop(duration: float) -> void:
    Engine.time_scale = 0.05
    await get_tree().create_timer(duration * 0.05).timeout
    Engine.time_scale = 1.0

func _apply_squash_and_stretch(target_scale: Vector2) -> void:
    var tween: Tween = create_tween().set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
    tween.tween_property(self, "scale", target_scale, 0.08)
    tween.tween_property(self, "scale", Vector2.ONE, 0.12)
`;
  fs.writeFileSync(path.join(scriptsDir, 'player.gd'), playerGd, 'utf8');

  const mainTscn = `[gd_scene format=3 uid="uid://mainscene001"]

[node name="Main" type="Node2D"]

[node name="Camera2D" type="Camera2D" parent="."]
position = Vector2(640, 360)
`;
  fs.writeFileSync(path.join(scenesDir, 'main.tscn'), mainTscn, 'utf8');

  const gddMd = `# GAME DESIGN DOCUMENT (GDD): ${projectName.toUpperCase()}

## 1. High Concept & Elevator Pitch
- **Title**: ${projectName}
- **Genre**: 2D Action Platformer / Arena
- **Pitch**: ${description || 'Fast-paced indie game with high game feel, responsive controls, and tight core loops.'}

## 2. Core Gameplay Loop
$$\\text{Engage Enemies} \\longrightarrow \\text{Evade & Defeat} \\longrightarrow \\text{Collect Rewards} \\longrightarrow \\text{Upgrade Stats & Skills}$$

## 3. Game Feel ("Juice") Invariants
- [x] **Hitstop**: 60ms engine freeze on critical hits
- [x] **Coyote Time**: 120ms jump forgiveness after leaving ledges
- [x] **Jump Buffering**: 100ms early jump registration
- [x] **Squash & Stretch**: Dynamic tween scaling on jump and landing
- [x] **Camera Shake**: Decay trauma-based offset on player damage

## 4. Free Open-Source Asset Sources
- Sprites & UI: [Kenney.nl](https://kenney.nl) (CC0)
- Audio & SFX: [Freesound.org](https://freesound.org) / [Pixabay](https://pixabay.com)
`;
  fs.writeFileSync(path.join(targetDir, 'GDD.md'), gddMd, 'utf8');
} else if (type === 'video') {
  const srcDir = path.join(targetDir, 'src');
  fs.mkdirSync(srcDir, { recursive: true });

  const pkgJson = {
    name: projectName,
    version: '1.0.0',
    private: true,
    scripts: {
      start: 'remotion preview',
      build: 'remotion render src/index.ts MainComposition out/video.mp4',
      render: 'remotion render src/index.ts MainComposition out/video.mp4'
    },
    dependencies: {
      '@remotion/cli': '^4.0.260',
      '@remotion/three': '^4.0.260',
      'react': '^19.0.0',
      'react-dom': '^19.0.0',
      'remotion': '^4.0.260',
      'three': '^0.170.0'
    },
    devDependencies: {
      'autoprefixer': '^10.4.20',
      'postcss': '^8.4.49',
      'tailwindcss': '^3.4.17',
      'typescript': '^5.7.0'
    }
  };
  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkgJson, null, 2), 'utf8');

  const rootTsx = `import React from 'react';
import { Composition } from 'remotion';
import { MainComposition } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainComposition"
        component={MainComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "${description || 'Programmatic Motion Video'}",
          subtitle: "Crafted with Remotion, Three.js & Vietnamese Neural TTS"
        }}
      />
    </>
  );
};
`;
  fs.writeFileSync(path.join(srcDir, 'Root.tsx'), rootTsx, 'utf8');

  const compositionTsx = `import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const MainComposition: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 }
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(entrance, [0, 1], [80, 0]);
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill className="bg-[#080808] flex items-center justify-center text-white font-sans selection:bg-blue-600">
      <div
        style={{
          opacity,
          transform: \`translateY(\${translateY}px) scale(\${scale})\`
        }}
        className="text-center space-y-6 max-w-4xl px-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-900/60 bg-blue-950/40 text-blue-400 text-sm font-medium tracking-wide">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
          Programmatic Video Engine
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-2xl text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
`;
  fs.writeFileSync(path.join(srcDir, 'Composition.tsx'), compositionTsx, 'utf8');

  const indexTs = `import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
`;
  fs.writeFileSync(path.join(srcDir, 'index.ts'), indexTs, 'utf8');
} else if (type === 'plugin') {
  const pomXml = `<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.skillai</groupId>
    <artifactId>${projectName}</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <repositories>
        <repository>
            <id>papermc</id>
            <url>https://repo.papermc.io/repository/maven-public/</url>
        </repository>
    </repositories>
    <dependencies>
        <dependency>
            <groupId>io.papermc.paper</groupId>
            <artifactId>paper-api</artifactId>
            <version>1.21.1-R0.1-SNAPSHOT</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>net.kyori</groupId>
            <artifactId>adventure-text-minimessage</artifactId>
            <version>4.17.0</version>
        </dependency>
    </dependencies>
</project>
`;
  fs.writeFileSync(path.join(targetDir, 'pom.xml'), pomXml, 'utf8');
}

// Copy AGENTS.md to target project
const sourceAgentsMd = path.join(__dirname, '..', 'AGENTS.md');
if (fs.existsSync(sourceAgentsMd)) {
  fs.copyFileSync(sourceAgentsMd, path.join(targetDir, 'AGENTS.md'));
  fs.copyFileSync(sourceAgentsMd, path.join(targetDir, '.cursorrules'));
}

console.log(`\x1b[32m[✓] Successfully created scaffolding for: ${projectName}!\x1b[0m`);
console.log(`\x1b[32m[✓] Generated XAYDUNG_SPEC.md, AGENTS.md and starter architecture files.\x1b[0m\n`);

console.log(`\x1b[36mNext Steps:\x1b[0m
  1. \x1b[33mcd ${projectName}\x1b[0m
  2. Open this folder in \x1b[32mAntigravity, Cursor, or Claude Code\x1b[0m
  3. Tell the AI: \x1b[32m"Tiếp tục xây dựng theo file XAYDUNG_SPEC.md"\x1b[0m
     (Hoặc gõ \x1b[32m/xaydung ${type} ${description}\x1b[0m ngay trong khung chat AI!)
`);
