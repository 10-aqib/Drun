"use client";

import React, { useRef, useState, useEffect } from "react";
import { Layers, Sparkles, Compass, Feather, History } from "lucide-react";

export default function CraftsmanshipIdentity() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const benefits = [
    {
      icon: Layers,
      title: "Considered Materials",
      desc: "Top 5% select full-grain cowhides and supple kidskin linings tanned with organic vegetable tannins.",
    },
    {
      icon: Sparkles,
      title: "Detailed Stitching",
      desc: "Over 1,200 hand-laid stitches using beeswax-braided linen thread for indestructible welt strength.",
    },
    {
      icon: Compass,
      title: "Distinctive Design",
      desc: "The authentic wide-stance silhouette with sculpted vamp overlap and hand-cast solid brass hardware.",
    },
    {
      icon: Feather,
      title: "Everyday Comfort",
      desc: "Dual-density arch-supporting memory cushion footbeds that conform to your stride without fatigue.",
    },
    {
      icon: History,
      title: "A Lasting Tradition",
      desc: "Handmade in the historic shoemaking lanes of Peshawar by multi-generational master craftsmen.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-28 overflow-hidden bg-[#031A16]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031A16] via-[#08231D] to-[#04120F] pointer-events-none" />

      {/* Subtle Central Glowing Arch */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D88955]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold mb-3">
          Our Philosophy
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F6F5F0] tracking-tight leading-tight max-w-3xl mx-auto">
          Built on craft.
          <br />
          <span className="font-extrabold text-[#FA9D60]">
            Defined by character.
          </span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#9EAAA4] font-normal max-w-xl mx-auto leading-relaxed">
          Every pair of Drun chappals represents days of dedicated manual benchwork,
          ensuring uncompromising quality and distinctive presence.
        </p>

        {/* Five Benefits Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = activeIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#08231D]/50 border transition-all duration-300 text-left flex flex-col justify-between group ${
                  isHovered
                    ? "border-[#FA9D60]/50 bg-[#08231D]/90 -translate-y-2 shadow-2xl"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  {/* Dark Square Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-[#07100E] border border-white/10 flex items-center justify-center text-[#FA9D60] group-hover:bg-[#FA9D60] group-hover:text-[#101412] transition-all duration-300 shadow-inner mb-6">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F6F5F0] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#9EAAA4] font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#FA9D60] font-mono">
                  <span>0{idx + 1}</span>
                  <div
                    className={`h-0.5 bg-[#FA9D60] transition-all duration-500 ${
                      isHovered ? "w-12" : "w-4 opacity-40"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
