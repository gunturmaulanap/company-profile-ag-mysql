"use client";

import { useLayoutEffect, useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import {
  gsap,
  ensureGsapPlugins,
  refreshScrollTriggerSafe,
} from "@/lib/gsapClient";
import { safeFromTo } from "@/lib/safeGsap";

const stepsByLocale = {
  en: [
    {
      number: "01",
      title: "Manufacture",
      text: "We enable industries to produce with efficiency and resilience.",
      meaning: "Adibayu builds the foundation of economic strength.",
      image: "/ecosystem/manufacture.jpg",
    },
    {
      number: "02",
      title: "Distribution",
      text: "We connect supply with demand through integrated networks.",
      meaning: "Adibayu accelerates the movement of value.",
      image: "/ecosystem/distribution.jpg",
    },
    {
      number: "03",
      title: "Retail",
      text: "We bring products closer to everyday life.",
      meaning: "Adibayu shows up in real daily moments.",
      image: "/ecosystem/retail.jpg",
    },
  ],
  id: [
    {
      number: "01",
      title: "Manufaktur",
      text: "Kami mendorong industri untuk berproduksi secara efisien dan tangguh.",
      meaning: "Adibayu membangun fondasi kekuatan ekonomi.",
      image: "/ecosystem/manufacture.jpg",
    },
    {
      number: "02",
      title: "Distribusi",
      text: "Kami menghubungkan pasokan dan permintaan melalui jaringan terintegrasi.",
      meaning: "Adibayu mempercepat pergerakan nilai.",
      image: "/ecosystem/distribution.jpg",
    },
    {
      number: "03",
      title: "Ritel",
      text: "Kami menghadirkan produk lebih dekat ke kehidupan sehari-hari.",
      meaning: "Adibayu hadir dalam momen keseharian nyata.",
      image: "/ecosystem/retail.jpg",
    },
  ],
} as const;

type SectionImpactJourneyProps = { locale?: Locale };

export default function SectionImpactJourney({
  locale = "id",
}: SectionImpactJourneyProps) {
  const steps = stepsByLocale[locale];
  const scopeRef = useRef<HTMLElement>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  useLayoutEffect(() => {
    if (!scopeRef.current || isIOS) return;
    ensureGsapPlugins();

    const ctx = gsap.context((self) => {
      const q = self.selector;
      if (!q) return;

      const rows = q(".js-impact-row");
      rows.forEach((row: Element) => {
        const imageWrap = row.querySelector(".js-impact-image-wrap");
        const text = row.querySelector(".js-impact-text");
        const number = row.querySelector(".js-impact-number");
        if (!row || !imageWrap || !text || !number) return;

        safeFromTo(
          imageWrap,
          { clipPath: "inset(0 100% 0 0)", y: 30 },
          {
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 76%" },
          },
        );
        safeFromTo(
          text,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 72%" },
          },
        );
        safeFromTo(
          number,
          { y: -18, opacity: 0 },
          {
            y: 0,
            opacity: 0.14,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 78%" },
          },
        );
      });
    }, scopeRef);

    refreshScrollTriggerSafe();
    return () => ctx.revert();
  }, [isIOS]);

  return (
    <section
      id="impact"
      ref={scopeRef}
      className="home-bg-soft py-24 text-navy md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-20 lg:px-32">
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-navy/60 md:text-xs">
          {locale === "id" ? "Komponen" : "Our Components"}
        </p>
        <h2 className="mb-14 max-w-4xl text-4xl font-thin leading-[0.95] tracking-tight md:mb-20 md:text-6xl">
          {locale === "id" ? "Ekosistem Nilai" : "Value Ecosystem"}
        </h2>

        <div className="space-y-10 md:space-y-14">
          {steps.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={step.number}
                className="js-impact-row grid grid-cols-1 gap-0 overflow-hidden bg-white/70 md:grid-cols-2"
              >
                <div
                  className={`${isEven ? "md:order-2" : ""} relative min-h-[280px] md:min-h-[360px]`}
                >
                  <div className="js-impact-image-wrap absolute inset-0 overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      quality={isIOS ? 20 : 75} // RAM SAVER IPHONE
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div
                  className={`js-impact-text ${isEven ? "md:order-1" : ""} relative flex flex-col justify-center px-7 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14`}
                >
                  <div className="js-impact-number absolute right-5 top-2 text-[82px] font-thin leading-none text-navy/15 md:right-8 md:top-0 md:text-[140px] lg:text-[170px]">
                    {step.number}
                  </div>
                  <p className="relative z-10 mb-3 text-[10px] uppercase tracking-[0.2em] text-navy/50 md:text-xs">
                    {locale === "id" ? "Tahap" : "Step"} {step.number}
                  </p>
                  <h3 className="relative z-10 mb-4 text-3xl font-thin leading-[0.96] tracking-tight md:text-4xl lg:text-[46px]">
                    {step.title}
                  </h3>
                  <p className="relative z-10 mb-5 max-w-[40ch] text-sm font-light leading-relaxed text-navy/85 md:text-base">
                    {step.text}
                  </p>
                  <p className="relative z-10 text-xs uppercase tracking-[0.12em] text-navy/60 md:text-sm">
                    {step.meaning}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
