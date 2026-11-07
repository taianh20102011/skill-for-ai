# Awesome Cursorrules: Agent Rules & Code Discipline Index

> Based on [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules)

This guide synthesizes the highest-rated rules, conventions, and constraints for modern coding agents (Antigravity, Claude Code, Cursor, Codex, ChatGPT) across web, backend, and security.

---

## 1. Universal Anti-Overengineering Rule (`anti-overengineering.mdc`)

- **Strict Task Scoping**: Implement ONLY what the user asked for. Do not introduce unrequested generic frameworks, dynamic dispatchers, or multi-layered abstractions for one-off tasks.
- **Dependency Minimization**: Favor standard libraries and native web APIs (`fetch`, `URL`, `Intl`, `crypto`) before adding npm or crates.io packages.
- **Rule of Three**: Only abstract a pattern after it appears identically three times.

---

## 2. Next.js 15 / React 19 Rules (`nextjs-15-react-19.mdc`)

- **Server vs Client Boundary**:
  - Keep components as React Server Components (RSC) by default.
  - Add `'use client'` only when using React hooks (`useState`, `useEffect`, `useRef`), browser APIs, or GSAP animations (`useGSAP`).
- **Data Fetching**:
  - Fetch data directly in Server Components using async/await with native fetch cache tags (`revalidateTag`).
  - Never expose database credentials or direct ORM calls to the client.
- **Forms & Server Actions**:
  - Use Server Actions with Zod validation. Always return typed status objects `{ success: boolean, error?: string, data?: T }`.
  - Always handle pending states using `useActionState` or `useTransition`.

---

## 3. Tailwind CSS & Alabaster Porcelain Rules (`tailwind-design.mdc`)

- **Strict Radius Invariant**: Use `rounded-[6px]` exclusively. Do not use `rounded-lg`, `rounded-xl`, or `rounded-full` for cards/inputs.
- **Geometric Spacing Scale**: Strictly follow `gap-1`, `gap-2`, `gap-3`, `gap-4`, `gap-6`, `gap-8`, `gap-12`, `gap-16` (4px to 64px). Never invent arbitrary spacing (`p-[17px]`).
- **Subpixel Hairline Borders**:
  - Light mode: `border border-[#E2E8F0] bg-[#FFFFFF] shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04)]`
  - Dark mode: `border border-[#1E293B] bg-[#0D0F14]`
- **No Gradients, No Glassmorphism**: High contrast solid tokens (`#F7F8FA` canvas, `#FFFFFF` cards, `#0F172A` text, `#2563EB` accent).

---

## 4. TypeScript Strictness & Type Safety (`typescript-strict.mdc`)

- **No `any`**: Always use `unknown` if the type is indeterminate, followed by type narrowing or Zod parsing.
- **Discriminated Unions**: For polymorphic state models:
  ```typescript
  type AuthState =
    | { status: 'idle' }
    | { status: 'challenging'; challengeId: string; expiresAt: number }
    | { status: 'verified'; sessionToken: string; user: SafeUser }
    | { status: 'error'; message: string; attemptsRemaining: number };
  ```
- **Readonly Data Structures**: Mark configuration objects and state immutables with `as const` or `readonly`.

---

## 5. Security & Auth Invariants (`security-audit.mdc`)

- **MFA 2FA Mandatory**: Require 6-digit Gmail OTP via HMAC-SHA256 for admin/privileged actions.
- **Session Revocation**: Password reset increments `sessionVersion`, invalidating all active sessions.
- **Cookie Security**: `HttpOnly; Secure; SameSite=Strict; Path=/`.
