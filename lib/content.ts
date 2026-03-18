export type Insight = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Corporate Strategy" | "Operations" | "Market" | "Sustainability";
  published_at: string; // <--- Tambahkan baris ini
  date: string;
  coverImageUrl: string;
};

export const mockInsights: Insight[] = [];

export type AdminPost = {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string;
  category: string;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string;
};

export const mockAdminPosts: AdminPost[] = [];

export function getInsightBySlug(slug: string): Insight | undefined {
  return mockInsights.find((item) => item.slug === slug);
}
