# Cloudflare Free Tier Optimization & Security Guide

How to configure Cloudflare Free tier to maximize application security, shield admin panels, and block automated bots at zero operational cost.

---

## 1. SSL/TLS Configuration

1. In the Cloudflare Dashboard, navigate to **SSL/TLS > Overview**.
2. Set encryption mode to **Full (Strict)**.
   > **Note**: Never use "Flexible" as it sends unencrypted traffic between Cloudflare and your origin server, exposing user sessions to Man-in-the-Middle (MitM) attacks.
3. Under **SSL/TLS > Edge Certificates**:
   - Toggle **Always Use HTTPS** to **ON**.
   - Set **Minimum TLS Version** to **TLS 1.2** (or 1.3).
   - Toggle **Automatic HTTPS Rewrites** to **ON**.

---

## 2. Bot Protection (Free Tier)

1. Navigate to **Security > Bots**.
2. Toggle **Bot Fight Mode** to **ON**.
   - Cloudflare will challenge known malicious scrapers, automated vulnerability scanners, and malicious bots automatically before they hit your web server.

---

## 3. Custom WAF Rules (Up to 5 Free Rules)

Navigate to **Security > WAF > Custom Rules** and add the following 3 high-impact rules:

### Rule 1: Restrict Sensitive Admin Routes
- **Name**: `Protect Admin Endpoints`
- **Field**: `URI Path` -> `contains` -> `/admin`
- **AND**: `Country` -> `does not equal` -> `Vietnam` (or your operational country)
- **Action**: **Managed Challenge** (or Block if accessed only from a specific VPN/Static IP).
- **Expression string**:
  ```
  (http.request.uri.path contains "/admin" and ip.geoip.country ne "VN")
  ```

### Rule 2: Block Known Attack Scanners & Exploitation Tools
- **Name**: `Block Malicious User Agents & Scanners`
- **Field**: `User Agent`
- **Action**: **Block**
- **Expression string**:
  ```
  (http.user_agent contains "sqlmap" or http.user_agent contains "nikto" or http.user_agent contains "nmap" or http.user_agent contains "masscan" or http.user_agent contains "acunetix")
  ```

### Rule 3: Enforce Challenge on Sensitive Public Mutation Endpoints
- **Name**: `Challenge Suspicious Auth Attempts`
- **Field**: `URI Path` -> `equals` -> `/api/auth/login`
- **AND**: `Threat Score` -> `greater than or equal to` -> `15`
- **Action**: **Managed Challenge**
- **Expression string**:
  ```
  (http.request.uri.path eq "/api/auth/login" and cf.threat_score ge 15)
  ```

---

## 4. Rate Limiting Rule (Free Tier Includes 1 Custom Rate Limiting Rule)

Navigate to **Security > WAF > Rate Limiting Rules**:
- **Rule Name**: `Throttle Authentication Brute-Force`
- **URI Path**: `equals` `/api/auth/login` (and `/api/auth/register`)
- **Method**: `POST`
- **Requests**: `5` requests per `10 seconds` per IP
- **Action**: **Block** for `1 minute` (or Managed Challenge)

---

## 5. Caching & Performance Rules

Navigate to **Caching > Cache Rules**:
1. **Rule 1: Cache Static Assets (CSS, JS, Fonts, Images)**
   - When incoming requests match: `URI Path` starts with `/_next/static/` or `/assets/`
   - Cache Eligibility: **Eligible for Cache**
   - Edge Cache TTL: **Override origin: 1 month**
   - Browser Cache TTL: **Override origin: 1 month**
2. **Rule 2: Bypass Cache for Dynamic API and Auth Endpoints**
   - When incoming requests match: `URI Path` starts with `/api/` or `/admin/`
   - Cache Eligibility: **Bypass Cache**
