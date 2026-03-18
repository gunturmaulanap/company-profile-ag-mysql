import Link from "next/link";
import { createPostAction } from "@/app/admin/actions";
import AdminToast from "@/components/admin/AdminToast";
import { PageHeader } from "@/components/admin/PageHeader";
import PostForm from "@/components/admin/PostForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { listCategories } from "@/lib/posts-repository";

type AdminNewPostPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminNewPostPage({
  searchParams,
}: AdminNewPostPageProps) {
  const { error, success } = await searchParams;
  const categories = await listCategories();

  return (
    <div>
      <AdminToast
        message={error || success}
        type={error ? "error" : "success"}
      />

      <PageHeader
        title="Create Post"
        description="Write and publish new content"
        actions={
          <Button asChild variant="outline">
            <Link href="/admin/posts">
              <ArrowLeft className="h-4 w-4" />
              Back to Posts
            </Link>
          </Button>
        }
      />

      <PostForm
        action={createPostAction}
        submitLabel="Create Post"
        categoryOptions={categories.map((item) => item.name)}
      />
    </div>
  );
}
