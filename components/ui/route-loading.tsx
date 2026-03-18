"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { AnimationItem } from "lottie-web";
import { isSubsystemDisabled } from "@/lib/runtime-debug";

type RouteLoadingProps = {
  className?: string;
  fixed?: boolean;
  isLoading?: boolean;
  onFailsafeHide?: () => void;
};

export default function RouteLoading({
  className = "",
  fixed = true,
  isLoading = true,
  onFailsafeHide,
}: RouteLoadingProps) {
  const [playerReady, setPlayerReady] = useState(false);
  const animationRef = useRef<AnimationItem | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const disabled =
    isSubsystemDisabled("routeLoading") || isSubsystemDisabled("lottieLoader");
  const deviceProfile = useMemo(
    () => ({
      prefersReducedMotion:
        typeof window !== "undefined"
          ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
          : false,
    }),
    [],
  );

  const teardownAnimation = useCallback(() => {
    if (animationRef.current) {
      try {
        animationRef.current.stop();
        animationRef.current.destroy();
      } catch (error) {
      } finally {
        animationRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    if (disabled) return;
    let active = true;

    const initTimeout = setTimeout(() => {
      if (!active) return;
      import("lottie-web").then((mod) => {
        if (!active || !containerRef.current) return;
        const lottie = mod.default;

        while (containerRef.current.firstChild)
          containerRef.current.removeChild(containerRef.current.firstChild);

        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: !deviceProfile.prefersReducedMotion,
          autoplay: false,
          path: "/loading/adibayu-loading-page.json",
        });

        animationRef.current.addEventListener("DOMLoaded", () => {
          if (active) setPlayerReady(true);
        });
      });
    }, 50);

    return () => {
      active = false;
      clearTimeout(initTimeout);
      teardownAnimation();
    };
  }, [disabled, deviceProfile, teardownAnimation]);

  useEffect(() => {
    if (!playerReady || !animationRef.current) return;

    if (isLoading) {
      animationRef.current.goToAndPlay(0, true);
    } else {
      const timer = setTimeout(() => {
        animationRef.current?.pause();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading, playerReady]);

  useEffect(() => {
    if (!isLoading) return;
    const hideTimer = setTimeout(() => onFailsafeHide?.(), 9000);
    return () => clearTimeout(hideTimer);
  }, [isLoading, onFailsafeHide]);

  if (disabled) return null;

  return (
    <div
      /* PERBAIKAN: Tambahkan transform-gpu dan will-change-[opacity] untuk Hardware Acceleration */
      className={`${fixed ? "fixed" : "absolute"} inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-300 ease-out transform-gpu will-change-[opacity] ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"} ${className}`}
    >
      <div className="relative flex flex-col items-center gap-4 px-4">
        <div
          ref={containerRef}
          className={`transition-opacity duration-300 ease-out ${playerReady ? "opacity-100" : "opacity-0"}`}
          style={{ width: "180px", height: "180px" }}
        />
      </div>
    </div>
  );
}
