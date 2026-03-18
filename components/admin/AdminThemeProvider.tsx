"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AdminTheme = "light" | "dark";

type AdminThemeContextValue = {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
  toggleTheme: () => void;
};

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

const ADMIN_THEME_STORAGE_KEY = "admin-theme";

function getStoredTheme(): AdminTheme | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(ADMIN_THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {}

  return null;
}

function setStoredTheme(theme: AdminTheme) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(ADMIN_THEME_STORAGE_KEY, theme);
  } catch {}
}

function getSystemTheme(): AdminTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: AdminTheme) {
  if (typeof document === "undefined") return;

  const htmlRoot = document.documentElement;
  const adminRoot = document.querySelector<HTMLElement>(".admin-theme-root");

  htmlRoot.classList.remove("light", "dark");
  htmlRoot.classList.add(theme);
  htmlRoot.style.colorScheme = theme;

  if (adminRoot) {
    adminRoot.classList.remove("light", "dark");
    adminRoot.classList.add(theme);
    adminRoot.style.colorScheme = theme;
  }
}

export type { AdminTheme };

export function useAdminTheme(): AdminThemeContextValue {
  const context = useContext(AdminThemeContext);

  if (!context) {
    // Return default values instead of throwing error
    return {
      theme: "light",
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }

  return context;
}

export function AdminThemeProvider({
  children,
  defaultTheme = "system",
  respectStoredTheme = true,
}: {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  respectStoredTheme?: boolean;
}) {
  const [theme, setThemeState] = useState<AdminTheme>("light");

  useEffect(() => {
    const storedTheme = respectStoredTheme ? getStoredTheme() : null;
    const initialTheme =
      storedTheme ??
      (defaultTheme === "system" ? getSystemTheme() : defaultTheme);

    setThemeState(initialTheme);
    applyTheme(initialTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (event: MediaQueryListEvent) => {
      const stored = respectStoredTheme ? getStoredTheme() : null;

      if (!stored && defaultTheme === "system") {
        const nextTheme: AdminTheme = event.matches ? "dark" : "light";
        setThemeState(nextTheme);
        applyTheme(nextTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [defaultTheme, respectStoredTheme]);

  const setTheme = useCallback((nextTheme: AdminTheme) => {
    setThemeState(nextTheme);
    setStoredTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <AdminThemeContext.Provider value={value}>
      {children}
    </AdminThemeContext.Provider>
  );
}
