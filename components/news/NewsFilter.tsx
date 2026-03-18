"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import type { Insight } from "@/lib/content";
import NewsCard from "@/components/news/NewsCard";

type NewsFilterProps = {
  insights: Insight[];
  locale?: string; // <--- Tambahkan baris ini
};

// Transisi Halus Kelas Enterprise
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export default function NewsFilter({ insights }: NewsFilterProps) {
  const [category, setCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = [
    "Corporate Strategy",
    "Operations",
    "Market",
    "Sustainability",
  ] as const;

  const selectedCategoryLabel = category || "All Categories";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredInsights = insights.filter((insight) => {
    const matchesCategory = category ? insight.category === category : true;
    const matchesSearch = insight.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* FILTER & SEARCH BAR */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-4 mb-10 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.21, 0.47, 0.32, 0.98],
          delay: 0.2,
        }}
      >
        <div className="relative w-full md:w-64 z-20" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-navy hover:border-navy transition-colors"
          >
            <span className="truncate">{selectedCategoryLabel}</span>
            <ChevronDown
              className={`h-4 w-4 text-navy transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 shadow-xl z-50 py-1">
              <button
                onClick={() => {
                  setCategory("");
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>All Categories</span>
                {category === "" && <Check className="h-4 w-4 text-navy" />}
              </button>
              {categories.map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    setCategory(item);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${index === 0 ? "border-t border-gray-100" : ""}`}
                >
                  <span>{item}</span>
                  {category === item && <Check className="h-4 w-4 text-navy" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="search"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-navy outline-none placeholder:text-gray-400 focus:border-navy transition-colors"
        />
      </motion.div>

      {/* GRID KARTU BERITA */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={category + searchQuery} // Memicu ulang animasi saat filter berubah
      >
        {filteredInsights.map((item) => (
          <motion.div key={item.id} variants={cardVariants}>
            <NewsCard insight={item} />
          </motion.div>
        ))}
      </motion.div>

      {/* KONDISI KOSONG */}
      {filteredInsights.length === 0 && (
        <motion.div
          className="text-center py-20 border border-dashed border-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500 text-lg mb-4 font-light">
            No news found matching your criteria.
          </p>
          <button
            onClick={() => {
              setCategory("");
              setSearchQuery("");
            }}
            className="text-sm font-bold uppercase tracking-widest text-navy hover:text-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
