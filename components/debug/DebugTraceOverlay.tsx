"use client";

import { useEffect, useMemo, useState } from "react";
import { getTraceBuffer } from "@/lib/runtime-debug";

type TraceRow = {
  ts: number;
  event: string;
  pathname: string;
  routeAttemptId: string | null;
};

export default function DebugTraceOverlay() {
  const enabled = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      new URLSearchParams(window.location.search).get("debug_ios_trace") === "1"
    );
  }, []);

  const [rows, setRows] = useState<TraceRow[]>([]);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      const latest = getTraceBuffer().slice(-20) as TraceRow[];
      setRows(latest);
    }, 1000);
    return () => window.clearInterval(id);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-2 left-2 z-[10001] max-w-[90vw] rounded-md bg-black/75 px-2 py-1 text-[10px] text-white">
      <div className="mb-1 font-semibold">ADB TRACE</div>
      <div className="max-h-40 overflow-auto space-y-0.5">
        {rows.map((row, index) => (
          <div key={`${row.ts}-${index}`}>
            {new Date(row.ts).toISOString().slice(11, 23)} | {row.event} |{" "}
            {row.pathname} | {row.routeAttemptId ?? "-"}
          </div>
        ))}
      </div>
    </div>
  );
}
