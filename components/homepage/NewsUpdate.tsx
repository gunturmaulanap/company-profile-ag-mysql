"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import NewsCard from "@/components/news/NewsCard";
import type { Insight } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type LatestInsightsProps = { locale?: Locale };

let latestInsightsCache: Insight[] | null = null;
let latestInsightsCacheAt = 0;
const LATEST_INSIGHTS_CACHE_TTL = 1000 * 60 * 3;

const desktopVariants = {
  sectionHeader: {
    hidden: { opacity: 0, y: 35, x: -20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { type: "spring", stiffness: 90, damping: 20 },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 85, damping: 18, delay: 0.12 },
    },
  },
  cardContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.25 },
    },
  },
  cardItem: {
    hidden: { opacity: 0, scale: 0.92, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 18 },
    },
  },
  ctaButton: {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 180, damping: 20, delay: 0.7 },
    },
  },
};

const iosVariants = {
  sectionHeader: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.1 },
    },
  },
  cardContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  },
  cardItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  ctaButton: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
    },
  },
};

export default function LatestInsights({ locale = "id" }: LatestInsightsProps) {
  const [isIOS, setIsIOS] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const router = useRouter();

  const [latest, setLatest] = useState<Insight[]>([]);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 || /iPhone|iPad|iPod/i.test(navigator.userAgent),
    );
    const now = Date.now();
    if (
      latestInsightsCache &&
      now - latestInsightsCacheAt < LATEST_INSIGHTS_CACHE_TTL
    )
      return;

    let isMounted = true;
    const loadLatest = async () => {
      try {
        const response = await fetch("/api/news?limit=3", {
          cache: "no-store",
        });
        if (!response.ok) return;
        const payload = (await response.json()) as { items?: Insight[] };
        if (isMounted && Array.isArray(payload.items)) {
          setLatest(payload.items);
          latestInsightsCache = payload.items;
          latestInsightsCacheAt = Date.now();
        }
      } catch {}
    };

    void loadLatest();
    return () => {
      isMounted = false;
    };
  }, []);

  // FUNGSI NAVIGASI AMAN
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (typeof document !== "undefined")
      document.body.style.pointerEvents = "none";
    window.dispatchEvent(new Event("adb-route-start"));

    setTimeout(() => {
      router.push(href);
      setTimeout(() => {
        if (typeof document !== "undefined")
          document.body.style.pointerEvents = "auto";
      }, 1500);
    }, 400);
  };

  const t = copy[locale]?.home?.insights ?? copy.en.home.insights;
  const activeVariants = isIOS ? iosVariants : desktopVariants;

  return (
    <section
      id="news-updates"
      className="py-20 md:py-24 overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: "var(--color-home-light)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          className="mb-10 md:mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
        >
          <div className="mx-auto max-w-3xl">
            <motion.h2
              className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900"
              variants={activeVariants.sectionHeader}
            >
              {t.title}
            </motion.h2>
            <motion.p
              className="mt-3 text-base md:text-lg leading-relaxed text-gray-900/80"
              variants={activeVariants.subtitle}
            >
              {t.subtitle}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7"
          initial="hidden"
          animate={gridVisible ? "visible" : "hidden"}
          variants={activeVariants.cardContainer}
          onViewportEnter={() => setGridVisible(true)}
        >
          {latest.map((item) => (
            <motion.div
              key={item.id}
              className="overflow-hidden"
              variants={activeVariants.cardItem}
            >
              <NewsCard insight={item} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 md:mt-10 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={activeVariants.ctaButton}
        >
          <a
            href="/news"
            onClick={(e) => handleNavigation(e, "/news")}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium transition-colors text-gray-900 hover:text-gray-900/80 cursor-pointer"
            style={{ transition: "transform 0.2s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {t.viewAll}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
