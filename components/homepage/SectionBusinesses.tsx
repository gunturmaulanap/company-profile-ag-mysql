"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Factory, Truck, Store, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import {
  ensureGsapPlugins,
  gsap,
  refreshScrollTriggerSafe,
} from "@/lib/gsapClient";
import { safeFromTo } from "@/lib/safeGsap";

const businesses = {
  en: {
    eyebrow: "Our Businesses",
    title: "Driving growth",
    titleNext: "across strategic industries",
    cards: [
      {
        title: "Manufacturing",
        description:
          "State-of-the-art production facilities ensuring high-quality output and sustainable practices across all our industrial operations.",
        icon: Factory,
      },
      {
        title: "Distribution",
        description:
          "A robust logistics network delivering our products efficiently and reliably to partners and customers nationwide.",
        icon: Truck,
      },
      {
        title: "Retail",
        description:
          "Modern retail spaces designed to provide exceptional customer experiences and showcase our premium product lines.",
        icon: Store,
      },
    ],
    explore: "Explore",
  },
  id: {
    eyebrow: "Bisnis Kami",
    title: "Mendorong pertumbuhan",
    titleNext: "di berbagai industri strategis",
    cards: [
      {
        title: "Manufaktur",
        description:
          "Fasilitas produksi modern untuk memastikan hasil berkualitas tinggi dengan praktik operasional berkelanjutan.",
        icon: Factory,
      },
      {
        title: "Distribusi",
        description:
          "Jaringan logistik yang kuat untuk menyalurkan produk secara efisien dan andal ke mitra serta pelanggan.",
        icon: Truck,
      },
      {
        title: "Ritel",
        description:
          "Ruang ritel modern yang dirancang untuk menghadirkan pengalaman pelanggan terbaik dan menampilkan lini produk unggulan.",
        icon: Store,
      },
    ],
    explore: "Jelajahi",
  },
} as const;

type SectionBusinessesProps = { locale?: Locale };

export default function SectionBusinesses({
  locale = "id",
}: SectionBusinessesProps) {
  const content = businesses[locale];
  const scopeRef = useRef<HTMLElement>(null);

  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  useLayoutEffect(() => {
    // PERBAIKAN: Matikan GSAP khusus di iOS untuk menyelamatkan CPU
    if (!scopeRef.current || isIOS) return;

    ensureGsapPlugins();
    const ctx = gsap.context((self) => {
      const q = self.selector;
      if (!q) return;

      const title = q(".js-businesses-title");
      const cards = q(".js-businesses-card");

      safeFromTo(
        title,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: scopeRef.current, start: "top 70%" },
        },
      );
      safeFromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: scopeRef.current, start: "top 50%" },
        },
      );
    }, scopeRef);

    refreshScrollTriggerSafe();
    return () => ctx.revert();
  }, [isIOS]);

  return (
    <section
      id="businesses"
      ref={scopeRef}
      className="w-full min-h-screen home-bg-soft py-32"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 lg:px-32">
        <div className="mb-20">
          <p className="text-xs uppercase tracking-widest font-semibold text-navy/50 mb-4">
            {content.eyebrow}
          </p>
          <h2 className="js-businesses-title text-5xl md:text-7xl font-thin leading-[1.1] text-navy">
            {content.title} <br />
            {content.titleNext}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.cards.map((biz) => {
            const Icon = biz.icon;
            return (
              <div
                key={biz.title}
                className="js-businesses-card group bg-white p-10 flex flex-col justify-between h-[400px] border border-black/5 hover:border-blue-500/30 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center text-navy mb-8 group-hover:bg-blue-500 group-hover:text-black transition-colors duration-500">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-light mb-4 text-navy">
                    {biz.title}
                  </h3>
                  <p className="text-sm font-light text-navy/70 leading-relaxed">
                    {biz.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-xs uppercase tracking-widest font-semibold">
                    {content.explore}
                  </span>
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
