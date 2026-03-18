"use client";

import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import IndonesiaMap from "../assets/who-we-are/map-no-icon.svg";
import { whoWeAreCopy, whoWeAreDistributionCenters } from "./content";

type Props = {
  locale: Locale;
};

// Transisi Halus Kelas Enterprise
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function WhoWeArePresenceSection({ locale }: Props) {
  const t = whoWeAreCopy[locale];
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  const renderPin = (
    center: (typeof whoWeAreDistributionCenters)[number],
    index: number,
    top: string,
    left: string,
    responsiveClass: string,
  ) => (
    <motion.div
      key={`${center.name}-${responsiveClass}`}
      className={`group absolute cursor-pointer ${responsiveClass}`}
      style={{ top, left }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: index * 0.08, // Efek muncul berurutan perlahan
      }}
    >
      {/* Efek radar (ping) dibuat lebih halus (opacity 20) agar elegan */}
      <div className="absolute inset-0 -m-1.5 animate-ping rounded-full bg-emerald-400 opacity-20 md:-m-2" />

      {/* Titik Pin Lokasi */}
      <div className="relative -ml-2.5 -mt-2.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.3)] transition-all duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-125 group-hover:bg-emerald-400 group-hover:shadow-emerald-400/40 md:-ml-3.5 md:-mt-3.5 md:h-7 md:w-7">
        <Building2
          className="h-3 w-3 text-navy transition-colors duration-300 group-hover:text-white md:h-3.5 md:w-3.5"
          strokeWidth={2.5}
        />
      </div>

      {/* Tooltip Korporat (Muncul saat di-hover) */}
      <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:-translate-y-1 group-hover:opacity-100 z-20 md:mb-4">
        <div className="whitespace-nowrap rounded-sm bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-navy shadow-2xl md:text-xs">
          {center.name}
          <div className="absolute left-1/2 top-full -mt-[1px] -translate-x-1/2 border-[6px] border-transparent border-t-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    // SECTION STATIS: Background Navy Murni tanpa efek aneh.
    // pt-32 lg:pt-48 memastikan ada ruang kosong (blank space) yang luas di atas agar menyatu sempurna dengan section sebelumnya.
    <section className="relative flex w-full flex-col items-center overflow-hidden bg-navy pt-8 pb-24 md:pt-16 md:pb-32">
      {/* KONTEN DINAMIS */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        {/* Teks Judul */}
        <motion.div
          className="mb-16 flex flex-col items-center text-center lg:mb-24"
          variants={itemVariants}
        >
          <span className="mb-4 h-[2px] w-12 bg-white/50" />
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white/80 md:text-base">
            {t.presenceTabTitle}
          </h2>
        </motion.div>

        {/* Peta Lokasi */}
        <motion.div
          className="relative mx-auto w-full max-w-[1100px] aspect-[4/3] lg:aspect-[21/9]"
          variants={itemVariants}
        >
          <Image
            src={IndonesiaMap}
            alt={t.presenceMapAlt}
            fill
            quality={isIOS ? 20 : 85} // RAM SAVER IPHONE
            className="object-contain opacity-70 transition-opacity duration-1000 hover:opacity-90"
            sizes="(max-width: 1400px) 100vw, 1100px"
            loading="lazy"
            decoding="async"
          />

          {/* Render Pin Desktop & Mobile */}
          {whoWeAreDistributionCenters.map((center, index) => (
            <Fragment key={center.name}>
              {renderPin(
                center,
                index,
                center.mobileTop,
                center.mobileLeft,
                "md:hidden",
              )}
              {renderPin(
                center,
                index,
                center.top,
                center.left,
                "hidden md:block",
              )}
            </Fragment>
          ))}
        </motion.div>

        {/* Teks Statistik Bawah */}
        <motion.div
          className="z-20 w-full text-center lg:text-left"
          variants={itemVariants}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-white/60 md:text-base">
            {t.presenceLead}
          </p>
          <h3 className="text-4xl font-black leading-[1.05] tracking-tight text-white lg:text-[4.5rem]">
            {t.presenceStatLine1}
            <br />
            {t.presenceStatLine2}
          </h3>
        </motion.div>
      </motion.div>
    </section>
  );
}
