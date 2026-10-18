"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye } from "lucide-react";
import { PRODUCTS, formatPKR } from "@/data/products";

export default function SignatureCarousel() {
  const signatureProducts = PRODUCTS.filter((p) => p.isSignature);
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? signatureProducts.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === signatureProducts.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-28 bg-[#031A16] text-[#F6F5F0] overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#08231D] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold mb-3">
            Iconic Handcraft
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F6F5F0]">
            The Drun Signature Collection
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9EAAA4] font-normal">
            A selection defined by detail. Masterpieces designed for lasting presence.
          </p>

          <div className="mt-6">
            <Link
              href="/shop"
              className="btn-copper-pill px-6 py-3 text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 group"
            >
              <span>View All 29 Designs</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Interactive Multi-Card Carousel */}
        <div className="relative py-6">
          <div className="flex gap-4 sm:gap-6 justify-center items-center overflow-x-auto no-scrollbar py-4 px-2">
            {signatureProducts.map((product, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={product.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-shrink-0 cursor-pointer transition-all duration-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between select-none ${
                    isActive
                      ? "w-[300px] sm:w-[380px] bg-[#F8F7F3] text-[#101412] shadow-2xl scale-105 z-20 border-2 border-[#FA9D60]"
                      : "w-[240px] sm:w-[280px] bg-[#07100E] text-[#F6F5F0] opacity-60 hover:opacity-90 border border-white/10 hover:border-white/20 scale-95"
                  }`}
                >
                  {/* Top info */}
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? "text-[#A56D47]" : "text-[#9EAAA4]"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#101412] text-[#F8F7F3]"
                          : "bg-white/10 text-[#9EAAA4]"
                      }`}
                    >
                      {product.category}
                    </span>
                  </div>

                  {/* Shoe Image */}
                  <div className="my-6 h-48 sm:h-56 flex items-center justify-center p-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-contain filter transition-transform duration-500 ${
                        isActive
                          ? "scale-110 drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)]"
                          : "grayscale contrast-125 drop-shadow-md"
                      }`}
                    />
                  </div>

                  {/* Bottom info */}
                  <div>
                    <h3
                      className={`font-heading text-xl sm:text-2xl font-bold tracking-tight ${
                        isActive ? "text-[#101412]" : "text-[#F6F5F0]"
                      }`}
                    >
                      {product.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 line-clamp-1 ${
                        isActive ? "text-[#616B66]" : "text-[#9EAAA4]"
                      }`}
                    >
                      {product.leatherType}
                    </p>

                    <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                      <span
                        className={`text-sm font-semibold ${
                          isActive ? "text-[#A56D47]" : "text-[#FA9D60]"
                        }`}
                      >
                        {formatPKR(product.price)}
                      </span>

                      {isActive ? (
                        <Link
                          href={`/products/${product.slug || product.id}`}
                          className="px-3.5 py-1.5 rounded-full bg-[#101412] text-white text-xs font-medium inline-flex items-center gap-1 hover:bg-[#A56D47] transition-colors"
                        >
                          <span>View Product</span>
                          <ArrowUpRight size={12} />
                        </Link>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#9EAAA4]">
                          <Eye size={14} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Minimalist Rounded Arrow Controls Underneath */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-[#08231D] hover:bg-[#FA9D60] text-[#E9E8DF] hover:text-[#101412] border border-white/10 flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95"
              aria-label="Previous footwear"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="text-xs font-mono text-[#9EAAA4] tracking-widest px-2">
              0{activeIndex + 1} / 0{signatureProducts.length}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-[#FA9D60] hover:bg-[#F28C47] text-[#101412] flex items-center justify-center transition-all duration-300 shadow-lg active:scale-95"
              aria-label="Next footwear"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
