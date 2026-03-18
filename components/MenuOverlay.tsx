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
import { isSubsystemDisabled } from "@/lib/runtime-debug";

import menuCity from "./assets/menu/company-2.jpg";
import adibayuLogo from "./assets/logos/adibayu-1.png";
import adibayunavyLogo from "./assets/logos/adibayu-white-group.png";

function normalizePathname(value: string) {
  const base = value.split("?")[0].replace(/\/$/, "") || "/";
  const withoutLocale = base.replace(/^\/(id|en)(?=\/|$)/, "") || "/";
  return withoutLocale === "" ? "/" : withoutLocale;
}

export default function MenuOverlay() {
  const menuDisabled =
    typeof window !== "undefined" ? isSubsystemDisabled("menuOverlay") : false;

  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = copy[locale].navbar;

  const links = [
    { name: "Home", href: "/", newTab: false },
    { name: t.whoWeAre, href: "/about", newTab: false },
    { name: t.governance, href: "/governance", newTab: false },
    { name: t.insights.trim(), href: "/news", newTab: false },
    { name: "Career", href: "/career", newTab: true },
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

  const contact = { email: "info@adibayu.co.id", phone: "+62 811 2701 2524" };
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = normalizePathname(pathname);
  const isActiveLink = useCallback(
    (href: string) =>
      href === "/" ? currentPath === "/" : currentPath.startsWith(href),
    [currentPath],
  );

  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const socialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const mobileExtrasRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // OPTIMASI 1: Inisialisasi Timeline dengan gsap.context (Anti Memory Leak)
  useEffect(() => {
    if (menuDisabled || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      // Mengurangi jarak pergerakan animasi (30 -> 20) agar di mobile terasa ringan
      gsap.set(linksRef.current, { x: 20, autoAlpha: 0 });
      gsap.set(
        [socialsRef.current, contactRef.current, mobileExtrasRef.current],
        { y: 15, autoAlpha: 0 },
      );

      tl.current = gsap
        .timeline({ paused: true })
        .set(overlayRef.current, { pointerEvents: "auto" })
        .to(overlayRef.current, {
          autoAlpha: 1,
          duration: 0.3,
          ease: "linear", // OPTIMASI 2: Linear sangat smooth untuk Opacity Fade-In
        })
        .to(
          linksRef.current,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.35,
            stagger: 0.04,
            ease: "power3.out",
          },
          "-=0.15",
        )
        .to(
          [contactRef.current, socialsRef.current, mobileExtrasRef.current],
          { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" },
          "-=0.2",
        );
    }, overlayRef);

    return () => {
      ctx.revert();
      tl.current = null;
    };
  }, [menuDisabled]);

  // OPTIMASI 3: Play & Reverse Control yang Bebas dari Layout Thrashing
  useEffect(() => {
    if (menuDisabled || !tl.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      tl.current.timeScale(1).play();
    } else {
      tl.current
        .timeScale(1.5) // OPTIMASI 4: Animasi menutup 1.5x LEBIH CEPAT (Menghilangkan kesan delay)
        .reverse()
        .eventCallback("onReverseComplete", () => {
          // OVERFLOW HANYA DIKEMBALIKAN SETELAH ANIMASI SELESAI (Penyelamat Lag iOS)
          document.body.style.overflow = "";
          gsap.set(overlayRef.current, { pointerEvents: "none" });
        });
    }
  }, [isOpen, menuDisabled]);

  // Pengaman saat komponen di-unmount paksa
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleLinkClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href: string,
    newTab?: boolean,
  ) => {
    if (newTab) {
      event.preventDefault();
      window.open(href, "_blank");
      setIsOpen(false);
      return;
    }

    const isExternal = /^https?:\/\//.test(href);
    if (isActiveLink(href)) {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (!isExternal) {
      event.preventDefault();
      setIsOpen(false);

      if (typeof document !== "undefined")
        document.body.style.pointerEvents = "none";

      window.dispatchEvent(new Event("adb-route-start"));

      // Menunggu animasi tutup menu (sekitar 260ms) selesai baru melakukan routing
      setTimeout(() => {
        router.push(href);
        setTimeout(() => {
          if (typeof document !== "undefined")
            document.body.style.pointerEvents = "auto";
        }, 1000);
      }, 350);
      return;
    }

    setIsOpen(false);
  };

  if (menuDisabled) return null;

  return (
    <>
      <div className="fixed top-4 right-4 md:top-6 md:right-8 z-[999] flex items-center gap-3 pointer-events-none">
        <LanguageToggle />
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          // OPTIMASI 5: translateZ(0) memaksa Browser membuat Layer Composite khusus, sangat ringan!
          className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 bg-white md:bg-white/90 md:backdrop-blur-md border border-black/5 shadow-md md:shadow-lg flex items-center justify-center text-navy rounded-full hover:scale-105 hover:bg-white transition-all duration-300"
          style={{ transform: "translateZ(0)" }}
        >
          {isOpen ? (
            <X size={30} strokeWidth={2.5} />
          ) : (
            <Menu size={30} strokeWidth={2.5} />
          )}
        </button>
      </div>

      <div
        ref={overlayRef}
        // OPTIMASI 6: transform-gpu memastikan seluruh lapisan overlay ditangani oleh Graphic Card
        className="fixed inset-0 z-[90] bg-navy overflow-hidden opacity-0 invisible font-sans transform-gpu will-change-[opacity]"
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-12 relative">
          <div className="relative hidden md:block md:col-span-6">
            <Image
              src={menuCity}
              alt="Menu background"
              fill
              priority
              className="object-cover opacity-80"
              sizes="50vw"
            />
            <Link
              href="/"
              className="absolute top-8 left-8 xl:top-12 xl:left-12 z-20 transition-transform hover:scale-105"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={adibayuLogo}
                alt="Logo"
                width={120}
                height={44}
                className="w-auto h-12 md:h-16 object-contain"
              />
            </Link>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-navy/40 to-navy/95" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
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
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={false}
                  ref={(el) => {
                    if (el) linksRef.current[i] = el;
                  }}
                  onClick={(event) =>
                    handleLinkClick(event, link.href, link.newTab)
                  }
                  target={
                    link.newTab || /^https?:\/\//.test(link.href)
                      ? "_blank"
                      : undefined
                  }
                  className={`uppercase font-light tracking-[0.08em] md:tracking-[0.12em] text-[32px] transition-colors duration-300 transform-gpu will-change-[transform,opacity] ${
                    isActiveLink(link.href)
                      ? "text-[#dcb678]"
                      : "text-white hover:text-[#dcb678]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div
              ref={mobileExtrasRef}
              className="mt-auto w-full md:hidden flex flex-col gap-6 pt-12 text-white transform-gpu will-change-[transform,opacity]"
            >
              <div>
                <div className="flex items-center gap-3 text-sm mb-4">
                  <Mail size={16} className="text-[#dcb678]" />
                  <a
                    className="hover:text-[#dcb678] transition-colors"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-[#dcb678]" />
                  <a
                    className="hover:text-[#dcb678] transition-colors"
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#dcb678] hover:text-navy transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div
              ref={contactRef}
              className="hidden md:block absolute bottom-8 right-8 lg:bottom-12 lg:right-16 text-right text-white transform-gpu will-change-[transform,opacity]"
            >
              <a
                className="block text-sm lg:text-base hover:text-[#dcb678] transition-colors mb-2"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
              <a
                className="block text-sm lg:text-base hover:text-[#dcb678] transition-colors"
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
              >
                {contact.phone}
              </a>
            </div>
          </div>

          {/* SOCIAL ICONS DESKTOP */}
          <div
            ref={socialsRef}
            className="hidden md:flex absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 items-center gap-4 z-50 transform-gpu will-change-[transform,opacity]"
          >
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-[#dcb678] hover:text-navy hover:-translate-y-1 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
