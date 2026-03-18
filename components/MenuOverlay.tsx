"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import gsap from "gsap";

import LanguageToggle from "@/components/LanguageToggle";
import { Link, useRouter } from "@/i18n/navigation";
import { useLocale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

import menuCity from "./assets/menu/company-2.jpg";
import adibayuLogo from "./assets/logos/adibayu-1.png";
import adibayunavyLogo from "./assets/logos/adibayu-white-group.png";

function normalizePathname(value: string) {
  const base = value.split("?")[0].replace(/\/$/, "") || "/";
  const withoutLocale = base.replace(/^\/(id|en)(?=\/|$)/, "") || "/";
  return withoutLocale === "" ? "/" : withoutLocale;
}

export default function MenuOverlay() {
  const { locale } = useLocale();
  const router = useRouter();
  const rawPathname = usePathname();
  const pathname = normalizePathname(rawPathname);
  const t = copy[locale].navbar;

  // Penambahan properti newTab pada array links
  const links = [
    { name: "Home", href: "/", newTab: false },
    { name: t.whoWeAre, href: "/about", newTab: false },
    // { name: t.governance, href: "/governance", newTab: false },
    { name: t.insights.trim(), href: "/news", newTab: false },
    // { name: "Career", href: "/career", newTab: true },
    { name: "Contact", href: "/contact", newTab: true },
  ];

  const socials = [
    {
      label: "Instagram",
      href: "https://instagram.com/adibayu.group",
      Icon: Instagram,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/adibayu-group",
      Icon: Linkedin,
    },
  ];

  const contact = { email: "info@adibayu.co.id", phone: "+6281127012524" };
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = normalizePathname(pathname);
  const isActiveLink = useCallback(
    (href: string) =>
      href === "/" ? currentPath === "/" : currentPath === href,
    [currentPath],
  );

  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.set(overlayRef.current, {
      autoAlpha: 0,
      xPercent: 100,
      pointerEvents: "none",
    });
    gsap.set(linksRef.current, { y: 26, autoAlpha: 0 });

    tl.current = gsap
      .timeline({ paused: true })
      .set(overlayRef.current, { pointerEvents: "auto" })
      .to(overlayRef.current, {
        autoAlpha: 1,
        xPercent: 0,
        duration: 0.8,
        ease: "power3.inOut",
      })
      .to(
        linksRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.35",
      );
    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.current.play();
    } else {
      document.body.style.overflow = "";
      tl.current.reverse().eventCallback("onReverseComplete", () => {
        gsap.set(overlayRef.current, { pointerEvents: "none" });
      });
    }
  }, [isOpen]);

  // PERBAIKAN: Menambahkan parameter `newTab` ke dalam fungsi
  const handleLinkClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
    newTab: boolean,
  ) => {
    // Jika link yang diklik adalah halaman yang sedang aktif dan bukan new tab, abaikan saja
    if (isActiveLink(href) && !newTab) {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    event.preventDefault();
    setIsOpen(false);

    const isExternal = /^https?:\/\//.test(href) || newTab;

    if (isExternal) {
      // 1. SKENARIO TAB BARU (NEW TAB / EXTERNAL)
      // Dijalankan secara instan (tanpa setTimeout) agar tidak diblokir Pop-up Blocker iOS/Safari
      // Tidak memanggil event loading karena tab saat ini tidak akan ditutup
      window.open(href, "_blank");
      return;
    }

    // 2. SKENARIO ROUTING INTERNAL
    // Kunci layar agar aman dari spam klik
    if (typeof document !== "undefined")
      document.body.style.pointerEvents = "none";

    // Munculkan Lottie Loading
    window.dispatchEvent(new Event("adb-route-start"));

    setTimeout(() => {
      // Pindah halaman secara SPA (Soft Navigation) di belakang Lottie Loading!
      router.push(href);

      // Failsafe: Buka kembali kunci layar setelah transisi aman
      setTimeout(() => {
        if (typeof document !== "undefined")
          document.body.style.pointerEvents = "auto";
      }, 1500);
    }, 450); // Jeda agar Lottie menutupi layar sepenuhnya sebelum pindah halaman
  };

  return (
    <>
      <div className="fixed top-4 right-4 md:top-4 md:right-4 z-[999] flex items-center gap-3 pointer-events-none">
        <LanguageToggle />
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="pointer-events-auto w-15 h-15 bg-white/90 backdrop-blur border border-black/10 flex items-center justify-center text-[#1b2c4e] rounded-full hover:scale-105 transition-transform duration-300"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-navy overflow-hidden opacity-0 invisible"
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-12">
          <div className="relative hidden md:block md:col-span-6">
            <Image
              src={menuCity}
              alt="Menu bg"
              fill
              loading="lazy"
              className="object-cover"
              sizes="50vw"
            />
            <a
              href="/"
              className="absolute top-6 left-6 md:top-8 md:left-8 z-20"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={adibayuLogo}
                alt="Logo"
                width={120}
                height={44}
                className="w-auto h-12 md:h-16 object-contain"
              />
            </a>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#011f37]/30 to-[#011f37]/85" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#011f37] via-[#011f37]/40 to-transparent" />
          </div>

          <div className="relative col-span-1 md:col-span-6 flex flex-col justify-center items-center md:items-end px-8 py-24 md:pb-32 md:pt-20">
            <div className="absolute top-6 left-6 z-20 md:hidden">
              <Image
                src={adibayunavyLogo}
                alt="Logo"
                width={140}
                height={52}
                className="w-auto h-10 object-contain"
              />
            </div>
            <nav className="flex flex-col items-start md:items-end gap-5 md:gap-3 w-full mt-12 md:mt-0">
              {links.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  ref={(el) => {
                    if (el) linksRef.current[i] = el;
                  }}
                  // PERBAIKAN: Mengoper parameter link.newTab ke fungsi
                  onClick={(e) => handleLinkClick(e, link.href, link.newTab)}
                  className={`uppercase font-light tracking-[0.08em] md:tracking-[0.12em] text-[32px] transition-colors duration-300 ${isActiveLink(link.href) ? "text-[#dcb678]" : "text-white hover:text-[#dcb678]"}`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-auto w-full text-white md:hidden">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={18} className="text-[#dcb678]" />
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-[#dcb678]" />
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
