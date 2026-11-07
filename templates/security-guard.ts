/**
 * Security Guard: Production Fullstack Backend Defense Layer
 * - Zero-Trust RBAC Authentication
 * - Cloudflare Turnstile Verification
 * - ID Obfuscation (UUID & Hashids)
 * - Strict Response Payload Stripping
 * - In-Memory / Distributed Rate Limiter
 */

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Hashids from "hashids";
import { z } from "zod";

// Initialize ID Obfuscator
const hashids = new Hashids(process.env.ID_SALT || "antigravity_salt_entropy_2026", 10);

export const SecurityIds = {
  encode: (id: number): string => hashids.encode(id),
  decode: (hash: string): number | null => {
    const res = hashids.decode(hash);
    return res.length > 0 ? (res[0] as number) : null;
  },
};

// ================= RBAC & SESSION SECURITY ================= //

export interface AuthenticatedUser {
  userId: string;
  role: "admin" | "manager" | "user";
  permissions: string[];
}

export class SecurityGuard {
  /**
   * Enforce server-side authentication & permission check.
   * Completely mitigates frontend "hackcore" tampering.
   */
  public static async authenticateAndAuthorize(
    req: NextRequest,
    requiredRole?: "admin" | "manager",
    requiredPermission?: string
  ): Promise<{ user: AuthenticatedUser } | NextResponse> {
    const token = req.cookies.get("session_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Yêu cầu đăng nhập để tiếp tục." }, { status: 401 });
    }

    try {
      const secret = process.env.JWT_SECRET || "fallback_strong_secret_2026";
      const payload = jwt.verify(token, secret) as AuthenticatedUser;

      // Role check
      if (requiredRole && payload.role !== requiredRole && payload.role !== "admin") {
        return NextResponse.json(
          { error: "Tài khoản không đủ đặc quyền truy cập tài nguyên này." },
          { status: 403 }
        );
      }

      // Granular permission check
      if (
        requiredPermission &&
        !payload.permissions.includes(requiredPermission) &&
        payload.role !== "admin"
      ) {
        return NextResponse.json(
          { error: "Bạn không có quyền thực hiện hành động này." },
          { status: 403 }
        );
      }

      return { user: payload };
    } catch {
      return NextResponse.json({ error: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn." }, { status: 401 });
    }
  }

  /**
   * Verify Cloudflare Turnstile token server-side.
   */
  public static async verifyTurnstile(token: string, clientIp?: string): Promise<boolean> {
    if (!token) return false;
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error("[SecurityGuard] Missing TURNSTILE_SECRET_KEY environment variable.");
      return false;
    }

    try {
      const body = new URLSearchParams({
        secret: secretKey,
        response: token,
      });
      if (clientIp) body.append("remoteip", clientIp);

      const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body,
      });
      const data = await res.json();
      return data.success === true;
    } catch (err) {
      console.error("[SecurityGuard] Turnstile verification network error:", err);
      return false;
    }
  }

  /**
   * Strip sensitive fields from database records before sending to client.
   */
  public static sanitizePayload<T extends Record<string, any>>(
    record: T,
    schema: z.ZodSchema
  ): Record<string, any> {
    return schema.parse(record);
  }

  /**
   * Simple sliding rate limiter for sensitive routes (e.g. login).
   */
  private static rateLimitMap = new Map<string, { count: number; resetAt: number }>();

  public static checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
    const now = Date.now();
    const client = SecurityGuard.rateLimitMap.get(ip);

    if (!client || now > client.resetAt) {
      SecurityGuard.rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
      return true;
    }

    if (client.count >= limit) {
      return false; // Rate limit exceeded
    }

    client.count++;
    return true;
  }
}
