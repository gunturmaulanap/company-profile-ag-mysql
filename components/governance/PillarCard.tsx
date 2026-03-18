"use client";

import { useMemo, useState } from "react";
import type { GovernancePillar } from "@/lib/governance";
import CompanyCard from "@/components/governance/CompanyCard";

type PillarCardProps = {
  pillar: GovernancePillar;
};

export default function PillarCard({ pillar }: PillarCardProps) {
  const [isCompanyHovered, setIsCompanyHovered] = useState(false);

  const company = useMemo(() => pillar.companies[0], [pillar.companies]);

  if (!company) {
    return null;
  }

  return (
    <section
      className={`rounded-[24px] bg-white p-6 shadow-sm ring-1 transition-all duration-200 ${
        isCompanyHovered
          ? "ring-gray-300 shadow-md"
          : "ring-black/5"
      }`}
      aria-label={`${pillar.name} pillar`}
    >
      <div className="mb-5 border-l-2 border-gray-300 pl-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          Pillar
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-gray-900">
          {pillar.name}
        </h2>
      </div>

      <div className="pl-2">
        <CompanyCard
          company={company}
          mobileCollapsible
          onHoverChange={setIsCompanyHovered}
        />
      </div>
    </section>
  );
}
