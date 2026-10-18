import React from "react";
import Link from "next/link";
import { Layers, Sparkles, Compass, Feather, History, CheckCircle2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CRAFTSMANSHIP_POINTS } from "@/data/products";

export default function CraftsmanshipPage() {
  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
            The Atelier
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F6F5F0] tracking-tight">
            Craftsmanship in Every Detail<span className="text-[#FA9D60]">.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#9EAAA4] font-normal max-w-xl mx-auto leading-relaxed">
            From the hand-selection of unblemished full-grain bovine hides to the final
            bone-burnishing of raw leather edges.
          </p>
        </div>

        {/* 4 Pillars Detailed Walkthrough */}
        <div className="space-y-16 mb-24">
          {CRAFTSMANSHIP_POINTS.map((point, idx) => (
            <div
              key={point.index}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#07100E] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl"
            >
              <div className="lg:col-span-4 aspect-[4/3] bg-[#08231D]/40 rounded-2xl p-6 flex items-center justify-center border border-white/5">
                <img
                  src={point.image}
                  alt={point.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]"
                />
              </div>

              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-[#FA9D60] font-bold">
                      PHASE {point.index}
                    </span>
                    <div className="h-px w-10 bg-[#FA9D60]/30" />
                    <span className="text-xs text-[#9EAAA4] uppercase tracking-wider">
                      {point.subtitle}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white mb-4">
                    {point.title}
                  </h2>

                  <p className="text-sm text-[#9EAAA4] font-normal leading-relaxed mb-6">
                    {point.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#E9E8DF]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#FA9D60]" />
                      <span>100% Manual Hand Execution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#FA9D60]" />
                      <span>Natural Beeswax Sealing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center max-w-xl mx-auto py-12">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
            Experience the Distinction
          </h3>
          <p className="text-xs sm:text-sm text-[#9EAAA4] mb-8 font-normal">
            Order your bespoke pair with complimentary express courier delivery across Pakistan.
          </p>
          <Link href="/shop" className="btn-copper-pill px-8 py-3.5 text-xs uppercase tracking-widest font-bold">
            View All Footwear
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
