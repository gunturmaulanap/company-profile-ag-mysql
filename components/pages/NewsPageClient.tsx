"use client";

import MenuOverlayPage from "@/components/MenuOverlay";
import Footer from "@/components/Footer";
import NewsFilter from "@/components/news/NewsFilter";
import { useLocale } from "@/lib/i18n";
import type { Insight } from "@/lib/content";
import { motion } from "framer-motion";

type NewsPageClientProps = {
  insights: Insight[];
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function NewsPageClient({ insights }: NewsPageClientProps) {
  const { locale } = useLocale();

  const title = locale === "id" ? "Berita & Pembaruan" : "News & Updates";
  const subtitle =
    locale === "id"
      ? "Perkembangan terbaru dan pembaruan strategis dari ekosistem kami."
      : "Latest developments and strategic updates from our ecosystem.";

  return (
    // Background statis agar tidak ada kedipan
    <main className="min-h-screen bg-white text-navy">
      <MenuOverlayPage />

      <section className="mx-auto max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24">
        <motion.div
          className="mb-14 md:mb-20 border-l-4 border-navy pl-6"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-navy mb-4">
            {title}
          </h1>
          <p className="text-base md:text-lg font-medium text-gray-600 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </motion.div>

        {/* Filter & Grid */}
        <NewsFilter insights={insights} />
      </section>

      <Footer locale={locale} />
    </main>
  );
}
