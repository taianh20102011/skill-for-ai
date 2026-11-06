---
name: clean-git-workflow
description: Standardize Git workflows, Conventional Commits, semantic versioning, and branch management for autonomous pairs.
---

# Clean Git Workflow & Semantic Versioning Skill

This skill enforces atomic, well-described commits and standard branching conventions.

## 1. Conventional Commit Types
- `feat`: A new user-facing feature or API capability.
- `fix`: A bug fix or patch.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `style`: Changes that do not affect code logic (formatting, white-space).
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Build process, dependencies, tooling updates.

## 2. Commit Message Template
```text
<type>(<scope>): <short description in present tense>

[optional body explaining motivation and context]

[optional footer with issue references, e.g., Closes #123]
```

## 3. Atomic Commit Protocol for Agents
1. Only commit files related to a single logical change.
2. Never commit generated artifacts (`dist/`, `build/`, `node_modules/`, `.env`).
3. Ensure the project builds (`pnpm run build` or `./gradlew test`) before committing.
