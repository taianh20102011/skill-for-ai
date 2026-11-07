# Motion Web Mastery: Phân Loại Hiệu Ứng, Thư Viện & Nguồn Cảm Hứng

> **Kim chỉ nam chuyển động Web hiện đại (Motion Web Architecture)**  
> Kết hợp sức mạnh của **GSAP 25+**, **Framer Motion / Animate UI**, **Three.js / WebGL**, và triết lý thẩm mỹ **Alabaster Porcelain**.

---

## 1. Bản Đồ 6 Loại Hiệu Ứng Motion Web Phổ Biến Nhất

```
                                  🌐 HỆ SINH THÁI MOTION WEB
                                               │
         ┌───────────────┬─────────────────────┼─────────────────────┬───────────────┐
         ▼               ▼                     ▼                     ▼               ▼
   [1. Scroll &    [2. Hover &           [3. Kinetic           [4. Micro-      [5. 3D & WebGL
     Parallax]       Tactile Press]        Typography]          interactions]    Canvas]
         │               │                     │                     │               │
    ScrollTrigger   Subpixel CNC 1px      SplitText / Words     Emil Kowalski     Three.js / R3F
    ScrollSmoother  Spring Bounce         ScrambleText          Tactile Press     GSAP PixiPlugin
    Multi-plane z   active:scale-98       Character Stagger     Progress Rings    Shader Canvas
```

### Chi tiết 6 Loại Hiệu Ứng:

| STT | Loại Hiệu Ứng | Bản Chất Kỹ Thuật | Giải Pháp Tối Ưu Trong Hệ Thống |
|:---:|---|---|---|
| **1** | **Scroll Animation (AOS)** | Phần tử xuất hiện, trượt mờ, co giãn khi cuộn chuột qua viewport. | Dùng `ScrollTrigger` với `toggleActions: "play none none reverse"` thay thế AOS nặng nề; khử giật layout. |
| **2** | **Parallax Scrolling** | Các lớp hình nền, typography, card chuyển động với các vận tốc $z$-index khác nhau ($v_1 \neq v_2$). | Dùng `ScrollSmoother` + `data-speed` và `data-lag` của GSAP; tạo ảo giác chiều sâu 3D không gian thực. |
| **3** | **Hover & Press Effects** | Nổi khối, đổi sắc độ, chuyển động viền, phản hồi xúc giác khi tương tác con trỏ. | Công thức viền CNC 1px kép + hiệu ứng nén nhẹ `active:scale-[0.98]` và spring physics từ `animate-ui`. |
| **4** | **Kinetic Text Animation** | Chữ xuất hiện từng ký tự (character stagger), giải mã ký tự (scramble/matrix), chữ chạy ticker. | Dùng `SplitText` + `ScrambleTextPlugin` hoặc Motion character stagger với `tabular-nums`. |
| **5** | **Micro-interactions** | Chuyển động siêu nhỏ phản hồi tức thì: tick checkbox, nút bấm chuyển trạng thái, loading spinner, badge count. | Dùng `CustomBounce` & `CustomWiggle` (GSAP) kết hợp các recipe `status-button`, `reorder`, `count-badge` từ `animate-ui`. |
| **6** | **3D & WebGL Motion** | Chiều không gian 3D tương tác theo góc nhìn chuột, hạt phân tử (particles), shader canvas. | Dùng **Three.js** / **React Three Fiber** hoặc p5.js (`algorithmic-art`) kết hợp GSAP timeline điều khiển camera/mesh. |

---

## 2. Ma Trận Lựa Chọn Thư Viện (Library Selection Matrix)

| Thư Viện | Điểm Mạnh Cốt Lõi | Khi Nào Nên Dùng? | Tích Hợp Sẵn Trong Repo |
|---|---|---|:---:|
| **GSAP (GreenSock)** | Đỉnh cao hiệu năng 120fps, timeline phức tạp nhất thế giới, không phụ thuộc framework, điều khiển từng millisecond. | Dành cho Hero section, Parallax cuộn trang dài, vẽ SVG vector, hiệu ứng layout Flip morphing. | ✅ `templates/gsap-engine.ts` |
| **Framer Motion / Motion** | Tích hợp sâu nhất vào React / Next.js, tự động tính toán layout animation theo JSX declarative state. | Dành cho các component React/Next.js, chuyển trang route transitions, AnimatePresence. | ✅ `@animate-ui/react` |
| **Animate UI** | Motion-based primitives cho Radix UI, Base UI, React Aria, shadcn/ui. | Khi cần biến các popup, dialog, dropdown tĩnh của shadcn thành chuyển động lò xo mượt mà. | ✅ `.agents/skills/animate-ui` |
| **Anime.js** | Dung lượng siêu nhẹ (~6KB), trực quan cho CSS properties, SVG path morphing. | Dành cho các dự án vanillajs nhẹ hoặc nhúng widget nhỏ. | Có thể thay thế bằng GSAP Core |
| **AOS / Animate.css** | Bộ CSS có sẵn, thêm class là chạy. | Khuyến cáo: Không nên lạm dụng vì dễ gây giật layout; nên thay bằng GSAP ScrollTrigger tối giản. | Đã tối ưu hóa qua Ponytail |
| **React Bits** | 140+ component React có sẵn animation để copy-paste trực tiếp. | Khi cần lấy nhanh các pattern animation đặc thù (bento, magnetic hover, text trail). | Tương thích qua `web-artifacts-builder` |

---

## 3. Các Kho Nguồn Cảm Hứng & Thư Viện Ý Tưởng (Inspiration Hubs)

Khi bí ý tưởng hoặc cần nâng tầm thẩm mỹ lên mức Studio Quốc Tế (Awwwards-level), hãy tham chiếu các nguồn sau:

1. 🏆 **[Awwwards (Animation)](https://www.awwwards.com/websites/animation/)**:
   - Tiêu chuẩn vàng thế giới về tương tác nghệ thuật, trải nghiệm thương hiệu xa xỉ và micro-interactions đỉnh cao.
2. 🖼️ **[Refs.Gallery (Motion)](https://refs.gallery/category/motion)**:
   - Kho lưu trữ cô đọng các website thực tế tập trung vào chuyển động mượt mà, tối giản, bố cục bất đối xứng.
3. 🏀 **[Dribbble (Web Motion)](https://dribbble.com/tags/web-motion)**:
   - Các concept UI/UX motion tương lai, nguyên mẫu chuyển động nút bấm, tab chuyển hướng và menu chất lỏng.
4. 💎 **[NameThatUI](https://namethatui.com/)**:
   - Thư viện mẫu thiết kế giao diện AI thế hệ mới (Bento Grid, Cmd+K Palette, Floating Dock, Shimmer Skeleton).
5. ⚡ **[21st.dev & Magic UI](https://21st.dev/)**:
   - Kho component hoạt họa hiện đại tương thích 100% với Tailwind CSS và React.

---

## 4. Công Thức Code Mẫu Cho Từng Loại Hiệu Ứng (Production Recipes)

### 1. Parallax & Scroll Reveal (GSAP ScrollTrigger)
```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initParallaxScroll() {
  // Reveal mượt mà không giật layout
  gsap.utils.toArray<HTMLElement>(".reveal-on-scroll").forEach((elem) => {
    gsap.fromTo(elem, 
      { opacity: 0, y: 32 }, 
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );
  });
}
```

### 2. Phản Hồi Xúc Giác & Nút Bấm Đàn Hồi (Tactile Micro-interaction)
```css
/* Áp dụng chuẩn Alabaster Porcelain 6px */
.btn-tactile {
  border-radius: 6px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.04);
  transition: transform 75ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease;
}
.btn-tactile:hover {
  background-color: #F8FAFC;
  border-color: #CBD5E1;
}
.btn-tactile:active {
  transform: scale(0.98);
}
```

### 3. Kinetic Scramble Typography (Giải Mã Chữ Sci-Fi)
```typescript
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(ScrambleTextPlugin);

export function decodeHeadline(elementSelector: string, finalText: string) {
  gsap.to(elementSelector, {
    duration: 1.2,
    scrambleText: {
      text: finalText,
      chars: "0123456789ABCDEF!@#$%",
      revealDelay: 0.2,
      speed: 0.3,
    },
    ease: "power2.inOut",
  });
}
```

---

## 5. Nguyên Tắc Vàng Khi Làm Motion Web: Quy Tắc "Ít Hơn Là Nhiều Hơn" (Ponytail Discipline)

1. **Chuyển động có mục đích (Intentional Motion)**: Mỗi chuyển động phải truyền tải một trạng thái dữ liệu (đang tải, đã lưu, mở rộng, cảnh báo), không bao giờ dùng chuyển động chỉ để "làm cảnh" gây mỏi mắt người dùng.
2. **Tôn trọng `prefers-reduced-motion`**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, ::before, ::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
3. **Hiệu năng GPU 120fps**: Chỉ animate `transform` (`translate3d`, `scale`, `rotate`) và `opacity`. Tuyệt đối tránh animate `width`, `height`, `margin`, `top`, `left` vì gây kích hoạt trình duyệt recalculate layout (reflow) làm tụt FPS.
