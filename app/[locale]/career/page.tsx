import type { Metadata } from "next";
import CareerPageClient from "@/components/pages/CareerPageClient";

export const metadata: Metadata = {
  title: "Career | Adibayu Group",
  description:
    "Explore career opportunities at Adibayu Group across development, design, marketing, operations, finance, and management.",
};

export default function LocalizedCareerPage() {
  return <CareerPageClient />;
}
