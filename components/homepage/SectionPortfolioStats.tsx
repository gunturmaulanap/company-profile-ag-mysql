"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";
import {
  ensureGsapPlugins,
  gsap,
  refreshScrollTriggerSafe,
} from "@/lib/gsapClient";
import { safeFromTo } from "@/lib/safeGsap";

import portfolioCharity from "../assets/portfolio/charity.webp";
import portfolioConnectingMarket from "../assets/portfolio/connecting-market.webp";
import portfolioCreatingImpact from "../assets/portfolio/creating-lasting-impact.webp";
import portfolioIndustry from "../assets/portfolio/industry.webp";
import portfolioServingEveryday from "../assets/portfolio/serving-everyday.webp";

const transformationImages = [
  portfolioCharity,
  portfolioIndustry,
  portfolioConnectingMarket,
  portfolioServingEveryday,
  portfolioCreatingImpact,
];

// PURE CSS ANIMATION (Menyelamatkan GPU iPhone 100%)
const cssMarquee = `
  @keyframes scrollX {
    0% { transform: translateX(0) translateZ(0); }
    100% { transform: translateX(calc(-50% - 12px)) translateZ(0); }
  }
  .animate-scroll-x {
    animation: scrollX 35s linear infinite;
    width: max-content;
  }
  .scroll-paused {
    animation-play-state: paused !important;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

export default function SectionPortfolioStats({
  locale = "id",
}: {
  locale?: Locale;
}) {
  const t = copy[locale].home.transformationSection;
  const scopeRef = useRef<HTMLElement>(null);

  const [isIOS, setIsIOS] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const slides = t.cards.map((card, index) => ({
    id: index,
    title: card.title,
    description: card.description,
    image: transformationImages[index] ?? transformationImages[0],
  }));

  // Duplikasi slide untuk infinite loop CSS
  const displaySlides = [...slides, ...slides];

  useLayoutEffect(() => {
    if (!scopeRef.current) return;
    ensureGsapPlugins();

    const ctx = gsap.context((self) => {
      const q = self.selector;
      if (!q) return;

      // Hanya animasi munculnya saja (Fade up).
      // LOGIKA MARQUEE GSAP DIHAPUS TOTAL!
      safeFromTo(
        q(".js-portfolio-card"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: scopeRef.current, start: "top 75%" },
        },
      );
    }, scopeRef);

    refreshScrollTriggerSafe();
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={scopeRef}
      className="relative w-full py-24 md:py-32 overflow-hidden home-bg-base"
    >
      <style dangerouslySetInnerHTML={{ __html: cssMarquee }} />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 lg:px-32 mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/55 mb-3">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl md:text-6xl font-thin tracking-tight leading-[0.95] max-w-3xl text-white">
            {t.title}
          </h2>
        </div>

        {/* TOMBOL PLAY / PAUSE (PENGHEMAT GPU) */}
        {!isIOS && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors w-fit z-10"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span className="text-xs font-medium uppercase tracking-wider">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </button>
        )}
      </div>

      <div className="overflow-hidden select-none w-full">
        {/* LOGIKA IPHONE: Native Scroll horizontal (0% RAM Load) | DESKTOP: CSS Marquee */}
        <div
          className={`${
            isIOS
              ? "flex gap-4 md:gap-6 px-6 overflow-x-auto snap-x hide-scrollbar"
              : `flex gap-4 md:gap-6 px-6 md:px-0 animate-scroll-x ${!isPlaying ? "scroll-paused" : ""}`
          }`}
        >
          {(isIOS ? slides : displaySlides).map((slide, i) => (
            <article
              key={`${slide.id}-${i}`}
              className={`js-portfolio-card relative shrink-0 w-[84vw] sm:w-[72vw] md:w-[44vw] lg:w-[42vw] aspect-[4/3] overflow-hidden bg-white/10 ${
                isIOS
                  ? "snap-center rounded-none"
                  : "rounded-none md:rounded-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                quality={isIOS ? 20 : 75} // RAM SAVER KHUSUS IOS
                sizes="(max-width: 1024px) 84vw, 44vw"
                className="object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 md:left-7 md:right-7 md:bottom-7">
                <p className="text-white text-2xl md:text-[34px] font-thin leading-tight mb-2 md:mb-3">
                  {slide.title}
                </p>
                <p className="text-white/85 text-xs md:text-sm leading-relaxed font-light max-w-[46ch]">
                  {slide.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
