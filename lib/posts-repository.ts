import { prisma } from "@/lib/prisma";
import { mockAdminPosts, type AdminPost, type Insight } from "@/lib/content";
import { slugifyTitle } from "@/lib/slug";

let localPosts: AdminPost[] = [...mockAdminPosts];

export type CategoryItem = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminPostSummary = Pick<
  AdminPost,
  "id" | "title" | "status" | "updated_at"
>;

const DATABASE_NEWS_TIMEOUT_MS = 1800;
const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);

const fallbackCategories: CategoryItem[] = [
  {
    id: 1,
    name: "Corporate Strategy",
    slug: "corporate-strategy",
    description:
      "Strategic direction, governance, and portfolio orchestration.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Operations",
    slug: "operations",
    description: "Operational excellence across production and distribution.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Market",
    slug: "market",
    description: "Market insights, channel growth, and commercial execution.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Sustainability",
    slug: "sustainability",
    description: "Long-term environmental and social value creation.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

type PrismaPostRow = {
  id: number;
  title: string;
  slug: string;
  content: string;
  coverImageUrl: string;
  status: "draft" | "published";
  publishedAt: Date | null;
  updatedAt: Date;
  category: { name: string } | null;
};

function toDateInputString(
  value: Date | string | null | undefined,
): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function normalizePrismaPost(row: PrismaPostRow): AdminPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    cover_image_url: row.coverImageUrl,
    category: row.category?.name ?? "Corporate Strategy",
    status: row.status === "published" ? "published" : "draft",
    published_at: toDateInputString(row.publishedAt),
    updated_at: row.updatedAt.toISOString(),
  };
}

function mapPostToInsight(post: AdminPost): Insight {
  const dateSource = post.published_at || post.updated_at;
  const normalizedDate =
    dateSource.length >= 10 ? dateSource.slice(0, 10) : dateSource;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.title,
    content: post.content,
    category:
      post.category === "Operations" ||
      post.category === "Market" ||
      post.category === "Sustainability"
        ? post.category
        : "Corporate Strategy",
    date: normalizedDate,
    coverImageUrl: post.cover_image_url,
  };
}

function mapPostToInsightPreview(post: AdminPost): Insight {
  const base = mapPostToInsight(post);
  return {
    ...base,
    // News listing page does not need full article body.
    content: "",
  };
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

function sortByUpdatedAt(posts: AdminPost[]): AdminPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export async function listPosts(): Promise<AdminPost[]> {
  if (!isDatabaseConfigured) return sortByUpdatedAt(localPosts);

  try {
    const posts = await prisma.post.findMany({
      include: { category: true },
      orderBy: { updatedAt: "desc" },
    });

    return sortByUpdatedAt(
      posts.map((post: unknown) => normalizePrismaPost(post as PrismaPostRow)),
    );
  } catch {
    return sortByUpdatedAt(localPosts);
  }
}

export async function listPostsSummary(): Promise<AdminPostSummary[]> {
  if (!isDatabaseConfigured) {
    return sortByUpdatedAt(localPosts).map((post) => ({
      id: post.id,
      title: post.title,
      status: post.status,
      updated_at: post.updated_at,
    }));
  }

  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        status: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      status: post.status === "published" ? "published" : "draft",
      updated_at: post.updatedAt.toISOString(),
    }));
  } catch {
    return sortByUpdatedAt(localPosts).map((post) => ({
      id: post.id,
      title: post.title,
      status: post.status,
      updated_at: post.updated_at,
    }));
  }
}

export async function getPostById(id: number): Promise<AdminPost | null> {
  if (!isDatabaseConfigured) {
    return localPosts.find((post) => post.id === id) ?? null;
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!post) return null;
    return normalizePrismaPost(post as PrismaPostRow);
  } catch {
    return null;
  }
}

type PostPayload = Omit<AdminPost, "id" | "updated_at">;

export async function createPost(payload: PostPayload): Promise<AdminPost> {
  if (!isDatabaseConfigured) {
    const post: AdminPost = {
      ...payload,
      id:
        localPosts.length > 0
          ? Math.max(...localPosts.map((item) => item.id)) + 1
          : 1,
      updated_at: new Date().toISOString(),
    };
    localPosts = [post, ...localPosts];
    return post;
  }

  const category = await prisma.category.upsert({
    where: { slug: slugifyTitle(payload.category) },
    update: { name: payload.category },
    create: {
      name: payload.category,
      slug: slugifyTitle(payload.category),
      description: null,
    },
  });

  const created = await prisma.post.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      coverImageUrl: payload.cover_image_url,
      status: payload.status,
      publishedAt: payload.published_at ? new Date(payload.published_at) : null,
      locale: "id",
      categoryId: category.id,
    },
    include: { category: true },
  });

  return normalizePrismaPost(created as PrismaPostRow);
}

export async function updatePost(
  id: number,
  payload: PostPayload,
): Promise<AdminPost | null> {
  if (!isDatabaseConfigured) {
    const idx = localPosts.findIndex((post) => post.id === id);
    if (idx < 0) return null;

    const updated: AdminPost = {
      ...localPosts[idx],
      ...payload,
      updated_at: new Date().toISOString(),
    };
    localPosts[idx] = updated;
    return updated;
  }

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return null;

  const category = await prisma.category.upsert({
    where: { slug: slugifyTitle(payload.category) },
    update: { name: payload.category },
    create: {
      name: payload.category,
      slug: slugifyTitle(payload.category),
      description: null,
    },
  });

  const updated = await prisma.post.update({
    where: { id },
    data: {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      coverImageUrl: payload.cover_image_url,
      status: payload.status,
      publishedAt: payload.published_at ? new Date(payload.published_at) : null,
      categoryId: category.id,
    },
    include: { category: true },
  });

  return normalizePrismaPost(updated as PrismaPostRow);
}

export async function deletePost(id: number): Promise<void> {
  if (!isDatabaseConfigured) {
    localPosts = localPosts.filter((post) => post.id !== id);
    return;
  }

  await prisma.post.delete({ where: { id } });
}

export async function listPublishedInsights(
  limit?: number,
): Promise<Insight[]> {
  if (!isDatabaseConfigured) {
    const published = sortByUpdatedAt(localPosts).filter(
      (post) => post.status === "published",
    );
    const insights = published.map(mapPostToInsight);
    return typeof limit === "number" ? insights.slice(0, limit) : insights;
  }

  try {
    const posts = await listPosts();
    const published = posts
      .filter((post) => post.status === "published")
      .sort((a, b) => {
        const dateA = new Date(a.updated_at || a.published_at || 0).getTime();
        const dateB = new Date(b.updated_at || b.published_at || 0).getTime();
        return dateB - dateA;
      });
    const insights = published.map(mapPostToInsight);
    return typeof limit === "number" ? insights.slice(0, limit) : insights;
  } catch {
    const published = sortByUpdatedAt(localPosts).filter(
      (post) => post.status === "published",
    );
    const insights = published.map(mapPostToInsight);
    return typeof limit === "number" ? insights.slice(0, limit) : insights;
  }
}

export async function listPublishedInsightsPreview(
  limit?: number,
): Promise<Insight[]> {
  if (!isDatabaseConfigured) {
    const published = sortByUpdatedAt(localPosts).filter(
      (post) => post.status === "published",
    );
    const insights = published.map(mapPostToInsightPreview);
    return typeof limit === "number" ? insights.slice(0, limit) : insights;
  }

  try {
    const posts = await withTimeout(listPosts(), DATABASE_NEWS_TIMEOUT_MS);

    const published = posts
      .filter((post) => post.status === "published")
      .sort((a, b) => {
        const dateA = new Date(a.updated_at || a.published_at || 0).getTime();
        const dateB = new Date(b.updated_at || b.published_at || 0).getTime();
        return dateB - dateA;
      });

    const insights = published.map(mapPostToInsightPreview);
    return typeof limit === "number" ? insights.slice(0, limit) : insights;
  } catch {
    const published = sortByUpdatedAt(localPosts).filter(
      (post) => post.status === "published",
    );
    const insights = published.map(mapPostToInsightPreview);
    return typeof limit === "number" ? insights.slice(0, limit) : insights;
  }
}

export async function getPublishedInsightBySlug(
  slug: string,
): Promise<Insight | null> {
  const insights = await listPublishedInsights();
  return insights.find((item) => item.slug === slug) ?? null;
}

export async function listCategories(): Promise<CategoryItem[]> {
  if (!isDatabaseConfigured) return fallbackCategories;

  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return categories.map(
      (category: {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
      }) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        created_at: category.createdAt.toISOString(),
        updated_at: category.updatedAt.toISOString(),
      }),
    );
  } catch {
    return fallbackCategories;
  }
}
