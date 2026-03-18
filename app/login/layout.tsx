import type { Metadata } from "next";
import "@/app/admin/admin-theme.css";

export const metadata: Metadata = {
  title: "Login | Adibayu Group",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-theme-root login-theme min-h-dvh">{children}</div>
  );
}
