"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MenuOverlayPage from "@/components/MenuOverlay";
import Footer from "@/components/Footer";
import NewsCard from "@/components/news/NewsCard";
import { useLocale } from "@/lib/i18n";
import type { Insight } from "@/lib/content";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type NewsDetailPageClientProps = {
  insight: Insight;
  related: Insight[];
};

// Transisi Kelas Enterprise
const containerVariants = {
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

export default function NewsDetailPageClient({
  insight,
  related,
}: NewsDetailPageClientProps) {
  const { locale } = useLocale();
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  return (
    <main className="min-h-screen bg-white text-navy">
      <MenuOverlayPage />

      {/* ARTIKEL UTAMA */}
      <motion.article
        className="mx-auto max-w-[1000px] px-6 md:px-12 pt-6 md:pt-12 pb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mb-6"
        >
          <span className="inline-flex border border-gray-200 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-navy bg-gray-50">
            {insight.category}
          </span>
          <time className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            {insight.date}
          </time>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.05] mb-12"
        >
          {insight.title}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="relative h-[300px] md:h-[500px] w-full overflow-hidden bg-gray-100 mb-16"
        >
          <Image
            src={insight.coverImageUrl}
            alt={insight.title}
            fill
            quality={isIOS ? 30 : 75}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1000px"
            priority
          />
        </motion.div>

        <motion.div variants={itemVariants} className="prose max-w-none">
          {insight.content.split("\n\n").map((paragraph, index) => (
            <p
              key={`${insight.id}-${index}`}
              className="text-lg text-gray-700 leading-relaxed font-light mb-6"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </motion.article>

      {/* ARTIKEL TERKAIT (RELATED NEWS) */}
      <section className="bg-[#e1ecef] py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-[1400px] px-6 md:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="flex items-end justify-between border-b-2 border-navy/10 pb-6 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-navy">
              {locale === "id" ? "Berita Terkait" : "Related News"}
            </h2>
            <Link
              href="/news"
              className="hidden md:inline-block text-sm font-bold uppercase tracking-widest text-navy hover:text-blue-600 transition-colors"
            >
              {locale === "id" ? "Lihat Semua" : "View All"}
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {related.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <NewsCard insight={item} />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex justify-center md:hidden"
          >
            <Link
              href="/news"
              className="text-sm font-bold uppercase tracking-widest text-navy border border-navy px-6 py-3 hover:bg-navy hover:text-white transition-colors"
            >
              {locale === "id" ? "Lihat Semua" : "View All"}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
