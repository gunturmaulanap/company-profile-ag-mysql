import LoginForm from "@/components/auth/LoginForm";
import { AdminThemeProvider } from "@/components/admin/AdminThemeProvider";

export const metadata = {
  title: "Login | Adibayu Group",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <AdminThemeProvider defaultTheme="light" respectStoredTheme={false}>
      <LoginForm initialError={error} />
    </AdminThemeProvider>
  );
}
