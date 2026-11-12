"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Product } from "@/data/products";
import { isSupabaseConfigured, sbSelect } from "@/lib/supabase";
import { ProductRow, rowToProduct } from "@/lib/productMapper";

/**
 * Live catalogue from Supabase (public read; archived designs are hidden by RLS).
 * Module-level store so every component shares one fetch.
 */
let remote: Product[] | null = null;
let loadedAt = 0;
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export function refreshRemoteCatalog(): Promise<void> {
  if (!isSupabaseConfigured()) return Promise.resolve();
  if (inflight) return inflight;
  inflight = sbSelect<ProductRow>("products", "select=*&order=id.asc")
    .then((r) => {
      if (r.ok && Array.isArray(r.data) && r.data.length > 0) {
        remote = r.data.map(rowToProduct);
        loadedAt = Date.now();
        emit();
      }
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

/** Remote products, or null until (unless) they have loaded. */
export function useRemoteCatalog(): Product[] | null {
  useEffect(() => {
    if (isSupabaseConfigured() && Date.now() - loadedAt > 60_000) void refreshRemoteCatalog();
  }, []);
  return useSyncExternalStore(
    subscribe,
    () => remote,
    () => null
  );
}
