"use client";

import { usePathname } from "next/navigation";

// PERBAIKAN MUTLAK: Hapus SegmentLoaderOverlay dan <RouteLoading /> dari sini.
// Kita hanya me-return children agar tidak ada penumpukan Lottie Canvas/SVG di memori.

type SegmentTransitionControllerProps = {
  children: React.ReactNode;
  minDurationMs?: number;
  maxDurationMs?: number;
  fadeOutMs?: number;
};

export default function SegmentTransitionController({
  children,
}: SegmentTransitionControllerProps) {
  const pathname = usePathname();

  return <div key={pathname}>{children}</div>;
}
