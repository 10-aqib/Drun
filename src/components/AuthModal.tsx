"use client";

import React, { useState } from "react";
import { X, Lock, User, ArrowRight, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, user, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"customer" | "admin">("customer");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, name || (mode === "admin" ? "Store Administrator" : "Patron"), mode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog (Reference frame 10s style) */}
      <div className="relative w-full max-w-md bg-[#08231D]/90 backdrop-blur-xl border border-[#F6F5F0]/15 rounded-3xl p-8 shadow-2xl text-[#F6F5F0] animate-in zoom-in-95 duration-200">
        <button
          onClick={closeAuthModal}
          className="absolute top-6 right-6 p-1.5 text-[#9EAAA4] hover:text-white rounded-full hover:bg-white/5 transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {user ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FA9D60]/20 text-[#FA9D60] flex items-center justify-center">
              <User size={30} />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold">Welcome back, {user.name}</h3>
              <p className="text-xs text-[#9EAAA4] mt-1">{user.email}</p>
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-[#101412] text-xs text-[#FA9D60] uppercase tracking-wider border border-[#FA9D60]/20 font-medium">
                {user.role === "admin" ? "Administrator Access" : "Drun Patron"}
              </div>
            </div>

            <div className="space-y-3 pt-4">
              {user.role === "admin" && (
                <a
                  href="/admin"
                  onClick={closeAuthModal}
                  className="btn-copper-pill w-full py-3 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2"
                >
                  <Shield size={16} />
                  <span>Open Admin Console</span>
                </a>
              )}
              <button
                onClick={logout}
                className="w-full py-3 text-xs uppercase tracking-widest font-semibold text-[#9EAAA4] hover:text-white border border-white/10 rounded-full hover:bg-white/5 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#FA9D60] font-bold">
                Drun Identity
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold mt-1">Access Drun</h3>
              <p className="text-xs text-[#9EAAA4] mt-2">
                Sign in to view bespoke orders, saved chappal sizes, and order history.
              </p>
            </div>

            {/* Mode Selector */}
            <div className="flex bg-[#07100E] p-1 rounded-full border border-white/10 mb-6 text-xs">
              <button
                type="button"
                onClick={() => setMode("customer")}
                className={`flex-1 py-2 rounded-full transition-all ${
                  mode === "customer"
                    ? "bg-[#FA9D60] text-[#101412] font-semibold shadow"
                    : "text-[#9EAAA4] hover:text-white"
                }`}
              >
                Patron Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("admin")}
                className={`flex-1 py-2 rounded-full transition-all ${
                  mode === "admin"
                    ? "bg-[#FA9D60] text-[#101412] font-semibold shadow"
                    : "text-[#9EAAA4] hover:text-white"
                }`}
              >
                Staff / Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={mode === "admin" ? "Admin Name" : "e.g. Asad Khan"}
                  className="w-full px-4 py-3 rounded-xl bg-[#07100E]/70 border border-white/10 focus:border-[#FA9D60] outline-none text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={mode === "admin" ? "admin@drun.pk" : "patron@example.com"}
                  className="w-full px-4 py-3 rounded-xl bg-[#07100E]/70 border border-white/10 focus:border-[#FA9D60] outline-none text-sm transition-colors"
                />
              </div>

              {mode === "admin" && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#9EAAA4] mb-1.5">
                    Security Passkey
                  </label>
                  <input
                    type="password"
                    defaultValue="drun2026"
                    className="w-full px-4 py-3 rounded-xl bg-[#07100E]/70 border border-white/10 focus:border-[#FA9D60] outline-none text-sm transition-colors"
                  />
                  <p className="text-[10px] text-[#9EAAA4] mt-1">Default test key: drun2026</p>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-copper-pill w-full py-3.5 text-sm flex items-center justify-center gap-2 group"
                >
                  <span>{mode === "admin" ? "Enter Admin Dashboard" : "Sign In to Drun"}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
