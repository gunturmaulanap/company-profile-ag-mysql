"use client";

type DebugWindow = Window & {
  __ADB_DEBUG_STARTUP?: boolean;
  __ADB_DEBUG_RECOGNITION?: boolean;
  __ADB_SAFE_MODE?: string;
  __ADB_DISABLE_SUBSYSTEMS?: string[];
  __ADB_ENABLE_SUBSYSTEMS?: string[];
  __ADB_ROUTE_ATTEMPT_ID?: string;
  __adbLogs?: TraceEntry[];
  __ADB_GATE_STATE__?: Record<string, unknown>;
};

type StartupEvent = {
  t: number;
  e: string;
  p?: Record<string, unknown>;
};

type TraceEntry = {
  ts: number;
  event: string;
  pathname: string;
  routeAttemptId: string | null;
  payload?: Record<string, unknown>;
};

const STARTUP_BUFFER_KEY = "adb_startup_events_v1";
const STARTUP_MAX_EVENTS = 60;
const TRACE_BUFFER_KEY = "__adb_last_logs__";
const TRACE_MAX_EVENTS = 100;

const TRACE_IMPORTANT_EVENTS = new Set([
  "route-home-attempt",
  "initial-gate-start",
  "initial-gate-ready",
  "home-client-mount",
  "home-client-unmount",
  "hero-shell-ready",
  "adb-home-ready-dispatch",
  "window-error",
  "unhandledrejection",
]);

function now() {
  return Date.now();
}

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function hasQueryFlag(flag: string): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get(flag) === "1";
}

function getQueryValue(key: string): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(key);
}

export function isIOSWebKit(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOSDevice =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isWebKit = /AppleWebKit/i.test(ua);
  return isIOSDevice && isWebKit;
}

export function isIPhoneWebKit(): boolean {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPhone/i.test(ua) && /AppleWebKit/i.test(ua);
}

export function getRouteAttemptId(): string | null {
  if (typeof window === "undefined") return null;
  const w = window as DebugWindow;
  return w.__ADB_ROUTE_ATTEMPT_ID ?? null;
}

export function setRouteAttemptId(nextPath: string, source: string): string {
  if (typeof window === "undefined") return `ssr:${nextPath}`;
  const w = window as DebugWindow;
  const id = `${Date.now()}:${source}:${nextPath}`;
  w.__ADB_ROUTE_ATTEMPT_ID = id;
  return id;
}

function pushTrace(entry: TraceEntry) {
  if (typeof window === "undefined") return;
  const w = window as DebugWindow;
  const current = Array.isArray(w.__adbLogs) ? w.__adbLogs : [];
  const next = [...current, entry].slice(-TRACE_MAX_EVENTS);
  w.__adbLogs = next;

  try {
    window.sessionStorage.setItem(TRACE_BUFFER_KEY, JSON.stringify(next));
  } catch {}
}

function shouldShipTrace(): boolean {
  if (typeof window === "undefined") return false;
  return (
    hasQueryFlag("debug_ios_trace") ||
    hasQueryFlag("adbDebugStartup") ||
    isStartupDebugEnabled()
  );
}

function shipTrace(entry: TraceEntry) {
  if (typeof window === "undefined") return;
  if (!TRACE_IMPORTANT_EVENTS.has(entry.event)) return;
  if (!shouldShipTrace()) return;

  const payload = JSON.stringify(entry);

  try {
    const blob = new Blob([payload], { type: "application/json" });
    const sent = navigator.sendBeacon?.("/api/debug-log", blob);
    if (sent) return;
  } catch {}

  void fetch("/api/debug-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

export function traceEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  try {
    const verboseTrace =
      hasQueryFlag("debug_ios_trace") || hasQueryFlag("adbDebugStartup");

    if (!verboseTrace && !TRACE_IMPORTANT_EVENTS.has(event)) return;

    const entry: TraceEntry = {
      ts: now(),
      event,
      pathname: window.location.pathname,
      routeAttemptId: getRouteAttemptId(),
      payload,
    };

    pushTrace(entry);
    shipTrace(entry);

    if (verboseTrace) {
      console.info("[ADB_TRACE]", entry);
    }
  } catch {}
}

export function getTraceBuffer(): TraceEntry[] {
  if (typeof window === "undefined") return [];
  const w = window as DebugWindow;
  if (Array.isArray(w.__adbLogs)) return w.__adbLogs;
  return safeJsonParse<TraceEntry[]>(
    window.sessionStorage.getItem(TRACE_BUFFER_KEY),
    [],
  );
}

export function isIOSGateTrialEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (!isIPhoneWebKit()) return false;

  if (hasQueryFlag("ios_gate_trial")) return true;

  try {
    return window.localStorage.getItem("ios_gate_trial") === "1";
  } catch {
    return false;
  }
}

export function getSafeMode(): string {
  if (typeof window === "undefined") return "OFF";

  const w = window as DebugWindow;
  const query = getQueryValue("adbSafeMode");
  if (query) return query.toUpperCase();

  if (w.__ADB_SAFE_MODE) return w.__ADB_SAFE_MODE.toUpperCase();

  if (process.env.NODE_ENV !== "production") {
    try {
      const stored = window.localStorage.getItem("adbSafeMode");
      if (stored) return stored.toUpperCase();
    } catch {}
  }

  return "OFF";
}

export function safeModeEnabled(...modes: string[]) {
  const current = getSafeMode();
  if (current === "OFF") return false;
  return modes.map((mode) => mode.toUpperCase()).includes(current);
}

export function isSubsystemDisabled(name: string): boolean {
  if (typeof window === "undefined") return false;

  const key = name.trim().toLowerCase();

  const query = getQueryValue("adbDisableSubsystems");
  const queryItems = query
    ? query
        .split(",")
        .map((v) => v.trim().toLowerCase())
        .filter(Boolean)
    : [];

  const enabledQuery = getQueryValue("adbEnableSubsystems");
  const enabledQueryItems = enabledQuery
    ? enabledQuery
        .split(",")
        .map((v) => v.trim().toLowerCase())
        .filter(Boolean)
    : [];

  const w = window as DebugWindow;
  const runtimeItems = (w.__ADB_DISABLE_SUBSYSTEMS ?? []).map((v) =>
    v.trim().toLowerCase(),
  );
  const enabledRuntimeItems = (w.__ADB_ENABLE_SUBSYSTEMS ?? []).map((v) =>
    v.trim().toLowerCase(),
  );

  if (enabledQueryItems.includes(key) || enabledRuntimeItems.includes(key)) {
    return false;
  }

  if (queryItems.includes(key) || runtimeItems.includes(key)) {
    return true;
  }

  return (
    (key === "routeloading" && safeModeEnabled("SAFE_MODE_NO_LOADER")) ||
    (key === "lottieloader" &&
      safeModeEnabled("SAFE_MODE_NO_LOADER", "SAFE_MODE_MINIMAL")) ||
    (key === "initialloadgate" && safeModeEnabled("SAFE_MODE_MINIMAL")) ||
    // (key === "globalroutetransition" &&
    //   safeModeEnabled("SAFE_MODE_NO_TRANSITIONS", "SAFE_MODE_MINIMAL")) ||
    (key === "smoothscroll" &&
      safeModeEnabled(
        "SAFE_MODE_NO_SMOOTH_SCROLL",
        "SAFE_MODE_MINIMAL",
        "SAFE_MODE_STATIC_ONLY",
      )) ||
    (key === "hero" && safeModeEnabled("SAFE_MODE_NO_HERO")) ||
    (key === "heroanimations" &&
      safeModeEnabled("SAFE_MODE_MINIMAL", "SAFE_MODE_STATIC_ONLY")) ||
    (key === "heroheavyimages" &&
      safeModeEnabled("SAFE_MODE_MINIMAL", "SAFE_MODE_STATIC_ONLY")) ||
    (key === "menuoverlay" &&
      safeModeEnabled("SAFE_MODE_NO_MENU_OVERLAY", "SAFE_MODE_MINIMAL")) ||
    (key === "belowfold" &&
      safeModeEnabled("SAFE_MODE_NO_BELOW_FOLD", "SAFE_MODE_MINIMAL")) ||
    (key === "fixedfullscreenoverlays" &&
      safeModeEnabled("SAFE_MODE_NO_OVERLAYS", "SAFE_MODE_MINIMAL")) ||
    (key === "deferredsectionmounts" &&
      safeModeEnabled("SAFE_MODE_NO_BELOW_FOLD", "SAFE_MODE_MINIMAL")) ||
    (key === "startupobservers" &&
      safeModeEnabled("SAFE_MODE_MINIMAL", "SAFE_MODE_STATIC_ONLY")) ||
    (key === "startuptimers" && safeModeEnabled("SAFE_MODE_MINIMAL")) ||
    (key === "framermotionglobal" &&
      safeModeEnabled("SAFE_MODE_MINIMAL", "SAFE_MODE_STATIC_ONLY")) ||
    (key === "gsap" &&
      safeModeEnabled("SAFE_MODE_MINIMAL", "SAFE_MODE_STATIC_ONLY")) ||
    (key === "recognitionwarmup" &&
      safeModeEnabled(
        "SAFE_MODE_NO_RECOGNITION_WARMUP",
        "SAFE_MODE_MINIMAL",
        "SAFE_MODE_STATIC_ONLY",
      ))
  );
}

export function isStartupDebugEnabled() {
  if (typeof window === "undefined") return false;
  const debugWindow = window as DebugWindow;
  return (
    process.env.NODE_ENV !== "production" ||
    debugWindow.__ADB_DEBUG_STARTUP === true ||
    hasQueryFlag("adbDebugStartup")
  );
}

export function isRecognitionDebugEnabled() {
  if (typeof window === "undefined") return false;
  const debugWindow = window as DebugWindow;
  return (
    process.env.NODE_ENV !== "production" ||
    debugWindow.__ADB_DEBUG_RECOGNITION === true ||
    hasQueryFlag("adbDebugRecognition")
  );
}

export function startupMark(label: string) {
  if (typeof window === "undefined") return;
  if (typeof performance?.mark !== "function") return;
  performance.mark(`adb:start:${label}`);
}

function pushStartupEvent(event: StartupEvent) {
  if (typeof window === "undefined") return;
  const current = safeJsonParse<StartupEvent[]>(
    window.sessionStorage.getItem(STARTUP_BUFFER_KEY),
    [],
  );
  const next = [...current, event].slice(-STARTUP_MAX_EVENTS);
  window.sessionStorage.setItem(STARTUP_BUFFER_KEY, JSON.stringify(next));
}

function shipStartupEvent(event: StartupEvent) {
  if (typeof window === "undefined") return;
  if (!shouldShipTrace()) return;

  const payload = JSON.stringify({
    ts: event.t,
    event: event.e,
    payload: event.p,
    path: window.location.pathname,
    mode: getSafeMode(),
    ua: navigator.userAgent.slice(0, 120),
  });

  try {
    const blob = new Blob([payload], { type: "application/json" });
    const sent = navigator.sendBeacon?.("/api/debug/startup", blob);
    if (sent) return;
  } catch {}

  void fetch("/api/debug/startup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

export function startupLog(event: string, payload?: Record<string, unknown>) {
  const item: StartupEvent = {
    t: now(),
    e: event,
    p: payload,
  };

  if (typeof window !== "undefined") {
    pushStartupEvent(item);
    shipStartupEvent(item);
  }

  if (!isStartupDebugEnabled()) return;

  if (payload) {
    console.info(`[Startup] ${event}`, payload);
    return;
  }

  console.info(`[Startup] ${event}`);
}

export function getStartupEventBuffer(): StartupEvent[] {
  if (typeof window === "undefined") return [];
  return safeJsonParse<StartupEvent[]>(
    window.sessionStorage.getItem(STARTUP_BUFFER_KEY),
    [],
  );
}

export function recognitionMark(label: string) {
  if (typeof window === "undefined") return;
  if (typeof performance?.mark !== "function") return;
  performance.mark(`adb:recognition:${label}`);
}

export function recognitionLog(
  event: string,
  payload?: Record<string, unknown>,
) {
  if (!isRecognitionDebugEnabled()) return;

  if (payload) {
    console.info(`[Recognition] ${event}`, payload);
    return;
  }

  console.info(`[Recognition] ${event}`);
}
