"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Send } from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("drun_newsletter") || "[]");
    if (!existing.includes(newsletterEmail)) {
      existing.push(newsletterEmail);
      localStorage.setItem("drun_newsletter", JSON.stringify(existing));
    }

    setIsSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <footer className="relative z-30 bg-[#07100E] text-[#F6F5F0] border-t border-white/10 pt-16 sm:pt-20 pb-12 overflow-hidden">
      {/* 1. Final Call to Action Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center pb-16 sm:pb-20 border-b border-white/10">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold mb-3 block">
          Step Into Luxury
        </span>
        <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#F6F5F0] tracking-tight">
          Walk with distinction<span className="text-[#FA9D60]">.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#9EAAA4] font-normal max-w-md mx-auto">
          Explore the Drun collection and experience the pinnacle of bespoke Peshawari craft.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/shop"
            className="btn-copper-pill px-8 py-3.5 text-xs uppercase tracking-widest flex items-center gap-2 group font-bold"
          >
            <span>Shop Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* 2. Structured Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-14 sm:pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block focus:outline-none">
              <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F6F5F0]">
                Drun<span className="text-[#FA9D60]">.</span>
              </span>
            </Link>
            <p className="mt-3 text-xs text-[#9EAAA4] leading-relaxed font-normal">
              Tradition, redefined. Handcrafted luxury Peshawari footwear preserving
              indigenous Pashtun artisanal heritage.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FA9D60] font-medium mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9EAAA4]">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Footwear
                </Link>
              </li>
              <li>
                <Link href="/collections/heritage" className="hover:text-white transition-colors">
                  Heritage Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/contemporary" className="hover:text-white transition-colors">
                  Contemporary Collection
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors">
                  Size Guide & Fit
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FA9D60] font-medium mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9EAAA4]">
              <li>
                <Link href="/#heritage" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/#craftsmanship" className="hover:text-white transition-colors">
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FA9D60] transition-colors">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FA9D60] font-medium mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9EAAA4]">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Delivery & Shipping
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Care Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#FA9D60] font-medium mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9EAAA4]">
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition-colors">
                  Exchange Guarantee
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Middle Section: Wordmark Panel & Newsletter (Reference frame 64s) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Wordmark Panel */}
          <div className="rounded-2xl bg-[#08231D]/40 border border-white/10 p-6 sm:p-8 flex items-center justify-between">
            <span className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F6F5F0]">
              Drun<span className="text-[#FA9D60]">.</span>
            </span>
            <span className="text-xs uppercase tracking-widest text-[#9EAAA4]">
              Peshawar &bull; Pakistan
            </span>
          </div>

          {/* Newsletter Panel */}
          <div className="rounded-2xl bg-[#08231D]/40 border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs uppercase tracking-widest text-[#FA9D60] font-medium">
                Subscribe to Drun.
              </span>
              <span className="text-[10px] text-[#9EAAA4]">Exclusive Releases & Concierge Invites</span>
            </div>

            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#FA9D60] py-2">
                <Check size={16} />
                <span>Thank you. You are now subscribed to Drun releases.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-[#07100E] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-xl bg-[#FA9D60] text-[#101412] flex items-center justify-center hover:bg-[#F28C47] transition-colors flex-shrink-0"
                  aria-label="Subscribe"
                >
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4. Bottom Line */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9EAAA4] gap-4">
          <p>&copy; 2026 Drun. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/policies" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/policies" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/policies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
