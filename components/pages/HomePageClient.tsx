"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { Insight } from "@/lib/content";
import Hero from "@/components/homepage/Hero";

// Import komponen (Hapus {ssr: false} agar dirender server, aman untuk SEO & Brave Browser)
const MenuOverlay = dynamic(() => import("@/components/MenuOverlay"));
const SectionEditorial = dynamic(
  () => import("@/components/homepage/SectionEditorial"),
);
const SectionPortfolioStats = dynamic(
  () => import("@/components/homepage/SectionPortfolioStats"),
);
const Recognition = dynamic(() => import("@/components/homepage/Recognition"));
const SectionImpactJourney = dynamic(
  () => import("@/components/homepage/SectionImpactJourney"),
);
const BrandsEcosystem = dynamic(
  () => import("@/components/homepage/BrandsEcosystem"),
);
const SectionSustainability = dynamic(
  () => import("@/components/homepage/SectionSustainability"),
);
const SectionGrowCareer = dynamic(
  () => import("@/components/homepage/SectionGrowCareer"),
);
const NewsUpdate = dynamic(() => import("@/components/homepage/NewsUpdate"));
const Footer = dynamic(() => import("@/components/Footer"));

type HomePageClientProps = {
  insights: Insight[];
};

export default function HomePageClient({ insights }: HomePageClientProps) {
  const { locale } = useLocale();

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

      {/* PERBAIKAN: Render murni tanpa blokade isSterilizing. Sangat ringan untuk RAM HP */}
      <main className="min-h-screen text-white home-bg-base">
        <Hero locale={locale as Locale} />

        {sections.map((section) => (
          <div key={section.key} className="w-full">
            {section.node}
          </div>
        ))}
      </main>
    </>
  );
}
