"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CRAFTSMANSHIP_POINTS } from "@/data/products";

export default function DarkCraftsmanship() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-28 bg-[#031A16] text-[#F6F5F0]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#08231D] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Top Editorial Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8 pb-8 border-b border-white/10">
          <div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold mb-3">
              The Artisan Process
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-2xl">
              Thoughtfully crafted.
              <br />
              <span className="font-extrabold text-[#FA9D60]">
                Distinctively Drun.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-10">
            {/* Real metrics */}
            <div className="flex items-center gap-8">
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FA9D60]">
                  100%
                </div>
                <div className="text-xs text-[#9EAAA4] uppercase tracking-wider mt-0.5 font-medium">
                  Full-Grain Leather
                </div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FA9D60]">
                  1,200+
                </div>
                <div className="text-xs text-[#9EAAA4] uppercase tracking-wider mt-0.5 font-medium">
                  Waxed Hand Stitches
                </div>
              </div>
            </div>

            <Link
              href="/craftsmanship"
              className="btn-copper-pill px-6 py-3.5 text-xs uppercase tracking-widest font-bold flex items-center gap-2 group self-start sm:self-auto"
            >
              <span>Explore Workshop</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Four Horizontally Arranged Dark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFTSMANSHIP_POINTS.map((card, idx) => {
            const isHovered = activeCard === idx;

            return (
              <div
                key={card.index}
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative rounded-3xl p-6 sm:p-7 bg-[#07100E] border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isHovered
                    ? "border-[#FA9D60]/40 -translate-y-2 shadow-2xl bg-[#08231D]/80"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Subtle Shoe Texture Background */}
                <div className="absolute -right-12 -bottom-12 w-44 h-44 opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none filter grayscale contrast-125">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div>
                  {/* Large Numerical Index */}
                  <div className="font-mono text-2xl font-bold text-[#9EAAA4] group-hover:text-[#FA9D60] transition-colors mb-4">
                    {card.index}
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F6F5F0] mb-1">
                    {card.title}
                  </h3>
                  <div className="text-xs text-[#FA9D60] font-semibold tracking-wide mb-3">
                    {card.subtitle}
                  </div>

                  <p className="text-xs text-[#9EAAA4] font-normal leading-relaxed relative z-10">
                    {card.desc}
                  </p>
                </div>

                {/* Fine Cream/Copper Progress Line (Reference frame 38s) */}
                <div className="mt-8 pt-4 border-t border-white/5 relative z-10">
                  <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-[#FA9D60] transition-all duration-700 ${
                        isHovered ? "w-full" : "w-1/4 opacity-40"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
