"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import RouteLoading from "./route-loading";

let globalBooted = false;

export default function InitialLoadGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/^\/(id|en)(?=\/|$)/, "") || "/";

  const [hydrated, setHydrated] = useState(false);
  const [isBooting, setIsBooting] = useState(!globalBooted);
  const [isRouting, setIsRouting] = useState(false);
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    setHydrated(true);
    // MATIKAN BOOTING PERTAMA KALI DENGAN AMAN
    if (!globalBooted) {
      const timer = setTimeout(() => {
        globalBooted = true;
        setIsBooting(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // HIDUPKAN LOADING SAAT MENU / TOMBOL KLIK (INTERCEPTED)
  useEffect(() => {
    const handleRouteStart = () => {
      window.scrollTo(0, 0); // Paksa ke atas layar saat transisi
      setIsRouting(true);
    };
    window.addEventListener("adb-route-start", handleRouteStart);
    return () =>
      window.removeEventListener("adb-route-start", handleRouteStart);
  }, []);

  // MATIKAN LOADING SECARA OTOMATIS SETELAH URL BERUBAH (Next.js Selesai Render)
  useEffect(() => {
    if (isBooting) return;

    if (prevPathRef.current !== null && prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      // Beri sedikit jeda agar DOM benar-benar selesai dimuat sebelum ditarik layarnya
      const timer = setTimeout(() => setIsRouting(false), 600);
      return () => clearTimeout(timer);
    }
    prevPathRef.current = pathname;
  }, [pathname, isBooting]);

  const showLoader = isBooting || isRouting;

  return (
    <>
      {/* KONTEN UTAMA: Akan memudar (fade out) dengan elegan saat loading berjalan */}
      <div
        className={`transition-opacity duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] ${!showLoader ? "opacity-100" : "opacity-0"}`}
      >
        {children}
      </div>

      {/* KOMPONEN LOTTIE LOADING */}
      {hydrated && <RouteLoading isLoading={showLoader} fixed={true} />}
    </>
  );
}
