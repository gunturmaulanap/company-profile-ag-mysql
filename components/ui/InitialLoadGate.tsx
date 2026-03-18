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
    if (!globalBooted) {
      const timer = setTimeout(() => {
        globalBooted = true;
        setIsBooting(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleRouteStart = () => {
      setIsRouting(true);
      // PERBAIKAN: Scroll ke atas DITUNDA 300ms sampai layar loading menutupi halaman.
      // Ini membebaskan GPU dari beban berat sehingga animasi Menu tertutup sangat mulus!
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 300);
    };
    window.addEventListener("adb-route-start", handleRouteStart);
    return () =>
      window.removeEventListener("adb-route-start", handleRouteStart);
  }, []);

  useEffect(() => {
    if (isBooting) return;

    if (prevPathRef.current !== null && prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      const timer = setTimeout(() => setIsRouting(false), 600);
      return () => clearTimeout(timer);
    }
    prevPathRef.current = pathname;
  }, [pathname, isBooting]);

  const showLoader = isBooting || isRouting;

  return (
    <>
      {children}
      {hydrated && <RouteLoading isLoading={showLoader} fixed={true} />}
    </>
  );
}
