"use client";

import type { CartItem } from "@/context/CartContext";
import type { ContactMessage, Order, OrderCustomer } from "@/lib/types";
import { readJson, writeJson } from "@/lib/localStore";
import { isSupabaseConfigured, sbInsert, sbRpc } from "@/lib/supabase";
import { refreshRemoteCatalog } from "@/lib/remoteCatalog";

/**
 * Customer-facing data operations. With Supabase configured they hit the database
 * (through secure RPCs / RLS-protected inserts); otherwise they use browser storage.
 * A local copy of each order is always kept as the customer's receipt.
 */

const ORDERS_KEY = "drun_orders";
const MESSAGES_KEY = "drun_messages";
const NEWSLETTER_KEY = "drun_newsletter";

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

/* --------------------------------- Orders --------------------------------- */

interface PlaceOrderResponse {
  id: string;
  total: number;
  items: { productId: string; name: string; size: number; quantity: number; unitPrice: number }[];
}

export async function placeOrder(
  customer: OrderCustomer,
  cart: CartItem[],
  cartTotal: number
): Promise<Result<Order>> {
  const existing = readJson<Order[]>(ORDERS_KEY, []);
  const paymentStatus =
    customer.paymentMethod === "cod" ? "Pending (Cash on Delivery)" : "Pending Verification";

  if (isSupabaseConfigured()) {
    const r = await sbRpc<PlaceOrderResponse>("place_order", {
      p_customer: customer,
      p_items: cart.map((i) => ({ productId: i.product.id, size: i.size, quantity: i.quantity })),
    });
    if (!r.ok) {
      return { ok: false, error: friendlyOrderError(r.error) };
    }
    const order: Order = {
      id: r.data.id,
      // Server-confirmed prices, not the client's
      items: r.data.items.map((l) => ({
        id: `${l.productId}-${l.size}`,
        product: { name: l.name, price: l.unitPrice },
        size: l.size,
        quantity: l.quantity,
      })),
      total: r.data.total,
      customer,
      status: "Processing",
      paymentStatus,
      createdAt: new Date().toISOString(),
    };
    writeJson(ORDERS_KEY, [order, ...existing]);
    void refreshRemoteCatalog(); // stock changed
    return { ok: true, data: order };
  }

  let id = "DRN-" + Math.floor(100000 + Math.random() * 900000);
  while (existing.some((o) => o.id === id)) id = "DRN-" + Math.floor(100000 + Math.random() * 900000);
  const order: Order = {
    id,
    items: cart.map((i) => ({
      id: i.id,
      product: { name: i.product.name, price: i.product.price },
      size: i.size,
      quantity: i.quantity,
    })),
    total: cartTotal,
    customer,
    status: "Processing",
    paymentStatus,
    createdAt: new Date().toISOString(),
  };
  writeJson(ORDERS_KEY, [order, ...existing]);
  return { ok: true, data: order };
}

function friendlyOrderError(message: string): string {
  if (/no longer available/i.test(message)) return `${message}. Please remove it from your bag and try again.`;
  if (/remain in stock/i.test(message)) return `${message}. Please reduce the quantity.`;
  if (/size .* is not available/i.test(message)) return `${message}. Please pick another size.`;
  if (/Network|timed out/i.test(message)) return message;
  if (/Invalid (email|phone)/i.test(message)) return message + ".";
  return "We couldn't place your order right now. Please try again, or contact our concierge.";
}

/** Find an order by reference or phone: this browser first, then the database. */
export async function lookupOrder(query: string): Promise<Order | null> {
  const clean = query.trim();
  if (!clean) return null;
  const upper = clean.toUpperCase();
  const digits = clean.replace(/\D/g, "");

  const local = readJson<Order[]>(ORDERS_KEY, []);
  const hit =
    local.find((o) => String(o.id).toUpperCase() === upper) ??
    (digits.length >= 10
      ? local.find((o) => {
          const p = String(o.customer?.phone ?? "").replace(/\D/g, "");
          return p.length >= 10 && p.slice(-10) === digits.slice(-10);
        })
      : undefined);
  // Orders kept in this browser may be stale; prefer the database when available.
  if (!isSupabaseConfigured()) return hit ?? null;

  const r = await sbRpc<Order | null>("track_order", { p_query: clean });
  if (r.ok && r.data) return r.data;
  return hit ?? null;
}

/* ------------------------------- Messages -------------------------------- */

export async function sendContactMessage(
  m: Omit<ContactMessage, "id" | "createdAt">
): Promise<Result<null>> {
  if (isSupabaseConfigured()) {
    const r = await sbInsert("contact_messages", {
      name: m.name.trim(),
      email: m.email.trim(),
      phone: m.phone?.trim() || null,
      subject: m.subject,
      message: m.message.trim(),
    });
    return r.ok
      ? { ok: true, data: null }
      : { ok: false, error: "We couldn't send your message. Please try again or reach us on WhatsApp." };
  }
  writeJson(MESSAGES_KEY, [
    { id: "msg-" + Date.now(), ...m, createdAt: new Date().toISOString() },
    ...readJson<ContactMessage[]>(MESSAGES_KEY, []),
  ]);
  return { ok: true, data: null };
}

/* ------------------------------- Newsletter ------------------------------- */

export async function subscribeNewsletter(email: string): Promise<Result<null>> {
  const clean = email.trim().toLowerCase();
  if (isSupabaseConfigured()) {
    const r = await sbInsert("newsletter_subscriptions", { email: clean }, { ignoreDuplicates: true });
    return r.ok
      ? { ok: true, data: null }
      : { ok: false, error: "Please enter a valid email address and try again." };
  }
  const list = readJson<string[]>(NEWSLETTER_KEY, []);
  if (!list.includes(clean)) writeJson(NEWSLETTER_KEY, [...list, clean]);
  return { ok: true, data: null };
}
