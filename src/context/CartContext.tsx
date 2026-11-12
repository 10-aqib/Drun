"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Product } from "@/data/products";
import { useCatalog } from "@/lib/catalog";
import { readStored, safeJson, useStoredValue, writeJson } from "@/lib/localStore";

export interface CartItem {
  id: string; // unique key combining product id and size
  product: Product;
  size: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  addToCart: (product: Product, size: number, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CART_KEY = "drun_cart";
const WISHLIST_KEY = "drun_wishlist";

const CartContext = createContext<CartContextType | undefined>(undefined);

function isCartItem(i: unknown): i is CartItem {
  const item = i as CartItem;
  return (
    !!item &&
    typeof item.id === "string" &&
    typeof item.size === "number" &&
    typeof item.quantity === "number" &&
    item.quantity > 0 &&
    !!item.product &&
    typeof item.product.price === "number"
  );
}

function parseCart([raw]: (string | null)[]): CartItem[] {
  const list = safeJson<unknown[]>(raw, []);
  return Array.isArray(list) ? list.filter(isCartItem) : [];
}

function parseWishlist([raw]: (string | null)[]): string[] {
  const list = safeJson<unknown[]>(raw, []);
  return Array.isArray(list) ? list.filter((id): id is string => typeof id === "string") : [];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const storedCart = useStoredValue([CART_KEY], parseCart);
  const wishlist = useStoredValue([WISHLIST_KEY], parseWishlist);
  const catalog = useCatalog();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Always price/show items from the live catalogue so admin edits apply to bags.
  const cart = useMemo(
    () =>
      storedCart.map((item) => ({
        ...item,
        product: catalog.find((p) => p.id === item.product.id) ?? item.product,
      })),
    [storedCart, catalog]
  );

  const addToCart = useCallback((product: Product, size: number, quantity: number = 1) => {
    const itemKey = `${product.id}-${size}`;
    const prev = parseCart([readStored(CART_KEY)]);
    const existing = prev.find((item) => item.id === itemKey);
    writeJson(
      CART_KEY,
      existing
        ? prev.map((item) =>
            item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
          )
        : [...prev, { id: itemKey, product, size, quantity }]
    );
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    const prev = parseCart([readStored(CART_KEY)]);
    writeJson(CART_KEY, prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, delta: number) => {
    const prev = parseCart([readStored(CART_KEY)]);
    writeJson(
      CART_KEY,
      prev
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => writeJson(CART_KEY, []), []);

  const toggleWishlist = useCallback((productId: string) => {
    const prev = parseWishlist([readStored(WISHLIST_KEY)]);
    writeJson(
      WISHLIST_KEY,
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
