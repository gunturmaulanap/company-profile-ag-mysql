"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapPlugins() {
  if (typeof window === "undefined") return;
  if (registered) return;

  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function refreshScrollTriggerSafe() {
  if (typeof window === "undefined") return;

  window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    window.setTimeout(() => ScrollTrigger.refresh(), 120);
  });
}

export { gsap, ScrollTrigger };
