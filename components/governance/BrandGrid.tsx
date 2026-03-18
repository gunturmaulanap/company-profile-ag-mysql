"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { GovernanceBrand } from "@/lib/governance";
import brandHabbie from "@/components/assets/brands/habbie.png";
import brandLega from "@/components/assets/brands/lega.png";
import brandRichsweet from "@/components/assets/brands/richsweet.png";
import brandVitabumin from "@/components/assets/brands/vitabumin.png";
import brandYayle from "@/components/assets/brands/yayle.png";

type BrandGridProps = {
  brands: GovernanceBrand[];
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "BR";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

export default function BrandGrid({ brands }: BrandGridProps) {
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const brandLogoMap: Record<string, string> = {
    habbie: brandHabbie.src,
    yayle: brandYayle.src,
    richsweet: brandRichsweet.src,
    vitabumin: brandVitabumin.src,
    "telon-lega": brandLega.src,
  };

  const items = useMemo(() => brands, [brands]);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((brand) => {
        const src = brandLogoMap[brand.slug] ?? "";
        const hasImage = !failed[brand.slug];

        return (
          <div
            key={brand.slug}
            className="group relative rounded-2xl border border-black/5 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            aria-label={`${brand.name} brand card`}
            tabIndex={0}
          >
            <div className="flex h-14 items-center justify-center rounded-xl bg-[#f6f6f7]">
              {hasImage && src ? (
                <Image
                  src={src}
                  alt={`${brand.name} logo`}
                  width={110}
                  height={44}
                  className="h-9 w-auto object-contain"
                  onError={() =>
                    setFailed((prev) => ({ ...prev, [brand.slug]: true }))
                  }
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold tracking-wide text-gray-700">
                  {getInitials(brand.name)}
                </div>
              )}
            </div>

            <p className="mt-2 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-700">
              {brand.name}
            </p>

            <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
              Brand
            </div>
          </div>
        );
      })}
    </div>
  );
}
