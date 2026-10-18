"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS, Product, formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function FeaturedCollection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const categories = [
    "All",
    "Classic Peshawari",
    "Kaptaan Style",
    "Norozi Style",
    "Modern & Signature",
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS.filter((p) => p.featured || p.isSignature || p.photoStatus === "verified").slice(0, 8)
      : PRODUCTS.filter((p) => {
          const catLow = selectedCategory.toLowerCase();
          return (
            p.category.toLowerCase() === catLow ||
            (catLow.includes("classic") && p.category.includes("Classic")) ||
            (catLow.includes("kaptaan") && p.category.includes("Kaptaan")) ||
            (catLow.includes("norozi") && p.category.includes("Norozi")) ||
            (catLow.includes("modern") && p.category.includes("Modern"))
          );
        }).slice(0, 8);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 42, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  return (
    <section
      id="featured-collection"
      className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24"
    >
      {/* Expansive Warm-White Editorial Surface with Unified Width */}
      <div className="max-w-7xl mx-auto bg-[#F8F7F3] text-[#101412] rounded-3xl lg:rounded-[36px] shadow-2xl p-6 sm:p-10 lg:p-12 xl:p-14 border border-[#E9E8DF]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 pb-6 sm:pb-8 border-b border-[#101412]/10 gap-6">
          <div className="max-w-xl">
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#A56D47] font-bold mb-2">
              Bespoke Footwear
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#101412] leading-[1.15]">
              The Drun Collection
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#616B66] font-normal leading-relaxed">
              Considered design. Distinctive character. Hand-welted from
              full-grain leathers and precision finished in Peshawar.
            </p>
          </div>

          {/* Category Filter Pills (Fluid, Touch-Friendly, Responsive) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full md:w-auto -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 min-h-[38px] flex items-center justify-center ${
                  selectedCategory === cat
                    ? "bg-[#101412] text-[#F8F7F3] shadow-md shadow-[#101412]/15 scale-[1.02]"
                    : "bg-[#E9E8DF]/70 text-[#616B66] hover:bg-[#E9E8DF] hover:text-[#101412]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. DESKTOP VIEW: Flawless, Perfectly Aligned Table (>= lg)  */}
        {/* ============================================================ */}
        <div className="hidden lg:block">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-6 pb-4 mb-3 text-[11px] font-bold tracking-[0.16em] uppercase text-[#9EAAA4] border-b border-[#101412]/10 px-4">
            <div className="col-span-1">Article</div>
            <div className="col-span-4">Footwear Name & Tagline</div>
            <div className="col-span-3">Material & Construction</div>
            <div className="col-span-2">Sizes (EU)</div>
            <div className="col-span-2 text-right">Price (PKR)</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-2">
            {filteredProducts.map((product, idx) => (
              <Link
                key={product.id}
                href={`/products/${product.slug || product.id}`}
                className="group block py-4 px-4 rounded-2xl hover:bg-white/80 hover:shadow-sm border border-transparent hover:border-[#101412]/8 transition-all duration-200 focus:outline-none"
              >
                <div className="grid grid-cols-12 gap-6 items-center">
                  {/* Col 1: Article Image Thumbnail */}
                  <div className="col-span-1 flex items-center">
                    <div className="w-16 h-16 bg-white rounded-xl p-2 border border-[#101412]/8 shadow-xs group-hover:scale-105 group-hover:shadow transition-all duration-200 flex items-center justify-center shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain filter contrast-105"
                      />
                    </div>
                  </div>

                  {/* Col 4: Footwear Name & Tagline */}
                  <div className="col-span-4 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#A56D47]">
                        0{idx + 1}
                      </span>
                      <h3 className="font-heading text-xl font-bold text-[#101412] group-hover:text-[#A56D47] transition-colors tracking-tight">
                        {product.name}
                      </h3>
                      {product.status === "draft" ? (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 text-[10px] font-mono font-medium border border-amber-500/25">
                          Draft
                        </span>
                      ) : product.isNew ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#D88955]/15 text-[#D88955] text-[10px] font-bold tracking-wider uppercase border border-[#D88955]/25">
                          New
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-[#616B66] font-normal mt-0.5 line-clamp-1">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Col 3: Material & Construction */}
                  <div className="col-span-3 pr-2 text-xs">
                    <div className="font-semibold text-[#101412] line-clamp-1">
                      {product.leatherType}
                    </div>
                    <div className="text-[11px] text-[#616B66] mt-0.5 line-clamp-1 font-normal">
                      {product.soleType}
                    </div>
                  </div>

                  {/* Col 2: Sizes (EU) */}
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1 max-w-[170px]">
                      {product.sizes.slice(0, 5).map((size) => (
                        <span
                          key={size}
                          className="inline-block px-2 py-0.5 rounded bg-white text-[11px] font-mono font-medium text-[#4A5450] border border-[#101412]/8 shadow-xs"
                        >
                          {size}
                        </span>
                      ))}
                      {product.sizes.length > 5 && (
                        <span className="inline-block px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-[#9EAAA4]">
                          +{product.sizes.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Col 2: Price & Action */}
                  <div className="col-span-2 flex items-center justify-end gap-3.5">
                    <div className="text-right">
                      <div className="font-heading text-xl font-bold text-[#101412] tracking-tight">
                        {formatPKR(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-[#9EAAA4] line-through font-normal">
                          {formatPKR(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white group-hover:bg-[#101412] text-[#101412] group-hover:text-white border border-[#101412]/12 flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-xs shrink-0">
                      <ArrowUpRight
                        size={17}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. MOBILE & TABLET VIEW: Luxury Structured Cards (< lg)      */}
        {/* ============================================================ */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {filteredProducts.map((product, idx) => (
              <Link
                key={product.id}
                href={`/products/${product.slug || product.id}`}
                className="group bg-white rounded-2xl p-5 border border-[#101412]/8 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Product Card Image Container */}
                  <div className="relative aspect-[4/3] rounded-xl bg-[#F8F7F3] p-4 flex items-center justify-center border border-[#101412]/5 overflow-hidden mb-4">
                    <span className="absolute top-3 left-3 text-[11px] font-mono font-bold text-[#A56D47] bg-white px-2 py-0.5 rounded-md border border-[#101412]/8 shadow-xs">
                      0{idx + 1}
                    </span>
                    {product.status === "draft" ? (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 text-[10px] font-mono font-medium border border-amber-500/25">
                        Draft
                      </span>
                    ) : product.isNew ? (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#D88955]/15 text-[#D88955] text-[10px] font-bold tracking-wider uppercase border border-[#D88955]/25">
                        New
                      </span>
                    ) : null}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Footwear Name & Tagline */}
                  <div className="space-y-1">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#101412] group-hover:text-[#A56D47] transition-colors tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#616B66] line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Material & Construction Details */}
                  <div className="mt-3 pt-3 border-t border-[#101412]/6 text-[11px] text-[#4A5450] space-y-0.5">
                    <div className="font-semibold text-[#101412] line-clamp-1">
                      {product.leatherType}
                    </div>
                    <div className="text-[#616B66] line-clamp-1 font-normal">
                      {product.soleType}
                    </div>
                  </div>

                  {/* Available Sizes */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.sizes.slice(0, 5).map((size) => (
                      <span
                        key={size}
                        className="px-2 py-0.5 rounded bg-[#F8F7F3] text-[10px] font-mono font-medium text-[#616B66] border border-[#101412]/6"
                      >
                        {size}
                      </span>
                    ))}
                    {product.sizes.length > 5 && (
                      <span className="px-1.5 py-0.5 rounded bg-[#F8F7F3] text-[9px] font-mono text-[#9EAAA4]">
                        +{product.sizes.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Price & Action Row */}
                <div className="mt-5 pt-3 border-t border-[#101412]/8 flex items-center justify-between">
                  <div>
                    <div className="font-heading text-lg font-bold text-[#101412] tracking-tight">
                      {formatPKR(product.price)}
                    </div>
                    {product.originalPrice && (
                      <div className="text-[11px] text-[#9EAAA4] line-through font-normal">
                        {formatPKR(product.originalPrice)}
                      </div>
                    )}
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#101412] text-white flex items-center justify-center group-hover:bg-[#FA9D60] group-hover:text-[#101412] transition-colors shadow-xs">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#101412]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#616B66]">
          <span className="text-center sm:text-left">
            Every pair is individually crafted upon order with hand-cut welted soles.
          </span>
          <Link
            href="/shop"
            className="font-bold text-[#101412] hover:text-[#A56D47] inline-flex items-center gap-1.5 group shrink-0 transition-colors"
          >
            <span>View Full 29-Footwear Catalogue</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
