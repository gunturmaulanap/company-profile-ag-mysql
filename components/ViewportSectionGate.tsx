"use client";

import { useEffect, useRef, useState } from "react";

type ViewportSectionGateProps = {
  children: React.ReactNode;
  minHeightClassName?: string;
  rootMargin?: string;
  once?: boolean;
};

export default function ViewportSectionGate({
  children,
  minHeightClassName = "min-h-[40vh]",
  rootMargin = "300px 0px",
  once = true,
}: ViewportSectionGateProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount && once) return;
    if (typeof window === "undefined") return;
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first) return;

        if (first.isIntersecting) {
          setShouldMount(true);
          if (once) observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [once, rootMargin, shouldMount]);

  return (
    <div ref={ref}>
      {shouldMount ? (
        children
      ) : (
        <section aria-hidden className={minHeightClassName} />
      )}
    </div>
  );
}
