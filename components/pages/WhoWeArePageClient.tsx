"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { useLocale } from "@/lib/i18n";
import MenuOverlay from "@/components/MenuOverlay";

const WhoWeAreHeroSection = dynamic(
  () => import("@/components/whoweare/WhoWeAreHeroSection"),
  { ssr: false },
);
const WhoWeArePortfolioSection = dynamic(
  () => import("@/components/whoweare/WhoWeArePortfolioSection"),
  { ssr: false },
);
const WhoWeAreVisionMissionSection = dynamic(
  () => import("@/components/whoweare/WhoWeAreVisionMissionSection"),
  { ssr: false },
);
const WhoWeAreValuesSection = dynamic(
  () => import("@/components/whoweare/WhoWeAreValuesSection"),
  { ssr: false },
);
const WhoWeArePresenceSection = dynamic(
  () => import("@/components/whoweare/WhoWeArePresenceSection"),
  { ssr: false },
);
const WhoWeAreLeadershipSection = dynamic(
  () => import("@/components/whoweare/WhoWeAreLeadershipSection"),
  { ssr: false },
);

// PERBAIKAN 1: Menerapkan Lazy Wrapper ala Homepage untuk menyelamatkan RAM
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
      { rootMargin: "300px" }, // Muat sebelum masuk layar
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      isActive = false;
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-full min-h-0 border-0! outline-none! bg-transparent"
    >
      {mounted ? children : null}
    </div>
  );
}

export default function WhoWeArePageClient() {
  const { locale } = useLocale();
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

  if (!hasHydrated) return <main className="bg-white min-h-screen" />;

  return (
    <main className="bg-white text-gray-900 overflow-x-hidden">
      <MenuOverlay />

      <WhoWeAreHeroSection locale={locale} />

      {/* PERBAIKAN 2: Bungkus semua section bawah dengan SafeLazyWrapper */}
      <SafeLazyWrapper>
        <WhoWeArePortfolioSection locale={locale} />
      </SafeLazyWrapper>
      <SafeLazyWrapper>
        <WhoWeAreVisionMissionSection locale={locale} />
      </SafeLazyWrapper>
      <SafeLazyWrapper>
        <WhoWeAreValuesSection locale={locale} />
      </SafeLazyWrapper>
      <SafeLazyWrapper>
        <WhoWeArePresenceSection locale={locale} />
      </SafeLazyWrapper>
      <SafeLazyWrapper>
        <WhoWeAreLeadershipSection locale={locale} />
      </SafeLazyWrapper>
      <SafeLazyWrapper>
        <Footer locale={locale} />
      </SafeLazyWrapper>
    </main>
  );
}
