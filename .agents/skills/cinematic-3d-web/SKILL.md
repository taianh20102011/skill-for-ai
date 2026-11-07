---
name: cinematic-3d-web
description: Build cinematic, immersive 3D web experiences using Three.js, React Three Fiber (R3F), Drei, custom GLSL shaders, and post-processing without performance drops.
---

# Cinematic 3D Web & Creative Engineering Skill

This skill guides the construction of high-end 3D visual experiences on the web, treating web canvas layout like cinematic film direction (lighting, staging, materials, shaders, and camera work) while maintaining a strict 60 FPS performance envelope.

## 1. Core Principles
- **60 FPS Strict Budget**: Keep draw calls under 50, vertex count reasonable, and use instanced meshes (`<Instances>`) for repeated geometry.
- **Lighting & Ambiance**: Dark, moody environments (`#080808` clearColor), directional lights with soft shadows, subtle environment maps (`@react-three/drei` `<Environment>`).
- **Post-Processing (Subtle, Anti-Slop)**:
  - Low-intensity Bloom (`luminanceThreshold: 0.9`, `intensity: 0.4`).
  - Noise / Film Grain to eliminate color banding on dark gradients.
  - Subtle Chromatic Aberration only on rapid movements.

## 2. R3F + Drei Architecture
```tsx
import { Canvas } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';

export function CinematicScene() {
  return (
    <div className="relative h-screen w-full bg-[#080808]">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <color attach="background" args={['#080808']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <mesh>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
            <MeshTransmissionMaterial
              backside
              samples={4}
              thickness={0.5}
              roughness={0.1}
              chromaticAberration={0.05}
              color="#ffffff"
            />
          </mesh>
        </Float>

        <Environment preset="city" />

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.85} intensity={0.3} />
          <Noise opacity={0.025} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
```

## 3. Shader Best Practices
- Never calculate expensive operations inside `fragmentShader` if they can be interpolated from `vertexShader`.
- Use GLSL simplex noise instead of heavy texture lookups for procedural effects.
- Pause render loop (`frameloop="demand"`) when the canvas is offscreen using `IntersectionObserver`.
