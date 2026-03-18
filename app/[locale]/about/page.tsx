import type { Metadata } from "next";
import WhoWeArePageClient from "@/components/pages/WhoWeArePageClient";

export const metadata: Metadata = {
  title: "About Us | Adibayu Group",
  description:
    "Adibayu Group is a strategic holding company enabling integrated growth across manufacturing, distribution, and retail sectors.",
};

export default function LocalizedAboutUsPage() {
  return <WhoWeArePageClient />;
}
