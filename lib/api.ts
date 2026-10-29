// Client for the licence Worker's /api/*. Same origin in production (empty base); in dev
// NEXT_PUBLIC_API_BASE points at the local Worker, which allows this one origin with credentials.

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export const PAID = ["account", "wholesale", "property", "academy", "service", "contractor", "wellness"] as const;
export type PaidApp = (typeof PAID)[number];

export type Msg = { th: string; en: string };

/** GET /api/catalogue. Prices in satang. */
export type Catalogue = {
  tiers: { id: "pro" | "max"; monthly: number; annual: number }[];
  apps: { id: string; price: number }[];
  onSale: string[];
};

/** GET /api/account → licence. null = nothing bought yet. */
export type Licence = { id: string; name: string; apps: string[]; tier: null | { t: "pro" | "max"; until: string } };

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string; message?: Msg; data?: any };

/** Never throws: a network failure comes back as status 0, error "net". POST without a form sends JSON ({} if no body). */
export async function api<T>(
  path: string,
  init: { method?: "GET" | "POST"; body?: unknown; form?: FormData } = {},
): Promise<ApiResult<T>> {
  const method = init.method ?? "GET";
  const post = method === "POST";
  let res: Response;
  try {
    res = await fetch(API_BASE + path, {
      method,
      credentials: "include",
      headers: post && !init.form ? { "content-type": "application/json" } : undefined,
      body: !post ? undefined : (init.form ?? JSON.stringify(init.body ?? {})),
    });
  } catch {
    return { ok: false, status: 0, error: "net" };
  }
  const data = await res.json().catch(() => null);
  if (res.ok && data && data.ok !== false) return { ok: true, data: data as T };
  return { ok: false, status: res.status, error: data?.error ?? "http", message: data?.message, data };
}
