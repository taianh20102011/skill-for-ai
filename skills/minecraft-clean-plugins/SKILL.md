---
name: minecraft-clean-plugins
description: Architect high-performance, non-slop Minecraft Paper/Purpur plugins with Adventure Kyori, Triumph-GUI, Lamp, and Lucko helper.
---

# Minecraft Clean Architecture & No-Slop Plugins Skill

This skill enforces production-grade engineering, asynchronous thread safety, and clean UI/UX for Minecraft server plugins on Paper and Purpur.

## 1. Core Architecture Stack
- **Text & Formatting**: `net.kyori.adventure.text.minimessage.MiniMessage`
  - Strict ban on legacy color codes (`§`, `&`).
  - Use hex gradients, hover events, and clickable callbacks.
- **GUI Engine**: `dev.triumphteam.gui`
  - Paginated GUIs, clean slot builders, animated inventory frames.
  - Asynchronous background item lore/NBT population.
- **Command Framework**: `revxrsal.commands.lamp` (Lamp)
  - Annotation-driven command trees (`@Command`, `@Subcommand`).
  - Automatic tab completion, sender validation, and custom parameter types.
- **Async Concurrency**: `me.lucko.helper`
  - Async schedulers, promises, event bus with filter/handler lifecycle.
  - Safe database synchronization (Mongo/Redis).
- **Block Manipulation**: FastAsyncWorldEdit (FAWE) patterns
  - Chunk batching, asynchronous block placement, NMS memory leak avoidance.

## 2. Standard Code Patterns
### Adventure MiniMessage
```java
Component message = MiniMessage.miniMessage().deserialize(
    "<gradient:#f59e0b:#ef4444><b>[SYSTEM]</b></gradient> <white>Operation completed successfully.</white>"
);
player.sendMessage(message);
```

### Lamp Command Pattern
```java
@Command("profile")
public class ProfileCommand {
    @Default
    public void defaultProfile(Player player) {
        // Open Triumph GUI asynchronously
    }

    @Subcommand("inspect")
    @Permission("admin.inspect")
    public void inspectPlayer(CommandSender sender, Player target) {
        // Safe inspection logic
    }
}
```
