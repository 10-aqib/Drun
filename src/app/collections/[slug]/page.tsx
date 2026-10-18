"use client";

import React, { use, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Heart, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES, PRODUCTS, formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";

function CollectionContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.toLowerCase();

  const category = CATEGORIES.find(
    (c) => c.slug.toLowerCase() === slug || c.id.toLowerCase() === slug
  );

  const matchingProducts = PRODUCTS.filter((p) => {
    if (slug === "all") return true;
    if (slug === "classic") return p.categorySlug === "classic" || p.category.includes("Classic");
    if (slug === "kaptaan") return p.categorySlug === "kaptaan" || p.category.includes("Kaptaan");
    if (slug === "norozi") return p.categorySlug === "norozi" || p.category.includes("Norozi");
    if (slug === "modern") return p.categorySlug === "modern" || p.category.includes("Modern");
    if (slug === "heritage") return p.categorySlug === "classic" || p.categorySlug === "norozi" || p.category === "Heritage";
    if (slug === "contemporary") return p.categorySlug === "modern" || p.category === "Contemporary";
    return p.category.toLowerCase().includes(slug) || p.categorySlug === slug;
  });

  const { toggleWishlist, isInWishlist } = useCart();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9EAAA4] hover:text-[#FA9D60] transition-colors font-medium"
        >
          <ArrowLeft size={14} />
          <span>Back to All Collections</span>
        </Link>
      </div>

      {/* Editorial Collection Hero Header */}
      <div className="bg-[#07100E] border border-white/10 rounded-3xl lg:rounded-[36px] p-6 sm:p-12 mb-12 sm:mb-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#08231D] blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
            Curated Silhouette &bull; {matchingProducts.length} Designs
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F6F5F0] tracking-tight capitalize">
            {category ? category.name : `${slug} Collection`}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#9EAAA4] font-normal leading-relaxed">
            {category
              ? category.description
              : "Handcrafted Peshawari footwear embodying Pashtun artisan tradition and ergonomic mastery."}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
        {matchingProducts.map((product) => {
          const inWishlist = isInWishlist(product.id);

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug || product.id}`}
              className="group block rounded-3xl bg-[#07100E] border border-white/10 hover:border-[#FA9D60]/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-[#08231D]/40 p-4 sm:p-6 flex items-center justify-center">
                {/* Category & Draft Pill */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#101412]/80 backdrop-blur-md text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#FA9D60] border border-white/10">
                    {product.category}
                  </span>
                  {product.status === "draft" && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md text-[9px] font-mono text-amber-300 border border-amber-500/30">
                      Draft
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`absolute top-3 right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                    inWishlist
                      ? "bg-[#FA9D60] text-[#101412]"
                      : "bg-[#101412]/70 text-[#9EAAA4] hover:text-white"
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart size={15} fill={inWishlist ? "currentColor" : "none"} />
                </button>

                <img
                  src={product.image}
                  alt={product.imageAlt || product.name}
                  className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
                />
              </div>

              <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#9EAAA4] mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                      style={{ backgroundColor: product.colorHex }}
                    />
                    <span className="truncate">{product.color}</span>
                  </div>

                  <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-[#F6F5F0] group-hover:text-[#FA9D60] transition-colors leading-tight line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#9EAAA4] mt-1 line-clamp-1 font-normal">
                    {product.tagline}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-heading text-base sm:text-lg lg:text-xl font-bold text-[#FA9D60]">
                    {formatPKR(product.price)}
                  </span>

                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 group-hover:bg-[#FA9D60] text-white group-hover:text-[#101412] flex items-center justify-center transition-all">
                    <ArrowUpRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-[#9EAAA4]">Loading collection silhouette...</div>}>
        <CollectionContent params={params} />
      </Suspense>
      <Footer />
    </main>
  );
}
