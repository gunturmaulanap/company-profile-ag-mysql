"use client";

import { gsap } from "./gsapClient";

type GSAPTarget = Parameters<typeof gsap.to>[0];
type Vars = Record<string, unknown>;

function normalizeTargets(targets: GSAPTarget): GSAPTarget[] {
  if (targets == null) return [];

  if (Array.isArray(targets)) {
    return targets.filter(Boolean) as GSAPTarget[];
  }

  if (typeof targets === "string") {
    return targets.trim() ? [targets] : [];
  }

  return [targets];
}

function devWarn(message: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(message);
  }
}

export function safeFromTo(
  targets: GSAPTarget,
  fromVars: Vars,
  toVars: Vars,
): ReturnType<typeof gsap.fromTo> | null {
  const normalized = normalizeTargets(targets);
  if (!normalized.length) {
    devWarn("[safeGsap] Skipping gsap.fromTo() because target is empty/null");
    return null;
  }

  return gsap.fromTo(
    normalized.length === 1 ? normalized[0] : normalized,
    fromVars,
    toVars,
  );
}

export function safeTo(
  targets: GSAPTarget,
  toVars: Vars,
): ReturnType<typeof gsap.to> | null {
  const normalized = normalizeTargets(targets);
  if (!normalized.length) {
    devWarn("[safeGsap] Skipping gsap.to() because target is empty/null");
    return null;
  }

  return gsap.to(normalized.length === 1 ? normalized[0] : normalized, toVars);
}
