"use client";

import { useTransition, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/lib/i18n";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/lib/i18n";

const LOCALES: Locale[] = ["id", "en"];

// KUNCI GLOBAL (Instan, kebal Spam Klik!)
let isGlobalSwapping = false;

export default function LanguageToggle() {
  const { locale } = useLocale();
  const rawPathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [localLock, setLocalLock] = useState(false);

  // BUKA KUNCI OTOMATIS setelah Next.js selesai me-render bahasa
  useEffect(() => {
    if (isGlobalSwapping) {
      const timer = setTimeout(() => {
        isGlobalSwapping = false;
        setLocalLock(false);
        if (typeof document !== "undefined") {
          document.body.style.pointerEvents = "auto";
        }
        // Beri tahu InitialLoadGate & Homepage bahwa bahasa baru sudah siap
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("adb-locale-change-end"));
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [locale]);

  const handleSwitch = (nextLocale: Locale) => {
    // 1. BLOKIR MUTLAK
    if (isGlobalSwapping || nextLocale === locale || isPending) return;

    isGlobalSwapping = true;
    setLocalLock(true);

    // 2. KUNCI FISIK: Layar iPhone beku, tidak bisa di-spam klik
    if (typeof document !== "undefined") {
      document.body.style.pointerEvents = "none";
    }

    // 3. MUNCULKAN LAYAR PUTIH & HANCURKAN GAMBAR HOMEPAGE
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("adb-locale-change-start"));
    }

    // 4. JEDA 150ms agar DOM hancur & layar memutih sempurna, lalu eksekusi perubahan teks
    setTimeout(() => {
      startTransition(() => {
        router.replace(
          {
            pathname: rawPathname,
            query: Object.fromEntries(searchParams.entries()),
          },
          { locale: nextLocale, scroll: false },
        );
      });

      if (typeof document !== "undefined") {
        document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem("lang", nextLocale);
        window.localStorage.setItem("locale", nextLocale);
      }

      // FAILSAFE: Jika jaringan ngadat di tengah jalan
      setTimeout(() => {
        if (isGlobalSwapping) {
          isGlobalSwapping = false;
          setLocalLock(false);
          if (typeof document !== "undefined")
            document.body.style.pointerEvents = "auto";
          if (typeof window !== "undefined")
            window.dispatchEvent(new Event("adb-locale-change-end"));
        }
      }, 3500);
    }, 150);
  };

  return (
    <div className="pointer-events-auto inline-flex items-center gap-1 p-2 bg-[#E6E6E6] rounded-full shadow-sm">
      {LOCALES.map((item) => {
        const active = item === locale;
        const isDisabled = isPending || localLock;

        return (
          <button
            key={item}
            type="button"
            aria-pressed={active}
            onClick={() => handleSwitch(item)}
            disabled={isDisabled}
            className={`w-12 h-12 rounded-full font-semibold text-[#101214] transition-all duration-300 ${
              active ? "bg-white shadow" : "hover:bg-white/80"
            } ${isDisabled && !active ? "opacity-50 cursor-wait" : ""}`}
            suppressHydrationWarning
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
