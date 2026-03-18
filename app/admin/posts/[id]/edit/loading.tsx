import { AdminFormSkeleton } from "@/components/admin/AdminSkeleton";

export default function EditPostLoading() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-8 w-32 sm:h-9 sm:w-40 bg-muted animate-pulse rounded-lg" />
          <div className="h-4 w-full max-w-xs bg-muted animate-pulse rounded" />
        </div>
      </div>
      <AdminFormSkeleton />
    </div>
  );
}
