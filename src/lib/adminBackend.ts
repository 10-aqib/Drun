"use client";

import { useCallback, useEffect, useState } from "react";
import { PRODUCTS, Product } from "@/data/products";
import { ARCHIVED_KEY, restoreArchivedProducts, saveCatalog, useCatalog } from "@/lib/catalog";
import { safeJson, useStoredValue, writeJson } from "@/lib/localStore";
import { ProductRow, productToRow, rowToProduct } from "@/lib/productMapper";
import {
  SbSession,
  getAdminToken,
  isSupabaseConfigured,
  readSession,
  sbInsert,
  sbSelect,
  sbSignIn,
  sbSignOut,
  sbUpdate,
  sbUpsert,
} from "@/lib/supabase";
import type { ContactMessage, Order } from "@/lib/types";

/**
 * One interface for the admin console, two back ends:
 *  - Supabase configured: staff sign in with a Supabase account (app_metadata.role = "admin");
 *    every read/write goes to the database and is enforced by row-level security.
 *  - Not configured: the browser-only demo store (passkey gate).
 */

const ORDERS_KEY = "drun_orders";
const MESSAGES_KEY = "drun_messages";
const NEWSLETTER_KEY = "drun_newsletter";
const SESSION_KEY = "drun_sb_session";

const parseList = <T,>([raw]: (string | null)[]): T[] => {
  const v = safeJson<unknown>(raw, []);
  return Array.isArray(v) ? (v as T[]) : [];
};
const parseSession = ([raw]: (string | null)[]): SbSession | null => {
  const s = safeJson<SbSession | null>(raw, null);
  return s && typeof s.accessToken === "string" ? s : null;
};
const parseLocalOrders = parseList<Order>;
const parseLocalMessages = parseList<ContactMessage>;
const parseLocalSubs = parseList<string>;
const parseArchived = parseList<string>;

/* ---- row types ---- */
interface OrderRow {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_province: string;
  postal_code: string | null;
  delivery_notes: string | null;
  payment_method: string | null;
  payment_status: string | null;
  status: string | null;
  total: number;
  created_at: string;
  order_items?: { product_id: string | null; product_name: string; size: number; quantity: number; unit_price: number }[];
}
interface MessageRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
}

const mapOrder = (r: OrderRow): Order => ({
  id: r.id,
  total: r.total,
  status: r.status ?? "Processing",
  paymentStatus: r.payment_status ?? undefined,
  createdAt: r.created_at,
  customer: {
    fullName: r.customer_name,
    email: r.customer_email,
    phone: r.customer_phone,
    address: r.shipping_address,
    city: r.shipping_city,
    province: r.shipping_province,
    postalCode: r.postal_code ?? undefined,
    deliveryNotes: r.delivery_notes ?? undefined,
    paymentMethod: r.payment_method ?? "cod",
  },
  items: (r.order_items ?? []).map((i, n) => ({
    id: `${r.id}-${n}`,
    product: { name: i.product_name, price: i.unit_price },
    size: i.size,
    quantity: i.quantity,
  })),
});

interface RemoteData {
  orders: Order[];
  messages: ContactMessage[];
  subscribers: string[];
  products: Product[]; // not archived
  archivedCount: number;
  allIds: string[]; // including archived, so new products never collide
  allSlugs: string[];
}

type RemoteState = { data: RemoteData | null; error: string };

async function fetchAdminData(): Promise<RemoteState> {
  const token = await getAdminToken();
  if (!token) {
    return { data: null, error: "Your session expired. Please sign in again." };
  }
  const [o, m, n, p] = await Promise.all([
    sbSelect<OrderRow>("orders", "select=*,order_items(*)&order=created_at.desc", token),
    sbSelect<MessageRow>("contact_messages", "select=*&order=created_at.desc", token),
    sbSelect<{ email: string }>("newsletter_subscriptions", "select=email&order=subscribed_at.desc", token),
    sbSelect<ProductRow>("products", "select=*&order=id.asc", token),
  ]);
  const failed = [o, m, n, p].find((r) => !r.ok);
  if (failed && !failed.ok) {
    return { data: null, error: failed.error };
  }
  const rows = p.ok ? p.data : [];
  return {
    error: "",
    data: {
      orders: o.ok ? o.data.map(mapOrder) : [],
      messages: m.ok
        ? m.data.map((x) => ({
            id: x.id, name: x.name, email: x.email, phone: x.phone ?? undefined,
            subject: x.subject, message: x.message, createdAt: x.created_at,
          }))
        : [],
      subscribers: n.ok ? n.data.map((x) => x.email) : [],
      products: rows.filter((r) => r.status !== "archived").map(rowToProduct),
      archivedCount: rows.filter((r) => r.status === "archived").length,
      allIds: rows.map((r) => r.id),
      allSlugs: rows.map((r) => r.slug),
    },
  };
}


export function useAdminBackend() {
  const remoteMode = isSupabaseConfigured();

  // demo-mode sources
  const localProducts = useCatalog();
  const localOrders = useStoredValue([ORDERS_KEY], parseLocalOrders);
  const localMessages = useStoredValue([MESSAGES_KEY], parseLocalMessages);
  const localSubs = useStoredValue([NEWSLETTER_KEY], parseLocalSubs);
  const localArchived = useStoredValue([ARCHIVED_KEY], parseArchived);

  // supabase mode
  const session = useStoredValue([SESSION_KEY], parseSession);
  const [remote, setRemote] = useState<RemoteState>({ data: null, error: "" });
  const [actionError, setActionError] = useState("");
  const signedIn = remoteMode && !!session?.isAdmin;

  const reload = useCallback(async () => {
    setRemote(await fetchAdminData());
  }, []);

  useEffect(() => {
    if (!signedIn) return;
    let cancelled = false;
    void fetchAdminData().then((next) => {
      if (!cancelled) setRemote(next);
    });
    return () => {
      cancelled = true;
    };
  }, [signedIn]);

  /** Run a write against Supabase, then refresh. Returns true on success. */
  const remoteWrite = useCallback(
    async (fn: (token: string) => Promise<{ ok: boolean; error?: string }>) => {
      const token = await getAdminToken();
      if (!token) {
        setActionError("Your session expired. Please sign in again.");
        return false;
      }
      const r = await fn(token);
      if (!r.ok) {
        setActionError(r.error || "That change could not be saved.");
        return false;
      }
      setActionError("");
      await reload();
      return true;
    },
    [reload]
  );

  const products = remoteMode ? remote.data?.products ?? [] : localProducts;
  const unwrap = <T,>(r: { ok: true; data: T } | { ok: false; error: string }) =>
    r.ok ? { ok: true as const } : { ok: false as const, error: r.error };

  return {
    remoteMode,
    /** Is the visitor allowed into the console? (demo mode is decided by the page via AuthContext) */
    signedIn,
    sessionEmail: session?.email ?? "",
    loading: remoteMode && signedIn && !remote.data && !remote.error,
    error: actionError || remote.error,
    orders: remoteMode ? remote.data?.orders ?? [] : localOrders,
    messages: remoteMode ? remote.data?.messages ?? [] : localMessages,
    subscribers: remoteMode ? remote.data?.subscribers ?? [] : localSubs,
    products,
    archivedCount: remoteMode ? remote.data?.archivedCount ?? 0 : localArchived.length,

    signIn: async (email: string, password: string): Promise<string | null> => {
      const r = await sbSignIn(email, password);
      if (!r.ok) return r.error;
      setRemote({ data: null, error: "" });
      return null;
    },
    signOut: () => {
      sbSignOut();
      setRemote({ data: null, error: "" });
    },
    reload,

    updateOrderStatus: async (orderId: string, status: string) => {
      if (!remoteMode) {
        writeJson(ORDERS_KEY, localOrders.map((o) => (o.id === orderId ? { ...o, status } : o)));
        return;
      }
      await remoteWrite(async (t) =>
        unwrap(await sbUpdate("orders", `id=eq.${encodeURIComponent(orderId)}`, { status, updated_at: new Date().toISOString() }, t))
      );
    },

    saveProduct: async (p: Product) => {
      if (!remoteMode) {
        saveCatalog(localProducts.map((x) => (x.id === p.id ? p : x)));
        return;
      }
      await remoteWrite(async (t) => unwrap(await sbUpsert("products", productToRow(p), t)));
    },

    createProduct: async (p: Product) => {
      if (!remoteMode) {
        saveCatalog([p, ...localProducts]);
        return;
      }
      // Plain insert (not upsert) so an id/slug clash fails instead of overwriting a product
      await remoteWrite(async (t) => unwrap(await sbInsert("products", productToRow(p), { token: t })));
    },

    archiveProduct: async (id: string) => {
      if (!remoteMode) {
        saveCatalog(localProducts.filter((x) => x.id !== id));
        return;
      }
      await remoteWrite(async (t) => unwrap(await sbUpdate("products", `id=eq.${encodeURIComponent(id)}`, { status: "archived" }, t)));
    },

    restoreArchived: async () => {
      if (!remoteMode) {
        restoreArchivedProducts();
        return;
      }
      await remoteWrite(async (t) => unwrap(await sbUpdate("products", "status=eq.archived", { status: "draft" }, t)));
    },

    /** Ids/slugs that must not be reused (includes archived rows so new products never collide). */
    reservedIds: () => new Set([...PRODUCTS.map((p) => p.id), ...products.map((p) => p.id), ...(remote.data?.allIds ?? [])]),
    reservedSlugs: () => new Set([...PRODUCTS.map((p) => p.slug), ...products.map((p) => p.slug), ...(remote.data?.allSlugs ?? [])]),
    readSessionNow: readSession,
  };
}
