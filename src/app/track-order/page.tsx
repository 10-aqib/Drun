"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ShieldAlert } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [trackedOrder, setTrackedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      searchOrder(initialId);
    }
  }, [initialId]);

  const searchOrder = (id: string) => {
    setHasSearched(true);
    const cleanId = id.trim().toUpperCase();

    // Search in localStorage
    const savedOrders = JSON.parse(localStorage.getItem("drun_orders") || "[]");
    const found = savedOrders.find(
      (o: any) => o.id.toUpperCase() === cleanId || o.customer?.phone?.includes(cleanId)
    );

    if (found) {
      setTrackedOrder(found);
    } else if (cleanId.startsWith("DRN-")) {
      // Mock active order if demo id
      setTrackedOrder({
        id: cleanId,
        status: "In Transit with TCS Express",
        createdAt: new Date().toISOString(),
        customer: {
          fullName: "Muhammad Asim",
          city: "Lahore",
          province: "Punjab",
          phone: "0300-9876543",
        },
        items: [
          {
            product: { name: "The Royal Norozi", price: 15500 },
            size: 42,
            quantity: 1,
          },
        ],
        total: 15500,
      });
    } else {
      setTrackedOrder(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      searchOrder(orderQuery);
    }
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
          Courier Logistics
        </span>
        <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#F6F5F0] tracking-tight">
          Track Your Order<span className="text-[#FA9D60]">.</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#9EAAA4] max-w-md mx-auto font-normal">
          Enter your Drun Order Reference number (e.g. DRN-849201) or recipient phone number.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-16">
        <div className="flex items-center bg-[#07100E] border border-white/20 rounded-full p-2 shadow-2xl focus-within:border-[#FA9D60] transition-colors">
          <Search size={20} className="text-[#9EAAA4] ml-4 mr-2" />
          <input
            type="text"
            required
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Enter Order # (e.g. DRN-849201)"
            className="flex-1 bg-transparent text-sm text-white placeholder-[#9EAAA4] outline-none"
          />
          <button
            type="submit"
            className="btn-copper-pill px-6 py-2.5 text-xs uppercase tracking-wider font-semibold"
          >
            Track Order
          </button>
        </div>
      </form>

      {/* Tracking Results */}
      {hasSearched && (
        trackedOrder ? (
          <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
              <div>
                <span className="text-xs text-[#9EAAA4]">Order Reference:</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#FA9D60]">
                  {trackedOrder.id}
                </div>
              </div>
              <div>
                <span className="text-xs text-[#9EAAA4]">Destination:</span>
                <div className="text-sm font-semibold text-white">
                  {trackedOrder.customer.city}, {trackedOrder.customer.province}
                </div>
              </div>
            </div>

            {/* Stages Timeline */}
            <div className="space-y-6">
              <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">Delivery Timeline</h3>
              <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#FA9D60]">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-[#FA9D60] text-[#101412] flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Order Confirmed & Bench Registered</div>
                    <div className="text-xs text-[#9EAAA4] mt-0.5">Artisan pair assigned in Peshawar workshop</div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-[#FA9D60] text-[#101412] flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Hand-Inspection & Luxury Packaging</div>
                    <div className="text-xs text-[#9EAAA4] mt-0.5">Dual-welt check and magnetic box sealing</div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-[#FA9D60] text-[#101412] flex items-center justify-center animate-pulse">
                    <Truck size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#FA9D60]">Dispatched via TCS Express Air</div>
                    <div className="text-xs text-[#9EAAA4] mt-0.5">
                      In transit to destination hub in {trackedOrder.customer.city}
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-[#08231D] border border-white/20 text-[#9EAAA4] flex items-center justify-center">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#9EAAA4]">Doorstep Delivery & Cash on Delivery Handover</div>
                    <div className="text-xs text-[#9EAAA4] mt-0.5">Estimated within 24–48 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipient note */}
            <div className="p-4 rounded-xl bg-[#08231D]/40 border border-white/5 text-xs text-[#9EAAA4] flex items-center justify-between">
              <span>Customer: {trackedOrder.customer.fullName} ({trackedOrder.customer.phone})</span>
              <span className="text-[#FA9D60] font-mono font-medium">TCS Air Tracking Active</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-[#07100E] border border-white/10 rounded-3xl p-8">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <ShieldAlert size={24} />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">No Matching Order Found</h3>
            <p className="text-xs text-[#9EAAA4] max-w-sm mx-auto mb-6">
              Please verify your order reference number (e.g. DRN-849201) or check your confirmation SMS.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-[#9EAAA4]">Loading tracking portal...</div>}>
        <TrackOrderContent />
      </Suspense>
      <Footer />
    </main>
  );
}
