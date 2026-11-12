/**
 * Minimal Supabase client (PostgREST + GoTrue over fetch) — no extra dependency.
 *
 * The store works with or without Supabase:
 *   - NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY set  -> live database
 *   - not set                                                         -> browser-only demo mode
 */
export const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export type SbResult<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; error: string; status: number };

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** User access token (admin). Defaults to the anon key. */
  token?: string | null;
  /** PostgREST Prefer header, e.g. "return=minimal" or "resolution=ignore-duplicates". */
  prefer?: string;
  timeoutMs?: number;
}

async function request<T>(url: string, opts: RequestOptions = {}): Promise<SbResult<T>> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured", status: 0 };
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 12000);
  try {
    const res = await fetch(url, {
      method: opts.method ?? "GET",
      signal: controller.signal,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${opts.token || SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        ...(opts.prefer ? { Prefer: opts.prefer } : {}),
      },
      body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
    });
    const text = await res.text();
    let json: unknown = null;
    if (text) {
      try {
        json = JSON.parse(text);
      } catch {
        json = text;
      }
    }
    if (!res.ok) {
      const j = json as { message?: string; msg?: string; error_description?: string } | null;
      const message =
        (j && (j.message || j.msg || j.error_description)) || res.statusText || "Request failed";
      return { ok: false, error: String(message), status: res.status };
    }
    return { ok: true, data: json as T, status: res.status };
  } catch (e) {
    const aborted = e instanceof DOMException && e.name === "AbortError";
    return {
      ok: false,
      error: aborted ? "The request timed out. Please try again." : "Network error. Please check your connection.",
      status: 0,
    };
  } finally {
    clearTimeout(timer);
  }
}

/** SELECT from a table/view. `query` is the PostgREST query string, e.g. "select=*&status=neq.archived". */
export function sbSelect<T>(table: string, query = "select=*", token?: string | null) {
  return request<T[]>(`${SUPABASE_URL}/rest/v1/${table}?${query}`, { token });
}

/** INSERT one or many rows (no representation returned, so anon needs no SELECT right). */
export function sbInsert(
  table: string,
  rows: unknown,
  opts: { token?: string | null; ignoreDuplicates?: boolean } = {}
) {
  return request<null>(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    body: rows,
    token: opts.token,
    prefer: opts.ignoreDuplicates ? "return=minimal,resolution=ignore-duplicates" : "return=minimal",
  });
}

/** Upsert rows by primary key (admin). */
export function sbUpsert(table: string, rows: unknown, token: string) {
  return request<null>(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    body: rows,
    token,
    prefer: "return=minimal,resolution=merge-duplicates",
  });
}

export function sbUpdate(table: string, filter: string, patch: unknown, token: string) {
  return request<null>(`${SUPABASE_URL}/rest/v1/${table}?${filter}`, {
    method: "PATCH",
    body: patch,
    token,
    prefer: "return=minimal",
  });
}

/** Call a Postgres function: POST /rest/v1/rpc/<name>. */
export function sbRpc<T>(name: string, args: Record<string, unknown>, token?: string | null) {
  return request<T>(`${SUPABASE_URL}/rest/v1/rpc/${name}`, { method: "POST", body: args, token });
}

/* ------------------------------ Auth (staff) ------------------------------ */

const SESSION_KEY = "drun_sb_session";

export interface SbSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // epoch seconds
  email: string;
  isAdmin: boolean;
}

function decodeJwt(token: string): { exp?: number; email?: string; app_metadata?: { role?: string } } {
  try {
    let payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    while (payload.length % 4) payload += "=";
    const bytes = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return {};
  }
}

function toSession(d: { access_token: string; refresh_token: string; expires_in?: number }): SbSession {
  const claims = decodeJwt(d.access_token);
  return {
    accessToken: d.access_token,
    refreshToken: d.refresh_token,
    expiresAt: claims.exp ?? Math.floor(Date.now() / 1000) + (d.expires_in ?? 3600),
    email: claims.email ?? "",
    // UI hint only — the database enforces this with RLS (is_admin()).
    isAdmin: claims.app_metadata?.role === "admin",
  };
}

export function readSession(): SbSession | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as SbSession) : null;
  } catch {
    return null;
  }
}

function saveSession(s: SbSession | null) {
  try {
    if (s) window.localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else window.localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new Event("drun:storage-change"));
}

export async function sbSignIn(email: string, password: string): Promise<SbResult<SbSession>> {
  const r = await request<{ access_token: string; refresh_token: string; expires_in?: number }>(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    { method: "POST", body: { email, password } }
  );
  if (!r.ok) {
    return { ...r, error: r.status === 400 ? "Invalid email or password." : r.error };
  }
  const session = toSession(r.data);
  if (!session.isAdmin) {
    return { ok: false, status: 403, error: "This account does not have admin access." };
  }
  saveSession(session);
  return { ok: true, data: session, status: 200 };
}

export function sbSignOut() {
  saveSession(null);
}

/** A valid admin access token, refreshing it when it is about to expire. */
export async function getAdminToken(): Promise<string | null> {
  const s = readSession();
  if (!s || !s.isAdmin) return null;
  if (s.expiresAt - 60 > Date.now() / 1000) return s.accessToken;
  const r = await request<{ access_token: string; refresh_token: string; expires_in?: number }>(
    `${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    { method: "POST", body: { refresh_token: s.refreshToken } }
  );
  if (!r.ok) {
    saveSession(null);
    return null;
  }
  const next = toSession(r.data);
  saveSession(next);
  return next.accessToken;
}
