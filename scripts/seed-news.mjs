import { PrismaClient } from "@prisma/client";
import path from "node:path";
import fs from "node:fs";

const envPath = path.resolve(process.cwd(), ".env");
const envLocalPath = path.resolve(process.cwd(), ".env.local");

if (fs.existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

if (fs.existsSync(envLocalPath)) {
  process.loadEnvFile(envLocalPath);
}

const prisma = new PrismaClient();

const seedCategories = [
  {
    name: "Corporate Strategy",
    slug: "corporate-strategy",
    description:
      "Strategic direction, governance, and portfolio orchestration.",
  },
  {
    name: "Operations",
    slug: "operations",
    description: "Operational excellence across production and distribution.",
  },
  {
    name: "Market",
    slug: "market",
    description: "Market insights, channel growth, and commercial execution.",
  },
  {
    name: "Sustainability",
    slug: "sustainability",
    description: "Long-term environmental and social value creation.",
  },
];

const seedPosts = [
  {
    title: "Building Resilient Industrial Value Chains",
    slug: "building-resilient-industrial-value-chains",
    content:
      "Resilience in industrial ecosystems is no longer optional. It is built through governance clarity, disciplined investment, and cross-sector collaboration.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    categorySlug: "corporate-strategy",
    status: "published",
    locale: "id",
    publishedAt: new Date("2026-02-10"),
  },
  {
    title: "Distribution Excellence in Fragmented Markets",
    slug: "distribution-excellence-in-fragmented-markets",
    content:
      "Distribution performance determines whether strategic intent becomes market reality in fragmented markets.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80",
    categorySlug: "operations",
    status: "published",
    locale: "id",
    publishedAt: new Date("2026-02-05"),
  },
];

for (const category of seedCategories) {
  await prisma.category.upsert({
    where: { slug: category.slug },
    update: {
      name: category.name,
      description: category.description,
    },
    create: category,
  });
}

for (const post of seedPosts) {
  const category = await prisma.category.findUnique({
    where: { slug: post.categorySlug },
  });

  if (!category) continue;

  await prisma.post.upsert({
    where: { slug: post.slug },
    update: {
      title: post.title,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      status: post.status,
      locale: post.locale,
      publishedAt: post.publishedAt,
      categoryId: category.id,
    },
    create: {
      title: post.title,
      slug: post.slug,
      content: post.content,
      coverImageUrl: post.coverImageUrl,
      status: post.status,
      locale: post.locale,
      publishedAt: post.publishedAt,
      categoryId: category.id,
    },
  });
}

console.log("Seed categories + news berhasil dijalankan.");

await prisma.$disconnect();
