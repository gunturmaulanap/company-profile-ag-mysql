"use client";

// PERBAIKAN MUTLAK: File ini sebelumnya memanggil <RouteLoading />
// yang menyebabkan iPhone menjalankan 2 animasi SVG secara bersamaan (Crash OOM).
// Kita matikan fungsi file ini sepenuhnya. Layar loading sudah ditangani oleh InitialLoadGate.tsx.

export default function RouteTransitionGate() {
  return null;
}
