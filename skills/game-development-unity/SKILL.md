---
name: game-development-unity
description: Unity C# standards, memory optimization, object pooling, ScriptableObject data architecture, and headless testing.
---

# Game Development with Unity (C#)

This skill governs high-performance C# coding conventions, memory optimization, decoupled architecture, and testing for **Unity 2022 LTS / Unity 6+**.

---

## 1. High-Performance C# Coding Conventions

- **Never call `GetComponent` inside `Update()` or `FixedUpdate()`**:
  Cache all component references in `Awake()` or serialize them with `[SerializeField]`.
- **Prefer `[SerializeField] private` over `public` fields** to preserve encapsulation while exposing properties to the Inspector.
- **Use `CompareTag("Player")`** instead of `gameObject.tag == "Player"` to avoid unnecessary heap allocations.
- **String Hashing**: Use `Animator.StringToHash("Speed")` or `Shader.PropertyToID("_Color")` instead of raw string lookups in runtime loops.

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Header("Movement Settings")]
    [SerializeField] private float moveSpeed = 6f;
    [SerializeField] private Rigidbody2D rb;

    private static readonly int WalkAnimHash = Animator.StringToHash("IsWalking");
    [SerializeField] private Animator animator;

    private Vector2 inputDirection;

    private void Awake()
    {
        if (rb == null) rb = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        inputDirection = new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical")).normalized;
        animator.SetBool(WalkAnimHash, inputDirection.sqrMagnitude > 0.01f);
    }

    private void FixedUpdate()
    {
        rb.linearVelocity = inputDirection * moveSpeed;
    }
}
```

---

## 2. Memory & Frame Optimization (Zero-GC Loop)

- **Object Pooling**: Never call `Instantiate()` or `Destroy()` for frequently spawned entities (projectiles, floating damage numbers, particle emitters). Use `UnityEngine.Pool.ObjectPool<T>`:
  ```csharp
  using UnityEngine.Pool;

  public class ProjectilePool : MonoBehaviour
  {
      [SerializeField] private Projectile projectilePrefab;
      private ObjectPool<Projectile> pool;

      private void Awake()
      {
          pool = new ObjectPool<Projectile>(
              createFunc: () => Instantiate(projectilePrefab),
              actionOnGet: p => p.gameObject.SetActive(true),
              actionOnRelease: p => p.gameObject.SetActive(false),
              actionOnDestroy: p => Destroy(p.gameObject),
              defaultCapacity: 50,
              maxSize: 200
          );
      }

      public Projectile Spawn(Vector3 position, Quaternion rotation)
      {
          var p = pool.Get();
          p.transform.SetPositionAndRotation(position, rotation);
          return p;
      }

      public void Return(Projectile p) => pool.Release(p);
  }
  ```
- **Avoid LINQ in `Update()`**: LINQ queries generate garbage collection spikes. Use plain `for` loops.

---

## 3. Data Architecture: ScriptableObjects

Separate static configuration and runtime stats from logic components:
```csharp
[CreateAssetMenu(fileName = "NewEnemyData", menuName = "Game/Enemy Data")]
public class EnemyDataSO : ScriptableObject
{
    public string enemyName;
    public int maxHealth;
    public float movementSpeed;
    public int attackPower;
}
```

---

## 4. Input & Event Decoupling

- Use the **New Input System** (`UnityEngine.InputSystem`) for modern gamepad, keyboard, and touch mapping.
- Decouple cross-system messaging using C# Actions or ScriptableObject-based event channels:
  ```csharp
  public static event System.Action<int> OnScoreChanged;
  ```
