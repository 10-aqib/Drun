"use client";

import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import { safeJson, useStoredValue, writeJson } from "@/lib/localStore";

/** Admin edits / additions (list of full products, same shape as before). */
export const MANAGED_KEY = "drun_managed_products";
/** Ids of built-in products the admin has archived. */
export const ARCHIVED_KEY = "drun_archived_products";

function isProduct(p: unknown): p is Product {
  return (
    !!p &&
    typeof p === "object" &&
    typeof (p as Product).id === "string" &&
    typeof (p as Product).slug === "string" &&
    typeof (p as Product).name === "string" &&
    typeof (p as Product).price === "number"
  );
}

function normalize(p: Product): Product {
  const image = p.image || "/products/charsadda-modern-black.png";
  return {
    ...p,
    image,
    additionalImages: p.additionalImages?.length ? p.additionalImages : [image],
    sizes: p.sizes?.length ? p.sizes : [39, 40, 41, 42, 43, 44, 45],
    craftDetails: p.craftDetails ?? [],
    careInstructions: p.careInstructions ?? [],
    // Availability always follows the stock count the admin manages.
    inStock: p.stockCount > 0,
  };
}

/** Merge built-in products with admin overrides, additions and archives. */
export function resolveCatalog(overrides: Product[], archived: string[]): Product[] {
  const archivedIds = new Set(archived);
  const byId = new Map(overrides.map((o) => [o.id, o]));

  const base = PRODUCTS.filter((p) => !archivedIds.has(p.id)).map((p) =>
    normalize({ ...p, ...(byId.get(p.id) ?? {}) })
  );
  const custom = overrides
    .filter((o) => !PRODUCTS.some((b) => b.id === o.id) && !archivedIds.has(o.id))
    .map(normalize);

  return [...custom, ...base];
}

const BASE_CATALOG = resolveCatalog([], []);

function parseCatalog([managed, archived]: (string | null)[]): Product[] {
  const overrides = safeJson<unknown[]>(managed, []);
  const archivedIds = safeJson<unknown[]>(archived, []);
  if (!Array.isArray(overrides) || !Array.isArray(archivedIds)) return BASE_CATALOG;
  return resolveCatalog(
    overrides.filter(isProduct),
    archivedIds.filter((id): id is string => typeof id === "string")
  );
}

/** The live storefront catalogue (built-ins + admin changes). */
export function useCatalog(): Product[] {
  return useStoredValue([MANAGED_KEY, ARCHIVED_KEY], parseCatalog);
}

/** Persist the admin's full product list; anything built-in that is missing is archived. */
export function saveCatalog(list: Product[]) {
  const present = new Set(list.map((p) => p.id));
  writeJson(MANAGED_KEY, list);
  writeJson(
    ARCHIVED_KEY,
    PRODUCTS.filter((p) => !present.has(p.id)).map((p) => p.id)
  );
}

/** Bring every archived built-in product back. */
export function restoreArchivedProducts() {
  writeJson(ARCHIVED_KEY, []);
}

export function findProduct(catalog: Product[], idOrSlug: string): Product | undefined {
  const key = decodeURIComponent(idOrSlug).toLowerCase();
  return catalog.find((p) => p.id.toLowerCase() === key || p.slug.toLowerCase() === key);
}

/** Does this product belong to a collection slug (including legacy aliases)? */
export function inCollection(p: Product, slug: string): boolean {
  const s = slug.toLowerCase();
  if (s === "all") return true;
  if (s === "heritage") return p.categorySlug === "classic" || p.categorySlug === "norozi" || p.category === "Heritage";
  if (s === "contemporary") return p.categorySlug === "modern" || p.category === "Contemporary";
  return p.categorySlug === s;
}

/** Map a collection label ("Norozi Style") or slug ("norozi") to a slug, or null if unknown. */
export function collectionSlug(value: string): string | null {
  const v = value.trim().toLowerCase();
  if (v === "all" || v === "") return "all";
  const hit = CATEGORIES.find((c) => c.slug === v || c.id === v || c.name.toLowerCase() === v);
  return hit ? hit.slug : null;
}

/** Live collection counts so labels never drift from the data. */
export function collectionCount(catalog: Product[], slug: string): number {
  return catalog.filter((p) => inCollection(p, slug)).length;
}
