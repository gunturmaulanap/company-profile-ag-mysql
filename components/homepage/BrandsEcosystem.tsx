"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import habbieLogo from "@/components/assets/brands/habbie.png";
import madudizLogo from "@/components/assets/brands/madudiz.png";
import paramorinaLogo from "@/components/assets/brands/paramorina.png";
import protabuminLogo from "@/components/assets/brands/protabumin.png";
import yayleLogo from "@/components/assets/brands/yayle.png";
import richsweet from "@/components/assets/brands/richsweet.png";
import vitabumin from "@/components/assets/brands/vitabumin.png";
// import lega from "@/components/assets/brands/lega.png";

const brands = [
  { name: "Habbie", logo: habbieLogo },
  { name: "Madudiz", logo: madudizLogo },
  { name: "Paramorina", logo: paramorinaLogo },
  { name: "Protabumin", logo: protabuminLogo },
  { name: "Yayle", logo: yayleLogo },
  { name: "Richsweet", logo: richsweet },
  { name: "Vitabumin", logo: vitabumin },
];

const MOBILE_LOGO_SIZES: Record<string, string> = {
  Habbie: "h-[96px]",
  Madudiz: "h-[104px]",
  Paramorina: "h-[88px]",
  Protabumin: "h-[80px]",
  Yayle: "h-[88px]",
  Richsweet: "h-[88px]",
  Vitabumin: "h-[88px]",
  Lega: "h-[88px]",
};

const DESKTOP_LOGO_SIZES: Record<string, string> = {
  Habbie: "md:h-[152px] lg:h-[178px]",
};

const LOGO_MAX_WIDTHS: Record<string, string> = {
  Habbie: "max-w-[250px] md:max-w-[390px]",
};

type BrandsEcosystemProps = {
  isDarkMode?: boolean;
  locale?: "en" | "id";
};

export default function BrandsEcosystem({
  isDarkMode = false,
  locale = "id",
}: BrandsEcosystemProps) {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  const title = locale === "id" ? "Brand Kami" : "Our Brands";
  const subtitle =
    locale === "id"
      ? "Ekosistem brand yang tumbuh bersama kebutuhan masyarakat."
      : "An ecosystem of brands built around everyday needs.";

  // THE FIX: Jika iOS, jangan duplikasi array agar memori lebih ringan
  const displayBrands = isIOS ? brands : [...brands, ...brands];

  return (
    <section
      id="brands"
      className="py-16 md:py-20 overflow-hidden transition-colors duration-300 home-bg-light"
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 xl:px-10">
        <div className="mb-10 md:mb-12 text-center max-w-3xl mx-auto">
          <h2
            className={`text-4xl md:text-6xl font-semibold tracking-tight ${
              isDarkMode ? "text-white" : "text-navy"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-3 text-sm md:text-lg leading-relaxed ${
              isDarkMode ? "text-white/70" : "text-navy/70"
            }`}
          >
            {subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Efek Gradient Edge dimatikan di Mobile/iOS karena membuat render VRAM berat */}
          {!isIOS && (
            <>
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 z-10 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-[var(--color-home-brand-dark)] to-transparent"
                    : "bg-gradient-to-r from-[var(--color-home-main-hero)] to-transparent"
                }`}
              />
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 z-10 ${
                  isDarkMode
                    ? "bg-gradient-to-l from-[var(--color-home-brand-dark)] to-transparent"
                    : "bg-gradient-to-l from-[var(--color-home-main-hero)] to-transparent"
                }`}
              />
            </>
          )}

          <div
            className={
              isIOS
                ? "flex overflow-x-auto snap-x hide-scrollbar"
                : "overflow-hidden"
            }
          >
            <div
              className={`flex w-max ${
                isIOS
                  ? "gap-6 px-6"
                  : "animate-[marqueeRight_30s_linear_infinite]"
              }`}
            >
              {displayBrands.map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className={`h-[170px] md:h-[250px] min-w-[320px] md:min-w-[460px] px-6 md:px-10 flex items-center justify-center ${
                    isIOS ? "snap-center" : ""
                  }`}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={460}
                    height={180}
                    quality={isIOS ? 30 : 75} // KUALITAS DITEKAN UNTUK IPHONE
                    className={`${MOBILE_LOGO_SIZES[brand.name] ?? "h-[66px]"} ${DESKTOP_LOGO_SIZES[brand.name] ?? "md:h-[128px] lg:h-[150px]"} w-auto ${LOGO_MAX_WIDTHS[brand.name] ?? "max-w-[220px] md:max-w-[340px]"} object-contain opacity-100 md:opacity-95 md:hover:opacity-100 transition duration-300`}
                    sizes="(max-width: 768px) 320px, 460px"
                    priority={false}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marqueeRight {
          0% { transform: translateX(-50%) translateZ(0); }
          100% { transform: translateX(0) translateZ(0); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `,
        }}
      />
    </section>
  );
}
