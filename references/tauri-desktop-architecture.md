# Tauri Desktop Architecture: Ultra-Lightweight, Secure Desktop Apps

> Inspired by [tauri-apps/tauri](https://github.com/tauri-apps/tauri)

Tauri allows developers to build desktop and mobile applications using modern web technologies (Next.js, Vite, React, Vue, Svelte + Tailwind + GSAP) paired with a high-performance, memory-safe Rust core.

---

## 1. Why Tauri Beats Electron

| Metric | Tauri v2 | Electron |
|---|---|---|
| **Binary Size** | ~3 MB to 15 MB | ~120 MB to 200 MB+ |
| **RAM Consumption** | ~30 MB to 50 MB | ~200 MB to 500 MB+ |
| **Runtime Overhead** | Uses native OS webview (WebView2/WebKit) | Bundles full Chromium + Node.js |
| **Security Model** | Strict capability-based permissions & Rust memory safety | Node.js integration security risks |
| **Startup Time** | Instant (< 300ms) | 2–5 seconds cold boot |

---

## 2. Capability-Based Security Configuration (`tauri.conf.json`)

Tauri uses zero-trust security: the frontend webview has zero access to the filesystem, network, or OS shell unless explicitly allowed in capability files:

```json
{
  "productName": "PorcelainStudio",
  "version": "1.0.0",
  "identifier": "com.porcelain.studio",
  "build": {
    "beforeDevCommand": "pnpm dev",
    "devUrl": "http://localhost:5173",
    "beforeBuildCommand": "pnpm build",
    "frontendDist": "../dist"
  },
  "app": {
    "windows": [
      {
        "title": "Porcelain Studio",
        "width": 1200,
        "height": 800,
        "minWidth": 800,
        "minHeight": 600,
        "decorations": true,
        "transparent": false
      }
    ],
    "security": {
      "csp": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
    }
  }
}
```

---

## 3. Invoking Rust Commands from React / GSAP Frontend

```typescript
import { invoke } from "@tauri-apps/api/core";

// Safe, typed RPC call to native Rust backend
export async function verifyMfaChallenge(challengeId: string, otp: string) {
  try {
    const result = await invoke<{ success: boolean; sessionToken?: string }>("verify_otp", {
      challengeId,
      otp,
    });
    return result;
  } catch (error) {
    console.error("Tauri command error:", error);
    throw error;
  }
}
```

---

## 4. Hardware-Accelerated GSAP Rendering in Native Webviews

Because Tauri uses native OS webviews (Microsoft Edge WebView2 on Windows, WebKit on macOS), GSAP animations run at native 120Hz/60Hz monitor refresh rates with full GPU rasterization:
- Use `willChange: "transform, opacity"` on animated elements.
- Enable `force3D: true` on GSAP tweens.
- Wrap animations in `useGSAP` for automatic cleanup when views unmount.
