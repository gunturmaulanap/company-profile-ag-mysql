"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import HeroImage from "../assets/who-we-are/building-1.jpg";
import { whoWeAreCopy } from "./content";
import wavePattern from "../assets/footer/wave-pattern-crop.svg";

type Props = {
  locale: Locale;
};

// Transisi Halus Kelas Enterprise
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

export default function WhoWeAreHeroSection({ locale }: Props) {
  const t = whoWeAreCopy[locale];

  return (
    // PERBAIKAN: Menambahkan z-20 agar layer Hero selalu berada di atas layer Portfolio
    <section
      id="hero"
      className="relative z-20 w-full bg-[#e1ecef] lg:pb-0 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent z-0" />

      {/* CONTAINER DINAMIS (DESKTOP) */}
      <motion.div
        className="relative mx-auto hidden lg:grid grid-cols-12 grid-rows-4 gap-0 w-full min-h-[800px] z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.div
          className="col-start-2 col-span-5 row-start-1 row-span-4 relative z-10 overflow-hidden shadow-2xl -translate-y-12"
          variants={itemVariants}
        >
          <Image
            src={HeroImage}
            alt="Adibayu industrial operations"
            fill
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </motion.div>

        <motion.div
          className="col-start-7 col-span-6 row-start-1 row-span-2 flex flex-col justify-center px-12"
          variants={itemVariants}
        >
          <h1 className="text-5xl lg:text-6xl font-black text-navy uppercase tracking-tight leading-[1.05]">
            {t.heroTitle}
          </h1>
          <div className="w-24 h-2 bg-navy mt-6 mb-8 rounded-full" />
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed font-medium">
            {t.heroSubtitle}
          </p>
        </motion.div>

        <motion.div
          className="col-start-7 col-span-6 row-start-3 row-span-1 flex items-center px-12"
          variants={itemVariants}
        >
          <div className="flex flex-wrap items-center gap-6">
            {t.sectors.map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 group"
                variants={itemVariants}
                transition={{ delay: index * 0.04 }}
              >
                <div className="h-14 w-14 rounded-full bg-navy/5 flex items-center justify-center text-navy font-black text-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-navy group-hover:text-white group-hover:shadow-lg">
                  {item.substring(0, 1)}
                </div>
                <span className="text-sm font-bold text-navy uppercase tracking-widest">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="col-start-1 col-span-12 row-start-4 row-span-1 bg-navy relative min-h-[100px]">
          {/* PERBAIKAN: Wave diletakkan menembus ke bawah. 
              pointer-events-none memastikan ombak tidak menghalangi klik pada section di bawahnya */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] opacity-10 pointer-events-none z-0">
            <Image
              src={wavePattern}
              alt="Wave pattern decoration"
              fill
              className="object-contain object-right-top"
            />
          </div>
        </div>
      </motion.div>

      {/* CONTAINER DINAMIS (MOBILE) */}
      <motion.div
        className="lg:hidden flex flex-col relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.div
          className="relative h-[50vh] min-h-[400px] w-full"
          variants={itemVariants}
        >
          <Image
            src={HeroImage}
            alt="Adibayu industrial operations"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>

        <motion.div
          className="flex flex-col px-6 py-12"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-black text-navy uppercase tracking-tight leading-[1.05]">
            {t.heroTitle}
          </h1>
          <div className="w-20 h-2 bg-navy mt-5 mb-6 rounded-full" />
          <p className="text-base text-gray-600 leading-relaxed font-medium">
            {t.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-8">
            {t.sectors.map((item, index) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 group"
                variants={itemVariants}
                transition={{ delay: index * 0.03 }}
              >
                <div className="h-12 w-12 rounded-full bg-navy/5 flex items-center justify-center text-navy font-black text-base">
                  {item.substring(0, 1)}
                </div>
                <span className="text-sm font-bold text-navy uppercase tracking-widest">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
