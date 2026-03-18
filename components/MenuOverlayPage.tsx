"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
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

import LanguageToggle from "@/components/LanguageToggle";
import { Link } from "@/i18n/navigation";
import { useLocale } from "@/lib/i18n";
import { copy } from "@/lib/translations";

// ✅ GANTI dengan gambar kamu (kiri)
import menuCity from "./assets/menu/company-2.jpg";
import adibayuLogo from "./assets/logos/adibayu-1.png";
import adibayuMenu from "./assets/logos/adibayu-x.png";
import adibayuWhiteLogo from "./assets/logos/adibayu-white-group.png";

export default function MenuOverlayPage() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const t = copy[locale].navbar;

  const links = [
    { name: "Home", href: "/", newTab: false },
    { name: t.whoWeAre, href: "/about", newTab: false },
    { name: t.governance, href: "/governance", newTab: false },
    { name: t.insights.trim(), href: "/news", newTab: false },
    { name: "Career", href: "/career", newTab: false },
    { name: "Contact", href: "/contact", newTab: false },
  ];

  // ✅ replace href social sesuai kebutuhan
  const socials = [
    { label: "Instagram", href: "#", Icon: Instagram },
    { label: "LinkedIn", href: "#", Icon: Linkedin },
    { label: "YouTube", href: "#", Icon: Youtube },
    { label: "Facebook", href: "#", Icon: Facebook },
  ];

  // ✅ ganti sesuai kebutuhan
  const contact = {
    email: "info@adibayu.co.id",
    phone: "+6281127012524",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const socialsRef = useRef<HTMLDivElement>(null);
  const socialsMobileRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const contactMobileRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    // initial state (hidden + off-canvas)
    gsap.set(overlayRef.current, {
      autoAlpha: 0,
      xPercent: 100,
      pointerEvents: "none",
    });

    gsap.set(linksRef.current, { y: 26, autoAlpha: 0 });
    gsap.set(
      [
        socialsRef.current,
        socialsMobileRef.current,
        contactRef.current,
        contactMobileRef.current,
      ],
      {
        y: 14,
        autoAlpha: 0,
      },
    );

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
      )
      .to(
        [
          socialsRef.current,
          socialsMobileRef.current,
          contactRef.current,
          contactMobileRef.current,
        ],
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.25",
      );

    return () => {
      tl.current?.kill();
      tl.current = null;
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Helper function to check if link is active
  const normalizePathname = (value: string) => {
    const base = value.split("?")[0].replace(/\/$/, "") || "/";
    const withoutLocale = base.replace(/^\/(id|en)(?=\/|$)/, "") || "/";
    return withoutLocale === "" ? "/" : withoutLocale;
  };

  const currentPath = normalizePathname(pathname);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath === href;
  };

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const onHome = href === "/";
    const isAlreadyHome = onHome && isActiveLink("/");

    if (isAlreadyHome) {
      event.preventDefault();
    }

    setIsOpen(false);
  };

  return (
    <>
      {/* Sticky Logo Bar - Fixed at top-left with white background */}
      <Link
        href="/"
        className={`hidden md:block pointer-events-auto fixed top-0 left-0 ${isOpen ? "z-[-1]" : "z-[1400]"} max-w-[calc(100vw-5rem)] overflow-hidden bg-white border-r border-b border-black/10 md:w-auto rounded-br-[40px] transition-all duration-300 ${
          isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        } ${isOpen ? "opacity-0 pointer-events-none" : ""}`}
        style={{ padding: "0.6rem 0.5rem", marginLeft: "0" }}
      >
        {/* Desktop Logo */}
        <Image
          src={adibayuMenu}
          alt="Adibayu Group"
          width={400}
          height={300}
          className="hidden md:block w-auto h-12"
        />
      </Link>

      {/* Top-right controls */}
      <div className="fixed top-4 right-4 md:top-4 md:right-4 z-[999] flex items-center gap-3 pointer-events-none">
        <LanguageToggle />

        <button suppressHydrationWarning
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="pointer-events-auto w-15 h-15 bg-white/90 backdrop-blur border border-black/10 shadow-sm flex items-center justify-center text-[#1b2c4e] rounded-full hover:scale-105 transition-transform duration-300"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-navy overflow-hidden opacity-0 invisible font-[var(--font-neue-montreal)]"
      >
        <div className="grid h-full grid-cols-1 md:grid-cols-12">
          {/* LEFT IMAGE (hidden on mobile) */}
          <div className="relative hidden md:block md:col-span-6">
            <Image
              src={menuCity}
              alt="Menu background"
              fill
              priority
              className="object-cover"
              sizes="50vw"
            />

            {/* Logo di pojok kiri - Desktop */}
            <Link
              href="/"
              className="absolute top-6 left-6 md:top-8 md:left-8 z-20"
              onClick={() => setIsOpen(false)}
            >
              <Image
                src={adibayuLogo}
                alt="Adibayu Logo"
                width={120}
                height={44}
                className="w-auto h-12 md:h-16 object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] hover:opacity-80 transition-opacity duration-200"
                priority
              />
            </Link>

            {/* Fog fade to navy (right) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#011f37]/30 to-[#011f37]/85" />
            {/* Fade to navy (bottom) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#011f37] via-[#011f37]/40 to-transparent" />
          </div>

          {/* MOBILE MENU AREA */}
          <div className="relative col-span-1 md:hidden flex flex-col pl-12 pr-6 py-24">
            {/* Logo di pojok kiri atas - Mobile */}
            <div className="absolute top-6 left-6 z-20">
              <Image
                src={adibayuWhiteLogo}
                alt="Adibayu Logo"
                width={140}
                height={52}
                className="w-auto h-10 object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                priority
              />
            </div>

            {/* Menu - Mobile (lebih ke kanan, lebih besar) */}
            <div className="flex flex-1 items-center justify-center mt-12">
              <nav className="flex flex-col items-start gap-5 w-full mb-12">
                {links.map((link, i) => {
                  const isActive = isActiveLink(link.href);
                  const isExternal = /^https?:\/\//.test(link.href);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      ref={(el) => {
                        if (el) linksRef.current[i] = el;
                      }}
                      onClick={(event) => handleLinkClick(event, link.href)}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className={`
                        uppercase
                        font-light
                        tracking-[0.08em]
                        leading-[1.1]
                        text-[32px]
                        transition-colors duration-300
                        ${isActive ? "text-[#dcb678]" : "text-white hover:text-[#dcb678]"}
                      `}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Contact info - Mobile (di bawah menu) */}
            <div ref={contactMobileRef} className="text-white mb-6">
              <div className="flex items-center gap-2 text-base mb-3">
                <Mail size={18} className="text-[#dcb678]" />
                <a className="hover:underline" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-base">
                <Phone size={18} className="text-[#dcb678]" />
                <a className="hover:underline" href={`tel:${contact.phone}`}>
                  {contact.phone}
                </a>
              </div>
            </div>

            {/* Social icons - Mobile (di bawah contact info) */}
            <div
              ref={socialsMobileRef}
              className="flex items-center justify-start gap-3 pb-8"
            >
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 flex items-center justify-center hover:scale-105 hover:bg-white/30 transition-all duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT MENU AREA - Desktop */}
          <div className="relative col-span-1 md:col-span-6 hidden md:flex flex-col">
            {/* Menu center */}
            <div className="flex flex-1 items-center justify-end px-8 md:px-20 pb-28 md:pb-32 pt-20">
              <nav className="flex flex-col items-end gap-2 md:gap-3 font-neue-montreal">
                {links.map((link, i) => {
                  const isActive = isActiveLink(link.href);
                  const isExternal = /^https?:\/\//.test(link.href);

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      ref={(el) => {
                        if (el) linksRef.current[i] = el;
                      }}
                      onClick={(event) => handleLinkClick(event, link.href)}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className={`
                        uppercase
                        font-light
                        tracking-[0.12em]
                        leading-[1.1]
                        text-[24px] md:text-[32px]
                        transition-colors duration-300
                        ${isActive ? "text-[#dcb678]" : "text-white hover:text-[#dcb678]"}
                      `}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Contact info (bottom-right) - Desktop */}
            <div
              ref={contactRef}
              className="absolute bottom-10 right-6 md:right-10 text-white"
            >
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Mail size={18} className="text-[#dcb678]" />
                <a className="hover:underline" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm md:text-base">
                <Phone size={18} className="text-[#dcb678]" />
                <a className="hover:underline" href={`tel:${contact.phone}`}>
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Social icons (centered between left and right columns) - Desktop only */}
          <div
            ref={socialsRef}
            className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 items-center justify-center gap-3 z-50"
          >
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 flex items-center justify-center hover:scale-105 hover:bg-white/30 transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
