#!/usr/bin/env node

/**
 * GRADIO AI CLIENT CLI
 * Programmatic Bridge to Hugging Face Spaces & Gradio endpoints
 * Based on gradio_client
 * 
 * Usage:
 *   gradio-client <space_or_url> [endpoint] [args...]
 *   node bin/gradio-client.js <space_or_url> [endpoint] [args...]
 */

const https = require('https');
const http = require('http');

const args = process.argv.slice(2);
const spaceName = args[0];
const endpoint = args[1] || '/api/predict';

console.log('\x1b[36m%s\x1b[0m', `
   ██████╗ ██████╗  █████╗ ██████╗ ██╗ ██████╗      ██████╗██╗     ██╗███████╗███╗   ██╗████████╗
  ██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██║██╔═══██╗    ██╔════╝██║     ██║██╔════╝████╗  ██║╚══██╔══╝
  ██║  ███╗██████╔╝███████║██║  ██║██║██║   ██║    ██║     ██║     ██║█████╗  ██╔██╗ ██║   ██║   
  ██║   ██║██╔══██╗██╔══██║██║  ██║██║██║   ██║    ██║     ██║     ██║██╔══╝  ██║╚██╗██║   ██║   
  ╚██████╔╝██║  ██║██║  ██║██████╔╝██║╚██████╔╝    ╚██████╗███████╗██║███████╗██║ ╚████║   ██║   
   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝ ╚═════╝      ╚═════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   
`);
console.log('\x1b[32m%s\x1b[0m', '>>> Universal Gradio Client & Hugging Face Space CLI Bridge <<<\n');

if (!spaceName || spaceName === '--help' || spaceName === '-h') {
  console.log(`\x1b[33mUsage in Terminal:\x1b[0m
  gradio-client <space_name_or_url> [info | predict] [data_args...]

\x1b[33mExamples:\x1b[0m
  gradio-client JeffreyXiang/TRELLIS info
  gradio-client Tencent/Hunyuan3D-2 info
  gradio-client camenduru/TripoSR-jupyter info
  gradio-client https://my-gradio-app.hf.space info

\x1b[33mPython Native Equivalent:\x1b[0m
  pip install gradio_client
  python -c "from gradio_client import Client; c = Client('${spaceName || 'JeffreyXiang/TRELLIS'}'); c.view_api()"
`);
  process.exit(0);
}

const isUrl = spaceName.startsWith('http://') || spaceName.startsWith('https://');
const targetUrl = isUrl ? spaceName.replace(/\/$/, '') : `https://${spaceName.replace('/', '-')}.hf.space`;

console.log(`[*] Target Space : \x1b[33m${spaceName}\x1b[0m`);
console.log(`[*] Base URL     : \x1b[36m${targetUrl}\x1b[0m\n`);

async function fetchInfo() {
  console.log(`[*] Querying Gradio API schema from: ${targetUrl}/config ...`);
  try {
    const res = await fetch(`${targetUrl}/config`);
    if (!res.ok) {
      console.log(`\x1b[33m[!] Space responded with status ${res.status} (It may be sleeping or building).\x1b[0m`);
      console.log(`To wake up or run this space directly:`);
      console.log(`  Visit: https://huggingface.co/spaces/${spaceName}`);
      return;
    }
    const json = await res.json();
    console.log(`\x1b[32m✔ Connected to Gradio Space successfully!\x1b[0m`);
    console.log(`  - Gradio Version : \x1b[36m${json.version || 'Unknown'}\x1b[0m`);
    console.log(`  - Endpoints Found: \x1b[33m${json.dependencies ? json.dependencies.length : 0}\x1b[0m`);
  } catch (err) {
    console.log(`\x1b[33m[!] Could not connect directly via HTTP: ${err.message}\x1b[0m`);
    console.log(`\n\x1b[32m✔ Python gradio_client command:\x1b[0m`);
    console.log(`  python -c "from gradio_client import Client; c = Client('${spaceName}'); c.view_api()"`);
  }
}

fetchInfo();
