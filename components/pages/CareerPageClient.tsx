"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MenuOverlayPage from "@/components/MenuOverlay";
import Footer from "@/components/Footer";
import { useLocale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

const categories = [
  "all",
  "development",
  "design",
  "marketing",
  "customerService",
  "operations",
  "finance",
  "management",
] as const;

const jobImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=240&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=240&q=80",
];

const getJobTags = (index: number) => {
  const tagSets = [
    ["remote", "fullTime"],
    ["hybrid", "fullTime"],
    ["remote", "fullTime"],
    ["onSite", "fullTime"],
    ["hybrid", "fullTime"],
    ["remote", "fullTime"],
    ["hybrid", "fullTime"],
  ];
  return tagSets[index] || ["remote", "fullTime"];
};

const getJobCategory = (index: number) => {
  const cats = [
    "development",
    "design",
    "marketing",
    "customerService",
    "operations",
    "finance",
    "management",
  ];
  return cats[index] || "development";
};

export default function CareerPageClient() {
  const { locale } = useLocale();
  const t = copy[locale as keyof typeof copy]?.career ??
    copy.en.career ?? {
      badge: "We're hiring!",
      title: "Be part of our mission",
      subtitle:
        "Join a team focused on building long-term impact across industries.",
      apply: "Apply",
      categories: {
        all: "View all",
        development: "Development",
        design: "Design",
        marketing: "Marketing",
        customerService: "Customer Service",
        operations: "Operations",
        finance: "Finance",
        management: "Management",
      },
      tags: {
        remote: "Remote",
        fullTime: "Full-time",
        hybrid: "Hybrid",
        onSite: "On-site",
      },
      jobs: {},
    };

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 4;

  const jobs = t.jobs ?? {};

  const filteredJobs = Object.entries(jobs)
    .filter(([key]) => key.startsWith("title"))
    .map(([key, value], index) => {
      const jobIndex = parseInt(key.replace("title", "")) - 1;
      const category = getJobCategory(jobIndex);

      if (selectedCategory !== "all" && selectedCategory !== category) {
        return null;
      }

      return {
        id: `job-${jobIndex + 1}`,
        title: value as string,
        description: jobs[
          `description${jobIndex + 1}` as keyof typeof jobs
        ] as string,
        tags: getJobTags(jobIndex),
        category,
        imageUrl: jobImages[jobIndex],
      };
    })
    .filter((job): job is NonNullable<typeof job> => job !== null);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJobs.length / JOBS_PER_PAGE),
  );
  const currentPageSafe = Math.min(currentPage, totalPages);
  const paginatedJobs = filteredJobs.slice(
    (currentPageSafe - 1) * JOBS_PER_PAGE,
    currentPageSafe * JOBS_PER_PAGE,
  );

  return (
    <main className="relative mx-auto w-full min-h-screen overflow-x-clip bg-white text-gray-900">
      <MenuOverlayPage />

      {/* Background Gradient */}
      {/* <div className="pointer-events-none absolute right-[-8rem] top-[-6rem] h-[22rem] w-[22rem] bg-gradient-to-br from-sky-200/40 via-purple-200/25 to-transparent blur-3xl" /> */}

      <section className="px-6 pb-20 pt-32 md:px-12 md:pt-36">
        {/* Badge */}
        <span className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600">
          {t.badge}
        </span>

        {/* Title */}
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-gray-900 md:text-6xl">
          {t.title}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl text-base text-gray-600 md:text-lg">
          {t.subtitle}
        </p>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap gap-2.5 md:gap-3">
          {categories.map((category) => {
            const categoryLabel = t.categories[category];
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`inline-flex rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-transparent bg-gray-900 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {categoryLabel}
              </button>
            );
          })}
        </div>

        {/* Jobs List */}
        {filteredJobs.length > 0 ? (
          <div className="mt-12 overflow-hidden rounded-3xl border border-gray-200 bg-white">
            {paginatedJobs.map((job) => (
              <article
                key={job.id}
                className="grid gap-6 border-b border-gray-200 px-5 py-6 last:border-b-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-8 md:py-8"
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="relative h-14 w-14 flex-none overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 md:h-16 md:w-16">
                    <Image
                      src={job.imageUrl}
                      alt={job.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-gray-900 md:text-xl">
                      {job.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-[15px]">
                      {job.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={`${job.id}-${tag}`}
                          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600"
                        >
                          {t.tags[tag as keyof typeof t.tags] ?? tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:justify-self-end">
                  <Link
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 transition-opacity hover:opacity-70"
                  >
                    {t.apply}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-600">
              {locale === "id"
                ? "Tidak ada lowongan untuk kategori ini saat ini."
                : "No positions available in this category at the moment."}
            </p>
          </div>
        )}

        {filteredJobs.length > 0 && (
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPageSafe === 1}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {locale === "id" ? "Sebelumnya" : "Previous"}
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
                (page) => {
                  const active = page === currentPageSafe;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 w-9 rounded-full text-sm transition-colors ${
                        active
                          ? "bg-gray-900 text-white"
                          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                },
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPageSafe === totalPages}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {locale === "id" ? "Berikutnya" : "Next"}
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer locale={locale} />
    </main>
  );
}
