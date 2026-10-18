import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
            Governance & Standards
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#F6F5F0] tracking-tight">
            Policies & Guarantees<span className="text-[#FA9D60]">.</span>
          </h1>
        </div>

        <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-10 sm:space-y-12 text-xs sm:text-sm text-[#9EAAA4] font-normal leading-relaxed">
          {/* Exchange Guarantee */}
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
              1. 14-Day Complimentary Size Exchange
            </h2>
            <p className="mb-2">
              At Drun, our paramount commitment is that your pair fits with absolute distinction.
              If your shoes feel slightly loose, snug, or if you wish to adjust the size, we provide
              a complimentary exchange within 14 days of delivery.
            </p>
            <p>
              To qualify, shoes must be tried on carpeted or clean indoor surfaces and returned
              in their original dust bags and luxury magnetic box. We dispatch the replacement size
              immediately upon collection.
            </p>
          </div>

          {/* Delivery & Cash on Delivery */}
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
              2. Cash on Delivery & Fulfillment Terms
            </h2>
            <p className="mb-2">
              We provide Cash on Delivery (COD) services across all urban and regional territories
              in Pakistan via tracked couriers (TCS / Leopard / Call Courier).
            </p>
            <p>
              You are invited to inspect the exterior luxury packaging upon delivery. Payment
              is rendered in Pakistani Rupees (PKR) directly to the courier agent.
            </p>
          </div>

          {/* Authentic Leather Guarantee */}
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
              3. Authentic Leather Warranty
            </h2>
            <p>
              Every pair bearing the Drun hallmark is manufactured solely from 100% full-grain bovine
              leather, kidskin, or European suede. We guarantee that zero synthetic leather or bonded
              polyurethane is utilized in any component of our uppers, footbeds, or welts.
            </p>
          </div>

          {/* Privacy */}
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-3">
              4. Patron Privacy Protection
            </h2>
            <p>
              We respect your confidentiality. Contact information and delivery addresses are
              stored securely solely for fulfillment, courier logistics, and concierge customer
              support. We never share or sell patron records to third parties.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
