"use client";

import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import type { Insight } from "@/lib/content";
import { useEffect, useState } from "react";

type NewsCardProps = {
  insight: Insight;
};

export default function NewsCard({ insight }: NewsCardProps) {
  const router = useRouter();
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
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

  return (
    <article className="group h-full border border-gray-200 bg-white transition-all duration-500 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] hover:-translate-y-1.5 hover:border-navy hover:shadow-xl overflow-hidden cursor-pointer">
      <a
        href={`/news/${insight.slug}`}
        onClick={(e) => handleNavigation(e, `/news/${insight.slug}`)}
        className="block h-full"
      >
        <div className="relative h-64 md:h-[22rem] w-full overflow-hidden bg-gray-100">
          <Image
            src={insight.coverImageUrl}
            alt={insight.title}
            fill
            quality={isIOS ? 20 : 75}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="flex flex-col justify-between p-6 md:p-8 min-h-[240px]">
          <div>
            <div className="flex items-center justify-between gap-4 mb-5">
              <span className="inline-flex border border-gray-200 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                {insight.category}
              </span>
              <time className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                {insight.date}
              </time>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-snug text-navy transition-colors duration-300">
              {insight.title}
            </h3>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 transition-colors duration-300 group-hover:text-blue-600">
            <span>Read Article</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}
