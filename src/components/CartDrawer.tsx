"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/data/products";

export default function CartDrawer() {
  const { cart, isCartOpen, closeCart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#07100E] border-l border-[#F6F5F0]/10 text-[#F6F5F0] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#F6F5F0]/10 flex items-center justify-between">
            <div>
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight">Shopping Bag</span>
              <span className="ml-3 text-xs uppercase tracking-widest text-[#9EAAA4]">
                ({cartCount} {cartCount === 1 ? "pair" : "pairs"})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#9EAAA4] hover:text-[#FA9D60] transition-colors rounded-full hover:bg-white/5"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#08231D] flex items-center justify-center text-[#FA9D60] mb-4">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">Your Bag is Empty</h3>
                <p className="text-sm text-[#9EAAA4] max-w-xs mb-8">
                  Experience traditional craftsmanship and timeless comfort with a pair of Drun chappals.
                </p>
                <button
                  onClick={closeCart}
                  className="btn-copper-pill px-6 py-2.5 text-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl bg-[#08231D]/40 border border-[#F6F5F0]/5 relative group"
                >
                  <div className="w-20 h-20 bg-[#101412] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2 relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-heading text-base font-bold leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9EAAA4] hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-[#9EAAA4] mt-0.5">
                        Size: EU {item.size} &bull; {item.product.color}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2 bg-[#101412] rounded-full px-2 py-0.5 border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-[#FA9D60] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-[#FA9D60] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#FA9D60] font-heading">
                          {formatPKR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#F6F5F0]/10 bg-[#08231D]/30 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#9EAAA4]">
                  <span>Subtotal</span>
                  <span>{formatPKR(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#9EAAA4]">
                  <span>Insured Express Shipping</span>
                  <span className="text-[#FA9D60]">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-2 border-t border-white/10 text-white">
                  <span>Estimated Total</span>
                  <span className="font-heading text-xl font-bold text-[#FA9D60]">
                    {formatPKR(cartTotal)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-copper-pill w-full py-3.5 text-sm flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-[11px] text-center text-[#9EAAA4] mt-2.5">
                  Cash on Delivery &bull; 14-Day Complimentary Size Exchange
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
