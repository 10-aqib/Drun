"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function ThreeStepExperience() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedSize, setSelectedSize] = useState(42);

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
      {/* White Panel Container */}
      <div className="max-w-7xl mx-auto bg-[#F8F7F3] text-[#101412] rounded-3xl lg:rounded-[36px] shadow-2xl p-6 sm:p-10 lg:p-14 border border-[#E9E8DF]">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#A56D47] font-bold mb-2">
            Seamless Ordering
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101412] leading-[1.15]">
            Your perfect pair, in three steps.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#616B66] font-normal">
            From discovering our artisanal designs to your doorstep anywhere in Pakistan.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Explore */}
          <div
            onMouseEnter={() => setActiveStep(1)}
            className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              activeStep === 1
                ? "bg-white border-[#101412]/15 shadow-xl -translate-y-1"
                : "bg-[#E9E8DF]/40 border-transparent hover:bg-white hover:border-[#101412]/10"
            }`}
          >
            <div>
              {/* Miniature Interactive UI Preview */}
              <div className="h-44 sm:h-48 rounded-2xl bg-[#F8F7F3] border border-[#101412]/5 p-4 flex flex-col justify-between mb-6 overflow-hidden">
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#101412] text-white text-[10px] font-bold">
                    All
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white text-[#616B66] text-[10px] font-medium border border-[#101412]/10">
                    Heritage
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white text-[#616B66] text-[10px] font-medium border border-[#101412]/10">
                    Kaptaan
                  </span>
                </div>

                <div className="flex items-center justify-center py-2">
                  <img
                    src="/products/royal-norozi-cognac.png"
                    alt="Explore Norozi"
                    className="h-24 object-contain filter drop-shadow-sm group-hover:scale-110 transition-transform"
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] pt-2 border-t border-[#101412]/5">
                  <span className="font-heading text-xs font-bold text-[#101412]">Royal Norozi</span>
                  <span className="text-[#A56D47] font-bold">PKR 15,500</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#A56D47]">01</span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#101412]">
                  Explore
                </h3>
              </div>
              <p className="text-xs text-[#616B66] font-normal leading-relaxed">
                Discover the silhouette that speaks to your personality — from imposing
                Kaptaan shapes to velvety desert suedes.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#101412]/10">
              <Link
                href="/shop"
                className="text-xs font-bold text-[#101412] hover:text-[#A56D47] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Browse Catalogue</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Card 2: Find Your Fit */}
          <div
            onMouseEnter={() => setActiveStep(2)}
            className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              activeStep === 2
                ? "bg-white border-[#101412]/15 shadow-xl -translate-y-1"
                : "bg-[#E9E8DF]/40 border-transparent hover:bg-white hover:border-[#101412]/10"
            }`}
          >
            <div>
              {/* Miniature Interactive Sizing UI */}
              <div className="h-44 sm:h-48 rounded-2xl bg-[#F8F7F3] border border-[#101412]/5 p-4 flex flex-col justify-between mb-6">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#A56D47] font-bold">
                    Interactive Size Selector
                  </div>
                  <div className="text-xs text-[#616B66] mt-0.5">
                    Selected: EU {selectedSize} (UK {selectedSize - 33})
                  </div>
                </div>

                {/* Size Selector Grid */}
                <div className="grid grid-cols-4 gap-1.5 py-1">
                  {[40, 41, 42, 43, 44, 45].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedSize === size
                          ? "bg-[#101412] text-white shadow-sm"
                          : "bg-white text-[#616B66] border border-[#101412]/8 hover:border-[#101412]/20"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-md">
                  <Check size={12} strokeWidth={2.5} />
                  <span className="font-medium">Complimentary Size Exchange</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#A56D47]">02</span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#101412]">
                  Find Your Fit
                </h3>
              </div>
              <p className="text-xs text-[#616B66] font-normal leading-relaxed">
                Choose your true dress shoe size with confidence. Our adjustable instep
                buckle accommodates all foot arches comfortably.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#101412]/10">
              <Link
                href="/size-guide"
                className="text-xs font-bold text-[#101412] hover:text-[#A56D47] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Read Size Guide</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Card 3: Make It Yours */}
          <div
            onMouseEnter={() => setActiveStep(3)}
            className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
              activeStep === 3
                ? "bg-white border-[#101412]/15 shadow-xl -translate-y-1"
                : "bg-[#E9E8DF]/40 border-transparent hover:bg-white hover:border-[#101412]/10"
            }`}
          >
            <div>
              {/* Miniature Checkout UI */}
              <div className="h-44 sm:h-48 rounded-2xl bg-[#F8F7F3] border border-[#101412]/5 p-4 flex flex-col justify-between mb-6">
                <div>
                  <div className="flex justify-between text-xs text-[#616B66]">
                    <span>Shipping</span>
                    <span className="text-[#2E7D32] font-semibold">Free Express (TCS)</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#616B66] mt-1">
                    <span>Payment</span>
                    <span className="font-semibold text-[#101412]">Cash on Delivery</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 border border-[#101412]/10">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-heading text-sm font-bold text-[#101412]">Order Total</span>
                    <span className="font-heading text-sm font-extrabold text-[#A56D47]">
                      PKR 15,500
                    </span>
                  </div>
                  <div className="w-full mt-2 py-1.5 rounded-lg bg-[#FA9D60] text-[#101412] text-center text-[10px] font-bold">
                    Confirm Order
                  </div>
                </div>

                <div className="text-[10px] text-center text-[#9EAAA4]">
                  Delivered in custom luxury magnetic box with dust bags
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-[#A56D47]">03</span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#101412]">
                  Make It Yours
                </h3>
              </div>
              <p className="text-xs text-[#616B66] font-normal leading-relaxed">
                Place your order with zero pre-payment required. Pay comfortably at your
                doorstep after inspecting your pair.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#101412]/10">
              <Link
                href="/shop"
                className="text-xs font-bold text-[#101412] hover:text-[#A56D47] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Order Your Pair</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
