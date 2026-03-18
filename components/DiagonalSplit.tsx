"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import holdingImage from "./assets/hero/adibayu-bg.jpg";

interface DiagonalSplitProps {
  headline: string;
  imageSrc: string;
}

export default function DiagonalSplit({
  headline,
  imageSrc,
}: DiagonalSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 },
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" },
      );

      gsap.fromTo(
        dividerRef.current,
        { xPercent: -100, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-hidden "
    >
      {/* Right/Bottom Image Panel */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full md:w-[70%] md:left-[30%] z-0"
      >
        <Image
          src={holdingImage}
          alt="Hero"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Diagonal Divider (White) */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-0 w-full h-[70%] md:h-full md:w-[60%] z-10 origin-left"
      >
        {/* Desktop clip path override via CSS class */}
        <style jsx>{`
          div {
            clip-path: polygon(0 0, 100% 0, 100% 60%, 0% 100%);
          }
          @media (min-width: 768px) {
            div {
              clip-path: polygon(0 0, calc(50% + 15vh) 0, calc(50% - 15vh) 100%, 0% 100%) !important;
            }
          }
        `}</style>
        {/* Subtle pattern lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #000000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-20 lg:px-32 pointer-events-none">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-[100px] leading-[0.9] font-thin text-white whitespace-pre-line max-w-4xl mt-[-10vh] md:mt-0"
        >
          {headline}
        </h1>
      </div>

      {/* Bottom Labels */}
      <div className="absolute bottom-10 left-6 md:left-20 lg:left-32 z-20 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center animate-bounce">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
