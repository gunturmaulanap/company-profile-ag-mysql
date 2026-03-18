"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: 1,
    title: "Empowering Communities",
    text: "We enable access to better opportunities through inclusive systems and services.",
    image: "https://picsum.photos/seed/community/800/1000",
  },
  {
    id: 2,
    title: "Enabling Industry",
    text: "We strengthen industries through operational and technological innovation.",
    image: "https://picsum.photos/seed/industry/800/1000",
  },
  {
    id: 3,
    title: "Connecting Markets",
    text: "We bridge producers and consumers through integrated networks.",
    image: "https://picsum.photos/seed/distribution/800/1000",
  },
  {
    id: 4,
    title: "Serving Everyday Needs",
    text: "We bring accessible solutions closer to daily life.",
    image: "https://picsum.photos/seed/retail/800/1000",
  },
  {
    id: 5,
    title: "Creating Lasting Impact",
    text: "Our ecosystem ultimately contributes to long-term societal progress.",
    image: "https://picsum.photos/seed/impact/800/1000",
  },
];

export default function SectionTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const swiperRef = useRef<any>(null);

  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(
      window.innerWidth < 1024 ||
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    );
  }, []);

  useEffect(() => {
    // PERBAIKAN 1: GSAP DIMATIKAN DI IOS
    if (!containerRef.current || isIOS) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isIOS]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-navy py-32 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 lg:px-32 mb-16">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-thin text-white"
        >
          Transformation
        </h2>
      </div>

      <div className="w-full pl-6 md:pl-20 lg:pl-32">
        {/* PERBAIKAN 2: JIKA IOS, GUNAKAN NATIVE SCROLL (0% RAM BEBAN). JIKA DESKTOP, GUNAKAN SWIPER */}
        {isIOS ? (
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="relative w-[75vw] sm:w-[45vw] shrink-0 aspect-[4/5] snap-center overflow-hidden bg-navy"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  quality={20} // KOMPRESI EKSTREM IOS
                  sizes="75vw"
                  className="object-cover opacity-80"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-white/90 font-light leading-relaxed">
                    {slide.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode={{ enabled: true, momentum: true }}
            loop={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView={1.2}
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 2.5, spaceBetween: 40 },
              1024: { slidesPerView: 3.5, spaceBetween: 40 },
            }}
            className="w-full !overflow-visible"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onTouchStart={() => {
              if (swiperRef.current?.autoplay)
                swiperRef.current.autoplay.stop();
            }}
            onTouchEnd={() => {
              if (swiperRef.current?.autoplay) {
                setTimeout(() => {
                  swiperRef.current?.autoplay.start();
                }, 2000);
              }
            }}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="!h-auto">
                <div className="relative w-full aspect-[4/5] group overflow-hidden bg-navy">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 1024px) 30vw, 20vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-sm text-white/70 font-light leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {slide.text}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Custom Scrollbar Track - Disembunyikan di Mobile agar bersih */}
      {!isIOS && (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-20 lg:px-32 mt-16 hidden md:block">
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-white/40 w-1/3 animate-[slide_10s_linear_infinite]" />
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `,
        }}
      />
    </section>
  );
}
