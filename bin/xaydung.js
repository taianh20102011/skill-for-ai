#!/usr/bin/env node

/**
 * XAYDUNG CLI - Autonomous Project Builder & Scaffolder
 * Usage in Terminal: xaydung <web|app|plugin|tool> [description]
 * Usage in AI Chat:  /xaydung <web|app|plugin|tool> <description>
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

if (!type || !['web', 'app', 'plugin', 'tool'].includes(type)) {
  console.log(`\x1b[33mUsage in Terminal:\x1b[0m
  xaydung <web|app|plugin|tool> [description]

\x1b[33mUsage in AI Chat (Antigravity / Claude Code / Cursor):\x1b[0m
  Type \x1b[32m/xaydung <web|app|plugin|tool> <description>\x1b[0m directly in the chat box!

\x1b[33mAvailable Project Types:\x1b[0m
  \x1b[36mweb\x1b[0m     - React 19 + Tailwind CSS + GSAP + Lenis + Animate UI (Anti-Slop)
  \x1b[36mapp\x1b[0m     - Lightweight Desktop App (Tauri v2 + Rust) or Mobile (Flutter)
  \x1b[36mplugin\x1b[0m  - Clean Minecraft Paper/Purpur Plugin (Adventure + Lamp + Triumph-GUI)
  \x1b[36mtool\x1b[0m    - Production-grade CLI Tool / Utility with automated testing loop

\x1b[33mExamples:\x1b[0m
  xaydung web "SaaS Landing page with dark mode and GSAP ScrollTrigger"
  xaydung app "Modern desktop markdown notes app with Tauri v2"
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
- [x] Initial scaffolding and configuration files created.
- [ ] Implement core business logic and UI components.
- [ ] Run automated compile loop and resolve stack traces.
- [ ] Run security audit (OWASP Top 10 & Cloudflare Guidelines).
- [ ] Final verification before completion.
`;

fs.writeFileSync(path.join(targetDir, 'XAYDUNG_SPEC.md'), specContent, 'utf8');

// 2. Generate Boilerplate Files based on Type
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
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      gsap: '^3.12.5',
      lenis: '^1.1.18',
      'lucide-react': '^0.468.0'
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.3.4',
      tailwindcss: '^3.4.16',
      autoprefixer: '^10.4.20',
      postcss: '^8.4.49',
      vite: '^6.0.3'
    }
  };

  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkgJson, null, 2), 'utf8');

  const srcDir = path.join(targetDir, 'src');
  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });

  const appJsx = `import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 flex flex-col items-center justify-center p-8 selection:bg-zinc-800">
      <div ref={heroRef} className="max-w-3xl text-center space-y-6">
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
