"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import Hero from "@/components/homepage/Hero";
import { usePathname } from "next/navigation";

const MenuOverlay = dynamic(() => import("@/components/MenuOverlay"), {
  ssr: false,
});
const SectionEditorial = dynamic(
  () => import("@/components/homepage/SectionEditorial"),
  { ssr: false },
);
const SectionPortfolioStats = dynamic(
  () => import("@/components/homepage/SectionPortfolioStats"),
  { ssr: false },
);
const Recognition = dynamic(() => import("@/components/homepage/Recognition"), {
  ssr: false,
});
const SectionImpactJourney = dynamic(
  () => import("@/components/homepage/SectionImpactJourney"),
  { ssr: false },
);
const BrandsEcosystem = dynamic(
  () => import("@/components/homepage/BrandsEcosystem"),
  {
    ssr: false,
  },
);
const SectionSustainability = dynamic(
  () => import("@/components/homepage/SectionSustainability"),
  { ssr: false },
);
const SectionGrowCareer = dynamic(
  () => import("@/components/homepage/SectionGrowCareer"),
  { ssr: false },
);
const NewsUpdate = dynamic(() => import("@/components/homepage/NewsUpdate"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

function normalizePathname(value: string) {
  const base = value.replace(/\/$/, "") || "/";
  const withoutLocale = base.replace(/^\/(id|en)(?=\/|$)/, "") || "/";
  return withoutLocale === "" ? "/" : withoutLocale;
}

function SafeLazyWrapper({
  children,
  delayMs = 120,
}: {
  children: React.ReactNode;
  delayMs?: number;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timerRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible || !hostRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        timerRef.current = window.setTimeout(() => {
          setIsVisible(true);
        }, delayMs);

        observerRef.current?.disconnect();
      },
      { rootMargin: "300px" },
    );

    observerRef.current.observe(hostRef.current);

    return () => {
      observerRef.current?.disconnect();
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [delayMs, isVisible]);

  return (
    <div ref={hostRef} className="w-full min-h-[30vh]">
      {isVisible ? children : null}
    </div>
  );
}

export default function HomePageClient() {
  const { locale } = useLocale();
  const rawPathname = usePathname();
  const pathname = normalizePathname(rawPathname);

  const [hasMounted, setHasMounted] = useState(false);
  const [isSterilizing, setIsSterilizing] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const updateViewport = () => {
      try {
        setIsMobileViewport(window.innerWidth < 1024);
      } catch {
        setIsMobileViewport(false);
      }
    };

    updateViewport();

    try {
      if (typeof window !== "undefined" && "scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    } catch {}

    try {
      window.scrollTo(0, 0);
    } catch {}

    window.addEventListener("resize", updateViewport, { passive: true });

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const handleRouteStart = () => {
      setIsSterilizing(true);
      try {
        window.scrollTo(0, 0);
      } catch {}
    };

    window.addEventListener("adb-route-start", handleRouteStart);

    return () => {
      window.removeEventListener("adb-route-start", handleRouteStart);
    };
  }, []);

  useEffect(() => {
    setIsSterilizing(false);
    try {
      window.scrollTo(0, 0);
    } catch {}
  }, [pathname]);

  const sections = useMemo(
    () => [
      {
        key: "editorial",
        node: <SectionEditorial locale={locale as Locale} />,
      },
      {
        key: "portfolio-stats",
        node: <SectionPortfolioStats locale={locale as Locale} />,
      },
      {
        key: "recognition",
        node: <Recognition locale={locale as Locale} />,
      },
      {
        key: "impact-journey",
        node: <SectionImpactJourney locale={locale as Locale} />,
      },
      {
        key: "brands-ecosystem",
        node: <BrandsEcosystem locale={locale as Locale} />,
      },
      {
        key: "sustainability",
        node: <SectionSustainability locale={locale as Locale} />,
      },
      {
        key: "grow-career",
        node: <SectionGrowCareer locale={locale as Locale} />,
      },
      {
        key: "news-footer",
        node: (
          <>
            <NewsUpdate locale={locale as Locale} />
            <Footer locale={locale as Locale} />
          </>
        ),
      },
    ],
    [locale],
  );

  return (
    <>
      <MenuOverlay />

      <main className="min-h-screen text-white home-bg-base">
        {!isSterilizing ? (
          <>
            <Hero locale={locale as Locale} />

            {hasMounted &&
              sections.map((section, index) => (
                <SafeLazyWrapper
                  key={section.key}
                  delayMs={
                    isMobileViewport ? 160 + index * 30 : 100 + index * 16
                  }
                >
                  {section.node}
                </SafeLazyWrapper>
              ))}
          </>
        ) : (
          <div className="min-h-screen w-full" aria-hidden="true" />
        )}
      </main>
    </>
  );
}
