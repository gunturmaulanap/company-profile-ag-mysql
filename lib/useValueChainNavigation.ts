"use client";

import { useEffect, useState } from "react";

type ValueChainPillar = "manufacturing" | "distribution" | "retail" | "impact";

let globalActivePillar: ValueChainPillar | null = null;
const listeners: Set<(pillar: ValueChainPillar | null) => void> = new Set();

export function setActivePillar(pillar: ValueChainPillar | null) {
  globalActivePillar = pillar;
  listeners.forEach((listener) => listener(pillar));
}

export function useValueChainNavigation() {
  const [activePillar, setActivePillarState] =
    useState<ValueChainPillar | null>(null);

  useEffect(() => {
    const listener = (pillar: ValueChainPillar | null) => {
      setActivePillarState(pillar);
      // Auto-clear after 5 seconds
      if (pillar) {
        setTimeout(() => {
          setActivePillar(null);
          listeners.forEach((l) => l(null));
        }, 5000);
      }
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const navigateToPillar = (pillar: ValueChainPillar) => {
    setActivePillar(pillar);
    // Scroll to section
    const section = document.getElementById("value-chain");
    if (section) {
      const navOffset = window.innerWidth >= 1024 ? 120 : 92;
      const targetTop =
        section.getBoundingClientRect().top + window.scrollY - navOffset;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth",
      });
    }
  };

  return { activePillar, navigateToPillar };
}
