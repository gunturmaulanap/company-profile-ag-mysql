import { Skeleton } from "@/components/ui/skeleton";

export function AdminPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-8 w-48 sm:h-9 sm:w-64" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </div>
        <Skeleton className="h-10 w-32 sm:w-auto" />
      </div>

      {/* Table Skeleton */}
      <div className="hidden md:block overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div className="w-full min-w-[900px]">
            {/* Table Header */}
            <div className="border-b border-border">
              <div className="flex items-center px-6 py-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ width: i === 0 ? "40%" : i === 3 ? "20%" : "20%" }}
                  >
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>

            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="border-b border-border/70 flex items-center px-6 py-4"
              >
                {/* Title */}
                <div className="flex items-center gap-3" style={{ width: "40%" }}>
                  <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                  <Skeleton className="h-4 w-48 max-w-md" />
                </div>

                {/* Status */}
                <div style={{ width: "20%" }}>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                {/* Date */}
                <div style={{ width: "20%" }}>
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2" style={{ width: "20%" }}>
                  <Skeleton className="h-8 w-16 rounded-lg" />
                  <Skeleton className="h-8 w-16 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="md:hidden space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-3 mb-3">
              <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-4 w-full" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminFormSkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      {/* Form Fields */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      ))}

      {/* Textarea Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-border">
        <Skeleton className="h-11 w-32 rounded-xl" />
      </div>
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="space-y-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-1">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="space-y-2 mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-lg bg-muted/30"
            >
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
