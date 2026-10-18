"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function EditorialManifesto() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Progress from 0 when entering bottom to 1 when centered
      const totalDist = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const rawProgress = currentPos / (totalDist * 0.7);
      const progress = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Words for the manifesto reveal
  const phrase1 = ["Some", "traditions", "aren't", "followed."];
  const phrase2 = ["They're", "carried", "forward."];

  return (
    <section
      ref={sectionRef}
      className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto bg-[#F8F7F3] text-[#101412] rounded-3xl lg:rounded-[36px] shadow-2xl p-6 sm:p-12 lg:p-20 border border-[#E9E8DF] relative overflow-hidden pattern-dots">
        {/* Subtle Edge Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/70 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Subtle Monogram Accent */}
          <div className="w-12 h-12 rounded-full border border-[#D88955]/30 flex items-center justify-center text-[#D88955] mb-8 sm:mb-10 bg-white shadow-sm">
            <span className="font-heading text-xl font-bold">D</span>
          </div>

          {/* Progressive Scroll Reveal Heading */}
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-center select-none">
            <span className="block mb-2 sm:mb-3">
              {phrase1.map((word, i) => {
                const threshold = 0.2 + (i / phrase1.length) * 0.3;
                const isRevealed = scrollProgress >= threshold;
                return (
                  <span
                    key={i}
                    className="inline-block mx-1 sm:mx-2 transition-all duration-700"
                    style={{
                      opacity: isRevealed ? 1 : 0.25,
                      filter: isRevealed ? "blur(0px)" : "blur(4px)",
                      transform: isRevealed ? "translateY(0)" : "translateY(8px)",
                      color: isRevealed ? "#101412" : "#9EAAA4",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </span>

            <span className="block font-bold text-[#A56D47]">
              {phrase2.map((word, i) => {
                const threshold = 0.5 + (i / phrase2.length) * 0.35;
                const isRevealed = scrollProgress >= threshold;
                return (
                  <span
                    key={i}
                    className="inline-block mx-1 sm:mx-2 transition-all duration-700"
                    style={{
                      opacity: isRevealed ? 1 : 0.2,
                      filter: isRevealed ? "blur(0px)" : "blur(5px)",
                      transform: isRevealed ? "translateY(0)" : "translateY(10px)",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          </h2>

          {/* Supporting Subtitle */}
          <p
            className="mt-8 sm:mt-10 text-sm sm:text-base md:text-lg text-[#616B66] font-normal max-w-2xl leading-relaxed transition-all duration-1000"
            style={{
              opacity: scrollProgress > 0.4 ? 1 : 0.3,
              transform: scrollProgress > 0.4 ? "translateY(0)" : "translateY(15px)",
            }}
          >
            At Drun, every silhouette honors the centuries of Pashtun cobblers
            while refining proportions, flexibility, and materials for today&apos;s
            global sartorial life.
          </p>

          {/* Small Scroll Prompt Indicator matching reference */}
          <div className="mt-14 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#A56D47]">
            <span>Craftsmanship in Every Stitch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
