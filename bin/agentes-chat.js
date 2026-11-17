#!/usr/bin/env node

/**
 * AGENTES CHAT CLI - Multi-Agent Team Collaboration Hub Launcher
 * Based on agentes-chat/agentes-chat
 * 
 * Usage:
 *   agentes-chat [init|start|status|stop]
 *   node bin/agentes-chat.js [init|start|status|stop]
 */

const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

const args = process.argv.slice(2);
const command = (args[0] || 'status').toLowerCase();

console.log('\x1b[36m%s\x1b[0m', `
   █████╗  ██████╗ ███████╗███╗   ██╗████████╗███████╗███████╗     ██████╗██╗  ██╗ █████╗ ████████╗
  ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██╔════╝██╔════╝    ██╔════╝██║  ██║██╔══██╗╚══██╔══╝
  ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   █████╗  ███████╗    ██║     ███████║███████║   ██║   
  ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   ██╔══╝  ╚════██║    ██║     ██╔══██║██╔══██║   ██║   
  ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ███████╗███████║    ╚██████╗██║  ██║██║  ██║   ██║   
  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   
`);
console.log('\x1b[32m%s\x1b[0m', '>>> Multi-Agent Team Collaboration Hub & MCP Tool Bus <<<\n');

const COMPOSE_FILE = path.join(process.cwd(), 'docker-compose.agentes.yml');

const DOCKER_COMPOSE_TEMPLATE = `version: '3.8'

services:
  agentes-chat:
    image: agenteschat/agentes-chat:latest
    container_name: agentes-chat
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/agentes
      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    container_name: agentes-db
    restart: unless-stopped
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=agentes
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
`;

if (command === 'init') {
  if (fs.existsSync(COMPOSE_FILE)) {
    console.log(`\x1b[33m[!] docker-compose.agentes.yml already exists in current directory.\x1b[0m`);
  } else {
    fs.writeFileSync(COMPOSE_FILE, DOCKER_COMPOSE_TEMPLATE, 'utf8');
    console.log(`\x1b[32m✔ Created docker-compose.agentes.yml successfully!\x1b[0m`);
    console.log(`Run \x1b[36magentes-chat start\x1b[0m to launch the team hub.`);
  }
  process.exit(0);
}

if (command === 'start') {
  if (!fs.existsSync(COMPOSE_FILE)) {
    fs.writeFileSync(COMPOSE_FILE, DOCKER_COMPOSE_TEMPLATE, 'utf8');
    console.log(`\x1b[32m✔ Initialized docker-compose.agentes.yml\x1b[0m`);
  }
  console.log(`\x1b[33m[*] Starting Agentes Chat via Docker Compose...\x1b[0m`);
  try {
    execSync('docker compose -f docker-compose.agentes.yml up -d', { stdio: 'inherit' });
    console.log(`\n\x1b[32m✔ Agentes Chat is running at: http://localhost:3000\x1b[0m`);
  } catch (e) {
    console.error(`\x1b[31m[!] Error: Docker is either not running or not installed on this machine.\x1b[0m`);
    console.log(`Make sure Docker Desktop is started, then re-run: \x1b[36magentes-chat start\x1b[0m`);
  }
  process.exit(0);
}

if (command === 'stop') {
  if (fs.existsSync(COMPOSE_FILE)) {
    try {
      execSync('docker compose -f docker-compose.agentes.yml down', { stdio: 'inherit' });
      console.log(`\x1b[32m✔ Agentes Chat stopped.\x1b[0m`);
    } catch (e) {
      console.error(`\x1b[31m[!] Failed to stop containers.\x1b[0m`);
    }
  } else {
    console.log(`\x1b[33mNo docker-compose.agentes.yml found.\x1b[0m`);
  }
  process.exit(0);
}

// Default: status & help
console.log(`\x1b[33mUsage in Terminal:\x1b[0m
  agentes-chat init    - Generate docker-compose.agentes.yml configuration
  agentes-chat start   - Spin up Agentes Chat containers (Port 3000)
  agentes-chat stop    - Stop running containers
  agentes-chat status  - Check running status

\x1b[33mUsage in AI Chat:\x1b[0m
  Type \x1b[32m/agentes-chat\x1b[0m to orchestrate team channels and configure multi-agent roles.

\x1b[33mStatus Check:\x1b[0m`);

try {
  const dockerVersion = execSync('docker --version', { encoding: 'utf8' }).trim();
  console.log(`  - Docker: \x1b[32m${dockerVersion}\x1b[0m`);
} catch (e) {
  console.log(`  - Docker: \x1b[33mNot detected or not running.\x1b[0m`);
}

const hasConfig = fs.existsSync(COMPOSE_FILE);
console.log(`  - Config (docker-compose.agentes.yml): ${hasConfig ? '\x1b[32mFound\x1b[0m' : '\x1b[33mNot yet initialized (run `agentes-chat init`)\x1b[0m'}`);
