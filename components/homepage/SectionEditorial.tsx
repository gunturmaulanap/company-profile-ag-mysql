"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import editorialImage from "../assets/editorial/teamwork.jpg";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";
import {
  gsap,
  ensureGsapPlugins,
  refreshScrollTriggerSafe,
} from "@/lib/gsapClient";
import { safeFromTo, safeTo } from "@/lib/safeGsap";

type SectionEditorialProps = {
  locale?: Locale;
};

export default function SectionEditorial({
  locale = "id",
}: SectionEditorialProps) {
  const t = copy[locale].home.editorialSection;
  const scopeRef = useRef<HTMLElement>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Deteksi super ketat kebal Brave Browser
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

      const quote = q(".js-editorial-quote");
      const subtitle = q(".js-editorial-subtitle");
      const supportText = q(".js-editorial-support");
      const rightMicro = q(".js-editorial-micro");
      const number = q(".js-editorial-number");
      const pillars = q(".js-editorial-pillar");
      const arc = q(".js-editorial-arc")[0];

      safeFromTo(
        quote,
        { y: 58, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: scopeRef.current, start: "top 72%" },
        },
      );
      safeFromTo(
        [subtitle, supportText, rightMicro].flat().filter(Boolean),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: scopeRef.current, start: "top 68%" },
        },
      );
      safeFromTo(
        number,
        { y: -40, opacity: 0 },
        {
          y: 0,
          opacity: 0.2,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: scopeRef.current, start: "top 82%" },
        },
      );
      safeTo(number, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: scopeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      safeFromTo(
        pillars,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: scopeRef.current, start: "top 62%" },
        },
      );

      if (arc) {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
        safeTo(arc, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: scopeRef.current, start: "top 75%" },
        });
      }
    }, scopeRef);

    refreshScrollTriggerSafe();
    return () => ctx.revert();
  }, [isIOS]);

  return (
    <section
      id="about"
      ref={scopeRef}
      className="relative w-full min-h-[132vh] overflow-hidden home-bg-base"
    >
      <div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 83%)",
          WebkitClipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 83%)",
        }}
      >
        <Image
          src={editorialImage}
          alt="Why We Exist"
          fill
          sizes="(max-width: 1024px) 100vw, 100vw"
          quality={isIOS ? 20 : 75} // RAM SAVER IPHONE
          className="object-cover"
          style={{ objectPosition: "50% 40%" }}
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,30,51,0.75) 0%, rgba(0,0,0,0.45) 38%, rgba(0,0,0,0.25) 100%)",
          }}
        />
      </div>

      <div className="relative z-20 w-full px-6 md:px-20 lg:px-32 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 min-h-[95vh]">
          <div className="md:col-span-5 relative flex flex-col min-h-[36rem] md:min-h-0">
            <div>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.22em] text-white/65 mb-8">
                {t.eyebrow}
              </p>
              {/* REMOVED DROP-SHADOW ON IOS */}
              <p
                className={`js-editorial-subtitle max-w-md text-sm md:text-base font-light leading-relaxed text-white ${isIOS ? "" : "drop-shadow-lg"}`}
              >
                {t.subtitle}
              </p>
              <div className="h-16 md:h-24" />
              <p
                className={`js-editorial-support max-w-sm text-xs md:text-sm leading-relaxed text-white/90 font-light ${isIOS ? "" : "drop-shadow-md"}`}
              >
                {t.supportText}
              </p>
            </div>
          </div>

          <div className="md:col-span-7 relative flex flex-col justify-end md:justify-center">
            <div className="absolute top-3 right-0 hidden md:block max-w-[280px]">
              <svg
                width="90"
                height="46"
                viewBox="0 0 90 46"
                fill="none"
                className="mb-3"
              >
                <path
                  className="js-editorial-arc"
                  d="M3 42C11 17 34 4 58 4C72 4 80 7 87 12"
                  stroke="rgba(29,161,242,0.7)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <p
                className={`js-editorial-micro text-xs leading-relaxed text-white/80 font-light ${isIOS ? "" : "drop-shadow-sm"}`}
              >
                {t.microText}
              </p>
            </div>

            <h2
              className={`js-editorial-quote text-[48px] md:text-[66px] lg:text-[78px] leading-[0.94] font-thin text-white tracking-[-0.02em] max-w-[11ch] ${isIOS ? "" : "drop-shadow-2xl"}`}
            >
              {t.quoteLeading}
              <br />
              <span
                className={`text-accent-blue ${isIOS ? "" : "drop-shadow-xl"}`}
              >
                {t.quoteHighlight}
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-8 max-w-3xl">
              {t.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="js-editorial-pillar home-panel home-panel-glass p-4 md:p-5 hover:bg-black/50 transition-all duration-300"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/90 mb-2 font-medium">
                    {pillar.title}
                  </p>
                  <p className="text-xs md:text-sm text-white/85 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
