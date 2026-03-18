"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, Tags, LogOut, WalletMinimal } from "lucide-react";
import { signOutAction } from "@/app/login/actions";
import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const contentNav = [
  { title: "News", href: "/admin/posts", icon: Newspaper },
  { title: "Categories", href: "/admin/categories", icon: Tags },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeSidebarOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  const prefetchAdminRoutes = () => {
    if (typeof window === "undefined") return;

    const targets = ["/admin/posts", "/admin/categories", "/admin/posts/new"];
    targets.forEach((href) => {
      void fetch(href, {
        headers: {
          Purpose: "prefetch",
          "x-middleware-prefetch": "1",
        },
      }).catch(() => {
        // Best-effort prefetch only.
      });
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <Link
                  href="/admin/posts"
                  prefetch
                  onMouseEnter={prefetchAdminRoutes}
                  onFocus={prefetchAdminRoutes}
                  onClick={closeSidebarOnMobile}
                />
              }
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <WalletMinimal className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Admin Panel</span>
                <span className="truncate text-xs text-muted-foreground">
                  News CMS
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname.startsWith(item.href)}
                    render={
                      <Link
                        href={item.href}
                        prefetch
                        onMouseEnter={prefetchAdminRoutes}
                        onFocus={prefetchAdminRoutes}
                        onClick={closeSidebarOnMobile}
                      />
                    }
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <form
              action={signOutAction}
              onSubmit={() => {
                toast.info("Signing out...");
                closeSidebarOnMobile();
              }}
            >
              <SidebarMenuButton type="submit" tooltip="Logout">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
