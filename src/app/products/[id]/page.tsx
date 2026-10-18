"use client";

import React, { useState, use, Suspense } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Camera,
  Check,
  Scale,
  Compass,
  Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCTS, Product, formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";

function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  // Find product by id OR slug
  const product = PRODUCTS.find(
    (p) => p.id === resolvedParams.id || p.slug === resolvedParams.id
  );

  if (!product) {
    notFound();
  }

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 42);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("craft");
  const [addedToast, setAddedToast] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug
  ).slice(0, 3);
  const fallbackRelated = relatedProducts.length > 0
    ? relatedProducts
    : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    router.push("/checkout");
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#9EAAA4] mb-8 overflow-x-auto whitespace-nowrap pb-1">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">
          Catalogue
        </Link>
        <span>/</span>
        <Link
          href={`/collections/${product.categorySlug}`}
          className="hover:text-white transition-colors"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#FA9D60] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Photography Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Stage Image with Interactive Lens Zoom */}
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            className="relative aspect-[4/3] rounded-3xl bg-[#07100E] border border-white/10 p-8 flex items-center justify-center overflow-hidden shadow-2xl group cursor-crosshair"
          >
            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-6 right-6 z-10 w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                inWishlist
                  ? "bg-[#FA9D60] text-[#101412]"
                  : "bg-[#101412]/80 text-[#9EAAA4] hover:text-white border border-white/10"
              }`}
              aria-label="Save to wishlist"
            >
              <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
            </button>

            {/* Studio Photography / Draft Badge */}
            {product.status === "draft" ? (
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-medium backdrop-blur-md">
                <Camera size={13} />
                <span>Atelier Draft &bull; Studio Capture in Progress</span>
              </div>
            ) : (
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-medium backdrop-blur-md">
                <Check size={13} />
                <span>Verified Studio Photography</span>
              </div>
            )}

            {/* Product Shoe Image with Zoom */}
            <img
              src={selectedImage}
              alt={product.imageAlt || product.name}
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: isZoomed ? "scale(1.8)" : "scale(1.0)",
              }}
              className="w-full h-full object-contain filter transition-transform duration-200 drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] pointer-events-none select-none"
            />

            <div className="absolute bottom-4 left-6 text-[11px] text-[#9EAAA4] tracking-wider uppercase font-mono flex items-center gap-2">
              <Compass size={12} className="text-[#FA9D60]" />
              <span>Hover image to examine leather & welt stitching</span>
            </div>
          </div>

          {/* Thumbnail Gallery with Multi-Angle Previews */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {product.additionalImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-2xl bg-[#07100E] border p-2 flex-shrink-0 transition-all ${
                  selectedImage === img
                    ? "border-[#FA9D60] scale-105 shadow-md ring-2 ring-[#FA9D60]/20"
                    : "border-white/10 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} angle ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* Draft Notice if awaiting owner studio photography */}
          {product.status === "draft" && (
            <div className="p-4 rounded-2xl bg-[#08231D]/50 border border-amber-500/20 text-xs text-[#E9E8DF] flex items-start gap-3">
              <Info size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-white">Bespoke Bench Record</span>
                <p className="text-[#9EAAA4] mt-0.5 leading-relaxed">
                  This style is currently bench-crafted by master cobblers in Peshawar. Specifications, leather type, and pricing are verified. Physical studio photographs will replace benchmark silhouettes upon dispatch.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Product Specs & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#FA9D60] font-bold">
                {product.category}
              </span>
              <span className="text-[11px] font-mono text-[#9EAAA4]">
                SKU: {product.sku}
              </span>
              {product.inStock ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                  In Stock &bull; Ready to Dispatch
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold">
                  Made to Order (5 Days)
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6F5F0] tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-[#9EAAA4] font-normal leading-relaxed">
              {product.tagline}
            </p>

            {/* Realistic PKR Pricing */}
            <div className="mt-6 flex items-baseline gap-4 flex-wrap">
              <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#FA9D60]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#9EAAA4] line-through font-normal">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
              {discountPercent && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#FA9D60]/20 text-[#FA9D60] text-xs font-bold font-mono">
                  {discountPercent}% OFF
                </span>
              )}
              <span className="text-xs text-[#9EAAA4]">PKR (Taxes & Courier Included)</span>
            </div>

            {/* Color Swatch & Leather Type */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="uppercase tracking-wider text-[#9EAAA4]">Color / Finish:</span>
                <span className="font-medium text-white">{product.color}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-full border-2 border-[#FA9D60] shadow-sm shrink-0"
                  style={{ backgroundColor: product.colorHex }}
                />
                <span className="text-xs text-[#E9E8DF] font-light">
                  {product.leatherType}
                </span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="uppercase tracking-wider text-[#9EAAA4]">
                  Select Size (EU):
                </span>
                <Link
                  href="/size-guide"
                  className="text-[#FA9D60] hover:underline transition-all"
                >
                  Size Guide &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl text-xs font-mono font-medium transition-all ${
                      selectedSize === size
                        ? "bg-[#FA9D60] text-[#101412] font-bold shadow-md scale-105"
                        : "bg-[#07100E] text-[#9EAAA4] hover:text-white border border-white/10 hover:border-white/30"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider text-[#9EAAA4]">
                Quantity:
              </span>
              <div className="flex items-center bg-[#07100E] border border-white/10 rounded-full px-3 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-[#FA9D60] transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 text-xs font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-[#FA9D60] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#9EAAA4] font-mono">
                Weight: {product.weight}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleAddToCart}
                className="btn-copper-pill w-full py-4 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                <span>{addedToast ? "Added to Bag • Opening Bag..." : "Add to Bag"}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-full bg-[#101412] text-[#F6F5F0] hover:bg-white/10 border border-white/20 text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Buy Now &bull; Express Checkout
              </button>
            </div>

            {/* Luxury Service Commitments */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center text-[11px] text-[#9EAAA4]">
              <div className="flex flex-col items-center">
                <Truck size={18} className="text-[#FA9D60] mb-1" />
                <span>Express Courier Included</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw size={18} className="text-[#FA9D60] mb-1" />
                <span>14-Day Free Exchange</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck size={18} className="text-[#FA9D60] mb-1" />
                <span>100% Genuine Leather</span>
              </div>
            </div>
          </div>

          {/* Accordion Tabs for Craft & Care */}
          <div className="pt-6 border-t border-white/10 space-y-3 text-xs">
            <div className="rounded-2xl bg-[#07100E] border border-white/10 overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === "craft" ? "" : "craft")}
                className="w-full p-4 flex items-center justify-between text-left font-medium text-white hover:text-[#FA9D60]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#FA9D60]" />
                  <span>Materials & Craftsmanship Details</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${activeTab === "craft" ? "rotate-180" : ""}`}
                />
              </button>
              {activeTab === "craft" && (
                <div className="p-4 pt-0 text-[#9EAAA4] space-y-2 font-light">
                  <p>{product.description}</p>
                  <div className="mt-2 text-xs font-semibold text-white">
                    Sole Construction: <span className="font-normal text-[#E9E8DF]">{product.soleType}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-white/80 pt-2">
                    {product.craftDetails.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-[#07100E] border border-white/10 overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === "care" ? "" : "care")}
                className="w-full p-4 flex items-center justify-between text-left font-medium text-white hover:text-[#FA9D60]"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#FA9D60]" />
                  <span>Leather Care & Longevity</span>
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${activeTab === "care" ? "rotate-180" : ""}`}
                />
              </button>
              {activeTab === "care" && (
                <div className="p-4 pt-0 text-[#9EAAA4] space-y-2 font-light">
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    {product.careInstructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ul>
                  <div className="pt-2 text-[11px] text-[#FA9D60]">
                    Returns: {product.returnPolicy}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-28 pt-16 border-t border-white/10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#FA9D60] font-medium mb-1">
              Complementary Styles
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-white">
              You May Also Admire
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-wider text-[#9EAAA4] hover:text-[#FA9D60] inline-flex items-center gap-1 font-medium transition-colors"
          >
            <span>View All</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {fallbackRelated.map((rel) => (
            <Link
              key={rel.id}
              href={`/products/${rel.slug || rel.id}`}
              className="group block rounded-3xl bg-[#07100E] border border-white/10 hover:border-[#FA9D60]/40 p-6 shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="aspect-[4/3] flex items-center justify-center p-4">
                <img
                  src={rel.image}
                  alt={rel.name}
                  className="w-full h-full object-contain filter group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#FA9D60] transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-[#9EAAA4]">{rel.category}</p>
                </div>
                <span className="text-sm font-semibold text-[#FA9D60]">
                  {formatPKR(rel.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-[#9EAAA4]">Loading footwear atelier...</div>}>
        <ProductContent params={params} />
      </Suspense>
      <Footer />
    </main>
  );
}
