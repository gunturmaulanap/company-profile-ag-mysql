"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import orgBgImage from "../assets/governance/org-bg.jpg";
import { governanceCopy, governanceOrgExecutives } from "./content";

type Props = {
  locale: Locale;
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function GovernanceOrgStructureSection({ locale }: Props) {
  const t = governanceCopy[locale];
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  return (
    // SECTION STATIS
    <section
      id="org-structure"
      className="relative bg-[#011f37] py-24 text-[#e1ecef]"
    >
      {/* BACKGROUND IMAGE STATIS */}
      <div
        className={`absolute inset-0 z-0 opacity-20 ${isIOS ? "" : "mix-blend-overlay"}`}
      >
        <Image
          src={orgBgImage}
          alt="Architecture"
          fill
          quality={isIOS ? 20 : 75}
          className="object-cover grayscale"
          loading="lazy"
        />
      </div>

      {/* KONTEN DINAMIS */}
      <motion.div
        className="relative z-10 mx-auto w-full px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-sm font-bold uppercase tracking-[0.3em] text-[#e1ecef]/60"
          variants={itemVariants}
        >
          {t.orgEyebrow}
        </motion.h2>
        <motion.h3
          className="mt-4 text-3xl font-extrabold uppercase tracking-tight md:text-5xl"
          variants={itemVariants}
        >
          {t.orgTitle}
        </motion.h3>

        <div className="mt-16 flex flex-col items-center">
          <motion.div variants={itemVariants}>
            <div className="min-w-[280px] border border-[#e1ecef] bg-[#e1ecef] px-6 py-4 text-[#011f37] shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#011f37]/70">
                {t.orgBoardRole}
              </p>
              <div className="my-2 h-px w-full bg-[#011f37]/30" />
              <p className="text-lg font-bold uppercase tracking-wider">
                {t.orgBoardName}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="h-10 w-0.5 bg-[#e1ecef]"
            variants={itemVariants}
          />

          <motion.div variants={itemVariants}>
            <div className="min-w-[280px] border border-[#e1ecef] bg-[#011f37] px-6 py-4 text-[#e1ecef] shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e1ecef]/70">
                {t.orgCeoRole}
              </p>
              <div className="my-2 h-px w-full bg-[#e1ecef]/30" />
              <p className="text-lg font-bold uppercase tracking-wider">
                {t.orgCeoName}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="h-10 w-0.5 bg-[#e1ecef]"
            variants={itemVariants}
          />

          <div className="mt-2 w-full max-w-[1080px]">
            <motion.div
              className="mx-auto hidden w-[74%] justify-between border-t-2 border-[#e1ecef] md:flex"
              variants={itemVariants}
            >
              <div className="h-8 w-0.5 bg-[#e1ecef]" />
              <div className="h-8 w-0.5 bg-[#e1ecef]" />
            </motion.div>

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {governanceOrgExecutives.map((exec) => (
                <motion.div
                  key={exec.id}
                  className="group"
                  variants={itemVariants}
                >
                  <div className="mx-auto h-8 w-0.5 bg-[#e1ecef] md:hidden" />

                  <div className="rounded-none border border-[#e1ecef]/70 bg-[#011f37]/80 p-4 transition-all duration-300 group-hover:border-[#e1ecef] group-hover:bg-[#022845] group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.25)]">
                    <div className="border border-[#e1ecef] bg-[#e1ecef] px-4 py-3 text-[#011f37] transition-colors duration-300 group-hover:bg-white">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#011f37]/70">
                        {exec.role[locale]}
                      </p>
                      <div className="my-2 h-px w-full bg-[#011f37]/30" />
                      <p className="text-base font-bold uppercase tracking-wide">
                        {exec.name[locale]}
                      </p>
                    </div>

                    <div className="mx-auto h-6 w-0.5 bg-[#e1ecef]" />

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                      {exec.departments.map((dept) => (
                        <div
                          key={dept.id}
                          className="group/dept border border-[#e1ecef]/80 bg-transparent px-4 py-4 text-center transition-all duration-300 hover:bg-[#e1ecef] hover:shadow-sm"
                        >
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e1ecef]/70 transition-colors duration-300 group-hover/dept:text-[#011f37]/70">
                            {dept.role[locale]}
                          </p>
                          <div className="my-2 h-px w-full bg-[#e1ecef]/25 transition-colors duration-300 group-hover/dept:bg-[#011f37]/25" />
                          <p className="text-sm font-bold uppercase tracking-wide text-[#e1ecef] transition-colors duration-300 group-hover/dept:text-[#011f37]">
                            {dept.name[locale]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
