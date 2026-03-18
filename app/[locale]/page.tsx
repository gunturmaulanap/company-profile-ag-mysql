import HomePageClient from "@/components/pages/HomePageClient";
import type { Insight } from "@/lib/content";

// Fungsi untuk mengambil data dari API di sisi server
async function getLatestNews(): Promise<Insight[]> {
  try {
    // Di Server Component, fetch memerlukan URL absolut.
    // Pastikan environment variable ini diset saat production.
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/news?limit=3`, {
      cache: "no-store", // Jangan di-cache agar berita selalu update
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error("Gagal mengambil data berita di server:", error);
    // Kembalikan array kosong sebagai fallback agar web tidak crash jika database mati
    return [];
  }
}

export default async function LocalizedHomePage() {
  // 1. Ambil data berita terbaru di server sebelum HTML dikirim ke browser
  const latestInsights = await getLatestNews();

  // 2. Oper data tersebut ke HomePageClient
  return <HomePageClient insights={latestInsights} />;
}
