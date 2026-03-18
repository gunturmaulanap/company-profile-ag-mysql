"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import valuesImage from "../assets/who-we-are/building-4.jpg";
import { whoWeAreCopy, whoWeAreValues } from "./content";
import iconF from "../assets/who-we-are/values/family.svg";
import iconA from "../assets/who-we-are/values/achievement.svg";
import iconS from "../assets/who-we-are/values/spiritual.svg";
import iconT from "../assets/who-we-are/values/teamwork.svg";

type Props = { locale: Locale };

const valueIcons = { F: iconF, A: iconA, S: iconS, T: iconT } as const;

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

export default function WhoWeAreValuesSection({ locale }: Props) {
  const t = whoWeAreCopy[locale];
  const sectionRef = useRef<HTMLElement>(null);

  const [isIOS, setIsIOS] = useState(false);
  const [activeValueIndex, setActiveValueIndex] = useState(1);
  const [isValuesPaused, setIsValuesPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 || /iPhone|iPad|iPod/i.test(navigator.userAgent),
    );
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px" },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isValuesPaused || !isInView) return;
    const timer = window.setInterval(() => {
      setActiveValueIndex((prev) =>
        prev === whoWeAreValues.length - 1 ? 0 : prev + 1,
      );
    }, 2400);
    return () => window.clearInterval(timer);
  }, [isValuesPaused, isInView]);

  const activeValue = useMemo(
    () => whoWeAreValues[activeValueIndex],
    [activeValueIndex],
  );
  const ActiveValueIcon = valueIcons[activeValue.icon];

  return (
    // SECTION STATIS
    <section
      ref={sectionRef}
      className="relative flex w-full flex-col lg:flex-row"
    >
      <div className="absolute inset-0 z-0 flex h-full w-full flex-col">
        <div className="h-[55%] w-full bg-[#e1ecef]" />
        <div className="h-[45%] w-full bg-[#011f37]" />
      </div>

      {/* KONTEN DINAMIS */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-24 pt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.div
          className="relative z-20 -mb-10 flex w-full justify-end px-4 md:px-8 lg:-mb-14"
          variants={itemVariants}
        >
          <h2
            className="text-5xl font-black uppercase tracking-tighter text-white md:text-8xl"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.15)" }}
          >
            {t.valuesTitle}
          </h2>
        </motion.div>

        <motion.div
          className="relative w-full overflow-hidden shadow-2xl aspect-[16/9] md:aspect-[1200/450]"
          variants={itemVariants}
        >
          <Image
            src={valuesImage}
            alt="Values"
            fill
            quality={isIOS ? 20 : 75}
            className="object-cover"
            sizes="(max-width: 1400px) 100vw, 1400px"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011f37]/50 to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-20 mx-auto -mt-16 w-[90%] max-w-[1000px] bg-white shadow-2xl ring-1 ring-black/5 md:-mt-24"
          onMouseEnter={() => setIsValuesPaused(true)}
          onMouseLeave={() => setIsValuesPaused(false)}
          variants={itemVariants}
        >
          <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
            <div className="flex items-center justify-center gap-4 text-[100px] font-black leading-none md:gap-12 md:text-[180px]">
              {whoWeAreValues.map((item, index) => (
                <span
                  key={item.id}
                  className={`transition-all duration-500 ease-in-out ${index === activeValueIndex ? "text-slate-100 opacity-100" : "scale-95 text-slate-50 opacity-70"}`}
                >
                  {item.id}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[300px] items-center px-6 py-12 md:px-16 md:py-16">
            <button
              onClick={() =>
                setActiveValueIndex((prev) =>
                  prev === 0 ? whoWeAreValues.length - 1 : prev - 1,
                )
              }
              className="absolute left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:border-[#005a81] hover:text-[#005a81] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005a81]/40 md:left-8 md:h-14 md:w-14"
              aria-label={t.valuesPrevLabel}
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeValue.id}
                className="mx-auto flex max-w-[600px] flex-col items-center text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <div className={`mb-6 p-4 ${activeValue.color}`}>
                  <Image
                    src={ActiveValueIcon}
                    alt={activeValue.title[locale]}
                    width={80}
                    height={80}
                    className="h-20 w-20"
                  />
                </div>
                <h3
                  className={`mb-4 text-3xl font-bold tracking-tight md:text-4xl ${activeValue.color}`}
                >
                  {activeValue.title[locale]}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                  {activeValue.desc[locale]}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() =>
                setActiveValueIndex((prev) =>
                  prev === whoWeAreValues.length - 1 ? 0 : prev + 1,
                )
              }
              className="absolute right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:border-[#005a81] hover:text-[#005a81] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005a81]/40 md:right-8 md:h-14 md:w-14"
              aria-label={t.valuesNextLabel}
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
