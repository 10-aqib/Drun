"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, Printer } from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "DRN-849201";
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    // Trigger celebratory luxury confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FA9D60", "#D88955", "#F8F7F3", "#08231D"],
      });
    } catch (e) {
      // ignore
    }

    // Retrieve order details from localStorage
    try {
      const orders = JSON.parse(localStorage.getItem("drun_orders") || "[]");
      const found = orders.find((o: any) => o.id === orderId);
      if (found) {
        setOrder(found);
      }
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl mx-auto">
      {/* Confirmation Badge */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#08231D] text-[#FA9D60] border-2 border-[#FA9D60]/40 flex items-center justify-center mb-6 shadow-2xl animate-in zoom-in-75 duration-500">
          <CheckCircle2 size={40} />
        </div>
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
          Order Confirmed
        </span>
        <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#F6F5F0] tracking-tight">
          Crafting Your Pair<span className="text-[#FA9D60]">.</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#9EAAA4] max-w-md mx-auto font-normal">
          Thank you for choosing Drun. Your bespoke pair is being prepared by our master
          cobblers in Peshawar.
        </p>

        <div className="mt-6 inline-block px-5 py-2 rounded-full bg-[#07100E] border border-white/10 font-mono text-xs text-[#FA9D60]">
          Order Reference: <span className="text-white font-bold">{orderId}</span>
        </div>
      </div>

      {/* Order Status & Timeline */}
      <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs text-[#9EAAA4]">Estimated Delivery:</span>
            <div className="font-heading text-xl sm:text-2xl font-bold text-white">
              2 – 4 Business Days (Express Air)
            </div>
          </div>
          <div>
            <span className="text-xs text-[#9EAAA4]">Payment Method:</span>
            <div className="text-sm font-semibold text-[#FA9D60]">
              {order ? order.customer.paymentMethod.toUpperCase() : "Cash on Delivery"}
            </div>
          </div>
        </div>

        {/* Delivery Progress Bar */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-2">
            <div className="h-1.5 rounded-full bg-[#FA9D60]" />
            <span className="text-white font-semibold">Order Placed</span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 rounded-full bg-[#FA9D60]/40" />
            <span className="text-[#9EAAA4] font-medium">Bench Work</span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 rounded-full bg-white/10" />
            <span className="text-[#9EAAA4] font-medium">TCS Express</span>
          </div>
          <div className="space-y-2">
            <div className="h-1.5 rounded-full bg-white/10" />
            <span className="text-[#9EAAA4] font-medium">Delivered</span>
          </div>
        </div>

        {/* Order Details Receipt */}
        {order && (
          <div className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">Itemized Receipt</h3>
            <div className="divide-y divide-white/5">
              {order.items.map((item: any) => (
                <div key={item.id} className="py-3 flex justify-between items-center text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-white">{item.product.name}</span>
                    <span className="text-[#9EAAA4] ml-2">
                      (EU {item.size} &bull; Qty: {item.quantity})
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-[#FA9D60]">
                    PKR {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between text-sm sm:text-base">
              <span className="text-[#9EAAA4]">Total Payable:</span>
              <span className="font-heading text-xl font-bold text-[#FA9D60]">
                PKR {order.total.toLocaleString()}
              </span>
            </div>

            <div className="text-xs text-[#9EAAA4] bg-[#08231D]/40 p-4 rounded-xl border border-white/5">
              <div className="font-semibold text-white mb-1">Delivering to:</div>
              <div>{order.customer.fullName} &bull; {order.customer.phone}</div>
              <div>{order.customer.address}, {order.customer.city}, {order.customer.province}</div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href={`/track-order?id=${orderId}`}
          className="btn-copper-pill px-8 py-3.5 text-xs uppercase tracking-widest flex items-center gap-2"
        >
          <Truck size={16} />
          <span>Track Delivery Status</span>
        </Link>
        <Link
          href="/shop"
          className="btn-ghost-luxury px-8 py-3.5 text-xs uppercase tracking-widest"
        >
          Continue Exploring
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />
      <Suspense fallback={<div className="pt-32 text-center text-[#9EAAA4]">Loading confirmation...</div>}>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
