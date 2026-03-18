"use client";

import Image from "next/image";
import { useState } from "react";
import type { GovernanceCompany } from "@/lib/governance";
import BrandGrid from "@/components/governance/BrandGrid";
import memberAksamala from "@/components/assets/members/aksamala.png";
import memberNakama from "@/components/assets/members/nakama.png";
import memberHabbie from "@/components/assets/members/habbie.png";
import memberAchievement from "@/components/assets/members/achievement.png";
import memberSatyalaksana from "@/components/assets/members/satyalaksana.png";
import memberRealhe from "@/components/assets/members/realhe.png";

type CompanyCardProps = {
  company: GovernanceCompany;
  mobileCollapsible?: boolean;
  onHoverChange?: (isHovering: boolean) => void;
};

const companyLocalImages: Record<string, string> = {
  aksamala: memberAksamala.src,
  nakama: memberNakama.src,
  habbie: memberHabbie.src,
  achievement: memberAchievement.src,
  satyalaksana: memberSatyalaksana.src,
  realhe: memberRealhe.src,
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "PT";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

export default function CompanyCard({
  company,
  mobileCollapsible = true,
  onHoverChange,
}: CompanyCardProps) {
  const [imageStage, setImageStage] = useState<"local" | "failed">("local");
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);

  const activeImageSrc = companyLocalImages[company.slug] ?? null;

  return (
    <div
      className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-shadow duration-200 hover:shadow-md"
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {company.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {company.descriptor}
          </p>
        </div>
      </div>

      <div className="mb-5 overflow-hidden rounded-2xl border border-black/5 bg-[#f0f0f1]">
        {imageStage !== "failed" && activeImageSrc ? (
          <Image
            src={activeImageSrc}
            alt={`${company.name} operating company`}
            width={960}
            height={420}
            className="h-36 w-full object-cover sm:h-44"
            onError={() => {
              setImageStage("failed");
            }}
          />
        ) : (
          <div className="flex h-36 w-full items-center justify-center sm:h-44">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-lg font-semibold text-gray-700 shadow-sm">
              {getInitials(company.name)}
            </div>
          </div>
        )}
      </div>

      {mobileCollapsible ? (
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsBrandsOpen((prev) => !prev)}
            className="mb-3 inline-flex items-center rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            aria-expanded={isBrandsOpen}
            aria-label={`Toggle brands for ${company.name}`}
          >
            {isBrandsOpen ? "Hide brands" : "Show brands"}
          </button>
          {isBrandsOpen && <BrandGrid brands={company.brands} />}
        </div>
      ) : null}

      <div className={mobileCollapsible ? "hidden md:block" : "block"}>
        <BrandGrid brands={company.brands} />
      </div>
    </div>
  );
}
