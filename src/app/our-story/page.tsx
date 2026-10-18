import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, History, Shield, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
            The Origin & Creed
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F6F5F0] tracking-tight">
            The Spirit of Peshawar.
            <br />
            <span className="font-extrabold text-[#FA9D60]">
              The Character of Drun.
            </span>
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#9EAAA4] font-normal max-w-xl mx-auto leading-relaxed">
            Born from a profound respect for Khyber Pakhtunkhwa&apos;s living cobbler
            traditions and an ambition to bring authentic Pakistani luxury to the world.
          </p>
        </div>

        {/* Narrative Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 bg-[#07100E] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold mb-3 block">
              Chapter I &bull; The Heritage
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold mb-4">
              A Tradition Shaped by Hand
            </h2>
            <p className="text-xs sm:text-sm text-[#9EAAA4] font-normal leading-relaxed mb-4">
              In the narrow historical alleys of Namak Mandi and Jahangir Pura in Peshawar,
              cobblers have hammered, skived, and welted leather for over two centuries. The
              Peshawari chappal is not merely footwear; it is an emblem of dignity, resilience,
              and masculine elegance.
            </p>
            <p className="text-xs sm:text-sm text-[#9EAAA4] font-normal leading-relaxed">
              Yet for decades, this extraordinary craft has remained confined to localized
              markets or diluted by mass-produced synthetic knockoffs. Drun was established to
              change this narrative permanently.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#07100E] p-6 shadow-2xl aspect-[4/3] flex items-center justify-center">
              <img
                src="/products/royal-norozi-cognac.png"
                alt="Drun Royal Norozi Heritage"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        </div>

        {/* Narrative Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-24">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#07100E] p-6 shadow-2xl aspect-[4/3] flex items-center justify-center">
              <img
                src="/products/safari-suede-tan.png"
                alt="Contemporary Suede Chappal"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold mb-3 block">
              Chapter II &bull; The Modernity
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold mb-4">
              Designed for the Way You Move
            </h2>
            <p className="text-xs sm:text-sm text-[#9EAAA4] font-normal leading-relaxed mb-4">
              We asked: why should traditional footwear require painful break-in periods?
              Why shouldn&apos;t a chappal pair effortlessly with bespoke linen trousers in Dubai,
              denim in London, or formal Shalwar Kameez in Islamabad?
            </p>
            <p className="text-xs sm:text-sm text-[#9EAAA4] font-normal leading-relaxed">
              We re-engineered the footbed from the ground up: introducing dual-density
              orthopedic memory latex beneath supple kidskin linings, paired with featherweight
              compound rubber soles that deliver cloud-like comfort from the very first stride.
            </p>
          </div>
        </div>

        {/* Pillars Banner */}
        <div className="bg-[#08231D] border border-white/10 rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FA9D60]/20 text-[#FA9D60] flex items-center justify-center mb-6">
            <Sparkles size={24} />
          </div>
          <h3 className="font-heading text-2xl sm:text-4xl font-bold mb-4">
            Not Simply Footwear. A Lasting Impression.
          </h3>
          <p className="text-xs sm:text-sm text-[#9EAAA4] max-w-md mx-auto mb-8 font-normal leading-relaxed">
            Each pair is made by hands that have practiced the craft for decades.
            When you slip on Drun, you wear an authentic piece of living art.
          </p>
          <Link href="/shop" className="btn-copper-pill px-8 py-3 text-xs uppercase tracking-widest font-bold">
            Explore the Collection
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
