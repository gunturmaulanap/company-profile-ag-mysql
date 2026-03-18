"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import adibayuLogo from "./assets/logos/adibayu-logo.png";

gsap.registerPlugin(ScrollTrigger);

export default function SectionContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        },
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="w-full min-h-screen bg-white text-navy flex flex-col justify-between pt-32"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 lg:px-32 flex-grow flex flex-col md:flex-row gap-20">
        {/* Left Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-navy/50 mb-4">
            Get in touch
          </p>
          <h2 className="text-5xl md:text-7xl font-thin leading-[1.1] text-navy mb-12">
            Contact us
          </h2>

          <form ref={formRef} className="flex flex-col gap-8 max-w-md">
            <div className="relative border-b border-navy/20 pb-2">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent text-navy placeholder:text-navy/40 focus:outline-none font-light text-lg"
              />
            </div>
            <div className="relative border-b border-navy/20 pb-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent text-navy placeholder:text-navy/40 focus:outline-none font-light text-lg"
              />
            </div>
            <div className="relative border-b border-navy/20 pb-2">
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full bg-transparent text-navy placeholder:text-navy/40 focus:outline-none font-light text-lg resize-none"
              />
            </div>
            <button
              type="button"
              className="mt-8 w-fit flex items-center gap-4 text-navy hover:text-accent-blue transition-colors duration-300 group"
            >
              <div className="w-12 h-12 rounded-full border border-navy/20 flex items-center justify-center group-hover:border-accent-blue transition-colors duration-300">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-sm uppercase tracking-widest font-semibold">
                Send Message
              </span>
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 h-[500px] md:h-auto relative overflow-hidden">
          <div ref={imageRef} className="absolute inset-0 w-full h-full">
            <Image
              src="https://picsum.photos/seed/office/1920/1080"
              alt="Office"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="w-full text-white mt-32 py-12"
        style={{ backgroundColor: "#aaaaaa" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20 lg:px-32 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="pointer-events-auto">
            <Image
              src={adibayuLogo}
              alt="Adibayu Group"
              width={350}
              height={100}
              className="w-auto h-22 md:h-32"
            />
          </div>
          <div className="text-xs font-light text-white/50">
            &copy; {new Date().getFullYear()} Adibayu Group. All rights
            reserved.
          </div>
          <div className="flex gap-6 text-xs font-light text-white/50">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
