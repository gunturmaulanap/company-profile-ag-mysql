"use client";

import type { ReactNode } from "react";
import { useLocale as useNextIntlLocale } from "next-intl";

export type Locale = "en" | "id";

export function LocaleProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useLocale() {
  const locale = useNextIntlLocale() as Locale;
  return { locale };
}
