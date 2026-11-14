// Where to go after sign-in. Only same-origin /buy or /link (with their query), /account, /pro, or an AI connector's
// authorize request (`next` written as /api/oauth/authorize?…); anything else, including other hosts, schemes and
// pages, falls back to /account.

const ALLOWED = new Set(["/buy", "/link"]);
const AUTHORIZE = "/api/oauth/authorize";

export function safeNext(n: string | null | undefined, origin: string): string {
  if (!n) return "/account";
  try {
    const u = new URL(n, origin);
    if (u.origin !== origin) return "/account";
    if (u.pathname === "/pro") return "/pro";
    if (ALLOWED.has(u.pathname)) return u.pathname + u.search;
    if (n.startsWith(AUTHORIZE + "?") && u.pathname === AUTHORIZE) return u.pathname + u.search;
  } catch {}
  return "/account";
}
