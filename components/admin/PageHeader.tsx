import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export function PageHeader({
  title,
  description,
  actions,
  children,
}: PageHeaderProps) {
  return (
    <Card className="mb-6 md:mb-8">
      <CardContent className="p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {description && (
              <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
                {description}
              </p>
            )}
            {children}
          </div>
          {actions && (
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end shrink-0">
              {actions}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
