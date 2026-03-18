"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { Insight } from "@/lib/content";
import Hero from "@/components/homepage/Hero";
import { usePathname } from "next/navigation";

// Dynamic import
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
  { ssr: false },
);
const SectionSustainability = dynamic(
  () => import("@/components/homepage/SectionSustainability"),
  { ssr: false },
);
const SectionGrowCareer = dynamic(
  () => import("@/components/homepage/SectionGrowCareer"),
  { ssr: false },
);
const NewsUpdate = dynamic(() => import("@/components/homepage/NewsUpdate"));
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

function normalizePathname(value: string) {
  const base = value.replace(/\/$/, "") || "/";
  const withoutLocale = base.replace(/^\/(id|en)(?=\/|$)/, "") || "/";
  return withoutLocale === "" ? "/" : withoutLocale;
}

type HomePageClientProps = {
  insights: Insight[];
};

export default function HomePageClient({ insights }: HomePageClientProps) {
  const { locale } = useLocale();
  const rawPathname = usePathname();
  const pathname = normalizePathname(rawPathname);

  const [isSterilizing, setIsSterilizing] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && "scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    } catch {}
  }, []);

  useEffect(() => {
    const handleRouteStart = () => {
      setIsSterilizing(true);
      try {
        window.scrollTo(0, 0);
      } catch {}
    };

    window.addEventListener("adb-route-start", handleRouteStart);
    return () =>
      window.removeEventListener("adb-route-start", handleRouteStart);
  }, []);

  useEffect(() => {
    setIsSterilizing(false);
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
      { key: "recognition", node: <Recognition locale={locale as Locale} /> },
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
            <NewsUpdate locale={locale as Locale} insights={insights} />
            <Footer locale={locale as Locale} />
          </>
        ),
      },
    ],
    [locale, insights],
  );

  return (
    <>
      <MenuOverlay />

      <main className="min-h-screen text-white home-bg-base">
        {!isSterilizing ? (
          <>
            <Hero locale={locale as Locale} />

            {/* PERBAIKAN: Render langsung tanpa menunggu hasMounted */}
            {sections.map((section) => (
              <div key={section.key} className="w-full">
                {section.node}
              </div>
            ))}
          </>
        ) : (
          <div className="min-h-screen w-full" aria-hidden="true" />
        )}
      </main>
    </>
  );
}
