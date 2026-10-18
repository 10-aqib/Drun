"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, MessageCircle, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FAQS } from "@/data/products";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
            Knowledge Base
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#F6F5F0] tracking-tight">
            Frequently Asked Questions<span className="text-[#FA9D60]">.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#9EAAA4] font-normal leading-relaxed">
            Comprehensive details on Drun footwear sizing, materials, payment terms, and leather care.
          </p>
        </div>

        <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl divide-y divide-white/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-5 sm:py-6 group">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 focus:outline-none"
                >
                  <span className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#FA9D60] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#FA9D60] text-[#9EAAA4] group-hover:text-[#101412] flex items-center justify-center transition-all flex-shrink-0">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-8 text-xs sm:text-sm text-[#9EAAA4] font-light leading-relaxed animate-in fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-[#9EAAA4] mb-4">Have an unaddressed question?</p>
          <Link href="/contact" className="btn-copper-pill px-6 py-2.5 text-xs uppercase tracking-wider">
            Contact Drun Concierge
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
