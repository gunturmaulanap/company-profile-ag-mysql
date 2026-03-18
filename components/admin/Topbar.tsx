"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ui/theme-toggle";

type TopbarProps = {
  email?: string;
};

export function Topbar({ email }: TopbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/60 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {email ? (
          <span className="hidden text-xs text-muted-foreground sm:block">
            {email}
          </span>
        ) : null}
        <ThemeToggle />
      </div>
    </header>
  );
}
