"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, MessageCircle, HelpCircle } from "lucide-react";
import { FAQS } from "@/data/products";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
      {/* Warm-White FAQ Panel */}
      <div className="max-w-7xl mx-auto bg-[#F8F7F3] text-[#101412] rounded-3xl lg:rounded-[36px] shadow-2xl p-6 sm:p-10 lg:p-14 border border-[#E9E8DF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#A56D47] font-bold mb-3">
                Assistance & Sizing
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101412] leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#616B66] font-normal leading-relaxed">
                Everything you need to know about finding your perfect pair,
                leather care, sizing, and our complimentary exchange guarantee.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#101412]/10 space-y-4">
              <div className="text-xs text-[#616B66] font-medium">
                Have a bespoke requirement or high-instep fit question?
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/923000000000?text=Hello%20Drun%20Concierge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#08231D] text-[#F6F5F0] hover:bg-[#FA9D60] hover:text-[#101412] text-xs font-bold tracking-wide inline-flex items-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Concierge</span>
                </a>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-full bg-white text-[#101412] border border-[#101412]/15 hover:border-[#101412] text-xs font-bold tracking-wide inline-flex items-center gap-2 transition-all"
                >
                  <HelpCircle size={15} />
                  <span>Contact Form</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column Accordion */}
          <div className="lg:col-span-7 divide-y divide-[#101412]/10">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="py-4 sm:py-5 group">
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-base sm:text-lg font-bold text-[#101412] group-hover:text-[#A56D47] transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#E9E8DF]/60 group-hover:bg-[#101412] text-[#101412] group-hover:text-white flex items-center justify-center transition-all duration-300 flex-shrink-0">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-3.5 pr-8 text-xs sm:text-sm text-[#4A5450] font-normal leading-relaxed animate-in fade-in duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
