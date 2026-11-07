# Fullstack Security & Hardening Architecture

A production-grade blueprint for securing modern web applications, preventing unauthorized privilege escalation, mitigating bot abuse, eliminating information leakage, and maximizing Cloudflare Free tier protection.

---

## 1. Anti-Frontend-Hackcore & Zero-Trust Authentication

### 1.1 The "Frontend Admin" Vulnerability (Hackcore)
Many vulnerable web apps rely on frontend state:
```javascript
// ❌ VULNERABLE CODE (Client-Side Only Check):
if (user.role === 'admin') {
  renderAdminPanel();
}
```
An attacker easily modifies `localStorage`, Redux store, or Vuex state in DevTools to set `role: "admin"`. If the backend merely accepts `req.body.role` or assumes frontend checks are sufficient, the system is compromised.

### 1.2 The Zero-Trust Rule
1. **Frontend Role Checks are Cosmetic Only**:
   - Client-side conditionals only decide whether to render a link in a navbar to avoid confusing normal users. They provide **zero** security.
2. **Server-Side Enforcement on Every API Call**:
   - Every API endpoint, mutation, or server action must independently verify the caller's session token and permissions from the database/token payload.
3. **HttpOnly, Secure Cookies**:
   - Store JWT or session IDs in `HttpOnly`, `Secure`, `SameSite=Strict` cookies. This prevents cross-site scripting (XSS) from reading the authentication tokens.

```typescript
// ✅ SECURE SERVER-SIDE RBAC MIDDLEWARE (Node.js / Next.js / Express)
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  role: "user" | "manager" | "admin";
  permissions: string[];
}

export async function requirePermission(req: NextRequest, requiredPermission: string) {
  const token = req.cookies.get("session_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Chưa xác thực danh tính" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    
    // Check revoked token in cache/Redis if applicable
    
    if (!decoded.permissions.includes(requiredPermission) && decoded.role !== "admin") {
      return NextResponse.json({ error: "Bạn không có quyền thực hiện thao tác này" }, { status: 403 });
    }

    return decoded; // Validated
  } catch (err) {
    return NextResponse.json({ error: "Phiên đăng nhập không hợp lệ" }, { status: 401 });
  }
}
```

---

## 2. Mandatory 2-Step Verification (MFA / 2FA) & Session Hardening

### 2.1 The Two-Step Enforcement Principle
Knowing the Admin/User token alone is **strictly insufficient** to enter the dashboard.
1. **Step 1: Credentials / Token Verification**:
   - The user provides their admin/user secret token or email + password.
   - If verified, the server **does NOT issue a session yet**. It creates a short-lived `challengeId` and sends a 6-digit cryptographic OTP to the verified Gmail.
2. **Step 2: OTP Verification & Session Issuance**:
   - Only when the correct 6-digit OTP is submitted does the server issue the `session_token` cookie with `mfaVerified: true`.

### 2.2 Anti-Brute-Force & OTP Hardening Architecture
1. **HMAC-SHA256 OTP Storage (Never Plaintext)**:
   - The 6-digit OTP is never written to DB or memory as plaintext.
   - Stored strictly as `HMAC-SHA256(rawOtp, SERVER_SECRET_SALT)`.
   - Verification uses constant-time comparison `crypto.timingSafeEqual` to prevent timing attacks.
2. **10-Minute Expiration**:
   - The OTP and challenge automatically expire after 10 minutes.
3. **Max 5 Failed Attempts**:
   - Each challenge tracks `attemptsLeft`. Upon reaching 5 failures, the challenge is immediately destroyed and the user is locked out.
4. **60-Second Resend Cooldown**:
   - The system strictly enforces a 60-second cooldown before a new OTP can be requested (`resendAvailableAt`).
5. **IP & Account Binding**:
   - The challenge stores the client's initiating IP address (`clientIp`). If a verification request arrives from a different IP, it is immediately rejected as a potential session-hijacking attempt.
6. **Rate Limiting**:
   - Per-IP sliding window limits prevent automated OTP spraying.

### 2.3 Password Reset with Session Invalidation
When an active user with a verified email requests a password reset:
1. System issues a 6-digit OTP via Gmail with the same HMAC storage and rate limits.
2. User submits OTP + new password.
3. Upon verification, server hashes the new password (bcrypt >= 12 or Argon2id).
4. **Global Session Revocation**: Increments the user's `sessionVersion`. All active JWT sessions across all browsers and devices are immediately rendered invalid. User must log in anew with MFA.

### 2.4 Existing Defense Layers Maintained
- **Server-Side CAPTCHA**: Cloudflare Turnstile token verified server-side on login/reset forms.
- **CSRF & Origin Checking**: Verifying `Origin` and `Host` match before processing state-changing POST requests.
- **HttpOnly Cookies**: `Secure`, `SameSite=Strict`, `HttpOnly` flags prevent token theft via XSS.
- **Granular RBAC**: Owner vs. Support vs. Admin role permissions enforced in backend middleware.
- **Audit Logging**: Security events (`MFA_CHALLENGE_ISSUED`, `MFA_FAILED_ATTEMPT`, `PASSWORD_RESET_REVOKED`) logged with redacted PII and no plaintext passwords/OTPs.

---

## 3. ID Obfuscation & Field Sanitization

### 2.1 Never Expose Sequential Auto-Increment Database IDs
Exposing auto-increment integers (`/api/users/1`, `/api/users/2`) allows attackers to enumerate entire databases, estimate business metrics, and exploit IDOR (Insecure Direct Object Reference) vulnerabilities.

**Remediation**:
- Primary strategy: Use **UUID v4** or **ULID** as public identifiers in the database schema (`id: uuid_generate_v4()`).
- Legacy database strategy: Use **Hashids** or **Sqids** with a secret salt to encode internal integer IDs into random-looking strings:
  ```typescript
  import Hashids from "hashids";

  const hashids = new Hashids(process.env.ID_SALT || "secret_salt_entropy_2026", 10);

  export const encodeId = (numericId: number): string => hashids.encode(numericId);
  export const decodeId = (hashedId: string): number | null => {
    const decoded = hashids.decode(hashedId);
    return decoded.length > 0 ? (decoded[0] as number) : null;
  };
  ```

### 2.2 Response Payload Stripping (Whitelist Projection)
Never return raw database entities. Use strict Data Transfer Objects (DTO) or Zod schemas to strip sensitive fields:

```typescript
// ❌ DANGEROUS: Leaks password_hash, internal admin notes, tokens
const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
return res.json(user);

// ✅ SECURE: Strict whitelist projection
import { z } from "zod";

const PublicUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarUrl: z.string().nullable(),
  createdAt: z.string(),
});

export function sanitizeUserResponse(rawDbUser: Record<string, any>) {
  return PublicUserSchema.parse({
    id: encodeId(rawDbUser.id),
    name: rawDbUser.name,
    avatarUrl: rawDbUser.avatar_url,
    createdAt: rawDbUser.created_at.toISOString(),
  });
}
```
**Fields to ALWAYS strip**: `password_hash`, `salt`, `reset_password_token`, `mfa_secret`, `internal_risk_score`, `is_superadmin`, `deleted_at`.

---

## 3. Bot Abuse Prevention: Cloudflare Turnstile / reCAPTCHA v3

Prefer **Cloudflare Turnstile** for privacy, zero user friction, and seamless integration with Cloudflare.

### 3.1 Backend Verification Handler
```typescript
export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  if (!token) return false;

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) throw new Error("TURNSTILE_SECRET_KEY is missing");

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (remoteIp) formData.append("remoteip", remoteIp);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  const outcome = await res.json();
  return outcome.success === true;
}
```

---

## 4. Build Hardening & Source Code Protection

### 4.1 Disable Production Source Maps
Exposing source maps (`.map` files) allows anyone in DevTools to read your entire unminified TypeScript source code, backend API shapes, and comments.

**Next.js (`next.config.mjs`)**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};
export default nextConfig;
```

**Vite (`vite.config.ts`)**:
```typescript
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
});
```

### 4.2 Security Headers (CSP & HSTS)
Enforce HTTP headers via middleware or server configuration:
```typescript
export const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; object-src 'none';",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};
```

---

## 5. Cloudflare Free Tier Optimization Checklist

Maximize protection at zero cost using Cloudflare Free plan:

1. **SSL/TLS Mode**:
   - Set to **Full (Strict)**. Ensure the origin server has a valid certificate (e.g., Cloudflare Origin CA certificate installed).
2. **Bot Fight Mode**:
   - Navigate to **Security > Bots** -> Toggle **Bot Fight Mode** to ON.
3. **Security Level**:
   - Under **Security > Settings**, set default to **Medium**. If experiencing DDoS or credential stuffing, switch to **Under Attack Mode**.
4. **Custom WAF Rules (5 Free Rules Available)**:
   - **Rule 1: Protect Admin Endpoint**:
     - *Expression*: `(http.request.uri.path contains "/admin" and ip.geoip.country ne "VN")`
     - *Action*: **Managed Challenge** (or Block).
   - **Rule 2: Block Malicious Scanners / User-Agents**:
     - *Expression*: `(http.user_agent contains "sqlmap" or http.user_agent contains "nikto" or http.user_agent contains "nmap")`
     - *Action*: **Block**.
   - **Rule 3: Rate Limit Login Route**:
     - Use Free Tier Rate Limiting rule on `POST /api/auth/login` (e.g. limit to 10 requests / minute per IP).
5. **Page Rules / Cache Rules**:
   - Cache static assets: `*yourdomain.com/_next/static/*` -> **Cache Everything**, Edge Cache TTL 1 month.
   - Bypass dynamic endpoints: `*yourdomain.com/api/*` -> **Bypass Cache**.
6. **Browser Integrity Check**:
   - Toggle to **ON** to filter HTTP requests with missing or suspicious headers.

---

## 6. OWASP Top 10 Audit Checklist

Before production release, verify every item:

- [ ] **A01: Broken Access Control**: Zero frontend-only authorization. Server rejects unauthorized roles on all routes.
- [ ] **A02: Cryptographic Failures**: Passwords hashed with bcrypt (cost >= 12) or Argon2id. HTTPS enforced via HSTS.
- [ ] **A03: Injection**: All database queries use parameterized queries (prepared statements) or validated ORM calls.
- [ ] **A04: Insecure Design**: Public IDs obfuscated/UUID. Rate limiting active on authentication and recovery routes.
- [ ] **A05: Security Misconfiguration**: Production sourcemaps disabled. Default admin accounts removed.
- [ ] **A06: Vulnerable & Outdated Components**: Run `pnpm audit` or `npm audit` and eliminate critical vulnerabilities.
- [ ] **A07: Identification & Auth Failures**: Turnstile / reCAPTCHA enforced on public sign-up/login. Account lockout after failed attempts.
- [ ] **A08: Software & Data Integrity**: Webhook signatures verified using HMAC-SHA256.
- [ ] **A09: Security Logging & Monitoring**: Log security events (failed logins, permission violations) without logging passwords or PII.
- [ ] **A10: Server-Side Request Forgery (SSRF)**: Validate and whitelist target hosts for any backend URL-fetching utility.
