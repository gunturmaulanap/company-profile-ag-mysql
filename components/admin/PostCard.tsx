import Link from "next/link";
import { FileText, Calendar, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type PostCardProps = {
  post: {
    id: number;
    title: string;
    status: string;
    updated_at: string;
  };
  deleteAction: (id: number) => React.ReactNode;
};

export function PostCard({ post, deleteAction }: PostCardProps) {
  const isPublished = post.status === "published";

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        {/* Header: Icon + Title */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {post.title}
            </h3>
          </div>
        </div>

        {/* Metadata: Status + Date */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant={isPublished ? "success" : "outline"}>
            {post.status}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span className="truncate">{post.updated_at}</span>
          </div>
        </div>

        {/* Actions: Full-width buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/posts/${post.id}/edit`}>
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Link>
          </Button>
          <div className="inline-flex items-center justify-center">
            {deleteAction(post.id)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
