"use client";

import { useEffect } from "react";
import { traceEvent } from "@/lib/runtime-debug";

export default function DebugGlobalTraceHooks() {
  useEffect(() => {
    const onError = (
      message: string | Event,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error,
    ) => {
      traceEvent("window-error", {
        message: typeof message === "string" ? message : "event",
        source,
        lineno,
        colno,
        errorMessage: error?.message,
      });
      return false;
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      traceEvent("unhandledrejection", {
        reason:
          reason instanceof Error
            ? { message: reason.message, stack: reason.stack }
            : String(reason),
      });
    };

    window.onerror = onError;
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.onerror = null;
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
