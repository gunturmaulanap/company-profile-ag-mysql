import { Tag, Hash } from "lucide-react";

type CategoryCardProps = {
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  };
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header: Icon + Name */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
          <Tag className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground">
            {category.name}
          </h3>
          {/* Slug with icon */}
          <div className="flex items-center gap-1.5 mt-1 text-xs text-foreground/70 font-mono">
            <Hash className="h-3 w-3 text-muted-foreground" />
            <span className="truncate">{category.slug}</span>
          </div>
          {/* Description if exists */}
          {category.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {category.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
