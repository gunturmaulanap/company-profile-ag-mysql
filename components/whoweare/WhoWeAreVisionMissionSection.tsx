"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import vision1 from "../assets/who-we-are/vision-mision/meet-1.webp";
import vision2 from "../assets/who-we-are/vision-mision/meet-4.webp";
import mission1 from "../assets/who-we-are/vision-mision/meet-13.webp";
import mission2 from "../assets/who-we-are/vision-mision/meet-14.webp";
import { whoWeAreCopy } from "./content";

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

export default function WhoWeAreVisionMissionSection({ locale }: Props) {
  const t = whoWeAreCopy[locale];
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 || /iPhone|iPad|iPod/i.test(navigator.userAgent),
    );
  }, []);

  return (
    // SECTION STATIS
    <section
      id="vision"
      className="relative flex w-full flex-col overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="absolute left-0 top-0 -z-10 h-full w-1/3 bg-[#e1ecef]/40" />

      {/* KONTEN DINAMIS */}
      <motion.div
        className="mx-auto flex w-full max-w-[1400px] flex-col gap-32 px-6 md:px-12 z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.div
          className="relative flex flex-col items-center lg:flex-row lg:items-stretch"
          variants={itemVariants}
        >
          <motion.div
            className="relative min-h-[400px] w-full shrink-0 bg-gray-100 aspect-[4/3] lg:min-h-[600px] lg:w-3/5 lg:aspect-auto"
            variants={itemVariants}
          >
            <Image
              src={vision1}
              alt="Adibayu Vision"
              fill
              quality={isIOS ? 20 : 75}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              loading="lazy"
            />
            <motion.div
              className="absolute bottom-0 right-0 hidden w-[45%] overflow-hidden border-l-[12px] border-t-[12px] border-white bg-gray-200 aspect-square md:block"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98],
                delay: 0.2,
              }}
            >
              <Image
                src={vision2}
                alt="Adibayu Vision Detail"
                fill
                quality={isIOS ? 20 : 75}
                className="object-cover"
                sizes="(max-width: 1024px) 45vw, 30vw"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative z-10 -mt-16 w-[90%] self-center border border-gray-100/50 bg-white p-8 shadow-2xl lg:-ml-32 lg:mt-16 lg:w-1/2 md:p-14"
            variants={itemVariants}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-navy" />
              <span className="text-sm font-bold uppercase tracking-[0.25em] text-navy/70">
                {t.visionTitle}
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-black uppercase leading-[1.1] tracking-tight text-navy md:text-5xl">
              {t.visionBody}
            </h2>
            <p className="text-base font-medium leading-relaxed text-gray-600 md:text-lg">
              {t.visionSupporting}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative flex flex-col-reverse items-center lg:flex-row lg:items-stretch"
          variants={itemVariants}
        >
          <motion.div
            className="relative z-10 -mt-16 w-[90%] self-center bg-navy p-8 shadow-2xl lg:-mr-32 lg:mt-16 lg:w-1/2 md:p-14"
            variants={itemVariants}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-emerald-400" />
              <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#e1ecef]/70">
                {t.missionTitle}
              </span>
            </div>
            <h2 className="mb-10 text-3xl font-black uppercase leading-[1.1] tracking-tight text-white md:text-5xl">
              {t.missionHeadline}
            </h2>
            <motion.div
              className="flex flex-col gap-5"
              variants={sectionVariants}
            >
              {t.missionPoints.map((point) => (
                <motion.div
                  key={point}
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-none bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]" />
                  <p className="text-base font-light leading-relaxed text-[#e1ecef] md:text-lg">
                    {point}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative min-h-[400px] w-full shrink-0 bg-gray-100 aspect-[4/3] lg:min-h-[600px] lg:w-3/5 lg:aspect-auto"
            variants={itemVariants}
          >
            <Image
              src={mission1}
              alt="Adibayu Mission"
              fill
              quality={isIOS ? 20 : 75}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              loading="lazy"
            />
            <motion.div
              className="absolute left-0 top-0 hidden w-[45%] overflow-hidden border-b-[12px] border-r-[12px] border-white bg-gray-200 aspect-square md:block"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98],
                delay: 0.2,
              }}
            >
              <Image
                src={mission2}
                alt="Adibayu Mission Detail"
                fill
                quality={isIOS ? 20 : 75}
                className="object-cover"
                sizes="(max-width: 1024px) 45vw, 30vw"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
