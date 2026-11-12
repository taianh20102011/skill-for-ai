---
name: game-development-godot
description: Godot 4.x (GDScript) game development standards, architecture (Call Down Signal Up), game feel juice, and headless verification.
---

# Game Development with Godot 4.x (GDScript)

This skill governs the architecture, scripting, game feel, and verification standards for 2D and 3D games developed in **Godot 4.3+**.

---

## 1. Engine & Syntax Standards (Godot 4.x Strict)

- **NEVER** use Godot 3 syntax. Enforce Godot 4.x conventions:
  - Use `CharacterBody2D` / `CharacterBody3D` (NEVER `KinematicBody2D` or `KinematicBody`).
  - Use `await` (NEVER `yield`).
  - Use `instantiate()` (NEVER `instance()`).
  - Use `@export` and `@onready` annotations (NEVER `export var` or `onready var`).
  - Use callable syntax for signals: `button.pressed.connect(_on_button_pressed)` (NEVER string-based `connect("pressed", self, "_on_button_pressed")`).

### Enforce Strict Static Typing
All variables, function arguments, and return types MUST be explicitly typed:

```gdscript
extends CharacterBody2D

signal health_changed(current_health: int, max_health: int)
signal died()

@export var max_health: int = 100
@export var move_speed: float = 250.0

@onready var sprite: Sprite2D = $Sprite2D
@onready var collision_shape: CollisionShape2D = $CollisionShape2D

var current_health: int

func _ready() -> void:
    current_health = max_health

func take_damage(amount: int) -> void:
    current_health = clampi(current_health - amount, 0, max_health)
    health_changed.emit(current_health, max_health)
    if current_health <= 0:
        died.emit()
```

---

## 2. Architecture: "Call Down, Signal Up"

Maintain strict node decoupling:
1. **Parents call methods on children**: A player node can directly call `weapon.fire()`.
2. **Children emit signals to parents**: A hurtbox emits `hit_received(damage)` to notify the player, rather than reaching into the player's script.
3. **Never hardcode deep node paths**:
   - ❌ `get_node("../../../../Player").take_damage(10)`
   - ✅ Use `@export var target: Node2D`
   - ✅ Use Groups: `get_tree().get_first_node_in_group("player")`
   - ✅ Use an Autoload **EventBus** for cross-system events (UI updates, audio triggers, quest progression).

### EventBus Pattern (Autoload)
```gdscript
# EventBus.gd (Autoload singleton)
extends Node

signal player_spawned(player: CharacterBody2D)
signal score_updated(new_score: int)
signal screen_shake_requested(intensity: float, duration: float)
```

---

## 3. Data-Driven Architecture via Custom Resources

Separate gameplay data (item stats, weapon configurations, enemy tiers) into custom `Resource` scripts (`.tres` files) instead of hardcoding dictionaries inside entity code:

```gdscript
# weapon_data.gd
class_name WeaponData
extends Resource

@export var weapon_name: String = "Iron Sword"
@export var base_damage: int = 15
@export var attack_cooldown: float = 0.4
@export var icon: Texture2D
```

---

## 4. Game Feel & "Juice" Invariants

Never deliver static, rigid combat or interactions. Always implement game feel:
- **Hitstop (Frame Freeze)**:
  ```gdscript
  func apply_hitstop(duration: float = 0.08) -> void:
      Engine.time_scale = 0.05
      await get_tree().create_timer(duration * 0.05).timeout
      Engine.time_scale = 1.0
  ```
- **Tween-based UI Transitions**:
  ```gdscript
  var tween: Tween = create_tween().set_trans(Tween.TRANS_BACK).set_ease(Tween.EASE_OUT)
  tween.tween_property(card, "scale", Vector2.ONE, 0.25).from(Vector2.ZERO)
  ```
- **Camera Shake**: Offset camera using OpenSimplexNoise decayed by delta.

---

## 5. Headless Verification Loop

Before reporting task completion, verify syntax and parse errors without launching the graphical display:
```bash
godot --headless --quit
```
If errors or broken node references exist, capture the console output and self-heal the `.gd` or `.tscn` file.
