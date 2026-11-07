# Name That UI: Elite Component & Interaction Catalog

Inspired by [namethatui.com](https://namethatui.com/), this catalog defines the official terminology, visual standards, and production implementations for modern, high-craftsmanship UI patterns. All patterns strictly follow our **Alabaster Porcelain Theme** (`#F7F8FA`), **6px border radius**, **4–64px geometric spacing**, and **subpixel 1px CNC-milled borders**.

---

## 1. Catalog of Elite UI Patterns

| Pattern Name | Visual Role | Key Interaction |
| :--- | :--- | :--- |
| **Bento Grid** | Modular asymmetric dashboard layout | Hairline 1px border grouping, high information density |
| **Command Palette (Cmd+K)** | Floating keyboard-first navigation | Instant fuzzy search, keyboard navigation, backdrop dim |
| **Floating Action Dock** | Quick-action dock pinned to bottom | Subtle scale magnification, magnetic hover |
| **Segmented Control** | High-precision view/filter switcher | Liquid FLIP pill indicator sliding smoothly |
| **Radial Progress Gauge** | Circular performance / quota metric | DrawSVG stroke animation with tabular numbers |
| **Shimmer Skeleton** | Non-jarring content loading placeholder | Soft porcelain luminance sweep (no jarring gradients) |
| **Accordion Drawer** | Progressive disclosure of deep details | Velocity-aware smooth expansion |
| **Stepper Wizard** | Multi-step workflow guide | Visual step indicator with active spring transitions |
| **Toast with Progress Bar** | Action confirmation notification | Slide-up with auto-dismiss countdown bar |

---

## 2. Production Pattern Implementations

### 2.1 Bento Grid (Asymmetric High-Density Layout)
```tsx
export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-[#F7F8FA]">
      {/* Large Featured Card (Spans 2 columns) */}
      <div className="md:col-span-2 bg-white rounded-[6px] p-6 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#64748B]">Tổng Quan Lưu Lượng</span>
        <h3 className="text-lg font-bold text-[#0F172A] tracking-[-0.03em] mt-1">Hiệu Suất Hệ Thống Thời Gian Thực</h3>
        <div className="mt-6 h-48 flex items-center justify-center bg-[#F8FAFC] rounded-[6px] border border-[#F1F5F9] font-mono text-xs text-[#94A3B8]">
          [GSAP DrawSVG Biểu Đồ Thời Gian Thực]
        </div>
      </div>

      {/* Metric Stat 1 */}
      <div className="bg-white rounded-[6px] p-6 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col justify-between">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#64748B]">Thời Gian Phản Hồi</span>
        <div className="my-4">
          <div className="text-3xl font-bold font-mono tabular-nums text-[#0F172A]">24ms</div>
          <span className="text-xs font-semibold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-[4px] mt-2 inline-block">
            Nhanh hơn 38%
          </span>
        </div>
        <p className="text-xs text-[#64748B]">Đo lường tại Cloudflare Edge Node</p>
      </div>

      {/* Metric Stat 2 */}
      <div className="bg-white rounded-[6px] p-6 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#64748B]">Bảo Mật MFA</span>
        <div className="text-2xl font-bold font-mono tabular-nums text-[#0F172A] mt-2">100% Active</div>
        <p className="text-xs text-[#64748B] mt-1">Toàn bộ tài khoản quản trị đã xác minh OTP 6 số</p>
      </div>

      {/* Audit Log Banner (Spans 2 columns) */}
      <div className="md:col-span-2 bg-white rounded-[6px] p-6 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#64748B]">Nhật Ký Kiểm Toán An Ninh</span>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-xs py-2 border-b border-[#F1F5F9]">
            <span className="font-mono text-[#0F172A]">MFA_LOGIN_SUCCESS</span>
            <span className="text-[#64748B]">IP: 14.161.xx.xx • Vừa xong</span>
          </div>
          <div className="flex items-center justify-between text-xs py-2">
            <span className="font-mono text-[#0F172A]">SESSION_REVOCATION</span>
            <span className="text-[#64748B]">Đổi mật khẩu • 12 phút trước</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### 2.2 Command Palette (Cmd+K Modal)
```tsx
export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-slate-900/20 backdrop-blur-[2px]">
      <div className="w-full max-w-lg bg-white rounded-[6px] border border-[#CBD5E1] shadow-[0_20px_50px_rgba(15,23,42,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 border-b border-[#E2E8F0]">
          <svg className="w-4 h-4 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            autoFocus
            placeholder="Tìm kiếm tác vụ, tài liệu hoặc lệnh nhanh... (ESC để đóng)"
            className="w-full h-12 px-3 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none"
          />
          <kbd className="text-[10px] font-mono text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.5 rounded-[4px]">ESC</kbd>
        </div>
        <div className="p-2 space-y-1 text-xs">
          <button className="w-full flex items-center justify-between p-2 rounded-[6px] hover:bg-[#F8FAFC] text-[#0F172A] font-medium text-left">
            <span>Quản lý phiên đăng nhập & MFA</span>
            <span className="text-[#94A3B8] font-mono">⌘M</span>
          </button>
          <button className="w-full flex items-center justify-between p-2 rounded-[6px] hover:bg-[#F8FAFC] text-[#0F172A] font-medium text-left">
            <span>Kiểm toán an ninh Cloudflare WAF</span>
            <span className="text-[#94A3B8] font-mono">⌘S</span>
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### 2.3 Floating Action Dock
```tsx
export function FloatingActionDock() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 border border-[#E2E8F0] rounded-[6px] p-1.5 flex items-center gap-1 shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      {["Tổng quan", "Bảo mật", "Nhật ký", "Cài đặt"].map((item, idx) => (
        <button
          key={idx}
          className="px-3 py-1.5 rounded-[4px] text-xs font-semibold text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9] active:scale-[0.96] transition-all cursor-pointer"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
```
