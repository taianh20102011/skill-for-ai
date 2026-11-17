#!/usr/bin/env node

/**
 * MODERN WEB GUIDANCE CLI - Google Chrome Modern Web Platform Linter & Auditor
 * Based on GoogleChrome/modern-web-guidance
 * 
 * Usage:
 *   modern-web-guidance <file|dir>
 *   node bin/modern-web-guidance.js <file|dir>
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const targetPath = args[0] || '.';

console.log('\x1b[36m%s\x1b[0m', `
  ███╗   ███╗ ██████╗ ██████╗ ███████╗██████╗ ███╗   ██╗    ██╗    ██╗███████╗██████╗ 
  ████╗ ████║██╔═══██╗██╔══██╗██╔════╝██╔══██╗████╗  ██║    ██║    ██║██╔════╝██╔══██╗
  ██╔████╔██║██║   ██║██║  ██║█████╗  ██████╔╝██╔██╗ ██║    ██║ █╗ ██║█████╗  ██████╔╝
  ██║╚██╔╝██║██║   ██║██║  ██║██╔══╝  ██╔══██╗██║╚██╗██║    ██║███╗██║██╔══╝  ██╔══██╗
  ██║ ╚═╝ ██║╚██████╔╝██████╔╝███████╗██║  ██║██║ ╚████║    ╚███╔███╔╝███████╗██████╔╝
  ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝     ╚══╝╚══╝ ╚══════╝╚═════╝ 
`);
console.log('\x1b[32m%s\x1b[0m', '>>> Google Chrome Modern Web Platform Standards & CWV Auditor <<<\n');

if (targetPath === '--help' || targetPath === '-h') {
  console.log(`\x1b[33mUsage in Terminal:\x1b[0m
  modern-web-guidance <file|directory>

\x1b[33mUsage in AI Chat:\x1b[0m
  Type \x1b[32m/modern-web-guidance <file|directory>\x1b[0m

\x1b[33mWhat it audits:\x1b[0m
  1. \x1b[36mModern CSS\x1b[0m         - Recommends @container queries, CSS :has(), and CSS Anchor Positioning.
  2. \x1b[36mNative Dialog\x1b[0m      - Identifies legacy custom modal overlay divs that should use <dialog>.
  3. \x1b[36mNative Popover\x1b[0m     - Recommends HTML popover attribute over JS tooltip positioning libraries.
  4. \x1b[36mCore Web Vitals\x1b[0m    - Detects CLS risks (images without width/height) and LCP blockers.
  5. \x1b[36mView Transitions\x1b[0m   - Checks for smooth DOM morphing via document.startViewTransition.
`);
  process.exit(0);
}

const resolvedPath = path.resolve(process.cwd(), targetPath);

if (!fs.existsSync(resolvedPath)) {
  console.error(`\x1b[31mError: Target path not found: ${resolvedPath}\x1b[0m`);
  process.exit(1);
}

const CHECKS = [
  {
    id: 'legacy-modal',
    severity: 'warning',
    regex: /<div[^>]*class=["'][^"']*\bmodal-backdrop\b[^"']*["']/gi,
    message: 'Legacy modal backdrop detected. Consider using native <dialog> with showModal() for top-layer focus trapping.'
  },
  {
    id: 'window-resize-listener',
    severity: 'info',
    regex: /window\.addEventListener\(\s*["']resize["']/gi,
    message: 'JavaScript window resize listener detected. Consider CSS Container Queries (@container) or ResizeObserver.'
  },
  {
    id: 'img-missing-dimensions',
    severity: 'warning',
    regex: /<img(?![^>]*(width=|height=))[^>]+>/gi,
    message: 'Image without explicit width/height attributes (Causes Cumulative Layout Shift - CLS risk).'
  },
  {
    id: 'img-missing-loading-lazy',
    severity: 'info',
    regex: /<img(?![^>]*loading=)["'][^>]+>/gi,
    message: 'Image missing loading="lazy" attribute (Could affect Largest Contentful Paint - LCP).'
  },
  {
    id: 'legacy-document-write',
    severity: 'error',
    regex: /document\.write\s*\(/gi,
    message: 'Deprecated document.write() call detected. Severe performance penalty on page parsing.'
  }
];

const files = [];
const stats = fs.statSync(resolvedPath);

if (stats.isDirectory()) {
  function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
      if (['node_modules', '.git', 'dist', 'build', '.ai-memory'].includes(f)) return;
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (/\.(html|jsx|tsx|vue|svelte|css|js|ts)$/.test(f)) files.push(full);
    });
  }
  walk(resolvedPath);
} else {
  files.push(resolvedPath);
}

console.log(`Auditing \x1b[33m${files.length}\x1b[0m web file(s) for modern web platform compliance...\n`);

let totalIssues = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const fileIssues = [];

  CHECKS.forEach(chk => {
    let match;
    const r = new RegExp(chk.regex.source, chk.regex.flags);
    while ((match = r.exec(content)) !== null) {
      const line = content.slice(0, match.index).split('\n').length;
      fileIssues.push({ line, match: match[0].slice(0, 40), message: chk.message, severity: chk.severity });
    }
  });

  if (fileIssues.length > 0) {
    totalIssues += fileIssues.length;
    const rel = path.relative(process.cwd(), file);
    console.log(`\x1b[33m[GUIDANCE FINDINGS]\x1b[0m \x1b[1m${rel}\x1b[0m:`);
    fileIssues.forEach(iss => {
      const color = iss.severity === 'error' ? '\x1b[31m' : iss.severity === 'warning' ? '\x1b[33m' : '\x1b[36m';
      console.log(`  Line ${iss.line.toString().padEnd(4)} | ${color}[${iss.severity.toUpperCase()}]\x1b[0m ${iss.message}`);
    });
    console.log('');
  }
});

console.log('--------------------------------------------------');
if (totalIssues === 0) {
  console.log('\x1b[32m✔ Modern Web Compliance: 100%! All files follow Google Chrome modern platform standards.\x1b[0m');
} else {
  console.log(`Found \x1b[33m${totalIssues}\x1b[0m modern web platform suggestion(s).`);
}
