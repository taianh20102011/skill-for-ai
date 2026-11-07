"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export function MfaLoginFlow() {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [tokenInput, setTokenInput] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [challengeId, setChallengeId] = useState("");
  const [targetEmail, setTargetEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 60-Second Cooldown Timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  // Handle Step 1: Submit Admin/User Token
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!tokenInput.trim()) {
      setErrorMessage("Vui lòng nhập mã Token hoặc thông tin đăng nhập.");
      shakeCard();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/mfa/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenInput }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Mã token không hợp lệ hoặc đã bị khóa.");
        shakeCard();
        return;
      }

      setChallengeId(data.challengeId);
      setTargetEmail(data.maskedEmail || "quan-tri@gmail.com");
      setCooldown(60);

      // Smooth FLIP animation between steps
      const state = Flip.getState(cardRef.current);
      setStep("otp");
      setTimeout(() => {
        Flip.from(state, { duration: 0.4, ease: "power3.out" });
        otpInputRefs.current[0]?.focus();
      }, 30);
    } catch {
      setErrorMessage("Không thể kết nối đến máy chủ xác thực.");
      shakeCard();
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2: 6-Digit OTP Input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (newOtp.every((digit) => digit !== "")) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      e.preventDefault();
      const digits = pasteData.split("");
      setOtp(digits);
      otpInputRefs.current[5]?.focus();
      verifyOtp(pasteData);
    }
  };

  // Verify OTP Backend Call
  const verifyOtp = async (fullOtp: string) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, otp: fullOtp }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Mã OTP không chính xác.");
        if (data.attemptsLeft !== undefined) setAttemptsLeft(data.attemptsLeft);
        shakeCard();
        setOtp(["", "", "", "", "", ""]);
        otpInputRefs.current[0]?.focus();
        return;
      }

      // Success
      window.location.href = "/admin/dashboard";
    } catch {
      setErrorMessage("Lỗi kết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (cooldown > 0 || loading) return;
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/mfa/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Không thể gửi lại mã vào lúc này.");
        return;
      }

      setCooldown(60);
      setAttemptsLeft(5);
      setOtp(["", "", "", "", "", ""]);
      otpInputRefs.current[0]?.focus();
    } catch {
      setErrorMessage("Lỗi gửi lại mã OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Micro-interaction error shake
  const shakeCard = () => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: -10 },
        { x: 0, duration: 0.45, ease: "elastic.out(1, 0.3)" }
      );
    }
  };

  return (
    // LUXURIOUS ALABASTER PORCELAIN BACKGROUND (Soft, Bright, Elegant)
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FA] text-[#0F172A] p-6 font-['Plus_Jakarta_Sans',sans-serif] antialiased">
      
      {/* Top Brand Mark */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-[6px] bg-gradient-to-b from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow-[0_2px_8px_rgba(37,99,235,0.25),inset_0_1px_0_rgba(255,255,255,0.3)] mb-3">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-[-0.03em] text-[#0F172A]">
          Cổng Xác Thực An Ninh Cao Cấp
        </h1>
        <p className="text-xs text-[#64748B] mt-1 font-medium">
          Hệ thống bảo vệ tài khoản & quản trị đa lớp (MFA/2FA)
        </p>
      </div>

      {/* GOD-TIER PORCELAIN CARD CONTAINER (Crisp 1px Subpixel Border, No Blurry Gradients) */}
      <div
        ref={cardRef}
        className="w-full max-w-[420px] bg-white rounded-[6px] p-8 border border-[#E2E8F0]
                   shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05),0_1px_2px_0_rgba(15,23,42,0.04),inset_0_1px_0_0_#FFFFFF]
                   transition-all duration-200"
      >
        {/* Step Header */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#2563EB]" />
            <span className="text-xs font-semibold tracking-[-0.01em] text-[#0F172A] uppercase">
              {step === "credentials" ? "Bước 1: Xác Thực Token" : "Bước 2: Nhập Mã OTP"}
            </span>
          </div>
          <span className="text-[11px] font-['JetBrains_Mono',monospace] font-semibold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-[4px]">
            {step === "credentials" ? "1 / 2" : "2 / 2"}
          </span>
        </div>

        {/* Error Notification Pill */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-[6px] bg-[#FEF2F2] border border-[#FEE2E2] text-xs text-[#B91C1C] font-medium flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: CREDENTIALS / TOKEN */}
        {step === "credentials" && (
          <form onSubmit={handleCredentialsSubmit} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#334155] tracking-[-0.01em]">
                  Mã Token Quản Trị
                </label>
                <span className="text-[11px] text-[#94A3B8] font-medium">Bắt buộc</span>
              </div>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Nhập secret token được cấp..."
                disabled={loading}
                className="w-full h-11 px-3.5 bg-white text-sm text-[#0F172A] rounded-[6px]
                           border border-[#CBD5E1] hover:border-[#94A3B8]
                           focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none
                           placeholder:text-[#94A3B8] font-['JetBrains_Mono',monospace] text-[13px]
                           shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] transition-all"
              />
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-[6px] border border-[#E2E8F0] flex gap-2.5">
              <svg className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-[#64748B] leading-[1.5]">
                Biết mã token vẫn <strong>chưa thể vào hệ thống</strong>. Hệ thống sẽ phát hành mã OTP 6 chữ số đến Gmail đã xác minh để bảo vệ tài khoản.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold
                         shadow-[0_1px_3px_rgba(37,99,235,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
                         active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Đang kiểm tra...</span>
                </>
              ) : (
                <span>Tiếp tục xác thực OTP →</span>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: 6-DIGIT OTP VERIFICATION */}
        {step === "otp" && (
          <div className="space-y-6">
            <div className="text-xs text-[#475569] leading-relaxed">
              Mã xác thực 6 chữ số đã được gửi tới hòm thư{" "}
              <strong className="text-[#0F172A] font-['JetBrains_Mono',monospace] bg-[#F1F5F9] px-1.5 py-0.5 rounded-[4px]">
                {targetEmail}
              </strong>
              . Mã có hiệu lực trong <strong className="text-[#2563EB]">10 phút</strong>.
            </div>

            {/* 6 Porcelain Numeric Input Boxes */}
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                  className="w-12 h-13 text-center text-xl font-['JetBrains_Mono',monospace] font-bold tabular-nums
                             bg-white text-[#0F172A] rounded-[6px] border border-[#CBD5E1]
                             hover:border-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 focus:outline-none
                             shadow-[0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_#FFFFFF] transition-all"
                />
              ))}
            </div>

            {/* Attempts & Cooldown Footer */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#64748B]">
                Còn lại: <strong className="text-[#0F172A] font-['JetBrains_Mono',monospace]">{attemptsLeft}</strong> lần thử
              </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || loading}
                className="text-xs text-[#2563EB] hover:text-[#1D4ED8] disabled:text-[#94A3B8] font-semibold cursor-pointer transition-colors"
              >
                {cooldown > 0 ? `Gửi lại sau ${cooldown}s` : "Gửi lại mã OTP"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => verifyOtp(otp.join(""))}
              disabled={loading || otp.some((d) => d === "")}
              className="w-full h-11 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold
                         shadow-[0_1px_3px_rgba(37,99,235,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
                         active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Đang xác thực bảo mật..." : "Xác nhận & Vào Bảng Điều Khiển"}
            </button>
          </div>
        )}
      </div>

      {/* Bottom Security Assurance Footnote */}
      <div className="mt-8 flex items-center gap-2 text-xs text-[#94A3B8]">
        <svg className="w-3.5 h-3.5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Mã hóa HMAC-SHA256 • Bảo vệ phiên cách ly IP • Cloudflare WAF Active</span>
      </div>
    </div>
  );
}
