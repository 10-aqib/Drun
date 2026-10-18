"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Heart, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES } from "@/data/products";

function NavbarContent() {
  const pathname = usePathname();
  const { cartCount, openCart, wishlist } = useCart();
  const { openAuthModal, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#031A16]/92 backdrop-blur-md border-b border-white/10 py-3 shadow-xl"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Left Brand Wordmark */}
          <Link href="/" className="group flex items-center gap-1.5 focus:outline-none py-1">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F6F5F0] group-hover:text-[#FA9D60] transition-colors duration-200">
              Drun<span className="text-[#FA9D60]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-[13px] tracking-[0.16em] uppercase font-semibold text-[#E9E8DF]">
            {/* Collections with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCollectionsOpen(true)}
              onMouseLeave={() => setIsCollectionsOpen(false)}
            >
              <button
                className={`flex items-center gap-1.5 hover:text-[#FA9D60] transition-colors py-2 focus:outline-none ${
                  pathname.startsWith("/collections") || pathname.startsWith("/shop")
                    ? "text-[#FA9D60]"
                    : ""
                }`}
              >
                <span>Collections</span>
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    isCollectionsOpen ? "rotate-180 text-[#FA9D60]" : ""
                  }`}
                />
              </button>

              {/* Collection Dropdown */}
              {isCollectionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-76 z-50">
                  <div className="bg-[#07100E]/95 backdrop-blur-xl border border-white/12 rounded-2xl p-3 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <Link
                      href="/shop"
                      className="block px-3 py-2.5 rounded-xl hover:bg-white/8 text-xs text-[#F6F5F0] hover:text-[#FA9D60] transition-all"
                    >
                      <div className="font-bold flex items-center justify-between">
                        <span>All Footwear</span>
                        <ArrowRight size={12} className="opacity-60" />
                      </div>
                      <div className="text-[10px] text-[#9EAAA4] normal-case mt-0.5">
                        Browse the complete handcrafted catalogue
                      </div>
                    </Link>
                    <div className="h-px bg-white/10 my-1" />
                    {CATEGORIES.filter(c => c.slug !== "heritage" && c.slug !== "contemporary").map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/collections/${cat.slug}`}
                        className="block px-3 py-2 rounded-xl hover:bg-white/8 text-xs text-[#F6F5F0] hover:text-[#FA9D60] transition-all"
                      >
                        <div className="font-semibold flex justify-between items-center">
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-[#FA9D60] font-mono">({cat.count})</span>
                        </div>
                        <div className="text-[10px] text-[#9EAAA4] normal-case line-clamp-1 mt-0.5">
                          {cat.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#craftsmanship"
              className="hover:text-[#FA9D60] transition-colors py-2"
            >
              Craftsmanship
            </Link>

            <Link
              href="/#heritage"
              className="hover:text-[#FA9D60] transition-colors py-2"
            >
              Our Story
            </Link>

            <Link
              href="/size-guide"
              className={`hover:text-[#FA9D60] transition-colors py-2 ${
                pathname === "/size-guide" ? "text-[#FA9D60]" : ""
              }`}
            >
              Size Guide
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <div className="relative">
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-[#07100E] border border-white/25 rounded-full px-3 py-1.5 animate-in fade-in duration-200 shadow-md"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search footwear..."
                    autoFocus
                    className="bg-transparent text-xs text-white placeholder-[#9EAAA4] outline-none w-32 sm:w-44"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-[#9EAAA4] hover:text-white ml-1 p-0.5"
                    aria-label="Close search"
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 sm:p-2.5 text-[#E9E8DF] hover:text-[#FA9D60] transition-colors rounded-full hover:bg-white/8 min-w-[38px] min-h-[38px] flex items-center justify-center"
                  aria-label="Search footwear"
                >
                  <Search size={18} />
                </button>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              href="/shop?filter=wishlist"
              className="p-2 sm:p-2.5 text-[#E9E8DF] hover:text-[#FA9D60] transition-colors rounded-full hover:bg-white/8 relative min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FA9D60]" />
              )}
            </Link>

            {/* Account / Login Modal Trigger */}
            <button
              onClick={openAuthModal}
              className="p-2 sm:p-2.5 text-[#E9E8DF] hover:text-[#FA9D60] transition-colors rounded-full hover:bg-white/8 relative min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Account"
            >
              <User size={18} />
              {user && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FA9D60]" />
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#FA9D60] text-[#F6F5F0] hover:text-[#101412] border border-white/15 hover:border-[#FA9D60] transition-all duration-200 group min-h-[38px]"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={16} />
              <span className="text-xs font-bold font-mono">{cartCount}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-[#E9E8DF] hover:text-white rounded-lg focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Refined solid typography, fluid and touch-friendly) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#031A16]/98 backdrop-blur-2xl pt-24 px-6 sm:px-8 pb-10 flex flex-col justify-between md:hidden animate-in fade-in duration-200 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#FA9D60] font-bold">
              Navigation
            </div>
            <div className="flex flex-col space-y-3.5 text-xl sm:text-2xl font-heading font-bold text-[#F6F5F0]">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FA9D60] transition-colors py-1 flex items-center justify-between"
              >
                <span>All Footwear</span>
                <ArrowRight size={16} className="text-[#FA9D60]" />
              </Link>
              <Link
                href="/collections/classic"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FA9D60] transition-colors py-1 flex items-center justify-between"
              >
                <span>Classic Peshawari</span>
                <ArrowRight size={16} className="text-[#FA9D60]" />
              </Link>
              <Link
                href="/collections/kaptaan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FA9D60] transition-colors py-1 flex items-center justify-between"
              >
                <span>Kaptaan Style</span>
                <ArrowRight size={16} className="text-[#FA9D60]" />
              </Link>
              <Link
                href="/collections/norozi"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FA9D60] transition-colors py-1 flex items-center justify-between"
              >
                <span>Norozi Style</span>
                <ArrowRight size={16} className="text-[#FA9D60]" />
              </Link>
              <Link
                href="/collections/modern"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FA9D60] transition-colors py-1 flex items-center justify-between"
              >
                <span>Modern & Signature</span>
                <ArrowRight size={16} className="text-[#FA9D60]" />
              </Link>
              <Link
                href="/#craftsmanship"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FA9D60] transition-colors py-1"
              >
                Craftsmanship
              </Link>
              <Link
                href="/#heritage"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FA9D60] transition-colors py-1"
              >
                Our Story
              </Link>
              <Link
                href="/size-guide"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FA9D60] transition-colors py-1"
              >
                Size Guide & Fit
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#FA9D60] transition-colors py-1"
              >
                Contact & Bespoke
              </Link>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openAuthModal();
              }}
              className="btn-copper-pill w-full py-3.5 text-xs uppercase tracking-widest font-bold"
            >
              {user ? `Signed in as ${user.name}` : "Patron Sign In"}
            </button>
            <p className="text-[11px] text-center text-[#9EAAA4]">
              &copy; 2026 Drun. Handcrafted Peshawari Footwear.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <header className="fixed top-0 left-0 right-0 z-40 py-5 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F6F5F0]">
              Drun<span className="text-[#FA9D60]">.</span>
            </span>
          </div>
        </header>
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
