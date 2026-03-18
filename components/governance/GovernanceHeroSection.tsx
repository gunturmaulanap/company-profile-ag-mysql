"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import banner2 from "../assets/governance/slider-2.webp";
import banner3 from "../assets/governance/slider-3.webp";
import banner4 from "../assets/governance/slider-4.webp";
import { governanceCopy, governanceHeroSlides } from "./content";

type Props = {
  locale: Locale;
};

const slideImageMap = {
  "slider-2": banner2,
  "slider-3": banner3,
  "slider-4": banner4,
} as const;

// Animasi lebih halus (Premium Cubic Bezier)
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function GovernanceHeroSection({ locale }: Props) {
  const t = governanceCopy[locale];
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  const handleNext = () =>
    setActiveHeroIndex((prev) => (prev + 1) % governanceHeroSlides.length);
  const handlePrev = () =>
    setActiveHeroIndex(
      (prev) =>
        (prev - 1 + governanceHeroSlides.length) % governanceHeroSlides.length,
    );

  return (
    // SECTION STATIS: Background tidak berkedip
    <section className="relative w-full items-center overflow-hidden bg-[#e1ecef] pt-10">
      <div className="pointer-events-none absolute top-1/5 z-0 select-none opacity-5">
        <h1 className="text-[12rem] font-black tracking-tighter text-[#011f37] md:text-[25rem]">
          GOVERN
        </h1>
      </div>

      {/* KONTEN DINAMIS: Elemen di dalam yang melayang masuk */}
      <motion.div
        className="mx-auto w-full px-6 md:px-10 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            className="relative z-10 flex flex-col items-start text-left lg:col-span-5"
            variants={itemVariants}
          >
            <div className="mb-6 border-l-4 border-[#011f37] pl-4">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#011f37]/70">
                {t.heroEyebrow}
              </p>
            </div>

            <h1 className="text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-[#011f37] md:text-5xl lg:text-6xl">
              {t.heroTitle}
              <br />
              <span className="bg-gradient-to-r from-[#011f37] to-blue-700 bg-clip-text text-transparent">
                {t.heroHighlight}
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#011f37]/80 md:text-lg">
              {t.heroBody}
            </p>

            <div className="mt-10">
              <Link
                href="#org-structure"
                className="group inline-flex items-center gap-4 rounded-none bg-[#011f37] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#e1ecef] transition-all hover:bg-blue-900"
              >
                {t.heroCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative flex h-[500px] w-full items-center justify-center overflow-hidden lg:col-span-7 lg:h-[600px]"
            variants={itemVariants}
          >
            {governanceHeroSlides.map((slide, index) => {
              const isActive = index === activeHeroIndex;
              const isNext =
                index === (activeHeroIndex + 1) % governanceHeroSlides.length;
              const isPrev =
                index ===
                (activeHeroIndex - 1 + governanceHeroSlides.length) %
                  governanceHeroSlides.length;

              let positionClass = "opacity-0 scale-95 z-0 pointer-events-none";
              let zIndex = "z-0";

              if (isActive) {
                positionClass = "translate-x-0 scale-100 opacity-100";
                zIndex = "z-30";
              } else if (isNext) {
                positionClass =
                  "translate-x-[38%] scale-[0.90] opacity-35 grayscale cursor-pointer hover:opacity-75 hover:grayscale-0";
                zIndex = "z-20";
              } else if (isPrev) {
                positionClass =
                  "-translate-x-[38%] scale-[0.90] opacity-35 grayscale cursor-pointer hover:opacity-75 hover:grayscale-0";
                zIndex = "z-20";
              }

              return (
                <div
                  key={slide.id}
                  onClick={() => !isActive && setActiveHeroIndex(index)}
                  className={`absolute aspect-[4/5] w-[70%] max-w-[400px] overflow-hidden rounded-none shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${positionClass} ${zIndex}`}
                >
                  <Image
                    src={slideImageMap[slide.image]}
                    alt={slide.title[locale]}
                    fill
                    quality={isIOS ? 20 : 75}
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="eager"
                  />
                  {isActive && (
                    <div className="absolute inset-0 flex animate-in flex-col justify-end bg-gradient-to-t from-[#011f37] via-[#011f37]/40 to-transparent p-8 opacity-0 fill-mode-forwards fade-in duration-500">
                      <h3 className="mb-3 text-3xl font-bold uppercase text-[#e1ecef]">
                        {slide.title[locale]}
                      </h3>
                      <div className="mb-4 h-1 w-16 bg-[#e1ecef]" />
                      <p className="text-sm leading-relaxed text-[#e1ecef]/80">
                        {slide.desc[locale]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
