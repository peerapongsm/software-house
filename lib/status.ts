// Plan status pill on /account. Grace matches the apps: Pro keeps working 14 days past `until`.

const DAY = 864e5;
const GRACE_DAYS = 14;

export type PlanStatus = { tone: "ok" | "warn" | "err"; days: number; kind: "active" | "soon" | "grace" | "expired" };

export function planStatus(until: string, now: number): PlanStatus {
  const end = Date.parse(until);
  if (end > now) {
    const days = Math.ceil((end - now) / DAY);
    return days <= 30 ? { tone: "warn", days, kind: "soon" } : { tone: "ok", days, kind: "active" };
  }
  const days = Math.ceil((end + GRACE_DAYS * DAY - now) / DAY);
  return days > 0 ? { tone: "warn", days, kind: "grace" } : { tone: "err", days: 0, kind: "expired" };
}
