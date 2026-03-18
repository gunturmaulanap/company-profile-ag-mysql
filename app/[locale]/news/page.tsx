import type { Metadata } from "next";
import NewsPageClient from "@/components/pages/NewsPageClient";
import { listPublishedInsightsPreview } from "@/lib/posts-repository";

export const metadata: Metadata = {
  title: "News & Updates | Adibayu Group",
  description: "Latest developments and strategic updates from our ecosystem.",
};

export default async function LocalizedNewsPage() {
  const insights = await listPublishedInsightsPreview();
  return <NewsPageClient insights={insights} />;
}
