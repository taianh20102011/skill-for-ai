/**
 * GSAP Production Animation Engine
 * Covers: ScrollSmoother, ScrollTrigger, ScrollTo, DrawSVG, MorphSVG, MotionPath,
 * Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, Text, Physics2D,
 * PhysicsProps, and GSDevTools conditional debug mode.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { GSDevTools } from "gsap/GSDevTools";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { EaselPlugin } from "gsap/EaselPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";

export interface GsapEngineConfig {
  debugParam?: string; // Default: 'gsapDebug=1'
  smoothFactor?: number; // Default: 1.3
}

export class GsapEngine {
  private static registered = false;
  private isReducedMotion = false;
  private smoother: ScrollSmoother | null = null;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === "undefined") return;

    this.isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!GsapEngine.registered) {
      gsap.registerPlugin(
        ScrollTrigger,
        ScrollSmoother,
        ScrollToPlugin,
        DrawSVGPlugin,
        MorphSVGPlugin,
        MotionPathPlugin,
        Flip,
        Draggable,
        InertiaPlugin,
        Observer,
        SplitText,
        ScrambleTextPlugin,
        TextPlugin,
        Physics2DPlugin,
        PhysicsPropsPlugin,
        CustomEase,
        CustomBounce,
        CustomWiggle,
        RoughEase,
        ExpoScaleEase,
        SlowMo,
        EaselPlugin,
        PixiPlugin
      );
      GsapEngine.registered = true;

      // Initialize default luxury eases
      CustomEase.create("luxurySnap", "M0,0 C0.16,1 0.3,1 1,1");
      CustomWiggle.create("hapticWiggle", { wiggles: 5, type: "easeOut" });
      CustomBounce.create("naturalBounce", { strength: 0.65, squash: 2 });
        DrawSVGPlugin,
        MorphSVGPlugin,
        MotionPathPlugin,
        Flip,
        Draggable,
        InertiaPlugin,
        Observer,
        SplitText,
        ScrambleTextPlugin,
        TextPlugin,
        Physics2DPlugin,
        PhysicsPropsPlugin
      );
      GsapEngine.registered = true;

      // Debug mode via URL param
      const url = new URLSearchParams(window.location.search);
      if (url.get("gsapDebug") === "1") {
        gsap.registerPlugin(MotionPathHelper, GSDevTools);
        GSDevTools.create({ id: "MasterDevTools" });
        console.info("[GSAP Engine] Debug Mode Enabled with GSDevTools & MotionPathHelper");
      }
    }
  }

  // ================= SCROLL MODULE ================= //

  public mountSmoothScroll(wrapper = "#smooth-wrapper", content = "#smooth-content"): ScrollSmoother | null {
    if (this.isReducedMotion || typeof window === "undefined") return null;

    this.smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1.3,
      effects: true,
      smoothTouch: 0.1,
    });

    return this.smoother;
  }

  public refreshScroll() {
    ScrollTrigger.refresh();
  }

  public setupScrollToTop(buttonEl: HTMLElement, progressSvgPath?: SVGPathElement) {
    ScrollTrigger.create({
      start: "top -150",
      end: "max",
      onUpdate: (self) => {
        // Update circle progress
        if (progressSvgPath) {
          const circumference = 100;
          const offset = circumference - self.progress * circumference;
          gsap.set(progressSvgPath, { strokeDashoffset: offset });
        }
        // Button reveal
        gsap.to(buttonEl, {
          autoAlpha: self.progress > 0.05 ? 1 : 0,
          y: self.progress > 0.05 ? 0 : 12,
          duration: 0.25,
          overwrite: "auto",
        });
      },
    });

    buttonEl.addEventListener("click", () => {
      // Scroll to top
      gsap.to(window, {
        scrollTo: { y: 0, autoKill: true },
        duration: 0.8,
        ease: "power3.inOut",
      });
      // Fire micro particle physics celebration
      const rect = buttonEl.getBoundingClientRect();
      this.burstPhysicsParticles(rect.left + rect.width / 2, rect.top);
    });
  }

  public revealOnScroll(selector = ".reveal-item") {
    if (this.isReducedMotion) {
      gsap.set(selector, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
      gsap.fromTo(
        el,
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }

  // ================= SVG MODULE ================= //

  public drawHeadingUnderline(pathSelector: string) {
    if (this.isReducedMotion) return;

    gsap.fromTo(
      pathSelector,
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: pathSelector,
          start: "top 90%",
        },
      }
    );
  }

  public morphShape(elementSelector: string, targetPathData: string) {
    return gsap.to(elementSelector, {
      morphSVG: targetPathData,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }

  public orbitPath(dotSelector: string, pathSelector: string, duration = 8) {
    if (this.isReducedMotion) return;

    const anim = gsap.to(dotSelector, {
      motionPath: {
        path: pathSelector,
        align: pathSelector,
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
      duration,
      repeat: -1,
      ease: "none",
    });

    if (new URLSearchParams(window.location.search).get("gsapDebug") === "1") {
      MotionPathHelper.create(dotSelector);
    }

    return anim;
  }

  // ================= UI MODULE ================= //

  public applyFlipFilter(container: HTMLElement, filterCriteria: (el: HTMLElement) => boolean) {
    const items = Array.from(container.querySelectorAll<HTMLElement>(".flip-item"));
    const state = Flip.getState(items);

    items.forEach((item) => {
      item.style.display = filterCriteria(item) ? "block" : "none";
    });

    Flip.from(state, {
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.02,
      absolute: true,
      onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3 }),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.95, duration: 0.3 }),
    });
  }

  public initSpotlightBorders(cardSelector = ".spotlight-card") {
    if (typeof window === "undefined") return;
    const cards = document.querySelectorAll<HTMLElement>(cardSelector);

    window.addEventListener("pointermove", (e) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    });
  }

  public initMagneticElements(selector = ".magnetic-btn") {
    if (this.isReducedMotion || typeof window === "undefined") return;
    const elements = document.querySelectorAll<HTMLElement>(selector);

    elements.forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power2.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" });

      el.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = el.getBoundingClientRect();
        xTo((clientX - (left + width / 2)) * 0.25);
        yTo((clientY - (top + height / 2)) * 0.25);
      });

      el.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  public initMorphingTabs(containerSelector: string) {
    if (typeof document === "undefined") return;
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) return;

    const indicator = container.querySelector<HTMLElement>(".active-pill");
    const tabs = container.querySelectorAll<HTMLElement>(".tab-item");
    if (!indicator) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const state = Flip.getState(indicator);
        tab.appendChild(indicator);
        Flip.from(state, {
          duration: 0.35,
          ease: "power3.out",
        });
      });
    });
  }

  public animateRollingCounter(el: HTMLElement, targetNumber: number, duration = 1.2) {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetNumber,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        el.innerText = Math.floor(obj.val).toLocaleString();
      },
    });
  }

  public enableHorizontalDrag(trackSelector: string) {
    Draggable.create(trackSelector, {
      type: "x",
      edgeResistance: 0.8,
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
    });
  }

  public mountSmartHeaderObserver(headerEl: HTMLElement) {
    let hidden = false;
    Observer.create({
      target: window,
      type: "wheel,touch,scroll",
      onUp: () => {
        if (hidden) {
          gsap.to(headerEl, { y: 0, duration: 0.25, ease: "power2.out" });
          hidden = false;
        }
      },
      onDown: () => {
        if (!hidden && window.scrollY > 80) {
          gsap.to(headerEl, { y: -80, duration: 0.25, ease: "power2.in" });
          hidden = true;
        }
      },
      tolerance: 10,
    });
  }

  // ================= TEXT MODULE ================= //

  public splitHeadline(headlineSelector: string) {
    if (this.isReducedMotion) return;

    const split = new SplitText(headlineSelector, { type: "chars,words" });
    gsap.from(split.chars, {
      opacity: 0,
      y: 12,
      stagger: 0.015,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  public scrambleTextOnHover(el: HTMLElement, finalTxt: string) {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, {
        duration: 0.5,
        scrambleText: {
          text: finalTxt,
          chars: "01_#@!<>",
          speed: 0.4,
        },
      });
    });
  }

  public transitionText(el: HTMLElement, newText: string) {
    gsap.to(el, {
      duration: 0.3,
      text: newText,
      ease: "power1.inOut",
    });
  }

  // ================= PHYSICS MODULE ================= //

  public burstPhysicsParticles(originX: number, originY: number) {
    if (this.isReducedMotion || typeof document === "undefined") return;

    const fragment = document.createDocumentFragment();
    const dots: HTMLDivElement[] = [];

    for (let i = 0; i < 20; i++) {
      const dot = document.createElement("div");
      dot.className = "w-1 h-1 bg-blue-600 rounded-full fixed pointer-events-none z-50";
      fragment.appendChild(dot);
      dots.push(dot);
      gsap.set(dot, { x: originX, y: originY });
    }

    document.body.appendChild(fragment);

    dots.forEach((dot) => {
      gsap.to(dot, {
        physics2D: {
          velocity: gsap.utils.random(120, 280),
          angle: gsap.utils.random(220, 320),
          gravity: 400,
        },
        opacity: 0,
        duration: gsap.utils.random(0.5, 0.9),
        ease: "power1.out",
        onComplete: () => dot.remove(),
      });
    });
  }

  // ================= ADVANCED EASES ================= //

  public hapticShake(target: HTMLElement) {
    if (this.isReducedMotion) return;
    gsap.fromTo(target, { x: 0 }, { x: 10, duration: 0.45, ease: "hapticWiggle" });
  }

  public bounceAction(target: HTMLElement, yOffset = 18) {
    if (this.isReducedMotion) return;
    gsap.fromTo(target, { y: 0 }, { y: -yOffset, duration: 0.8, ease: "naturalBounce" });
  }
}

export const gsapEngine = new GsapEngine();
