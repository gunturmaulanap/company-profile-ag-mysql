"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Music,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  ChevronRight,
} from "lucide-react";
import footerLogo from "./assets/logos/adibayu-white-group.png";
import LanguageToggle from "./LanguageToggle";
import { copy } from "@/lib/translations";
import type { Locale } from "@/lib/i18n";
import wavePattern from "./assets/footer/wave-pattern-crop.svg";

type FooterProps = {
  isDarkMode?: boolean;
  locale?: Locale;
};

export default function Footer({ locale = "id" }: FooterProps) {
  const t = copy[locale].home.footer;
  return (
    <footer className="w-full px-4 md:px-8 py-12   home-footer-shell text-white relative overflow-hidden">
      {/* Wave pattern di kanan atas */}
      <div className="absolute top-0 right-0 w-48 h-48 md:w-4 md:h-4 lg:w-82 lg:h-82 opacity-10 pointer-events-none z-0">
        <Image
          src={wavePattern}
          alt="Wave pattern decoration"
          fill
          className="object-cover object-right-top"
        />
      </div>

      {/* Wave pattern di kiri bawah (rotasi 180 derajat) */}
      <div className="absolute bottom-0 left-0 w-32 h-32 w-48 h-48 md:w-64 md:h-64 lg:w-82 lg:h-82 opacity-10 pointer-events-none z-0 rotate-180">
        <Image
          src={wavePattern}
          alt="Wave pattern decoration"
          fill
          className="object-cover object-left-bottom"
        />
      </div>

      <div className="flex flex-col lg:flex-row w-full p-8 md:p-12 lg:p-16 gap-12 lg:gap-16 items-center lg:items-stretch relative z-10">
        <div className="w-full lg:w-[45%] relative  overflow-hidden min-h-[300px] lg:min-h-[400px] flex-shrink-0 shadow-lg group">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
            alt="Global Corporate Business"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8"></div>
        </div>

        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          <div className="mb-6 flex items-start justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {t.connectTitle} <br className="hidden md:block" />
              {locale === "en" ? "with Us" : "Bersama Kami"}
            </h2>

            {/* <LanguageToggle /> */}
          </div>

          <p className="text-lg md:text-xl text-white/90 max-w-md mb-10 leading-relaxed font-light">
            {t.connectDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <SocialLink
              href="https://instagram.com/adibayu.group"
              icon={<Instagram className="w-4 h-4" />}
              ariaLabel="Instagram"
            />
            {/* <SocialLink
                href="https://tiktok.com"
                icon={<Music className="w-4 h-4" />}
                ariaLabel="TikTok"
              />
              <SocialLink
                href="https://twitter.com"
                icon={<Twitter className="w-4 h-4" />}
                ariaLabel="X"
              /> */}
            <SocialLink
              href="https://facebook.com"
              icon={<Facebook className="w-4 h-4" />}
              ariaLabel="Facebook"
            />
            <SocialLink
              href="https://linkedin.com"
              icon={<Linkedin className="w-4 h-4" />}
              ariaLabel="LinkedIn"
            />
            <SocialLink
              href="https://youtube.com"
              icon={<Youtube className="w-4 h-4" />}
              ariaLabel="YouTube"
            />

            <div className="ml-auto w-full sm:w-auto mt-4 sm:mt-0">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-white text-blue-600 px-8 py-3.5 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                {t.contactUs}
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* <div className="flex items-center gap-4 text-sm font-medium text-white/80 mt-auto">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-white hover:underline underline-offset-4 transition-all"
            >
              {t.legalLinks[0]}
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/60" />
            <Link
              href={`/${locale}/terms`}
              className="hover:text-white hover:underline underline-offset-4 transition-all"
            >
              {t.legalLinks[1]}
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  ariaLabel,
}: {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="w-11 h-11 rounded-full bg-white text-blue-600 flex items-center justify-center hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      {icon}
    </Link>
  );
}
