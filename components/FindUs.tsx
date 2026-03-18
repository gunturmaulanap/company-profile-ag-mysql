"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type FindUsProps = {
  isDarkMode?: boolean;
  locale?: Locale;
};

const findUsVariants = {
  sectionHeader: {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 20,
        mass: 1,
      },
    },
  },
  subtitle: {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 19,
        mass: 0.95,
        delay: 0.1,
      },
    },
  },
  leftMap: {
    hidden: {
      opacity: 0,
      scale: 1.05,
      y: 28,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 78,
        damping: 20,
        mass: 1,
        delay: 0.2,
      },
    },
  },
} as const;

export default function FindUs({ locale = "id" }: FindUsProps) {
  const t = copy[locale]?.home?.findUs ?? copy.en.home.findUs;

  const mapEmbedPrimaryUrl =
    "https://maps.google.com/maps?q=Adibayu%20Group%20Holding%20Company%2C%20Jl.%20Letjen%20M.T.%20Haryono%20No.Kav.%2016%2C%20RT.11/RW.5%2C%20Tebet%20Bar.%2C%20Kec.%20Tebet%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012810&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const mapEmbedFallbackUrl =
    "https://www.google.com/maps?q=Adibayu%20Group%20Holding%20Company%2C%20Jl.%20Letjen%20M.T.%20Haryono%20No.Kav.%2016%2C%20RT.11/RW.5%2C%20Tebet%20Bar.%2C%20Kec.%20Tebet%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012810&output=embed";

  const [mapSrc, setMapSrc] = useState(mapEmbedPrimaryUrl);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapsUrl =
    "https://maps.google.com/?q=Adibayu%20Group%20Holding%20Company%2C%20Jl.%20Letjen%20M.T.%20Haryono%20No.Kav.%2016%2C%20RT.11/RW.5%2C%20Tebet%20Bar.%2C%20Kec.%20Tebet%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012810";

  return (
    <section
      id="find-us"
      className="text-navy py-6 md:py-12 transition-colors duration-300"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-black"
            variants={findUsVariants.sectionHeader}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg text-black/80"
            variants={findUsVariants.subtitle}
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
        >
          <motion.div variants={findUsVariants.leftMap}>
            <motion.div
              className="relative mx-auto h-[290px] w-full max-w-[1040px] overflow-hidden  sm:h-[340px] md:h-[390px]  lg:h-[420px]"
              whileHover={{
                transition: {
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                },
              }}
            >
              {!mapLoaded ? (
                <div className="absolute inset-0 z-[3] flex items-center justify-center bg-black/10 text-sm text-white/90">
                  {locale === "id" ? "Memuat peta..." : "Loading map..."}
                </div>
              ) : null}

              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Adibayu Group Location"
                className="w-full h-full"
                onLoad={() => setMapLoaded(true)}
                onError={() => {
                  if (mapSrc !== mapEmbedFallbackUrl) {
                    setMapSrc(mapEmbedFallbackUrl);
                    setMapLoaded(false);
                  }
                }}
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-black/70 via-black/45 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 z-[4] flex flex-col gap-3 px-4 pb-4 pt-8 sm:flex-row sm:items-end sm:justify-between md:px-6 md:pb-5">
                <p className="not-italic text-white/95 text-[11px] leading-[1.4] font-medium max-w-[25ch] drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] md:text-[14px] md:leading-[1.35] md:font-semibold md:max-w-[28ch]">
                  Adibayu Group Holding Company
                  <br />
                  Jl. Letjen M.T. Haryono No.Kav. 16
                </p>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1e6ce8] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#1a60cf] md:h-12 md:px-6 md:text-[14px] md:font-semibold"
                >
                  <MapPin className="h-4 w-4 md:h-4 md:w-4" />
                  {t.openMaps}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
