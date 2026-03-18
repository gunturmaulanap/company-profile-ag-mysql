import { listCategories } from "@/lib/posts-repository";
import { PageHeader } from "@/components/admin/PageHeader";
import { MobileCardList } from "@/components/admin/MobileCardList";
import { CategoryCard } from "@/components/admin/CategoryCard";
import { ResponsiveTable } from "@/components/admin/ResponsiveTable";
import { Tag } from "lucide-react";

export default async function AdminCategoriesPage() {
  const categories = await listCategories();

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Header Section - Fully Responsive */}
      <PageHeader
        title="Categories"
        description={`Organize your content with categories (${categories.length} total)`}
      />

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <ResponsiveTable>
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-muted/40 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Slug
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-border/70 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                        <Tag className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {category.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-foreground/80 font-mono">
                      <svg
                        className="h-3.5 w-3.5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                        />
                      </svg>
                      <span className="truncate">{category.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-md">
                    {category.description || (
                      <span className="text-muted-foreground/50">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResponsiveTable>
      </div>

      {/* Mobile Card View */}
      <MobileCardList
        empty={
          categories.length === 0 ? (
            <div className="md:hidden text-center py-12">
              <Tag className="mx-auto h-10 w-10 text-muted-foreground/50 mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-1.5">
                No categories yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Categories will appear here once created.
              </p>
            </div>
          ) : null
        }
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </MobileCardList>

      {/* Desktop Empty State */}
      {categories.length === 0 && (
        <div className="hidden md:block text-center py-16">
          <Tag className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No categories yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Categories will appear here once created.
          </p>
        </div>
      )}
    </div>
  );
}
