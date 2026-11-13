---
name: programmatic-video-remotion
description: Programmatic React-based video creation using Remotion, Remotion Three (Three.js), frame-accurate spring physics, and headless video rendering.
---

# Programmatic Video Creation with Remotion (React & Three.js)

This skill governs the standards for creating programmatic, data-driven, frame-accurate videos using **Remotion**, **React 19**, **Tailwind CSS**, and **Three.js** (`@remotion/three`).

---

## 1. Core Architecture & Mental Model

In Remotion, video is a pure function of frame number and configuration:

$$\text{Frame} \in [0, \text{durationInFrames}-1] \xrightarrow{\quad\text{React Render}\quad} \text{Pixel Output}$$

- **`useCurrentFrame()`**: Returns the exact frame currently being rendered (starts at 0).
- **`useVideoConfig()`**: Returns `{ fps, durationInFrames, width, height }`.
- **`interpolate()`**: Maps frame numbers to visual properties (opacity, translate, scale) with clamping and easing.
- **`spring()`**: Computes physically-based spring animations based on FPS and mass/damping/stiffness.

---

## 2. Best-Practice Remotion Composition

```tsx
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const MotionTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth entrance using spring physics
  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 }
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(entrance, [0, 1], [60, 0]);

  return (
    <AbsoluteFill className="bg-[#080808] flex items-center justify-center text-white">
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`
        }}
        className="text-center space-y-4"
      >
        <h1 className="text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-2xl text-zinc-400 font-medium">{subtitle}</p>
      </div>
    </AbsoluteFill>
  );
};
```

---

## 3. Integrating 3D Graphics with `@remotion/three`

Embed Three.js scenes directly inside video compositions:

```tsx
import { ThreeCanvas } from '@remotion/three';
import { useCurrentFrame } from 'remotion';

const RotatingMesh = () => {
  const frame = useCurrentFrame();
  return (
    <mesh rotation={[frame * 0.02, frame * 0.03, 0]}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

export const Scene3D = () => {
  return (
    <ThreeCanvas width={1920} height={1080}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <RotatingMesh />
    </ThreeCanvas>
  );
};
```

---

## 4. Audio Synchronization & Voiceover Sync

```tsx
import { Audio, Sequence, staticFile } from 'remotion';

export const VideoWithAudio = () => {
  return (
    <>
      {/* Background Music with gentle volume */}
      <Audio src={staticFile('audio/ambient-bgm.mp3')} volume={0.15} />

      {/* Voiceover synced to exact frame sequence */}
      <Sequence from={30}>
        <Audio src={staticFile('audio/voiceover-part-1.mp3')} volume={1.0} />
      </Sequence>
    </>
  );
};
```

---

## 5. CLI Rendering & Cloud Export

- **Preview Studio**: `npx remotion preview`
- **Render High-Res MP4**:
  ```bash
  npx remotion render src/index.ts MainComposition out/video.mp4 --codec=h264 --crf=18
  ```
- **Vertical Video for Reels/Shorts/TikTok (9:16)**:
  Set `width={1080}` and `height={1920}` in `<Composition />`.
