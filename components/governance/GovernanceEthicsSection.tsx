"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Eye, Scale, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import bentoImage from "../assets/governance/bento-bg.jpg";
import { governanceCopy, governanceEthicsCards } from "./content";

type Props = {
  locale: Locale;
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function GovernanceEthicsSection({ locale }: Props) {
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
    <section className="bg-[#e1ecef] px-6 py-24 md:px-10 lg:px-16">
      {/* KONTEN DINAMIS */}
      <motion.div
        className="mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.div
          className="mb-12 flex flex-col justify-between border-b-2 border-[#011f37] pb-6 md:flex-row md:items-end"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#011f37] md:text-5xl">
            {t.ethicsTitle.split("&")[0].trim()} &
            <br />
            {t.ethicsTitle.split("&")[1]?.trim() ?? ""}
          </h2>
          <p className="mt-6 max-w-md text-base text-[#011f37]/80 md:mt-0 md:text-right">
            {t.ethicsBody}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px bg-[#011f37] md:grid-cols-3 md:grid-rows-2">
          <motion.div
            className="bg-white p-10 transition-colors hover:bg-[#bbcace]"
            variants={itemVariants}
          >
            <ShieldCheck className="mb-6 h-10 w-10 text-[#011f37]" />
            <h4 className="mb-3 text-xl font-bold uppercase text-[#011f37]">
              {governanceEthicsCards.integrity.title[locale]}
            </h4>
            <p className="text-sm leading-relaxed text-[#011f37]/80">
              {governanceEthicsCards.integrity.body[locale]}
            </p>
          </motion.div>

          <motion.div
            className="relative overflow-hidden bg-[#011f37] p-10 md:col-span-2"
            variants={itemVariants}
          >
            <Image
              src={bentoImage}
              alt="Corporate Compliance"
              fill
              quality={isIOS ? 20 : 75}
              className={`object-cover opacity-40 grayscale ${isIOS ? "" : "mix-blend-luminosity"}`}
              loading="lazy"
            />
            <div className="relative z-10 flex h-full flex-col justify-end">
              <Scale className="mb-6 h-10 w-10 text-[#e1ecef]" />
              <h4 className="mb-3 text-2xl font-bold uppercase text-[#e1ecef]">
                {governanceEthicsCards.conflict.title[locale]}
              </h4>
              <p className="max-w-md text-sm leading-relaxed text-[#e1ecef]/80">
                {governanceEthicsCards.conflict.body[locale]}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-[#011f37] p-10 text-[#e1ecef] transition-colors hover:bg-black"
            variants={itemVariants}
          >
            <Eye className="mb-6 h-10 w-10 text-[#e1ecef]" />
            <h4 className="mb-3 text-xl font-bold uppercase">
              {governanceEthicsCards.protection.title[locale]}
            </h4>
            <p className="max-w-md text-sm leading-relaxed text-[#e1ecef]/70">
              {governanceEthicsCards.protection.body[locale]}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-start justify-between bg-blue-700 p-10 text-[#e1ecef]"
            variants={itemVariants}
          >
            <div>
              <h4 className="mb-2 text-2xl font-bold uppercase">
                Dokumen Resmi
              </h4>
              <p className="text-sm text-white/80">Code of Conduct (PDF)</p>
            </div>
            <a
              href="#"
              className="mt-8 flex w-full items-center justify-between border-2 border-[#e1ecef] px-6 py-4 font-bold uppercase transition-colors hover:bg-[#e1ecef] hover:text-[#011f37]"
            >
              {t.downloadLabel}
              <Download className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
