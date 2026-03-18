"use client";

import {
  useLayoutEffect,
  useRef,
  forwardRef,
  useState,
  useEffect,
} from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import wavePatternCrop from "../assets/footer/wave-pattern-crop.svg";
import wavePatternFull from "../assets/footer/wave-pattern.svg";
import {
  gsap,
  ensureGsapPlugins,
  refreshScrollTriggerSafe,
} from "@/lib/gsapClient";
import { safeFromTo } from "@/lib/safeGsap";

type SectionSustainabilityProps = { locale?: Locale };

const sliderData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    title: { id: "Penghijauan Lingkungan", en: "Environmental Greening" },
    desc: {
      id: "Berkomitmen untuk masa depan yang lebih hijau dengan menanam ribuan pohon setiap tahunnya.",
      en: "Committed to a greener future by planting thousands of trees every year.",
    },
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    title: { id: "Pemberdayaan Sosial", en: "Social Empowerment" },
    desc: {
      id: "Membangun komunitas sekitar melalui program edukasi dan pemberdayaan ekonomi lokal.",
      en: "Building surrounding communities through education programs and local economic empowerment.",
    },
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80",
    title: { id: "Energi Terbarukan", en: "Renewable Energy" },
    desc: {
      id: "Transisi menuju efisiensi energi untuk meminimalkan jejak karbon dari operasi perusahaan kami.",
      en: "Transitioning towards energy efficiency to minimize the carbon footprint of our operations.",
    },
  },
];

const SectionSustainability = forwardRef<
  HTMLElement,
  SectionSustainabilityProps
>(({ locale = "id" }, ref) => {
  const internalRef = useRef<HTMLElement>(null);
  const sectionRef = (ref || internalRef) as React.RefObject<HTMLElement>;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(
      () => setActiveSlide((prev) => (prev + 1) % sliderData.length),
      isIOS ? 5200 : 4000,
    );
    return () => clearInterval(timer);
  }, [isHovered, isIOS]);

  useLayoutEffect(() => {
    if (!sectionRef.current || isIOS) return;

    ensureGsapPlugins();
    const ctx = gsap.context((self) => {
      const q = self.selector;
      if (!q) return;

      safeFromTo(
        q(".js-sustainability-bg"),
        { scale: 1.1 },
        {
          scale: 1,
          duration: 2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      safeFromTo(
        q(".js-sustainability-title"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        },
      );
      safeFromTo(
        q(".js-sustainability-card"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: { trigger: sectionRef.current, start: "top 50%" },
        },
      );
    }, sectionRef);

    refreshScrollTriggerSafe();
    return () => ctx.revert();
  }, [isIOS, sectionRef]);

  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-end overflow-hidden"
    >
      {!isIOS && (
        <>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-160 w-160 -translate-x-1/2 -translate-y-1/2 opacity-10 md:hidden">
            <Image
              src={wavePatternFull}
              alt="Wave pattern"
              fill
              className="object-contain"
            />
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-64 w-64 rotate-180 opacity-10 md:block lg:h-200 lg:w-200 xl:h-150 xl:w-150">
            <Image
              src={wavePatternCrop}
              alt="Wave pattern"
              fill
              className="object-cover object-left-bottom"
            />
          </div>
        </>
      )}

      <div
        className="absolute inset-0 z-10 js-sustainability-bg"
        style={{
          background:
            "linear-gradient(90deg, rgba(1,31,55,0.84) 0%, rgba(1,31,55,0.62) 42%, rgba(1,31,55,0.18) 72%, rgba(1,31,55,0) 100%)",
        }}
      />

      <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-between gap-12 px-6 py-12 home-content-wrap md:flex-row md:gap-10 md:px-12 md:py-16 lg:px-16">
        <div className="mb-8 w-full md:mb-0 md:flex md:w-1/2 md:-translate-y-10 md:items-center md:justify-start">
          <h2 className="js-sustainability-title max-w-lg text-4xl font-thin leading-[1.1] text-white md:text-5xl lg:text-7xl">
            {locale === "id" ? (
              <>
                <br />
                Kami peduli <br />
                pada sesama. <br />
                Keberlanjutan <br />
                di Adibayu Group.
              </>
            ) : (
              <>
                <br />
                We think <br />
                about others. <br />
                Sustainability <br />
                at Adibayu Group.
              </>
            )}
          </h2>
        </div>

        <div className="flex w-full items-center justify-end md:w-1/2">
          <div
            className="js-sustainability-card group relative aspect-[3/4] w-full max-w-sm cursor-pointer overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setShowContent(!showContent)}
          >
            {sliderData.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${index === activeSlide ? "z-10 opacity-100" : "z-0 opacity-0"}`}
              >
                <Image
                  src={slide.image}
                  alt={locale === "id" ? slide.title.id : slide.title.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  quality={isIOS ? 20 : 75}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover"
                  decoding="async"
                />
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${isHovered || showContent ? "bg-black/70" : "bg-black/40"}`}
                />
                <div
                  className={`absolute inset-0 z-20 flex flex-col items-start justify-end p-8 pb-16 transition-all duration-500 ease-out ${isHovered || showContent ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                >
                  <h3
                    className={`mb-3 text-2xl font-semibold leading-tight text-white ${isIOS ? "" : "drop-shadow-md"}`}
                  >
                    {locale === "id" ? slide.title.id : slide.title.en}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed text-gray-200 ${isIOS ? "" : "drop-shadow-md"}`}
                  >
                    {locale === "id" ? slide.desc.id : slide.desc.en}
                  </p>
                </div>
              </div>
            ))}
            <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-3">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full border-2 border-[#011F37] transition-all duration-300 ${index === activeSlide ? "scale-125 bg-[#011F37]" : "bg-transparent hover:bg-[#011F37]/50"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

SectionSustainability.displayName = "SectionSustainability";
export default SectionSustainability;
