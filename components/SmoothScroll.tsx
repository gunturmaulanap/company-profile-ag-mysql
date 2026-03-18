"use client";

import { useEffect } from "react";
import { isIPhoneWebKit } from "@/lib/runtime-debug";

type SmoothScrollProps = {
  children: React.ReactNode;
  enabled?: boolean;
};

export default function SmoothScroll({
  children,
  enabled = true,
}: SmoothScrollProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const allowNativeSmooth = enabled && !reducedMotion && !isIPhoneWebKit();

    html.style.scrollBehavior = allowNativeSmooth ? "smooth" : "";
    body.style.scrollBehavior = allowNativeSmooth ? "smooth" : "";

    return () => {
      html.style.scrollBehavior = "";
      body.style.scrollBehavior = "";
    };
  }, [enabled]);

  return <>{children}</>;
}
