import { AppSidebar } from "@/components/sidebar";
import { Topbar } from "@/components/admin/Topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminThemeProvider } from "@/components/admin/AdminThemeProvider";
import "./admin-theme.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      {/* SidebarProvider harus membungkus area yang menggunakan class .dark */}
      <SidebarProvider defaultOpen={true}>
        <div
          className="admin-theme-root flex h-dvh min-h-dvh w-full overflow-hidden bg-background text-foreground transition-colors duration-300"
          data-admin-theme-root
        >
          <AppSidebar />
          <SidebarInset className="flex flex-1 flex-col overflow-hidden bg-background">
            <Topbar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              <div className="w-full min-w-0 max-w-[1400px] 2xl:mx-auto pb-8">
                {children}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AdminThemeProvider>
  );
}
