"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useAdminTheme } from "@/components/admin/AdminThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAdminTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = theme === "dark";

  if (!mounted) {
    return (
      <SidebarMenuButton tooltip="Toggle theme">
        <div className="h-4 w-4 animate-pulse bg-muted-foreground/20" />
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuButton
      type="button"
      onClick={toggleTheme}
      tooltip={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </SidebarMenuButton>
  );
}
