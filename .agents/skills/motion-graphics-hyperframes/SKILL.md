---
name: motion-graphics-hyperframes
description: Programmatic motion graphics using HyperFrames, GSAP timelines, Three.js WebGL canvas, and 60fps headless video frame capture.
---

# Programmatic Motion Graphics with HyperFrames, GSAP, & Three.js

This skill establishes workflows for building programmatic motion graphics, title sequences, 3D visual effects, and animated charts using **HyperFrames**, **GSAP 25+**, and **Three.js**.

---

## 1. HyperFrames Concept: Code-Driven Motion

HyperFrames allows developers to orchestrate complex DOM, Canvas, and WebGL animations using standard web technologies (HTML, CSS, GSAP, Three.js) and capture them frame-by-frame with deterministic timing.

$$\text{Time } t = \frac{\text{Frame}}{\text{FPS}} \implies \text{GSAP Timeline.seek}(t) \implies \text{WebGL Canvas.render}() \implies \text{Export PNG}$$

---

## 2. Deterministic GSAP Timeline with Canvas Sync

```javascript
import gsap from 'gsap';
import * as THREE from 'three';

export class MotionScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.1, 1000);
    this.camera.position.z = 5;

    // Create 3D Element
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.9, roughness: 0.1 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(2, 4, 5);
    this.scene.add(light);

    // Build Master GSAP Timeline (Paused)
    this.tl = gsap.timeline({ paused: true });
    this.tl.to(this.mesh.rotation, { x: Math.PI * 2, y: Math.PI * 2, duration: 4, ease: 'power2.inOut' })
           .to(this.camera.position, { z: 8, duration: 2, ease: 'sine.inOut' }, 0);
  }

  // Render an exact point in time (Deterministic Frame Capture)
  renderFrame(timeInSeconds) {
    this.tl.seek(timeInSeconds);
    this.renderer.render(this.scene, this.camera);
  }
}
```

---

## 3. Headless 60FPS Video Rendering Loop (Playwright / Puppeteer)

To render the animation into a video file:
1. Launch headless Chromium via Playwright.
2. Load the motion graphics HTML page.
3. Advance the timeline step-by-step: $\Delta t = \frac{1}{60}$.
4. Read canvas pixels via `canvas.toDataURL('image/png')` or `page.screenshot()`.
5. Pipe the image stream directly into `ffmpeg` stdin:

```bash
ffmpeg -f image2pipe -framerate 60 -i - -c:v libx264 -pix_fmt yuv420p -crf 17 output.mp4
```

---

## 4. Anti-Slop Motion Design Rules

- **Spring Dynamics**: Use natural decay curves (`power2.out`, `expo.out`, or custom spring parameters). Never use linear transitions for UI element appearances.
- **Visual Staggering**: When multiple elements appear (cards, list items, text lines), stagger entrances by $0.04\text{s} - 0.08\text{s}$ to create rhythmic flow.
- **Sub-pixel Precision**: Render at $2\times$ resolution (e.g. $3840\times 2160$) and downsample with lanczos scaling for razor-sharp edges.
