"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { Play, Pause } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { copy } from "@/lib/translations";
import { Link } from "@/i18n/navigation";

// Import logo & gambar
import adibayuLogo from "../assets/logos/adibayu-1.png";
import heroMeet1 from "../assets/hero/meet-1.webp";
import heroMeet2 from "../assets/hero/meet-2.webp";
import heroMeet3 from "../assets/hero/meet-3.webp";
import heroMeet4 from "../assets/hero/meet-4.webp";
import heroMeet5 from "../assets/hero/meet-5.webp";
import heroMeet6 from "../assets/hero/meet-6.webp";
import heroMeet7 from "../assets/hero/meet-7.webp";
import heroMeet8 from "../assets/hero/meet-8.webp";
import heroMeet9 from "../assets/hero/meet-9.webp";
import heroMeet10 from "../assets/hero/meet-10.webp";
import slider1 from "../assets/hero/slider/slider-1.webp";
import slider2 from "../assets/hero/slider/slider-2.webp";
import slider3 from "../assets/hero/slider/slider-3.webp";
import slider4 from "../assets/hero/slider/slider-4.webp";
import slider5 from "../assets/hero/slider/slider-5.webp";

type HeroProps = { locale?: Locale; onReady?: () => void };

const leftImages = [heroMeet1, heroMeet2, heroMeet3, heroMeet4, heroMeet5];
const rightImages = [heroMeet6, heroMeet7, heroMeet8, heroMeet9, heroMeet10];

const sliderArticles = [
  { title: "Meeting & Strategy", image: slider1, link: "#" },
  { title: "Advanced Manufacturing", image: slider2, link: "#" },
  { title: "Distribution Network", image: slider3, link: "#" },
  { title: "Retail Experience", image: slider4, link: "#" },
  { title: "Sustainable Impact", image: slider5, link: "#" },
];

// PERBAIKAN 1: Tambahkan "will-change: transform" agar animasi diproses mulus oleh GPU, bukan CPU
const cssAnimations = `
  @keyframes scrollUp {
    0% { transform: translateY(0) translateZ(0); }
    100% { transform: translateY(-50%) translateZ(0); }
  }
  @keyframes scrollDown {
    0% { transform: translateY(-50%) translateZ(0); }
    100% { transform: translateY(0) translateZ(0); }
  }
  .animate-ticker-up { animation: scrollUp 50s linear infinite; will-change: transform; }
  .animate-ticker-down { animation: scrollDown 80s linear infinite; will-change: transform; }
  .ticker-paused { animation-play-state: paused !important; }
`;

function buildImages(images: StaticImageData[], isIOS: boolean) {
  const items = [];
  // iOS HANYA 4 GAMBAR (Meringankan VRAM iPhone)
  const renderImages = isIOS
    ? [...images.slice(0, 2), ...images.slice(0, 2)]
    : [...images, ...images];

  for (let i = 0; i < renderImages.length; i++) {
    items.push(
      <div
        key={`img-${i}`}
        className="w-full h-[45vh] md:h-[75vh] relative shrink-0 pb-1 md:pb-2 box-content bg-[var(--color-home-base-light)]"
      >
        <div className="w-full h-full relative overflow-hidden">
          <Image
            src={renderImages[i]}
            alt="Adibayu Hero"
            fill
            // PERBAIKAN 2: Turunkan sizes dan quality sangat ekstrem untuk iOS.
            // Karena gambar bergerak dan tertutup overlay hitam, mata manusia tidak akan sadar,
            // tapi ini menghemat puluhan Megabyte RAM iPhone!
            sizes={isIOS ? "30vw" : "(max-width: 1024px) 50vw, 28vw"}
            quality={isIOS ? 15 : 60}
            className="object-cover z-10"
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/30 z-20" />
        </div>
      </div>,
    );
  }
  return items;
}

export default function Hero({ locale = "id", onReady }: HeroProps) {
  const t = copy[locale].home.hero;

  const [hydrated, setHydrated] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInView, setIsInView] = useState(true); // KUNCI ANTI-CRASH

  const [currentSlide, setCurrentSlide] = useState(0);
  const [renderDOM, setRenderDOM] = useState(false);

  // Referensi untuk mendeteksi apakah Hero sedang dilihat pengguna
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHydrated(true);
    setIsIOS(
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  // PERBAIKAN 3: SENSOR PENGENDALI MEMORI (Smart Pause)
  // Mematikan animasi secara diam-diam saat pengguna men-scroll ke bawah
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px" },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const renderTimer = setTimeout(() => setRenderDOM(true), 600);
    const readyTimer = setTimeout(() => {
      onReady?.();
      window.dispatchEvent(new Event("adb-hero-anim-done"));
      window.dispatchEvent(new Event("adb-home-ready"));
    }, 800);
    return () => {
      clearTimeout(renderTimer);
      clearTimeout(readyTimer);
    };
  }, [hydrated, onReady]);

  // Animasi hanya aktif jika `isPlaying` ditekan DAN Hero sedang terlihat di layar (`isInView`)
  const activeAnimation = isPlaying && isInView;

  useEffect(() => {
    if (!activeAnimation) return;
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % sliderArticles.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [activeAnimation]);

  useEffect(() => {
    const handleNav = () => setIsPlaying(false);
    window.addEventListener("adb-route-start", handleNav);
    return () => window.removeEventListener("adb-route-start", handleNav);
  }, []);

  const leftItems = useMemo(() => buildImages(leftImages, isIOS), [isIOS]);
  const rightItems = useMemo(() => buildImages(rightImages, isIOS), [isIOS]);

  if (!hydrated)
    return <section className="h-screen bg-[var(--color-home-base-light)]" />;

  return (
    <section
      ref={heroRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-[var(--color-home-base-light)]"
    >
      <style dangerouslySetInnerHTML={{ __html: cssAnimations }} />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/30 shadow-lg"
      >
        {isPlaying ? (
          <Pause size={18} className="fill-current" />
        ) : (
          <Play size={18} className="fill-current ml-1" />
        )}
      </button>

      <div className="absolute inset-0 flex flex-col md:flex-row h-full w-full">
        <div className="order-2 md:order-1 w-full h-[45%] md:h-full md:w-[44%] flex flex-col">
          <div className="flex-1 flex flex-col justify-center items-center px-4 py-4 md:px-6 md:py-8">
            <div className="mb-4 md:mb-8">
              <Image
                src={adibayuLogo}
                alt="Logo"
                width={500}
                height={250}
                className="w-auto h-16 md:h-52"
                priority
              />
            </div>
            <p className="text-xs md:text-base text-navy/80 mb-4 md:mb-8 text-center max-w-[32ch] md:max-w-full">
              {t.subtitle}
            </p>
            <Link
              href="/about"
              className="home-button-outline w-fit text-sm md:text-base"
            >
              Our Company
            </Link>
          </div>
          <div className="relative w-full h-[22vh] md:h-88 mt-auto shadow-2xl md:shadow-none">
            <AnimatePresence mode="wait">
              {renderDOM && (
                <motion.a
                  key={currentSlide}
                  href={sliderArticles[currentSlide].link}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="block w-full h-full relative"
                >
                  <div className="absolute inset-0 bg-[#e1ecef]/10 animate-pulse" />
                  <Image
                    src={sliderArticles[currentSlide].image}
                    alt={sliderArticles[currentSlide].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    quality={isIOS ? 30 : 70}
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="home-slider-title text-xs md:text-sm font-medium text-center px-4 text-white uppercase tracking-widest drop-shadow-md">
                      {sliderArticles[currentSlide].title}
                    </span>
                  </div>
                </motion.a>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="order-1 md:order-2 w-full md:w-[56%] h-[55%] md:h-full flex overflow-hidden">
          <div className="w-[calc(50%-2px)] md:w-[calc(50%-2px)] h-full overflow-hidden bg-[var(--color-home-base-light)] relative">
            <div
              className={`absolute top-0 w-full flex flex-col animate-ticker-up ${!activeAnimation ? "ticker-paused" : ""}`}
            >
              {renderDOM && leftItems}
            </div>
          </div>
          <div className="w-1 md:w-2 shrink-0 h-full bg-[var(--color-home-base-light)]" />
          <div className="w-[calc(50%-2px)] md:w-[calc(50%-2px)] h-full overflow-hidden bg-[var(--color-home-base-light)] relative">
            <div
              className={`absolute top-0 w-full flex flex-col animate-ticker-down ${!activeAnimation ? "ticker-paused" : ""}`}
            >
              {renderDOM && rightItems}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
