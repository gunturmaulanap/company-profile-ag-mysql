import { NextResponse } from "next/server";
import { listPublishedInsights } from "@/lib/posts-repository";

export const revalidate = 180;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get("limit") || "0");
  const limit =
    Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined;

  const items = await listPublishedInsights(limit);
  return NextResponse.json(
    { items },
    {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
      },
    },
  );
}
