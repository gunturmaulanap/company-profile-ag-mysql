import LoginForm from "@/components/auth/LoginForm";
import { AdminThemeProvider } from "@/components/admin/AdminThemeProvider";

export const metadata = {
  title: "Login | Adibayu Group",
};

type LocalizedLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LocalizedLoginPage({
  searchParams,
}: LocalizedLoginPageProps) {
  const { error } = await searchParams;

  return (
    <AdminThemeProvider defaultTheme="light" respectStoredTheme={false}>
      <LoginForm initialError={error} />
    </AdminThemeProvider>
  );
}
