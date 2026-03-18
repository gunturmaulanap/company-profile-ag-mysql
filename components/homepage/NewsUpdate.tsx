"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import NewsCard from "@/components/news/NewsCard";
import type { Insight } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

type LatestInsightsProps = {
  locale?: Locale;
  insights: Insight[]; // <-- PERBAIKAN: Terima data langsung dari Server!
};

// Transisi Kelas Enterprise (Dipertahankan)
const desktopVariants = {
  sectionHeader: {
    hidden: { opacity: 0, y: 30, x: -12 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.12,
      },
    },
  },
  cardContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  },
  cardItem: {
    hidden: { opacity: 0, scale: 0.96, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  ctaButton: {
    hidden: { opacity: 0, scale: 0.97, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.5,
      },
    },
  },
};

const iosVariants = {
  sectionHeader: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.1,
      },
    },
  },
  cardContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  },
  cardItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  ctaButton: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      },
    },
  },
};

export default function LatestInsights({
  locale = "id",
  insights = [],
}: LatestInsightsProps) {
  const [isIOS, setIsIOS] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 || /iPhone|iPad|iPod/i.test(navigator.userAgent),
    );
  }, []);

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
        <div className="mb-10 md:mb-12 text-center">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
                margin: "0px 0px -50px 0px",
              }}
              variants={activeVariants.sectionHeader}
            >
              {t.title}
            </motion.h2>
            <motion.p
              className="mt-3 text-base md:text-lg leading-relaxed text-gray-900/80"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
                margin: "0px 0px -50px 0px",
              }}
              variants={activeVariants.subtitle}
            >
              {t.subtitle}
            </motion.p>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7"
          initial="hidden"
          animate={gridVisible ? "visible" : "hidden"}
          variants={activeVariants.cardContainer}
          onViewportEnter={() => setGridVisible(true)}
        >
          {/* MENGGUNAKAN DATA PROPS DARI SERVER */}
          {insights.map((item) => (
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
