"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import MenuOverlay from "@/components/MenuOverlay";
import { useLocale } from "@/lib/i18n";

const GovernanceHeroSection = dynamic(
  () => import("@/components/governance/GovernanceHeroSection"),
  { ssr: false },
);
const GovernanceOrgStructureSection = dynamic(
  () => import("@/components/governance/GovernanceOrgStructureSection"),
  { ssr: false },
);
const GovernanceBodiesSection = dynamic(
  () => import("@/components/governance/GovernanceBodiesSection"),
  { ssr: false },
);
const GovernanceEthicsSection = dynamic(
  () => import("@/components/governance/GovernanceEthicsSection"),
  { ssr: false },
);

// PERBAIKAN 1: Lazy Wrapper untuk menghemat RAM saat inisialisasi awal
function SafeLazyWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isActive = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isActive) setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }, // Muat sebelum benar-benar masuk layar
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      isActive = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="w-full min-h-[30vh]">
      {mounted ? children : null}
    </div>
  );
}

export default function GovernancePageClient() {
  const { locale } = useLocale();
  const [isLeaving, setIsLeaving] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      try {
        history.scrollRestoration = "manual";
      } catch (e) {}
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleLeave = () => setIsLeaving(true);
    const handleEnter = () => setIsLeaving(false);

    window.addEventListener("adb-route-start", handleLeave);
    window.addEventListener("adb-locale-change-start", handleLeave);
    window.addEventListener("adb-locale-change-end", handleEnter);

    return () => {
      window.removeEventListener("adb-route-start", handleLeave);
      window.removeEventListener("adb-locale-change-start", handleLeave);
      window.removeEventListener("adb-locale-change-end", handleEnter);
    };
  }, []);

  if (!hasHydrated || isLeaving) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#e1ecef] text-[#011f37]" />
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#e1ecef] text-[#011f37] selection:bg-[#011f37] selection:text-[#e1ecef]">
      <MenuOverlay />

      <GovernanceHeroSection locale={locale} />

      {/* PERBAIKAN 2: Bungkus section di bawah layar dengan SafeLazyWrapper */}
      <SafeLazyWrapper>
        <GovernanceOrgStructureSection locale={locale} />
      </SafeLazyWrapper>
      <SafeLazyWrapper>
        <GovernanceBodiesSection locale={locale} />
      </SafeLazyWrapper>
      <SafeLazyWrapper>
        <GovernanceEthicsSection locale={locale} />
      </SafeLazyWrapper>
      <SafeLazyWrapper>
        <Footer locale={locale} />
      </SafeLazyWrapper>
    </main>
  );
}
