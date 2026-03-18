"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsapClient";
import "./css/ScrollReveal.css";

type ScrollRevealProps = {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  wordStagger?: number;
};

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom 40%",
  wordStagger = 0.12,
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  // DETEKSI IPHONE UNTUK MENYELAMATKAN GPU
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    setIsIOS(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    ensureGsapPlugins();
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;
    const triggers: ScrollTrigger[] = [];

    // KHUSUS IPHONE: MATIKAN BLUR KARENA BLUR PER KATA AKAN MEMBUAT IPHONE CRASH (OOM)
    const useBlur = enableBlur && !isIOS;

    const rotationTween = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      },
    );
    if (rotationTween.scrollTrigger) triggers.push(rotationTween.scrollTrigger);

    const wordElements = el.querySelectorAll(".word");

    // PERBAIKAN MUTLAK IOS: Hapus willChange dari JS agar GPU tidak dipaksa merender ratusan layer
    gsap.set(wordElements, {
      opacity: baseOpacity,
      filter: useBlur ? `blur(${blurStrength}px)` : "none",
    });

    const opacityTween = gsap.to(wordElements, {
      ease: "none",
      opacity: 1,
      stagger: { each: wordStagger, from: "start" },
      scrollTrigger: {
        trigger: el,
        scroller,
        start: "top 92%",
        end: wordAnimationEnd,
        scrub: 0.9,
      },
    });
    if (opacityTween.scrollTrigger) triggers.push(opacityTween.scrollTrigger);

    if (useBlur) {
      const blurTween = gsap.to(wordElements, {
        ease: "none",
        filter: "blur(0px)",
        force3D: true,
        stagger: { each: wordStagger, from: "start" },
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top 92%",
          end: wordAnimationEnd,
          scrub: 0.9,
        },
      });
      if (blurTween.scrollTrigger) triggers.push(blurTween.scrollTrigger);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    wordStagger,
    blurStrength,
    children,
    isIOS,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
