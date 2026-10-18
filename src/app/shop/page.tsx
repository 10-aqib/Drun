"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  Heart,
  ShoppingBag,
  ArrowUpRight,
  Search,
  Check,
  RotateCcw,
  Sparkles,
  Camera,
  Eye
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCTS, Product, formatPKR } from "@/data/products";
import { useCart } from "@/context/CartContext";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialFilter = searchParams.get("filter") || "";
  const initialQuery = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const collections = [
    { label: "All Collections", value: "All" },
    { label: "Classic Peshawari", value: "Classic Peshawari", slug: "classic" },
    { label: "Kaptaan Style", value: "Kaptaan Style", slug: "kaptaan" },
    { label: "Norozi Style", value: "Norozi Style", slug: "norozi" },
    { label: "Modern & Signature", value: "Modern & Signature", slug: "modern" },
  ];

  const allSizes = [39, 40, 41, 42, 43, 44, 45, 46];
  const colorFamilies = ["All", "Brown", "Black", "Tan", "Chocolate", "Olive", "Oxblood", "Navy"];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category match
      if (selectedCategory !== "All") {
        const catLow = selectedCategory.toLowerCase();
        const matchesCategory =
          p.category.toLowerCase() === catLow ||
          p.categorySlug === catLow ||
          (catLow === "classic" && (p.category.includes("Classic") || p.categorySlug === "classic")) ||
          (catLow === "kaptaan" && (p.category.includes("Kaptaan") || p.categorySlug === "kaptaan")) ||
          (catLow === "norozi" && (p.category.includes("Norozi") || p.categorySlug === "norozi")) ||
          (catLow === "modern" && (p.category.includes("Modern") || p.categorySlug === "modern")) ||
          (catLow === "heritage" && (p.categorySlug === "classic" || p.categorySlug === "norozi" || p.category === "Heritage")) ||
          (catLow === "contemporary" && (p.categorySlug === "modern" || p.category === "Contemporary"));
        if (!matchesCategory) return false;
      }

      // Size match
      if (selectedSize && !p.sizes.includes(selectedSize)) return false;

      // Price range match
      if (selectedPriceRange === "under-14k" && p.price >= 14000) return false;
      if (selectedPriceRange === "14k-16k" && (p.price < 14000 || p.price > 16000)) return false;
      if (selectedPriceRange === "above-16k" && p.price <= 16000) return false;

      // Color family match
      if (selectedColor !== "All") {
        const c = selectedColor.toLowerCase();
        const pColor = (p.color + " " + p.leatherType).toLowerCase();
        if (!pColor.includes(c)) return false;
      }

      // Availability filter
      if (availabilityFilter === "in-stock" && !p.inStock) return false;
      if (availabilityFilter === "verified-photo" && p.photoStatus !== "verified") return false;

      // Wishlist match
      if (initialFilter === "wishlist" && !isInWishlist(p.id)) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.leatherType.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [
    selectedCategory,
    selectedSize,
    selectedPriceRange,
    selectedColor,
    availabilityFilter,
    searchQuery,
    sortBy,
    initialFilter,
    isInWishlist
  ]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const sizeToUse = selectedSize || product.sizes[0] || 42;
    addToCart(product, sizeToUse, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const resetAllFilters = () => {
    setSelectedCategory("All");
    setSelectedSize(null);
    setSelectedPriceRange("All");
    setSelectedColor("All");
    setAvailabilityFilter("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  const isFiltered =
    selectedCategory !== "All" ||
    selectedSize !== null ||
    selectedPriceRange !== "All" ||
    selectedColor !== "All" ||
    availabilityFilter !== "All" ||
    searchQuery.trim() !== "";

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
          The Atelier Catalogue
        </span>
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F6F5F0] tracking-tight">
          Handcrafted Footwear<span className="text-[#FA9D60]">.</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#9EAAA4] font-normal max-w-xl mx-auto leading-relaxed">
          Explore our complete collection of 29 authentic Peshawari chappals, including traditional heritage cuts, Kaptaan square toes, Norozi double welts, and contemporary silhouettes.
        </p>
      </div>

      {/* Interactive Filter & Control Dashboard */}
      <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl space-y-6">
        {/* Row 1: Search & Sorting */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, leather, color, SKU..."
              className="w-full bg-[#08231D]/80 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60] transition-colors"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9EAAA4]" />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end flex-wrap">
            <span className="text-xs text-[#9EAAA4] font-mono">
              Showing <strong className="text-white">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "design" : "designs"}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#9EAAA4] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#08231D] border border-white/10 rounded-full px-4 py-2 text-xs text-white outline-none cursor-pointer focus:border-[#FA9D60]"
              >
                <option value="featured">Featured Curations</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {isFiltered && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#FA9D60] hover:underline flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Collection Pills */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[#9EAAA4] mr-2">
            Collection:
          </span>
          {collections.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.value
                  ? "bg-[#FA9D60] text-[#101412] font-semibold shadow-md scale-102"
                  : "bg-[#08231D] text-[#E9E8DF] hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 3: Multi-facet Filter Bar (Size, Price, Color, Availability) */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Size Filter */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#9EAAA4] mb-2 font-medium">
              EU Shoe Size:
            </div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedSize(null)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  selectedSize === null
                    ? "bg-[#FA9D60] text-[#101412] font-bold"
                    : "bg-white/5 text-[#9EAAA4] hover:text-white"
                }`}
              >
                All
              </button>
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                    selectedSize === size
                      ? "bg-[#FA9D60] text-[#101412] font-bold"
                      : "bg-white/5 text-[#9EAAA4] hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#9EAAA4] mb-2 font-medium">
              Price Range:
            </div>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full bg-[#08231D] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-[#FA9D60]"
            >
              <option value="All">All Prices</option>
              <option value="under-14k">Under Rs. 14,000</option>
              <option value="14k-16k">Rs. 14,000 – Rs. 16,000</option>
              <option value="above-16k">Above Rs. 16,000</option>
            </select>
          </div>

          {/* Color Filter */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#9EAAA4] mb-2 font-medium">
              Leather Tone:
            </div>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full bg-[#08231D] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-[#FA9D60]"
            >
              {colorFamilies.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Colors" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Availability / Photo Status */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#9EAAA4] mb-2 font-medium">
              Status:
            </div>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full bg-[#08231D] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-[#FA9D60]"
            >
              <option value="All">All Catalog Records</option>
              <option value="verified-photo">Verified Studio Photos (5)</option>
              <option value="in-stock">Ready to Dispatch Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Catalog Grid (Phase 5: 4 Columns Desktop, 2–3 Columns Tablet, 2 Columns Mobile) */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-[#07100E] rounded-3xl border border-white/10 p-8 shadow-xl">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#08231D] text-[#FA9D60] flex items-center justify-center mb-4">
            <SlidersHorizontal size={24} />
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight mb-2 text-white">
            No Footwear Matches Your Filters
          </h3>
          <p className="text-sm text-[#9EAAA4] max-w-md mx-auto mb-6 font-normal">
            We couldn&apos;t find any pairs matching your current combination of filters. Try clearing your search or expanding the price and size range.
          </p>
          <button
            onClick={resetAllFilters}
            className="btn-copper-pill px-8 py-3 text-xs uppercase tracking-wider font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
          {filteredProducts.map((product) => {
            const inWishlist = isInWishlist(product.id);
            const isHovered = hoveredProduct === product.id;
            const alternateImage = product.additionalImages[1] || product.image;

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug || product.id}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group block rounded-3xl bg-[#07100E] border border-white/10 hover:border-[#FA9D60]/40 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Image Stage Container */}
                <div className="relative aspect-[4/3] bg-[#08231D]/40 p-4 sm:p-6 flex items-center justify-center overflow-hidden">
                  {/* Category & Status Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#101412]/80 backdrop-blur-md text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#FA9D60] border border-white/10">
                      {product.category}
                    </span>
                    {product.status === "draft" && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md text-[9px] font-mono text-amber-300 border border-amber-500/30">
                        Atelier Draft
                      </span>
                    )}
                    {product.isNew && product.status !== "draft" && (
                      <span className="px-2 py-0.5 rounded-full bg-[#FA9D60] text-[9px] font-bold uppercase tracking-wider text-[#101412]">
                        New
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                      inWishlist
                        ? "bg-[#FA9D60] text-[#101412]"
                        : "bg-[#101412]/70 text-[#9EAAA4] hover:text-white hover:bg-[#101412]"
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart size={15} fill={inWishlist ? "currentColor" : "none"} />
                  </button>

                  {/* Product Shoe Image with Subtle Hover Flip/Scale */}
                  <img
                    src={isHovered ? alternateImage : product.image}
                    alt={product.imageAlt || product.name}
                    className="w-full h-full object-contain filter group-hover:scale-104 transition-all duration-500 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
                  />
                </div>

                {/* Card Information */}
                <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between bg-[#07100E]">
                  <div>
                    {/* Color Swatch & SKU */}
                    <div className="flex items-center justify-between text-[11px] text-[#9EAAA4] mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-white/30 inline-block"
                          style={{ backgroundColor: product.colorHex }}
                        />
                        <span className="truncate max-w-[120px]">{product.color}</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#9EAAA4] hidden sm:inline">
                        {product.sku}
                      </span>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-[#F6F5F0] group-hover:text-[#FA9D60] transition-colors leading-tight line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#9EAAA4] mt-1 line-clamp-1 font-normal">
                      {product.tagline}
                    </p>

                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[#E9E8DF]">
                      <span className="text-[#FA9D60]">&bull;</span>
                      <span className="line-clamp-1 text-[10px] sm:text-[11px]">{product.leatherType}</span>
                    </div>

                    {/* Available Sizes preview */}
                    <div className="mt-3 flex flex-wrap gap-1 text-[9px] sm:text-[10px] font-mono text-[#9EAAA4]">
                      {product.sizes.slice(0, 5).map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-white/5">
                          {s}
                        </span>
                      ))}
                      {product.sizes.length > 5 && (
                        <span className="px-1 py-0.5 text-[9px] text-[#9EAAA4]">
                          +{product.sizes.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Quick Add Button */}
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div>
                      <div className="font-heading text-base sm:text-lg lg:text-xl font-bold text-[#FA9D60]">
                        {formatPKR(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[10px] sm:text-[11px] text-[#9EAAA4] line-through font-normal">
                          {formatPKR(product.originalPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-[#FA9D60] text-white hover:text-[#101412] text-[11px] sm:text-xs font-medium tracking-wide flex items-center gap-1.5 transition-all shadow-sm shrink-0"
                      aria-label="Add product to bag"
                    >
                      {addedItem === product.id ? (
                        <>
                          <Check size={13} />
                          <span className="hidden sm:inline">Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={13} />
                          <span className="hidden sm:inline">Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-[#9EAAA4]">Loading footwear atelier...</div>}>
        <ShopContent />
      </Suspense>
      <Footer />
    </main>
  );
}
