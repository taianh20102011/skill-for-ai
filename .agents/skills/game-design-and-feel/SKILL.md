---
name: game-design-and-feel
description: Game design principles, Core Loop formulation, level design, balancing formulas, GDD writing, and Game Feel / Juice techniques (Screen Shake, Hitstop, Particle Bursts).
---

# Game Design & Game Feel ("Juice") Engineering

This skill defines the methodology for designing compelling gameplay mechanics, crafting clear Game Design Documents (GDD), balancing systems, and injecting tactile "game feel" into any game engine.

---

## 1. Core Loop Architecture

Every engaging game revolves around a tight, rewarding loop:

$$\text{Action} \longrightarrow \text{Reward} \longrightarrow \text{Progression} \longrightarrow \text{Escalation}$$

### Example Loops:
- **Action RPG**: Combat encounter $\to$ Loot / EXP drop $\to$ Upgrade gear/stats $\to$ Confront stronger boss.
- **Roguelite (Vampire Survivors style)**: Survive swarms $\to$ Collect gems $\to$ Choose synergies $\to$ Boss wave $\to$ Permanent meta-upgrades.
- **Arcade / Hypercasual**: Tap with timing $\to$ Near-miss multiplier $\to$ High score feedback $\to$ Immediate replay.

---

## 2. Game Feel is King ("The Juice")

A game with simple graphics but exquisite game feel will always outperform a visually realistic game with stiff controls. Implement these 5 invariants:

1. **Screen Shake**:
   - Apply trauma-based screen shake ($\text{Offset} = \text{Trauma}^2 \times \text{MaxOffset}$).
   - Shake must decay smoothly over time (e.g. linearly with delta).
2. **Hitstop (Micro Freeze Frame)**:
   - Freeze or drop global time scale to $0.05$ for $50\text{ms} - 100\text{ms}$ upon a critical strike. This gives heavy weight to impacts.
3. **Squash and Stretch**:
   - Distort sprite scale on jump ($\text{scale.y} = 1.3, \text{scale.x} = 0.8$) and landing ($\text{scale.y} = 0.7, \text{scale.x} = 1.2$) before returning to normal scale.
4. **Input Buffering & Coyote Time**:
   - **Coyote Time**: Allow jumping for $0.1\text{s} - 0.15\text{s}$ AFTER the player has left the ledge.
   - **Jump Buffer**: If the player presses Jump $0.1\text{s}$ before touching the ground, execute the jump immediately upon landing.
5. **Audio-Visual Impact Layering**:
   - Pair every damage impact with: 1) Flash white shader, 2) Particle burst in opposite direction of impact, 3) Punchy SFX.

---

## 3. Game Balancing & Curves

- **Health & Damage**: Avoid runaway exponential scaling unless counteracted by defensive mechanics.
  $$\text{Damage Taken} = \text{Raw Damage} \times \frac{100}{100 + \text{Armor}}$$
- **Experience Curve**: Progression should follow a quadratic or smooth polynomial formula so early levels feel fast while endgame requires mastery:
  $$\text{EXP To Next Level} = \text{Base} \times (\text{Current Level})^{1.5}$$

---

## 4. GDD (Game Design Document) Structure

When proposing or planning a game project, structure the GDD concisely:

1. **Elevator Pitch & High Concept**: One sentence summarizing the genre, hook, and player fantasy.
2. **Core Gameplay Loop**: Visual diagram and description of the second-to-second, minute-to-minute, and hour-to-hour actions.
3. **Controls & Input Mechanics**: Button mappings and response expectations.
4. **Entities & Progression**: Player stats, enemy archetypes, weapon progression, and economic loop.
5. **Aesthetics & Audio Mood**: Art direction (Pixel art / Low-poly 3D / Flat vector) and sound scape.

---

## 5. Prototyping Roadmap: "Start Small"

- **Never begin with an MMORPG or vast open world.**
- Prototype complete vertical slices of classic mechanics first:
  1. *Pong / Breakout* $\to$ Physics & bouncing.
  2. *Flappy Bird* $\to$ Gravity, input impulse, procedural obstacles.
  3. *Top-Down Arena Shooter* $\to$ 8-directional movement, projectile pooling, enemy pathfinding.
- Validate mechanics in **Game Jams** (Ludum Dare, Brackeys, GMTK Game Jam).
