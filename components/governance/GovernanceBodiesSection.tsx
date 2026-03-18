"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, ChevronRight, Handshake } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import profileSecretary from "../assets/governance/profile-secretary.jpg";
import profileAudit from "../assets/governance/profile-audit.jpg";
import {
  governanceBodies,
  governanceCopy,
  type GovernanceBodyTab,
} from "./content";

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

export default function GovernanceBodiesSection({ locale }: Props) {
  const t = governanceCopy[locale];
  const [activeBodyTab, setActiveBodyTab] =
    useState<GovernanceBodyTab>("audit");
  const active = governanceBodies[activeBodyTab];
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
    <section className="bg-white px-6 py-24 md:px-10 lg:px-16">
      {/* KONTEN DINAMIS */}
      <motion.div
        className="mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
          <motion.div
            className="w-full lg:sticky lg:top-32 lg:w-1/3"
            variants={itemVariants}
          >
            <h2 className="mb-8 text-3xl font-extrabold uppercase tracking-tight text-[#011f37] md:text-5xl">
              {t.bodiesTitle}
            </h2>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveBodyTab("audit")}
                className={`flex items-center justify-between rounded-none border border-[#011f37] px-6 py-5 text-left font-bold uppercase tracking-wider transition-all ${
                  activeBodyTab === "audit"
                    ? "bg-[#011f37] text-[#e1ecef]"
                    : "bg-transparent text-[#011f37] hover:bg-[#e1ecef]"
                }`}
              >
                {t.auditTab}
                <ChevronRight
                  className={`h-5 w-5 ${activeBodyTab === "audit" ? "opacity-100" : "opacity-0"}`}
                />
              </button>
              <button
                onClick={() => setActiveBodyTab("secretary")}
                className={`flex items-center justify-between rounded-none border border-[#011f37] px-6 py-5 text-left font-bold uppercase tracking-wider transition-all ${
                  activeBodyTab === "secretary"
                    ? "bg-[#011f37] text-[#e1ecef]"
                    : "bg-transparent text-[#011f37] hover:bg-[#e1ecef]"
                }`}
              >
                {t.secretaryTab}
                <ChevronRight
                  className={`h-5 w-5 ${activeBodyTab === "secretary" ? "opacity-100" : "opacity-0"}`}
                />
              </button>
            </div>
          </motion.div>

          <motion.div className="w-full lg:w-2/3" variants={itemVariants}>
            <motion.div
              key={activeBodyTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end">
                <div className="relative h-48 w-48 shrink-0 bg-[#011f37]">
                  <Image
                    src={
                      activeBodyTab === "audit"
                        ? profileAudit
                        : profileSecretary
                    }
                    alt={active.role[locale]}
                    fill
                    quality={isIOS ? 20 : 75}
                    className={`object-cover grayscale contrast-125 opacity-80 ${isIOS ? "" : "mix-blend-luminosity"}`}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold uppercase text-[#011f37]">
                    {active.name[locale]}
                  </h3>
                  <p className="mt-2 text-lg font-semibold uppercase tracking-widest text-[#011f37]/60">
                    {active.role[locale]}
                  </p>
                  {"email" in active ? (
                    <p className="mt-2 text-sm text-[#011f37]/80">
                      {active.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="border-t-2 border-[#011f37] pt-8">
                <p className="mb-6 text-lg leading-relaxed text-[#011f37]/80">
                  {active.bio[locale]}
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {active.points[locale].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 bg-[#e1ecef] p-4"
                    >
                      {activeBodyTab === "audit" ? (
                        <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#011f37]" />
                      ) : (
                        <Handshake className="mt-0.5 h-5 w-5 shrink-0 text-[#011f37]" />
                      )}
                      <span className="text-sm font-semibold text-[#011f37]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
