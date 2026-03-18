"use client";

import { useRef, forwardRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import type { Locale } from "@/lib/i18n";
import GYCImage from "../assets/gyc/gyc.jpg";
import ScrollReveal from "../ScrollReveal";

type SectionGrowCareerProps = { locale?: Locale };

const SectionGrowCareer = forwardRef<HTMLElement, SectionGrowCareerProps>(
  ({ locale = "id" }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const targetRef = (ref as React.RefObject<HTMLElement>) || internalRef;
    const router = useRouter();

    const [isIOS, setIsIOS] = useState(false);
    useEffect(() => {
      setIsIOS(
        window.innerWidth < 1024 ||
          /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
      );
    }, []);

    // FUNGSI NAVIGASI AMAN (Memanggil Lottie Loading)
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

    const heading =
      locale === "id"
        ? "Siapkan diri Anda untuk kesuksesan. Kekuatan kita terletak pada perbedaan dan kesamaan kita. Bersama-sama, kita berkomitmen untuk melampaui batas-batas yang mungkin."
        : "Set yourself up for success. Our strength lies in our differences and our common ground. Together, we are dedicated to pushing the boundaries of what’s possible.";
    const paragraphOne =
      locale === "id"
        ? "Kami percaya budaya kerja terbaik dibentuk oleh kolaborasi, rasa hormat, dan kesempatan berkembang yang setara bagi setiap individu."
        : "We believe the best workplace culture is shaped by collaboration, respect, and equal growth opportunities for every individual.";
    const paragraphTwo =
      locale === "id"
        ? "Bersama Adibayu Group, Anda dapat membangun karier berdampak sambil menciptakan nilai nyata untuk masyarakat dan industri."
        : "Together with Adibayu Group, you can build an impactful career while creating real value for society and industries.";

    return (
      <section
        id="grow-career"
        ref={targetRef}
        className="relative home-base-light pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden"
      >
        <div className="relative z-10 home-content-wrap px-6 md:px-4 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] items-center gap-8 md:gap-12 lg:gap-16">
            <div className="relative w-full min-h-[480px] md:min-h-[640px] lg:min-h-[720px] overflow-hidden rounded-xl">
              <Image
                src={GYCImage}
                alt="Grow your career at Adibayu"
                fill
                className={`object-cover ${isIOS ? "" : "transform-gpu [will-change:transform]"}`}
                sizes="(max-width: 640px) 100vw, 45vw"
                quality={isIOS ? 20 : 75}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="text-navy">
              <ScrollReveal
                baseOpacity={0.1}
                enableBlur={!isIOS}
                baseRotation={3}
                blurStrength={4}
                wordStagger={0.1}
                wordAnimationEnd="bottom 55%"
                containerClassName="mb-6 md:mb-12 lg:mb-10 xl:mb-20"
                textClassName="text-3xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight font-thin"
              >
                {heading}
              </ScrollReveal>
              <p className="text-sm md:text-base leading-relaxed text-navy/80 mb-4 md:mb-5 max-w-[62ch]">
                {paragraphOne}
              </p>
              <p className="text-sm md:text-base leading-relaxed text-navy/80 mb-8 md:mb-10 max-w-[62ch]">
                {paragraphTwo}
              </p>

              {/* TOMBOL DENGAN ANIMASI LOADING */}
              <a
                href="/career"
                onClick={(e) => handleNavigation(e, "/career")}
                className="home-button-outline inline-block"
              >
                {locale === "id" ? "Bergabung dengan Tim" : "Join our team"}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

SectionGrowCareer.displayName = "SectionGrowCareer";
export default SectionGrowCareer;
