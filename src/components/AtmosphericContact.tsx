"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function AtmosphericContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Sizing & Bespoke Order",
    message: "",
    consent: true,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setStatus("submitting");
    try {
      // Save message to localStorage and mock backend
      const existing = JSON.parse(localStorage.getItem("drun_messages") || "[]");
      const newMessage = {
        id: "msg-" + Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      existing.unshift(newMessage);
      localStorage.setItem("drun_messages", JSON.stringify(existing));

      setTimeout(() => {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Sizing & Bespoke Order",
          message: "",
          consent: true,
        });
      }, 700);
    } catch (err) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="relative z-30 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-28 bg-[#031A16] text-[#F6F5F0] overflow-hidden">
      {/* Background Ambience & Night Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#031A16] via-[#08231D] to-[#07100E] pointer-events-none" />

      {/* Atmospheric Horizon Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#D88955]/15 blur-[120px] pointer-events-none rounded-full" />

      {/* Desert Landscape Silhouette at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none opacity-80 z-10">
        <svg
          viewBox="0 0 1440 260"
          className="w-full h-full object-cover text-[#07100E] fill-current"
          preserveAspectRatio="none"
        >
          <path d="M0,160L60,149.3C120,139,240,117,360,122.7C480,128,600,160,720,165.3C840,171,960,149,1080,138.7C1200,128,1320,128,1380,128L1440,128L1440,260L1380,260C1320,260,1200,260,1080,260C960,260,840,260,720,260C600,260,480,260,360,260C240,260,120,260,60,260L0,260Z" />
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        {/* Left Side Editorial Statement */}
        <div className="w-full lg:w-1/4 text-center lg:text-left">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
            The Journey
          </span>
          <h3 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F5F0] leading-tight">
            Every journey begins with a step.
          </h3>
        </div>

        {/* Center Card: Dark Underline Contact Form */}
        <div className="w-full max-w-lg bg-[#07100E]/90 backdrop-blur-xl border border-white/12 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="text-center mb-8">
            <h4 className="font-heading text-2xl sm:text-3xl font-bold">Get in touch</h4>
            <p className="text-xs text-[#9EAAA4] mt-1.5 font-normal">
              We&apos;re here to assist with sizing, bespoke orders, or general inquiries.
            </p>
          </div>

          {status === "success" ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FA9D60]/20 text-[#FA9D60] flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>
              <h5 className="font-heading text-2xl font-bold">Thank You</h5>
              <p className="text-xs text-[#9EAAA4] max-w-xs mx-auto">
                Your message has been received by the Drun concierge. We will respond within 24 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn-copper-pill px-6 py-2.5 text-xs uppercase tracking-wider mt-4"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Underline Style Input: Full Name */}
              <div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Full Name *"
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#FA9D60] py-2.5 text-sm text-white placeholder-[#9EAAA4] outline-none transition-colors"
                />
              </div>

              {/* Underline Style Input: Email */}
              <div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email Address *"
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#FA9D60] py-2.5 text-sm text-white placeholder-[#9EAAA4] outline-none transition-colors"
                />
              </div>

              {/* Underline Style Input: Phone */}
              <div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone Number (e.g. 0300-1234567)"
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#FA9D60] py-2.5 text-sm text-white placeholder-[#9EAAA4] outline-none transition-colors"
                />
              </div>

              {/* Underline Style Input: Message */}
              <div>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you? *"
                  className="w-full bg-transparent border-b border-white/20 focus:border-[#FA9D60] py-2.5 text-sm text-white placeholder-[#9EAAA4] outline-none transition-colors resize-none"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-2.5 text-xs text-[#9EAAA4] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded accent-[#FA9D60]"
                />
                <span>By submitting this form, you agree to our privacy policy and terms.</span>
              </label>

              {/* Submit Pill Button (Reference frame 58s) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-copper-pill w-full py-3.5 text-sm flex items-center justify-center gap-2 group"
                >
                  <span>{status === "submitting" ? "Submitting..." : "Send Message"}</span>
                  <Send size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Side Editorial Statement */}
        <div className="w-full lg:w-1/4 text-center lg:text-right">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
            The Footwear
          </span>
          <h3 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F6F5F0] leading-tight">
            Make yours Drun<span className="text-[#FA9D60]">.</span>
          </h3>
        </div>
      </div>
    </section>
  );
}
