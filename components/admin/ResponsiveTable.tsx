import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

type ResponsiveTableProps = {
  children: ReactNode;
  className?: string;
};

export function ResponsiveTable({
  children,
  className = "",
}: ResponsiveTableProps) {
  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[900px]">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
