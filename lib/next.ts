// Where to go after sign-in. Only same-origin /buy, /account or /link (with their query);
// anything else, including other hosts, schemes and pages, falls back to /account.

const ALLOWED = new Set(["/buy", "/account", "/link"]);

export function safeNext(n: string | null | undefined, origin: string): string {
  if (!n) return "/account";
  try {
    const u = new URL(n, origin);
    if (u.origin === origin && ALLOWED.has(u.pathname)) return u.pathname + u.search;
  } catch {}
  return "/account";
}
