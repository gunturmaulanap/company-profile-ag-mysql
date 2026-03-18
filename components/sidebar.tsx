"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Newspaper, Tags, LogOut, WalletMinimal, Loader2 } from "lucide-react";
import { signOutAction } from "@/app/login/actions";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

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

// Logout button component with loading state
function LogoutButtonContent() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <LogOut />
      )}
      <span>{pending ? "Logging out..." : "Logout"}</span>
    </>
  );
}

function LogoutButton() {
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleSubmit = async (formData: FormData) => {
    // Show immediate feedback
    toast.info("Logging out...", {
      duration: 2000,
    });

    // Close sidebar on mobile
    if (isMobile) setOpenMobile(false);

    // Call the server action - it will handle redirect
    await signOutAction();

    // Refresh the router to clear any cached authenticated data
    router.refresh();
  };

  return (
    <form action={handleSubmit}>
      <SidebarMenuButton
        type="submit"
        tooltip="Logout"
        className="transition-all duration-200"
      >
        <LogoutButtonContent />
      </SidebarMenuButton>
    </form>
  );
}

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
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
