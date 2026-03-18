"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import adibayuLogo from "../assets/logos/adibayu-white-group.png";
import { whoWeAreCopy, whoWeArePortfolioCompanies } from "./content";

type Props = { locale: Locale };

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

export default function WhoWeArePortfolioSection({ locale }: Props) {
  const t = whoWeAreCopy[locale];
  const isId = locale === "id";
  const sectionRef = useRef<HTMLElement>(null);

  const [isIOS, setIsIOS] = useState(false);
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);
  const [isPortfolioPaused, setIsPortfolioPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

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
    if (isPortfolioPaused || !isInView) return;
    const timer = window.setInterval(() => {
      setActivePortfolioIndex(
        (prev) => (prev + 1) % whoWeArePortfolioCompanies.length,
      );
    }, 4000);
    return () => window.clearInterval(timer);
  }, [isPortfolioPaused, isInView]);

  const toggleExpand = (id: string) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
      setIsPortfolioPaused(false);
      return;
    }
    setExpandedCardId(id);
    setIsPortfolioPaused(true);
  };

  return (
    // SECTION STATIS: z-10 akan menjadikannya berada di bawah z-20 milik Hero.
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden bg-navy"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-navy z-0" />

      {/* KONTEN DINAMIS */}
      <motion.div
        className="relative z-10 flex w-full flex-col lg:flex-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.div
          className="z-20 flex w-full flex-col justify-center px-8 py-16 md:px-16 lg:w-1/2 lg:pb-32 lg:pt-40 xl:px-24"
          variants={itemVariants}
        >
          <motion.div className="mb-10" variants={itemVariants}>
            <div className="relative h-40 w-80 opacity-90 transition-opacity hover:opacity-100 md:h-48 md:w-[26rem]">
              <Image
                src={adibayuLogo}
                alt="Adibayu Group Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[1px] w-12 bg-white/80" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                {t.snapshotEyebrow}
              </p>
            </div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {t.snapshotTitle}
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-200">
              {t.snapshotBody}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex w-full flex-col justify-center px-0 py-16 lg:w-1/2 lg:py-24"
          variants={itemVariants}
        >
          <motion.div className="mb-8 px-6 md:px-12" variants={itemVariants}>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
              {t.portfolioTitle}
            </h2>
          </motion.div>

          <motion.div
            className="relative w-full overflow-hidden px-4 md:px-8"
            onMouseEnter={() => setIsPortfolioPaused(true)}
            onMouseLeave={() => {
              if (!expandedCardId) setIsPortfolioPaused(false);
            }}
            variants={itemVariants}
          >
            <div
              className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)]"
              style={{
                transform: `translateX(-${activePortfolioIndex * 100}%)`,
              }}
            >
              {whoWeArePortfolioCompanies.map((company, index) => {
                const isActive = index === activePortfolioIndex;
                const isExpanded = expandedCardId === company.id;

                return (
                  <motion.div
                    key={company.id}
                    className={`w-full flex-shrink-0 px-0 transition-all duration-700 ${isActive ? "opacity-100" : "opacity-0"}`}
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="relative h-full w-full pb-12 pt-4">
                      <div className="relative h-[300px] w-full overflow-hidden shadow-2xl md:h-[400px]">
                        <Image
                          src={company.imageUrl}
                          alt={company.name}
                          fill
                          unoptimized
                          quality={isIOS ? 25 : 75}
                          className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 600px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-black/15 to-transparent opacity-85" />
                      </div>

                      <div className="relative z-20 mx-auto -mt-20 w-[90%] bg-white p-6 shadow-[0_15px_50px_-12px_rgba(0,0,0,0.3)] ring-1 ring-black/5 md:w-[85%] md:p-8">
                        <p className="mb-1 text-sm font-semibold text-gray-500 md:text-base">
                          Adibayu Group • {company.category[locale]}
                        </p>
                        <h3 className="text-2xl font-black uppercase text-navy md:text-3xl">
                          PT. {company.name}
                        </h3>

                        <button
                          onClick={() => toggleExpand(company.id)}
                          className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#4a5c39] transition-colors hover:text-emerald-700"
                        >
                          {isExpanded
                            ? t.portfolioShowLess
                            : t.portfolioReadMore}
                        </button>

                        <div
                          className={`grid transition-all duration-500 ease-in-out ${isExpanded ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                        >
                          <div className="overflow-hidden">
                            <div className="border-t border-gray-100 pt-4">
                              <p className="text-sm font-medium leading-relaxed text-gray-600 md:text-base">
                                {company.summary[locale]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className="z-20 mt-2 flex justify-center gap-2"
            variants={itemVariants}
          >
            {whoWeArePortfolioCompanies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActivePortfolioIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${activePortfolioIndex === index ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"}`}
                aria-label={
                  isId ? `Buka slide ${index + 1}` : `Go to slide ${index + 1}`
                }
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
