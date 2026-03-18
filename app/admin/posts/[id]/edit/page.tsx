import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePostAction } from "@/app/admin/actions";
import AdminToast from "@/components/admin/AdminToast";
import { PageHeader } from "@/components/admin/PageHeader";
import PostForm from "@/components/admin/PostForm";
import { ArrowLeft } from "lucide-react";
import { getPostById, listCategories } from "@/lib/posts-repository";
import { Button } from "@/components/ui/button";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function AdminEditPostPage({
  params,
  searchParams,
}: EditPostPageProps) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId) || postId <= 0) notFound();
  const { error, success } = await searchParams;
  const categories = await listCategories();
  const post = await getPostById(postId);

  if (!post) notFound();

  return (
    <div>
      <AdminToast
        message={error || success}
        type={error ? "error" : "success"}
      />

      <PageHeader
        title="Edit Post"
        description="Make changes to your content"
        actions={
          <Button asChild variant="outline">
            <Link href="/admin/posts">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Posts</span>
            </Link>
          </Button>
        }
      />

      <PostForm
        action={updatePostAction}
        submitLabel="Update Post"
        defaultValues={post}
        postId={post.id}
        categoryOptions={categories.map((item) => item.name)}
      />
    </div>
  );
}
