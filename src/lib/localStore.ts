"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store for React 19.
 *
 * - SSR / hydration safe: the server snapshot is always `parse(null)`, so the
 *   first client render matches the server HTML, then React switches to the
 *   real stored value without calling setState inside an effect.
 * - Reacts to writes from this tab (custom event) and other tabs (`storage`).
 * - Never throws: private mode, blocked storage and corrupt JSON all fall back.
 */

const CHANGE_EVENT = "drun:storage-change";

type Cache = { raw: string; value: unknown; parse: unknown };
const clientCache = new Map<string, Cache>();
const serverCache = new Map<string, unknown>();

function readRaw(keys: string[]): string {
  try {
    return keys.map((k) => window.localStorage.getItem(k) ?? "").join("\u0000");
  } catch {
    return "";
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

/** Parse JSON safely, returning `fallback` on any failure. */
export function safeJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Read a JSON value once (event handlers, not render). */
export function readJson<T>(key: string, fallback: T): T {
  try {
    return safeJson(window.localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
}

/** Read the raw stored string once (event handlers, not render). */
export function readStored(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Write (or remove, when `value` is undefined) and notify subscribers. */
export function writeJson(key: string, value: unknown) {
  try {
    if (value === undefined) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Could not persist "${key}"`, e);
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Subscribe to one or more localStorage keys.
 * `parse` receives the raw strings (null when missing) and MUST be a stable,
 * module-level function. It is only re-run when the raw data changes.
 */
export function useStoredValue<T>(
  keys: string[],
  parse: (raws: (string | null)[]) => T
): T {
  const cacheKey = keys.join("|");

  const getSnapshot = useCallback(() => {
    const raw = readRaw(keys);
    const hit = clientCache.get(cacheKey);
    if (hit && hit.raw === raw && hit.parse === parse) return hit.value as T;
    const raws = raw.split("\u0000").map((r) => (r === "" ? null : r));
    const value = parse(raws);
    clientCache.set(cacheKey, { raw, value, parse });
    return value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, parse]);

  const getServerSnapshot = useCallback(() => {
    if (!serverCache.has(cacheKey)) {
      serverCache.set(cacheKey, parse(keys.map(() => null)));
    }
    return serverCache.get(cacheKey) as T;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, parse]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
