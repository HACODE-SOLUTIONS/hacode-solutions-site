"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 24,
  stagger = 0,
  className = "",
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      gsap.set(element.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = stagger > 0 ? element.children : element;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger: stagger > 0 ? stagger : 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, element);

    return () => ctx.revert();
  }, [delay, duration, y, stagger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} duration={0.6} y={12} className={className}>
      {children}
    </Reveal>
  );
}
