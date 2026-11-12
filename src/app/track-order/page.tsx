"use client";

import type { Order } from "@/lib/types";
import React, { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Truck, CheckCircle2, MapPin, ShieldAlert, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { safeJson, useStoredValue } from "@/lib/localStore";

const ORDERS_KEY = "drun_orders";
// Order Reference shown as the example on this page; always resolves so visitors can preview tracking.
const DEMO_ORDER_ID = "DRN-849201";

// Timeline steps, in the same order as the statuses the admin console can set.
const STAGES = [
  { title: "Order Confirmed & Bench Registered", note: "Artisan pair assigned in Peshawar workshop" },
  { title: "Hand-Inspection & Luxury Packaging", note: "Dual-welt check and magnetic box sealing" },
  { title: "Dispatched via TCS Express Air", note: "In transit to your city's destination hub" },
  { title: "Doorstep Delivery & Cash on Delivery Handover", note: "Estimated within 24–48 hours of dispatch" },
];

function stageIndex(status: string): number {
  const s = (status || "").toLowerCase();
  if (s.includes("deliver")) return 3;
  if (s.includes("dispatch") || s.includes("transit") || s.includes("tcs")) return 2;
  if (s.includes("bench") || s.includes("pack")) return 1;
  return 0;
}

const digits = (v: string) => v.replace(/\D/g, "");

function parseOrders([raw]: (string | null)[]): Order[] {
  const list = safeJson<unknown>(raw, []);
  return Array.isArray(list) ? (list as Order[]) : [];
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const orders = useStoredValue([ORDERS_KEY], parseOrders);
  const [orderQuery, setOrderQuery] = useState(initialId);
  const [submittedQuery, setSubmittedQuery] = useState(initialId);
  const hasSearched = submittedQuery.trim() !== "";

  const trackedOrder = useMemo(() => {
    const clean = submittedQuery.trim().toUpperCase();
    if (!clean) return null;

    const byId = orders.find((o) => String(o.id).toUpperCase() === clean);
    if (byId) return byId;

    // Phone lookup: compare digits only and require a meaningful number
    const phone = digits(clean);
    if (phone.length >= 10) {
      const byPhone = orders.find((o) => {
        const p = digits(String(o.customer?.phone ?? ""));
        return p.length >= 10 && (p.endsWith(phone) || phone.endsWith(p));
      });
      if (byPhone) return byPhone;
    }

    if (clean === DEMO_ORDER_ID) {
      return {
        id: DEMO_ORDER_ID,
        status: "Dispatched (TCS)",
        createdAt: new Date(0).toISOString(),
        customer: {
          fullName: "Muhammad Asim",
          city: "Lahore",
          province: "Punjab",
          phone: "0300-9876543",
        },
        items: [{ product: { name: "The Royal Norozi", price: 15500 }, size: 42, quantity: 1 }],
        total: 15500,
      };
    }
    return null;
  }, [orders, submittedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(orderQuery);
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
                  {trackedOrder.customer?.city}, {trackedOrder.customer?.province}
                </div>
              </div>
            </div>

            {/* Stages Timeline (driven by the order's real status) */}
            {(() => {
              const cancelled = String(trackedOrder.status).toLowerCase().includes("cancel");
              const current = stageIndex(trackedOrder.status);
              return (
                <div className="space-y-6">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">Delivery Timeline</h3>
                  {cancelled ? (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-center gap-2">
                      <XCircle size={18} />
                      <span>This order was cancelled. Please contact our concierge for assistance.</span>
                    </div>
                  ) : (
                    <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/15">
                      {STAGES.map((stage, i) => {
                        const done = i < current || (i === current && current === 3);
                        const active = i === current && !done;
                        return (
                          <div key={stage.title} className="relative">
                            <div
                              className={`absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                done
                                  ? "bg-[#FA9D60] text-[#101412]"
                                  : active
                                  ? "bg-[#FA9D60] text-[#101412] animate-pulse"
                                  : "bg-[#08231D] border border-white/20 text-[#9EAAA4]"
                              }`}
                            >
                              {done ? <CheckCircle2 size={14} /> : i === 2 ? <Truck size={14} /> : i === 3 ? <MapPin size={14} /> : <CheckCircle2 size={14} />}
                            </div>
                            <div>
                              <div
                                className={`text-sm ${
                                  active ? "font-semibold text-[#FA9D60]" : done ? "font-semibold text-white" : "font-medium text-[#9EAAA4]"
                                }`}
                              >
                                {stage.title}
                              </div>
                              <div className="text-xs text-[#9EAAA4] mt-0.5">
                                {i === 2 ? `In transit to destination hub in ${trackedOrder.customer?.city ?? "your city"}` : stage.note}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Recipient note */}
            <div className="p-4 rounded-xl bg-[#08231D]/40 border border-white/5 text-xs text-[#9EAAA4] flex items-center justify-between">
              <span>Customer: {trackedOrder.customer?.fullName} ({trackedOrder.customer?.phone})</span>
              <span className="text-[#FA9D60] font-mono font-medium">{trackedOrder.status}</span>
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
