"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
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
  const [hasMounted, setHasMounted] = useState(false);
  const [enableSmoothScroll, setEnableSmoothScroll] = useState(false);
  //   const [enableGlobalRouteTransition, setEnableGlobalRouteTransition] =
  useState(false);
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

    const smoothScrollBlocked =
      iPhone || reducedMotion || isSubsystemDisabled("smoothScroll");

    const routeTransitionBlocked =
      iPhone || isSubsystemDisabled("globalRouteTransition");

    setEnableSmoothScroll(!smoothScrollBlocked);
    // setEnableGlobalRouteTransition(!routeTransitionBlocked);
    setEnableDebugUi(process.env.NODE_ENV !== "production" || hasDebugFlag());
  }, [hasMounted]);

  return (
    <>
      {/* {enableDebugUi && <DebugGlobalTraceHooks />} */}

      <SmoothScroll enabled={enableSmoothScroll}>{children}</SmoothScroll>

      {/* {enableGlobalRouteTransition && <GlobalRouteTransition />} */}

      {/* {enableDebugUi && <DebugTraceOverlay />} */}
    </>
  );
}
