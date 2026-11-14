// Client for the licence Worker's /api/* on api.peerapongsm.dev (credentialed CORS for this site's origin).
// In dev NEXT_PUBLIC_API_BASE points at the local Worker, which allows the dev origin the same way.

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://api.peerapongsm.dev";

export const PAID = ["account", "wholesale", "property", "academy", "service", "contractor", "wellness"] as const;
export type PaidApp = (typeof PAID)[number];

export type Msg = { th: string; en: string };

/** GET /api/catalogue. App and Pro prices in satang. */
export type Catalogue = {
  proOnSale?: boolean;
  pro: { monthly: number; annual: number };
  apps: { id: string; price: number }[];
  onSale: string[];
};

export type ProSource = "play" | "stripe" | "pass";
export type ProInfo = { source: ProSource; until: string; cancelling?: boolean };

/** GET /api/account → licence. null = nothing bought yet. */
export type Licence = { id: string; name: string; apps: string[]; tier: null | { t: "pro"; until: string }; pro: ProInfo | null };

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

/** Only Stripe-hosted Checkout and Customer Portal URLs may be used for navigation. */
export function safeStripeUrl(u: unknown): string | null {
  if (typeof u !== "string") return null;
  try {
    const { origin } = new URL(u);
    return origin === "https://checkout.stripe.com" || origin === "https://billing.stripe.com" ? u : null;
  } catch {
    return null;
  }
}
