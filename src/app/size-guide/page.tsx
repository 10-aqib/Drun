import React from "react";
import Link from "next/link";
import { Ruler, CheckCircle2, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SizeGuidePage() {
  const sizeChart = [
    { eu: 39, uk: "5.5", us: "6.5", cm: "24.5" },
    { eu: 40, uk: "6.0", us: "7.0", cm: "25.0" },
    { eu: 41, uk: "7.0", us: "8.0", cm: "26.0" },
    { eu: 42, uk: "8.0", us: "9.0", cm: "27.0" },
    { eu: 43, uk: "9.0", us: "10.0", cm: "28.0" },
    { eu: 44, uk: "10.0", us: "11.0", cm: "29.0" },
    { eu: 45, uk: "11.0", us: "12.0", cm: "30.0" },
    { eu: 46, uk: "12.0", us: "13.0", cm: "31.0" },
  ];

  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      <Navbar />

      <div className="pt-28 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#FA9D60] font-bold block mb-2">
            Perfect Proportions
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#F6F5F0] tracking-tight">
            Footwear Size Guide<span className="text-[#FA9D60]">.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#9EAAA4] font-normal leading-relaxed">
            Our Peshawari chappals follow true-to-size European dress shoe standards.
            Use this guide to determine your exact fit.
          </p>
        </div>

        {/* Size Conversion Table */}
        <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-10 mb-12 sm:mb-16 shadow-2xl overflow-x-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl sm:text-2xl font-bold">Conversion Chart</h2>
            <span className="text-xs text-[#FA9D60] uppercase tracking-wider font-mono font-bold">Standard Fit</span>
          </div>

          <table className="w-full text-left text-xs text-[#E9E8DF]">
            <thead>
              <tr className="border-b border-white/10 text-[#9EAAA4] uppercase tracking-wider font-mono">
                <th className="pb-4">EU Size (Standard)</th>
                <th className="pb-4">UK Size</th>
                <th className="pb-4">US Size</th>
                <th className="pb-4">Foot Length (CM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {sizeChart.map((row) => (
                <tr key={row.eu} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 font-bold text-[#FA9D60]">EU {row.eu}</td>
                  <td className="py-3.5">UK {row.uk}</td>
                  <td className="py-3.5">US {row.us}</td>
                  <td className="py-3.5">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#07100E] border border-white/10 rounded-3xl p-8 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#FA9D60]/20 text-[#FA9D60] flex items-center justify-center mb-4">
              <Ruler size={20} />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3">How to Measure</h3>
            <ol className="space-y-3 text-xs text-[#9EAAA4] list-decimal list-inside font-normal leading-relaxed">
              <li>Place a piece of blank paper on a hard floor against a flat wall.</li>
              <li>Stand on the paper with your bare heel touching the wall.</li>
              <li>Mark the longest tip of your foot (usually big toe or second toe) with a pencil.</li>
              <li>Measure the distance from the edge of the paper to the mark in centimeters.</li>
              <li>Match your measurement against the chart above. If between sizes, choose the larger size.</li>
            </ol>
          </div>

          <div className="bg-[#07100E] border border-white/10 rounded-3xl p-8 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#FA9D60]/20 text-[#FA9D60] flex items-center justify-center mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3">Fit & Arch Advice</h3>
            <ul className="space-y-3 text-xs text-[#9EAAA4] font-normal leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#FA9D60] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>High Instep:</strong> Our side roller buckles provide up to 1.5 cm of adjustability over the bridge of your foot.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#FA9D60] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Natural Leather Give:</strong> Full-grain cowhide gently molds to your unique foot contours after 2–3 hours of wear.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#FA9D60] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>14-Day Complimentary Exchange:</strong> If your pair feels slightly snug or loose, we courier an exchange size free of charge.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Concierge callout */}
        <div className="p-8 rounded-3xl bg-[#08231D] border border-white/10 text-center">
          <h4 className="font-heading text-xl sm:text-2xl font-bold mb-2">Still Uncertain About Your Fit?</h4>
          <p className="text-xs text-[#9EAAA4] max-w-md mx-auto mb-6">
            Send our footwear master a WhatsApp message with a photo of your foot or current shoe size.
          </p>
          <a
            href="https://wa.me/923000000000?text=Hello%20Drun%20Size%20Assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-copper-pill px-6 py-2.5 text-xs uppercase tracking-wider inline-flex items-center gap-2"
          >
            <MessageCircle size={15} />
            <span>Chat with Size Specialist</span>
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
