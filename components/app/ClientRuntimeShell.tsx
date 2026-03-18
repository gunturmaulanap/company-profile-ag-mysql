"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // <-- TAMBAHAN: Import usePathname
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import GlobalRouteTransition from "@/components/ui/GlobalRouteTransition";
import DebugGlobalTraceHooks from "@/components/debug/DebugGlobalTraceHooks";
import DebugTraceOverlay from "@/components/debug/DebugTraceOverlay";
import { isIPhoneWebKit, isSubsystemDisabled } from "@/lib/runtime-debug";

type ClientRuntimeShellProps = {
  children: React.ReactNode;
};

function hasDebugFlag() {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  return (
    params.get("adbDebugStartup") === "1" ||
    params.get("debug_ios_trace") === "1" ||
    params.get("adbDebugRecognition") === "1"
  );
}

export default function ClientRuntimeShell({
  children,
}: ClientRuntimeShellProps) {
  const pathname = usePathname(); // <-- TAMBAHAN: Dapatkan URL saat ini
  const [hasMounted, setHasMounted] = useState(false);
  const [enableSmoothScroll, setEnableSmoothScroll] = useState(false);
  const [enableDebugUi, setEnableDebugUi] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const iPhone = isIPhoneWebKit();

    // PERBAIKAN UTAMA: Deteksi apakah user sedang di halaman admin atau login
    const isAdminRoute =
      pathname?.startsWith("/admin") || pathname?.startsWith("/login");

    // Jika di halaman admin/login, Lenis (Smooth Scroll) otomatis diblokir
    const smoothScrollBlocked =
      iPhone ||
      reducedMotion ||
      isAdminRoute ||
      isSubsystemDisabled("smoothScroll");

    setEnableSmoothScroll(!smoothScrollBlocked);
    setEnableDebugUi(process.env.NODE_ENV !== "production" || hasDebugFlag());
  }, [hasMounted, pathname]); // <-- TAMBAHAN: Pantau perubahan pathname

  return (
    <>
      {/* {enableDebugUi && <DebugGlobalTraceHooks />} */}

      {enableSmoothScroll ? (
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      ) : (
        children // <-- Jika di /admin, langsung render tanpa Lenis
      )}

      {/* {enableGlobalRouteTransition && <GlobalRouteTransition />} */}

      {/* {enableDebugUi && <DebugTraceOverlay />} */}
    </>
  );
}
