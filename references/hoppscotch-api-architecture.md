# Hoppscotch API Architecture: High-Performance, Lightweight API Development

> Inspired by [hoppscotch/hoppscotch](https://github.com/hoppscotch/hoppscotch)

Hoppscotch represents the pinnacle of fast, privacy-first, zero-bloat API testing and development. Unlike heavy Electron-based suites like Postman, Hoppscotch operates directly in the browser or as a lightweight PWA/desktop app with instant reactivity.

---

## 1. Key Architectural Principles

1. **Protocol Versatility**:
   - **REST / HTTP**: Full support for standard verbs (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`).
   - **GraphQL**: Schema introspection, query explorer, reactive variable injection.
   - **Realtime Protocols**: WebSocket (`ws://` / `wss://`), Server-Sent Events (SSE), and MQTT over WebSockets.
2. **Offline-First & Local Storage**:
   - Environment variables, collections, and request histories are cached locally in IndexedDB / LocalStorage.
   - Zero telemetry leaks of confidential API tokens, headers, or internal microservice endpoints.
3. **Environment & Scripting Engine**:
   - Pre-request and post-request test scripts using lightweight JavaScript sandboxes.
   - Dynamic parameter interpolation: `{{baseUrl}}/api/v1/auth/login`.

---

## 2. API Contract & Collection Template (Hoppscotch Standard)

```json
{
  "v": 1,
  "name": "Fullstack Zero-Trust MFA Suite",
  "folders": [
    {
      "name": "Auth & Verification",
      "requests": [
        {
          "name": "Step 1: Request Admin OTP Challenge",
          "method": "POST",
          "endpoint": "<<baseUrl>>/api/auth/login-step1",
          "headers": [
            { "key": "Content-Type", "value": "application/json" }
          ],
          "body": {
            "contentType": "application/json",
            "body": "{\n  \"adminToken\": \"<<adminToken>>\"\n}"
          }
        },
        {
          "name": "Step 2: Verify 6-Digit OTP & Issue Session",
          "method": "POST",
          "endpoint": "<<baseUrl>>/api/auth/verify-otp",
          "headers": [
            { "key": "Content-Type", "value": "application/json" }
          ],
          "body": {
            "contentType": "application/json",
            "body": "{\n  \"challengeId\": \"<<challengeId>>\",\n  \"otp\": \"123456\"\n}"
          }
        }
      ]
    }
  ]
}
```

---

## 3. Best Practices for Coding Agents Building APIs

- **Always Provide cURL & Fetch Snippets**: Every API endpoint designed by the agent must include a clean, copy-pasteable cURL example.
- **Strict Response DTOs**: Whitelist output fields using Zod or Pydantic. Strip internal IDs, hashes, and database implementation details.
- **Consistent Error Codes**:
  - `400 Bad Request`: Validation failure with specific field paths.
  - `401 Unauthorized`: Missing or invalid session cookie / token.
  - `403 Forbidden`: Authenticated user lacks required RBAC role.
  - `429 Too Many Requests`: Rate limit exceeded with `Retry-After` header.
