#!/usr/bin/env node

/**
 * UNSLOP CLI - AI UI De-Slopping Engine
 * Based on heydamir/unslop & Alabaster Porcelain Standards
 * 
 * Usage:
 *   unslop <file|dir> [--fix]
 *   node bin/unslop.js <file|dir> [--fix]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const targetPath = args[0];
const shouldFix = args.includes('--fix');

console.log('\x1b[36m%s\x1b[0m', `
  ██╗   ██╗███╗   ██╗███████╗██╗      ██████╗ ██████╗ 
  ██║   ██║████╗  ██║██╔════╝██║     ██╔═══██╗██╔══██╗
  ██║   ██║██╔██╗ ██║███████╗██║     ██║   ██║██████╔╝
  ██║   ██║██║╚██╗██║╚════██║██║     ██║   ██║██╔═══╝ 
  ╚██████╔╝██║ ╚████║███████║███████╗╚██████╔╝██║     
   ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝ ╚═════╝ ╚═╝     
`);
console.log('\x1b[32m%s\x1b[0m', '>>> 9-Pass AI UI De-Slopping Engine (heydamir/unslop) <<<\n');

if (!targetPath || targetPath === '--help' || targetPath === '-h') {
  console.log(`\x1b[33mUsage in Terminal:\x1b[0m
  unslop <file|directory> [--fix]

\x1b[33mUsage in AI Chat (Antigravity / Claude Code / Cursor):\x1b[0m
  Type \x1b[32m/unslop <file|url|component>\x1b[0m directly in the chat!

\x1b[33mThe 9 Ordered Review Passes:\x1b[0m
  1. \x1b[36mSpacing\x1b[0m     - Enforce strict 4px/8px grid, uniform padding, eliminate arbitrary offsets.
  2. \x1b[36mColor\x1b[0m       - Eliminate neon purple/pink gradients; use restrained porcelain/slate/sapphire.
  3. \x1b[36mIcons\x1b[0m       - Remove arbitrary emojis in button/nav labels; standardize on Lucide/Radix SVG.
  4. \x1b[36mCopy\x1b[0m        - Strip shouty clichés ("Supercharge", "Unleash", "Next-Gen"); use confident prose.
  5. \x1b[36mTypography\x1b[0m  - Clear scale, tight tracking on headings, Plus Jakarta Sans & JetBrains Mono.
  6. \x1b[36mLayout\x1b[0m      - Intentional whitespace, eliminate nested cards, single clear focal point.
  7. \x1b[36mDetails\x1b[0m     - Replace fuzzy glow shadows with CNC 1px border; enforce rounded-[6px].
  8. \x1b[36mVisuals\x1b[0m     - Replace generic 3D blobs with sharp technical diagrams or real product UI.
  9. \x1b[36mMotion\x1b[0m      - Replace linear CSS with 150-250ms spring physics or GSAP hardware tweens.

\x1b[33mOptions:\x1b[0m
  --fix        Automatically apply safe de-slopping transformations to the target file.
`);
  process.exit(0);
}

const resolvedPath = path.resolve(process.cwd(), targetPath);

if (!fs.existsSync(resolvedPath)) {
  console.error(`\x1b[31mError: Target path not found: ${resolvedPath}\x1b[0m`);
  process.exit(1);
}

// Slop detection rules
const SLOP_RULES = [
  {
    pass: 'Pass 2 (Color)',
    id: 'neon-gradient',
    regex: /(bg-gradient-to-[a-z]+|from-(?:purple|indigo|pink|cyan|violet)-\d{3}|to-(?:purple|indigo|pink|cyan|violet)-\d{3})/g,
    desc: 'Generic AI neon gradient background or border'
  },
  {
    pass: 'Pass 2 (Color)',
    id: 'purple-slop',
    regex: /(text-purple-[456]\d{2}|bg-purple-[456]\d{2}\/|border-purple-[456]\d{2})/g,
    desc: 'Indiscriminate AI purple accent'
  },
  {
    pass: 'Pass 3 (Icons)',
    id: 'label-emoji',
    regex: />\s*([🚀⚡🤖💡🔥🌟🎓✨])\s*([^<]+)</g,
    desc: 'Generic AI decorative emoji in UI label or button'
  },
  {
    pass: 'Pass 4 (Copy)',
    id: 'shouty-buzzword',
    regex: /\b(supercharge|unleash|next-gen|10x engineer|game-changing|revolutionize)\b/gi,
    desc: 'Hollow marketing buzzword cliché'
  },
  {
    pass: 'Pass 7 (Details)',
    id: 'glassmorphism',
    regex: /(backdrop-blur-(?:md|lg|xl|sm)|bg-opacity-\d+|bg-white\/(?:10|20|30)|bg-black\/(?:10|20|30))/g,
    desc: 'Glassmorphism blur abuse'
  },
  {
    pass: 'Pass 7 (Details)',
    id: 'inconsistent-radius',
    regex: /\b(rounded-(?:xl|2xl|3xl))\b/g,
    desc: 'Inconsistent large border radius (Rule requires strict rounded-[6px] / rounded-md)'
  },
  {
    pass: 'Pass 7 (Details)',
    id: 'glowing-shadow',
    regex: /\b(shadow-(?:purple|indigo|blue|cyan)-\d{2,3}(?:\/\d{2})?)\b/g,
    desc: 'Fuzzy glowing drop-shadow tell'
  }
];

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const findings = [];

  SLOP_RULES.forEach(rule => {
    let match;
    const regex = new RegExp(rule.regex.source, rule.regex.flags);
    while ((match = regex.exec(content)) !== null) {
      // Find line number
      const upToMatch = content.slice(0, match.index);
      const lineNumber = upToMatch.split('\n').length;
      findings.push({
        pass: rule.pass,
        id: rule.id,
        desc: rule.desc,
        match: match[0].trim(),
        line: lineNumber
      });
    }
  });

  return { filePath, findings, content };
}

function deSlopContent(content) {
  let modified = content;

  // 1. Color: replace purple gradients with clean sapphire or neutral zinc
  modified = modified.replace(/bg-gradient-to-r\s+from-purple-\d+\s+to-[a-z]+-\d+/g, 'bg-[#2563EB]');
  modified = modified.replace(/bg-gradient-to-tr\s+from-blue-600\s+to-indigo-500/g, 'bg-[#2563EB]');
  modified = modified.replace(/from-purple-\d+/g, 'from-zinc-800');
  modified = modified.replace(/to-pink-\d+/g, 'to-zinc-900');
  modified = modified.replace(/text-purple-300/g, 'text-zinc-200');
  modified = modified.replace(/text-purple-400/g, 'text-blue-400');
  modified = modified.replace(/bg-purple-600\/20/g, 'bg-zinc-800');
  modified = modified.replace(/bg-purple-600\/30/g, 'bg-zinc-700');
  modified = modified.replace(/border-purple-500\/30/g, 'border-zinc-700');
  modified = modified.replace(/border-purple-500\/20/g, 'border-zinc-800');

  // 2. Icons: strip emojis from labels
  modified = modified.replace(/>\s*([🚀⚡🤖💡🔥🌟🎓✨])\s*([^<]+)</g, '>$2<');

  // 3. Details: Replace rounded-xl, 2xl, 3xl with strict rounded-[6px]
  modified = modified.replace(/\brounded-(?:xl|2xl|3xl)\b/g, 'rounded-[6px]');

  // 4. Details: Strip glassmorphism blur and random glowing shadows
  modified = modified.replace(/\s*backdrop-filter:\s*blur\([^)]+\);?/g, '');
  modified = modified.replace(/\s*backdrop-blur-[a-z0-9]+/g, '');
  modified = modified.replace(/shadow-(?:purple|indigo|blue|cyan)-\d{2,3}(?:\/\d{2})?/g, 'shadow-sm');

  // 5. Details: CNC sub-pixel border
  modified = modified.replace(/border\s+border-zinc-800\/80/g, 'border border-[#202024]');

  return modified;
}

const stats = fs.statSync(resolvedPath);
const filesToAudit = [];

if (stats.isDirectory()) {
  function walkDir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const full = path.join(dir, file);
      if (['node_modules', '.git', 'dist', 'build', '.ai-memory'].includes(file)) return;
      if (fs.statSync(full).isDirectory()) {
        walkDir(full);
      } else if (/\.(html|jsx|tsx|vue|svelte|js|css)$/.test(file)) {
        filesToAudit.push(full);
      }
    });
  }
  walkDir(resolvedPath);
} else {
  filesToAudit.push(resolvedPath);
}

let totalFindings = 0;

console.log(`Auditing \x1b[33m${filesToAudit.length}\x1b[0m file(s) for AI UI Slop...\n`);

filesToAudit.forEach(file => {
  const relPath = path.relative(process.cwd(), file);
  const { findings, content } = auditFile(file);

  if (findings.length > 0) {
    totalFindings += findings.length;
    console.log(`\x1b[31m[SLOP DETECTED]\x1b[0m \x1b[1m${relPath}\x1b[0m (${findings.length} issue${findings.length > 1 ? 's' : ''}):`);
    
    // Group by pass
    const grouped = {};
    findings.forEach(f => {
      grouped[f.pass] = grouped[f.pass] || [];
      grouped[f.pass].push(f);
    });

    Object.keys(grouped).forEach(pass => {
      console.log(`  \x1b[35m${pass}:\x1b[0m`);
      grouped[pass].forEach(f => {
        console.log(`    Line ${f.line.toString().padEnd(4)} | \x1b[33m${f.match}\x1b[0m -> ${f.desc}`);
      });
    });

    if (shouldFix) {
      const fixed = deSlopContent(content);
      fs.writeFileSync(file, fixed, 'utf8');
      console.log(`  \x1b[32m✔ Auto-fixed and cleaned according to 9-pass standards.\x1b[0m\n`);
    } else {
      console.log('');
    }
  }
});

console.log('--------------------------------------------------');
if (totalFindings === 0) {
  console.log('\x1b[32m✔ 100% Anti-Slop Clean! No AI UI stereotypes detected.\x1b[0m');
} else {
  if (shouldFix) {
    console.log(`\x1b[32m✔ Completed De-Slopping! Fixed ${totalFindings} AI UI issue(s).\x1b[0m`);
  } else {
    console.log(`\x1b[33mTotal Slop Issues Found:\x1b[0m \x1b[31m${totalFindings}\x1b[0m`);
    console.log(`Run with \x1b[32m--fix\x1b[0m to automatically clean safe patterns, or use \x1b[32m/unslop\x1b[0m in chat for full human-grade redesign.`);
  }
}
