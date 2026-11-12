/**
 * Client-side staff passkey check used by the admin console and the sign-in modal.
 * NOTE: this only gates the UI of a localStorage-backed demo back office. Real
 * admin access must be enforced server-side (e.g. Supabase auth + RLS).
 */
export function isValidAdminPasskey(input: string): boolean {
  const key = input.trim().toLowerCase();
  return key === "drun2026" || key === "admin" || key === "drun";
}
