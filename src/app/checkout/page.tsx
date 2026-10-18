"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  CreditCard,
  Banknote,
  Building,
  AlertCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Lahore",
    province: "Punjab",
    postalCode: "",
    deliveryNotes: "",
    paymentMethod: "cod", // 'cod' | 'bank' | 'card'
  });

  const pakistaniCities = [
    "Lahore",
    "Karachi",
    "Islamabad",
    "Rawalpindi",
    "Peshawar",
    "Faisalabad",
    "Multan",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Quetta",
    "Abbottabad",
    "Sargodha",
    "Bahawalpur",
    "Mardan",
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        setError("Please fill in all mandatory delivery details.");
        return;
      }
      setError("");
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      setError("Your shopping bag is empty.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const orderId = "DRN-" + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        id: orderId,
        items: cart,
        total: cartTotal,
        customer: formData,
        status: "Processing",
        paymentStatus: formData.paymentMethod === "cod" ? "Pending (Cash on Delivery)" : "Pending Verification",
        createdAt: new Date().toISOString(),
      };

      // Persist to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("drun_orders") || "[]");
      existingOrders.unshift(newOrder);
      localStorage.setItem("drun_orders", JSON.stringify(existingOrders));

      // Clear Cart
      clearCart();

      // Redirect to Order Confirmation
      setTimeout(() => {
        router.push(`/order-success?id=${orderId}`);
      }, 800);
    } catch (err) {
      setIsSubmitting(false);
      setError("Failed to process order. Please try again.");
    }
  };

  if (cart.length === 0 && !isSubmitting) {
    return (
      <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
        <Navbar />
        <div className="pt-36 pb-24 text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#08231D] text-[#FA9D60] flex items-center justify-center mb-6 shadow-xl">
            <ShieldCheck size={32} />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Your Bag is Empty</h1>
          <p className="text-sm text-[#9EAAA4] mb-8 font-normal">
            Please add your preferred pair of Peshawari chappals before initiating checkout.
          </p>
          <Link href="/shop" className="btn-copper-pill px-8 py-3 text-sm font-semibold">
            Explore Collection
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Back link & Stepper */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9EAAA4] hover:text-[#FA9D60] transition-colors font-medium"
          >
            <ArrowLeft size={14} />
            <span>Continue Shopping</span>
          </Link>

          {/* Stepper indicators */}
          <div className="flex items-center gap-3 text-xs">
            <span
              className={`flex items-center gap-1.5 font-medium ${
                step >= 1 ? "text-[#FA9D60]" : "text-[#9EAAA4]"
              }`}
            >
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                1
              </span>
              <span>Details</span>
            </span>
            <span className="w-6 h-px bg-white/20" />
            <span
              className={`flex items-center gap-1.5 font-medium ${
                step >= 2 ? "text-[#FA9D60]" : "text-[#9EAAA4]"
              }`}
            >
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              <span>Shipping</span>
            </span>
            <span className="w-6 h-px bg-white/20" />
            <span
              className={`flex items-center gap-1.5 font-medium ${
                step >= 3 ? "text-[#FA9D60]" : "text-[#9EAAA4]"
              }`}
            >
              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                3
              </span>
              <span>Payment</span>
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Multi-step Form */}
          <div className="lg:col-span-7 bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-6">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-1">
                    Step 1 of 3
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">Customer & Delivery Details</h2>
                  <p className="text-xs sm:text-sm text-[#9EAAA4] mt-1 font-normal">
                    Enter the recipient name and shipping address across Pakistan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Tariq Mahmood"
                      className="w-full bg-[#08231D]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                      Phone Number (For Courier SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full bg-[#08231D]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                    Email Address (For Order Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tariq@example.com"
                    className="w-full bg-[#08231D]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                    Street Address / House # / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House 14-B, Street 3, Sector F-7/2"
                    className="w-full bg-[#08231D]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                      Destination City *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FA9D60]"
                    >
                      {pakistaniCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                      Province / Territory *
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FA9D60]"
                    >
                      <option value="Punjab">Punjab</option>
                      <option value="Sindh">Sindh</option>
                      <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                      <option value="Balochistan">Balochistan</option>
                      <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                      <option value="Azad Kashmir">Azad Kashmir</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                    Special Landmark / Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                    placeholder="Near Askari Bank, please call before delivery"
                    className="w-full bg-[#08231D]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn-copper-pill w-full py-4 text-sm font-semibold"
                  >
                    Continue to Shipping Method
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-1">
                    Step 2 of 3
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">Shipping & Handling</h2>
                  <p className="text-xs sm:text-sm text-[#9EAAA4] mt-1 font-normal">
                    Delivering to: {formData.address}, {formData.city}, {formData.province}
                  </p>
                </div>

                {/* Selected Shipping Option */}
                <div className="p-5 rounded-2xl bg-[#08231D] border-2 border-[#FA9D60] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FA9D60]/20 text-[#FA9D60] flex items-center justify-center">
                      <Truck size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Insured Express Air Courier (TCS / Leopard)
                      </div>
                      <div className="text-xs text-[#9EAAA4]">
                        Estimated 2–4 business days with real-time SMS tracking
                      </div>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#FA9D60]">
                    Free / Included
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3.5 rounded-full border border-white/20 text-xs uppercase tracking-wider text-[#9EAAA4] hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-copper-pill flex-1 py-4 text-sm font-semibold"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-1">
                    Step 3 of 3
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">Payment Method</h2>
                  <p className="text-xs sm:text-sm text-[#9EAAA4] mt-1 font-normal">
                    Choose your preferred payment method. Cash on Delivery is fully supported across Pakistan.
                  </p>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`block p-5 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "bg-[#08231D] border-[#FA9D60] shadow-md"
                        : "bg-[#08231D]/40 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                          className="accent-[#FA9D60]"
                        />
                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#FA9D60]">
                          <Banknote size={18} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white">Cash on Delivery (COD)</span>
                          <p className="text-xs text-[#9EAAA4]">Pay in cash at your doorstep upon receiving your luxury box.</p>
                        </div>
                      </div>
                      <span className="text-xs text-[#FA9D60] font-mono font-medium">Recommended</span>
                    </div>
                  </label>

                  {/* Direct Bank Transfer */}
                  <label
                    className={`block p-5 rounded-2xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "bank"
                        ? "bg-[#08231D] border-[#FA9D60] shadow-md"
                        : "bg-[#08231D]/40 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank"
                          checked={formData.paymentMethod === "bank"}
                          onChange={() => setFormData({ ...formData, paymentMethod: "bank" })}
                          className="accent-[#FA9D60]"
                        />
                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-[#FA9D60]">
                          <Building size={18} />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white">Direct Bank Transfer / Raast</span>
                          <p className="text-xs text-[#9EAAA4]">Transfer via Meezan Bank or HBL Raast ID.</p>
                        </div>
                      </div>
                    </div>

                    {formData.paymentMethod === "bank" && (
                      <div className="mt-4 pt-4 border-t border-white/10 text-xs text-[#9EAAA4] space-y-1 bg-[#07100E] p-3 rounded-xl font-mono">
                        <div>Bank: Meezan Bank Limited</div>
                        <div>Title: DRUN FOOTWEAR LUXURY</div>
                        <div>Account: 01020304050607</div>
                        <div>Raast ID: 03001234567</div>
                      </div>
                    )}
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3.5 rounded-full border border-white/20 text-xs uppercase tracking-wider text-[#9EAAA4] hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handlePlaceOrder}
                    className="btn-copper-pill flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Lock size={16} />
                    <span>{isSubmitting ? "Generating Bespoke Order..." : "Confirm & Place Order"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white pb-4 border-b border-white/10">
              Order Summary
            </h3>

            {/* Item list */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-xl bg-[#08231D] p-1 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-heading font-semibold text-white">
                      {item.product.name}
                    </div>
                    <div className="text-[11px] text-[#9EAAA4]">
                      Size: EU {item.size} &bull; Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-[#FA9D60]">
                    {formatPKR(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-[#9EAAA4]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPKR(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Courier Shipping</span>
                <span className="text-[#FA9D60]">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Luxury Magnetic Box & Dust Bags</span>
                <span className="text-[#FA9D60]">Included</span>
              </div>
              <div className="flex justify-between text-base font-medium pt-3 border-t border-white/10 text-white">
                <span>Total Amount Due</span>
                <span className="font-heading text-2xl font-bold text-[#FA9D60]">
                  {formatPKR(cartTotal)}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#08231D]/40 border border-white/5 text-[11px] text-[#9EAAA4] space-y-1.5">
              <div className="flex items-center gap-1.5 text-white">
                <ShieldCheck size={14} className="text-[#FA9D60]" />
                <span className="font-medium">The Drun Distinction Promise</span>
              </div>
              <p>
                Every pair undergoes bench inspection in Peshawar before sealing.
                Unconditional 14-day exchange if size requires adjustment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
