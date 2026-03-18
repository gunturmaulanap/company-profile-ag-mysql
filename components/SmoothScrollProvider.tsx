"use client";

import { useEffect, useMemo, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "@/lib/gsapClient";
import { isIPhoneWebKit } from "@/lib/runtime-debug";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef | null>(null);
  const isIOSWebKit = useMemo(() => isIPhoneWebKit(), []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const body = document.body;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // JIKA IOS: Gunakan Native CSS Scroll & matikan GSAP Ticker untuk Lenis
    if (isIOSWebKit) {
      const behavior = reducedMotion ? "auto" : "smooth";
      html.style.scrollBehavior = behavior;
      body.style.scrollBehavior = behavior;

      return () => {
        html.style.scrollBehavior = "";
        body.style.scrollBehavior = "";
      };
    }

    // JIKA DESKTOP: Sinkronisasi Lenis murni dengan GSAP
    const onTick = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      html.style.scrollBehavior = "";
      body.style.scrollBehavior = "";
    };
  }, [isIOSWebKit]);

  if (isIOSWebKit) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
