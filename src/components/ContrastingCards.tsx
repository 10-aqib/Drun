"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

export default function ContrastingCards() {
  const [cardAExpanded, setCardAExpanded] = useState(false);
  const [cardBExpanded, setCardBExpanded] = useState(false);

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
      {/* Warm-White Editorial Surface */}
      <div className="max-w-7xl mx-auto bg-[#F8F7F3] text-[#101412] rounded-3xl lg:rounded-[36px] shadow-2xl p-6 sm:p-10 lg:p-14 border border-[#E9E8DF]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-6 border-b border-[#101412]/10 gap-4">
          <div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#A56D47] font-bold mb-2">
              The Dual Aesthetic
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101412] leading-[1.15]">
              A design for every occasion.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#616B66] font-normal max-w-xs text-left sm:text-right">
            Traditional character for festive grandeur or understated minimalism for daily urban movement.
          </p>
        </div>

        {/* Two Large Cards Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Card A: Heritage Collection (Dark) */}
          <div
            className="group relative rounded-3xl bg-[#08231D] text-[#F6F5F0] p-7 sm:p-10 border border-black/10 overflow-hidden shadow-xl flex flex-col justify-between min-h-[440px] sm:min-h-[480px] transition-all duration-300"
          >
            {/* Background Texture & Low-Key Shoe Photography */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/4 sm:w-2/3 h-64 sm:h-80 pointer-events-none opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500 flex items-center justify-center">
              <img
                src="/products/royal-norozi-cognac.png"
                alt="Heritage Collection"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold tracking-wide uppercase text-[#FA9D60] border border-white/10 backdrop-blur-sm">
                Ceremonial & Heavy Welt
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 mt-auto pt-16">
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F6F5F0]">
                Heritage Collection
              </h3>
              <p className="text-sm text-[#9EAAA4] mt-2 max-w-sm font-normal">
                Traditional character, refined for the present with heavy welt stitches
                and indestructible tyre treads.
              </p>

              {/* Expandable details */}
              {cardAExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs text-[#E9E8DF] animate-in fade-in duration-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA9D60]" />
                    <span>Double-welt hand stitching with waxed cord</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA9D60]" />
                    <span>Dense bovine pull-up leathers with natural patina</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FA9D60]" />
                    <span>Ideal for Shalwar Kameez, weddings, and formal Eid gatherings</span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href="/collections/heritage"
                  className="btn-copper-pill px-5 py-2.5 text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Explore Heritage</span>
                  <ArrowUpRight size={14} />
                </Link>

                {/* Circular Plus/Minus Toggle (Reference frame 42s) */}
                <button
                  onClick={() => setCardAExpanded(!cardAExpanded)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FA9D60] text-white hover:text-[#101412] flex items-center justify-center transition-all duration-300 border border-white/15"
                  aria-label="Toggle details"
                >
                  {cardAExpanded ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Card B: Contemporary Collection (Pale Ivory) */}
          <div
            className="group relative rounded-3xl bg-[#E9E8DF] text-[#101412] p-8 sm:p-10 border border-[#101412]/10 overflow-hidden shadow-xl flex flex-col justify-between min-h-[460px] sm:min-h-[500px] transition-all duration-300"
          >
            {/* Background Texture & Minimal Suede Shoe Photography */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3/4 sm:w-2/3 h-64 sm:h-80 pointer-events-none opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500 flex items-center justify-center">
              <img
                src="/products/safari-suede-tan.png"
                alt="Contemporary Collection"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* Top Badge */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 text-xs font-bold tracking-wide uppercase text-[#A56D47] border border-[#101412]/8 shadow-sm">
                Suede & Modern Profiles
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 mt-auto pt-16">
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#101412]">
                Contemporary Collection
              </h3>
              <p className="text-sm text-[#616B66] mt-2 max-w-sm font-normal">
                Understated designs for modern living. Lightweight rubber compound
                soles and velvety suede finishes.
              </p>

              {/* Expandable details */}
              {cardBExpanded && (
                <div className="mt-4 pt-4 border-t border-[#101412]/10 space-y-2 text-xs text-[#4A5450] animate-in fade-in duration-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A56D47]" />
                    <span>Heavy-nap Italian suede and velour nubuck</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A56D47]" />
                    <span>Ultra-cushioned shock-absorbing footbed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A56D47]" />
                    <span>Pairs effortlessly with tailored trousers, linen, and denim</span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href="/collections/contemporary"
                  className="px-5 py-2.5 rounded-full bg-[#101412] text-white hover:bg-[#A56D47] text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Explore Contemporary</span>
                  <ArrowUpRight size={14} />
                </Link>

                {/* Circular Plus/Minus Toggle (Reference frame 42s) */}
                <button
                  onClick={() => setCardBExpanded(!cardBExpanded)}
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#101412] text-[#101412] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#101412]/10 shadow-sm"
                  aria-label="Toggle details"
                >
                  {cardBExpanded ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
