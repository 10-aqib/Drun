"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Bespoke Size Order",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const existing = JSON.parse(localStorage.getItem("drun_messages") || "[]");
    existing.unshift({
      id: "msg-" + Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("drun_messages", JSON.stringify(existing));
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
            Concierge & Inquiries
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#F6F5F0] tracking-tight">
            Connect with Drun<span className="text-[#FA9D60]">.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#9EAAA4] font-normal leading-relaxed">
            We are dedicated to assisting you with size advice, bespoke leather finishes,
            order status updates, and corporate gift commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">Studio & Atelier</h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#9EAAA4]">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#FA9D60] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5 font-semibold">Peshawar Artisan Atelier:</strong>
                    Namak Mandi Heritage Quarter, Peshawar, Khyber Pakhtunkhwa, Pakistan
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#FA9D60] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5 font-semibold">Lahore Showroom Suite:</strong>
                    Gulberg III, M.M. Alam Road, Lahore, Pakistan
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-[#FA9D60] flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">+92 (042) 3578-DRUN</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#FA9D60] flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">concierge@drun.pk</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-[#FA9D60] flex-shrink-0" />
                  <div>
                    <span>Mon – Sat: 10:00 AM – 8:00 PM (PKT)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://wa.me/923000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-copper-pill w-full py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2 font-semibold"
                >
                  <MessageCircle size={16} />
                  <span>Instant WhatsApp Assistance</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FA9D60]/20 text-[#FA9D60] flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">Message Received</h3>
                <p className="text-xs sm:text-sm text-[#9EAAA4] max-w-sm mx-auto font-normal">
                  Thank you for reaching out. A dedicated member of the Drun concierge will
                  review your inquiry and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-copper-pill px-6 py-2.5 text-xs uppercase tracking-wider mt-4 font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">Send an Inquiry</h3>
                  <p className="text-xs sm:text-sm text-[#9EAAA4] mt-1 font-normal">
                    Fill out the form below and we will contact you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Daniyal Qureshi"
                      className="w-full bg-[#08231D]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="daniyal@example.com"
                      className="w-full bg-[#08231D]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300-1234567"
                      className="w-full bg-[#08231D]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FA9D60]"
                    >
                      <option value="Bespoke Size Order">Bespoke Size Order</option>
                      <option value="Order Tracking Help">Order Tracking Help</option>
                      <option value="Size Exchange Request">Size Exchange Request</option>
                      <option value="Wedding / Bulk Inquiries">Wedding / Bulk Inquiries</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your desired footwear or question..."
                    className="w-full bg-[#08231D]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-copper-pill w-full py-4 text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
