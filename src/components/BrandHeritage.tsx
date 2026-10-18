"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Shield, HeartHandshake, Scissors, Ruler, ShieldCheck } from "lucide-react";

export default function BrandHeritage() {
  const brandPillars = [
    { title: "Materials", desc: "Select Full-Grain Bovine" },
    { title: "Craft", desc: "1,200+ Hand Stitches" },
    { title: "Fit", desc: "Adjustable Instep Comfort" },
    { title: "Design", desc: "Iconic Pashtun Silhouette" },
    { title: "Care", desc: "Free Lifetime Consultation" },
  ];

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
      {/* Warm-White Editorial Panel */}
      <div className="max-w-7xl mx-auto bg-[#F8F7F3] text-[#101412] rounded-3xl lg:rounded-[36px] shadow-2xl p-6 sm:p-10 lg:p-14 border border-[#E9E8DF] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12 sm:mb-16">
          {/* Asymmetrical Left Photograph (Workshop & Tools) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#101412]/10 bg-white p-3 group">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#E9E8DF]">
                <img
                  src="/products/royal-norozi-cognac.png"
                  alt="Traditional leathercraft tools"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                />
              </div>
              <div className="mt-2.5 text-[11px] text-[#616B66] text-center uppercase tracking-wider font-semibold">
                Khyber Leather Guild &bull; Hand Cut
              </div>
            </div>
          </div>

          {/* Center Editorial Narrative */}
          <div className="lg:col-span-6 text-center order-1 lg:order-2 flex flex-col items-center">
            {/* Small Copper Drun Emblem */}
            <div className="w-12 h-12 rounded-full border border-[#D88955]/30 flex items-center justify-center text-[#D88955] mb-6 bg-white shadow-sm">
              <span className="font-heading text-xl font-extrabold">D</span>
            </div>

            <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#A56D47] font-bold mb-3">
              The Peshawar Legacy
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#101412] leading-tight">
              Rooted in heritage.
              <br />
              <span className="font-extrabold text-[#A56D47]">
                Made for the present.
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#616B66] font-normal max-w-lg leading-relaxed">
              Drun draws inspiration from the enduring character of Peshawari footwear,
              creating a refined experience for today&apos;s wearer. Every cut, skive, and
              waxed welt stitch continues a legacy passed through generations of master artisans.
            </p>

            <div className="mt-8">
              <Link
                href="/our-story"
                className="px-6 py-2.5 rounded-full bg-[#101412] text-white hover:bg-[#A56D47] text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
              >
                Read Our Story
              </Link>
            </div>
          </div>

          {/* Asymmetrical Right Photograph (Finished Details & Stitching) */}
          <div className="lg:col-span-3 order-3">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#101412]/10 bg-white p-3 group">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#E9E8DF]">
                <img
                  src="/products/safari-suede-tan.png"
                  alt="Artisan stitching detail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                />
              </div>
              <div className="mt-2.5 text-[11px] text-[#616B66] text-center uppercase tracking-wider font-medium">
                Double-Welt &bull; Pure Linen Stitch
              </div>
            </div>
          </div>
        </div>

        {/* Understated Horizontal Strip of Real Brand Qualities (Reference frame 50s) */}
        <div className="pt-10 border-t border-[#101412]/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {brandPillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#101412]">
                {pillar.title}
              </span>
              <span className="text-xs text-[#616B66] font-light mt-1">
                {pillar.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
