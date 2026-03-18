"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { whoWeAreCopy, whoWeAreLeadershipCards } from "./content";

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function WhoWeAreLeadershipSection({ locale }: Props) {
  const t = whoWeAreCopy[locale];

  return (
    // SECTION STATIS
    <section
      id="leadership"
      className="flex w-full flex-col bg-white py-20 md:py-24"
    >
      {/* KONTEN DINAMIS */}
      <motion.div
        className="mx-auto flex w-full flex-col px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-black tracking-tight text-navy md:text-5xl">
            {t.leadershipTitle}
          </h2>
          <p className="mt-5 text-base font-medium leading-relaxed text-gray-500 md:text-lg">
            {t.leadershipSubtitle}
          </p>
        </motion.div>

        {/* <motion.div
          className="grid grid-cols-1 items-start gap-8 md:grid-cols-3"
          variants={sectionVariants}
        >
          {whoWeAreLeadershipCards.map((item, index) => (
            <motion.article
              key={index}
              tabIndex={0}
              className="group relative flex w-full flex-col overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-navy/10 focus:outline-none cursor-default"
              variants={itemVariants}
            >
              <div className="relative w-full shrink-0 overflow-hidden bg-gray-100 aspect-[3/4] md:aspect-[4/5]">
                <Image
                  src={item.image}
                  alt={item.role[locale]}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0">
                  <h3 className="text-xl font-bold leading-tight tracking-tight text-white drop-shadow-md">
                    {item.role[locale]}
                  </h3>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md">
                    <ArrowRight className="h-5 w-5 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="grid grid-rows-[0fr] bg-[#e1ecef] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold leading-tight tracking-tight text-navy">
                      {item.role[locale]}
                    </h3>
                    <div className="mb-5 mt-5 h-1 w-10 bg-navy" />
                    <p className="text-base font-light leading-relaxed text-navy/90">
                      {item.bio[locale]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div> */}
      </motion.div>
    </section>
  );
}
