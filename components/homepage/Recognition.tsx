"use client";

import { useState, useCallback, memo, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";
import adibayuLogo from "../assets/logos/adibayu-1.png";
import ipdba2018Image from "../assets/award/ipdba-2018.webp";
import ipdba2020Image from "../assets/award/ipdba-2020.webp";
import muriImage from "../assets/award/muri.webp";
import championImage from "../assets/award/champion.webp";
import excellenceImage from "../assets/award/excellence.webp";
import pertamaImage from "../assets/award/pertama.webp";
import type { StaticImageData } from "next/image";
import { useInteractionMode } from "@/components/hooks/useInteractionMode";

type RecognitionItem = {
  id: string;
  entity: string;
  title: string;
  year: string;
  awardImage: StaticImageData;
};

type RecognitionProps = {
  locale: Locale;
};

const AWARDS: RecognitionItem[] = [
  {
    id: "1",
    entity: "IPDBA",
    title: "Indonesia Perusahaan Digital Branding Award",
    year: "2018",
    awardImage: ipdba2018Image,
  },
  {
    id: "2",
    entity: "IPDBA",
    title: "Indonesia Perusahaan Digital Branding Award",
    year: "2020",
    awardImage: ipdba2020Image,
  },
  {
    id: "3",
    entity: "MURI",
    title: "Museum Rekor-Dunia Indonesia",
    year: "2023",
    awardImage: muriImage,
  },
  {
    id: "4",
    entity: "Champion",
    title: "Marketing Championship Award",
    year: "2023",
    awardImage: championImage,
  },
  {
    id: "5",
    entity: "Excellence",
    title: "Business Excellence Recognition",
    year: "2022",
    awardImage: excellenceImage,
  },
  {
    id: "6",
    entity: "Pertama",
    title: "Pioneer Innovation Award",
    year: "2021",
    awardImage: pertamaImage,
  },
];

const LEFT_COLUMN = AWARDS.slice(0, Math.ceil(AWARDS.length / 2));
const RIGHT_COLUMN = AWARDS.slice(Math.ceil(AWARDS.length / 2));

const variants = {
  sectionHeader: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  },
  column: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  },
  awardRow: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  },
  footer: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } },
  },
};

export default function Recognition({ locale }: RecognitionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [columnsVisible, setColumnsVisible] = useState(false);

  const { interactionMode, capabilities, isIOSSafari } = useInteractionMode();
  const t = copy[locale]?.home?.recognition ?? copy.en.home.recognition;
  const isHoverCapable = interactionMode === "hover-capable";
  const shouldUseLiteMotion = capabilities.coarse || isIOSSafari;

  const columnVariants = useMemo(
    () =>
      shouldUseLiteMotion
        ? {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0, delayChildren: 0 },
            },
          }
        : variants.column,
    [shouldUseLiteMotion],
  );

  const handleMouseEnter = useCallback(
    (id: string) => {
      if (!isHoverCapable) return;
      setHoveredId(id);
      setSelectedId(null);
    },
    [isHoverCapable],
  );

  const handleMouseLeave = useCallback(() => {
    if (!isHoverCapable) return;
    setHoveredId(null);
  }, [isHoverCapable]);

  const handleClick = useCallback(
    (id: string) => {
      if (isHoverCapable) return;
      setSelectedId((prev) => (prev === id ? null : id));
      setHoveredId(null);
    },
    [isHoverCapable],
  );

  return (
    <section
      ref={sectionRef}
      id="recognition"
      className="py-20 md:py-24 bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
            variants={variants.sectionHeader}
          >
            {t.title}
          </motion.h2>
          <motion.p
            className="mt-4 text-base md:text-lg leading-relaxed max-w-2xl text-gray-400"
            variants={variants.subtitle}
          >
            {t.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12">
          <motion.div
            className="space-y-0"
            initial="hidden"
            animate={columnsVisible ? "visible" : "hidden"}
            variants={columnVariants}
            onViewportEnter={() => setColumnsVisible(true)}
          >
            {LEFT_COLUMN.map((award) => (
              <AwardRow
                key={award.id}
                award={award}
                isActive={selectedId === award.id || hoveredId === award.id}
                onHoverStart={handleMouseEnter}
                onHoverEnd={handleMouseLeave}
                onClick={handleClick}
                logo={adibayuLogo}
                isHoverCapable={isHoverCapable}
                shouldUseLiteMotion={shouldUseLiteMotion}
                isIOSSafari={isIOSSafari}
              />
            ))}
          </motion.div>

          <motion.div
            className="space-y-0"
            initial="hidden"
            animate={columnsVisible ? "visible" : "hidden"}
            variants={columnVariants}
          >
            {RIGHT_COLUMN.map((award) => (
              <AwardRow
                key={award.id}
                award={award}
                isActive={selectedId === award.id || hoveredId === award.id}
                onHoverStart={handleMouseEnter}
                onHoverEnd={handleMouseLeave}
                onClick={handleClick}
                logo={adibayuLogo}
                isHoverCapable={isHoverCapable}
                shouldUseLiteMotion={shouldUseLiteMotion}
                isIOSSafari={isIOSSafari}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type AwardRowProps = {
  award: RecognitionItem;
  isActive: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onClick: (id: string) => void;
  logo: StaticImageData;
  isHoverCapable: boolean;
  shouldUseLiteMotion: boolean;
  isIOSSafari: boolean;
};

const AwardRow = memo(function AwardRow({
  award,
  isActive,
  onHoverStart,
  onHoverEnd,
  onClick,
  logo,
  isHoverCapable,
  shouldUseLiteMotion,
  isIOSSafari,
}: AwardRowProps) {
  return (
    <motion.div
      className="relative border-b border-gray-200 cursor-pointer"
      variants={variants.awardRow}
      onMouseEnter={() => onHoverStart(award.id)}
      onMouseLeave={onHoverEnd}
      onClick={() => onClick(award.id)}
    >
      <div className="relative py-5 md:py-6">
        <div
          className={`pointer-events-none absolute left-0 top-1 md:top-1/2 md:-translate-y-1/2 transition-opacity duration-150 ${isActive && isHoverCapable ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-[56px] md:w-[64px] flex items-start justify-start">
            <Image
              src={logo}
              alt="Adibayu logo"
              width={64}
              height={24}
              sizes="64px"
              className="mt-0.5 h-auto w-[56px] md:mt-0 md:w-[64px] object-contain"
            />
          </div>
        </div>

        <div
          className={`transition-transform ease-out ${shouldUseLiteMotion ? "duration-150" : "duration-300"}`}
          style={{
            transform: `translateX(${isActive && isHoverCapable ? 96 : 0}px)`,
          }}
        >
          <div className="flex items-start">
            <div
              className={`overflow-hidden transition-[max-width,opacity,margin] duration-150 ease-out ${isActive && !isHoverCapable ? "mr-3 max-w-[56px] opacity-100" : "mr-0 max-w-0 opacity-0"}`}
            >
              <Image
                src={logo}
                alt="Adibayu logo"
                width={56}
                height={20}
                sizes="56px"
                className="h-auto w-[56px] flex-none object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 transition-opacity duration-200">
                  {award.entity}
                </p>
                <h3 className="text-base md:text-lg font-medium leading-snug text-gray-900">
                  {award.title}
                </h3>
                <span className="text-xs md:text-sm sm:ml-auto text-gray-500">
                  {award.year}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`transition-opacity duration-200 ease-out ${isHoverCapable ? "pointer-events-none absolute right-0 top-1/2 z-10" : "mt-4 overflow-hidden"} ${isHoverCapable ? (isActive ? "opacity-100" : "opacity-0") : isActive ? "h-[140px] opacity-100" : "h-0 opacity-0"}`}
          style={
            isHoverCapable
              ? {
                  transform: "translateY(-50%) translateX(1rem) translateZ(0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }
              : undefined
          }
        >
          <div
            className={
              isHoverCapable
                ? "flex h-[140px] w-[100px] items-center justify-center"
                : "flex justify-center bg-gray-50 rounded-lg"
            }
          >
            {isActive && (
              // PENGGUNAAN NATIVE LAZY LOAD (Sangat Aman Untuk iOS VRAM)
              <Image
                src={award.awardImage}
                alt={`${award.title} Award`}
                width={100}
                height={140}
                sizes="100px"
                quality={60}
                loading="lazy"
                decoding="async"
                className="object-contain py-2"
                style={{ maxHeight: "140px", width: "auto" }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
