"use client";

import { useEffect, useMemo, useState } from "react";

export type InteractionMode = "hover-capable" | "touch-primary";

type InteractionCapabilities = {
  hover: boolean;
  fine: boolean;
  coarse: boolean;
  anyHover: boolean;
  anyFine: boolean;
  anyCoarse: boolean;
};

const DEFAULT_CAPABILITIES: InteractionCapabilities = {
  hover: false,
  fine: false,
  coarse: true,
  anyHover: false,
  anyFine: false,
  anyCoarse: true,
};

export function useInteractionMode() {
  const [isReady, setIsReady] = useState(false);
  const [isIOSSafari, setIsIOSSafari] = useState(false);
  const [capabilities, setCapabilities] =
    useState<InteractionCapabilities>(DEFAULT_CAPABILITIES);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent;
    const ios =
      /iPhone|iPad|iPod/i.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOSSafari(ios);

    const hoverQuery = window.matchMedia("(hover: hover)");
    const fineQuery = window.matchMedia("(pointer: fine)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const anyHoverQuery = window.matchMedia("(any-hover: hover)");
    const anyFineQuery = window.matchMedia("(any-pointer: fine)");
    const anyCoarseQuery = window.matchMedia("(any-pointer: coarse)");

    const sync = () => {
      setCapabilities({
        hover: hoverQuery.matches,
        fine: fineQuery.matches,
        coarse: coarseQuery.matches,
        anyHover: anyHoverQuery.matches,
        anyFine: anyFineQuery.matches,
        anyCoarse: anyCoarseQuery.matches,
      });
      setIsReady(true);
    };

    sync();

    const onChange = () => sync();

    hoverQuery.addEventListener("change", onChange);
    fineQuery.addEventListener("change", onChange);
    coarseQuery.addEventListener("change", onChange);
    anyHoverQuery.addEventListener("change", onChange);
    anyFineQuery.addEventListener("change", onChange);
    anyCoarseQuery.addEventListener("change", onChange);

    return () => {
      hoverQuery.removeEventListener("change", onChange);
      fineQuery.removeEventListener("change", onChange);
      coarseQuery.removeEventListener("change", onChange);
      anyHoverQuery.removeEventListener("change", onChange);
      anyFineQuery.removeEventListener("change", onChange);
      anyCoarseQuery.removeEventListener("change", onChange);
    };
  }, []);

  const interactionMode: InteractionMode = useMemo(() => {
    const hasPrimaryHoverPrecision = capabilities.hover && capabilities.fine;
    const hasPrimaryCoarsePointer = capabilities.coarse;

    if (hasPrimaryHoverPrecision && !hasPrimaryCoarsePointer) {
      return "hover-capable";
    }

    return "touch-primary";
  }, [capabilities]);

  return {
    interactionMode,
    capabilities,
    isIOSSafari,
    isReady,
  };
}
