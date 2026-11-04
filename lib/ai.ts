// /account "AI ที่เชื่อมต่อ": one row per AI connector grant — who it is, whether that name is checked, since when,
// and what it may do.

import { day } from "./account.ts";
import type { Msg } from "./api.ts";

/** GET /api/ai/grants. `clientId` is an https URL for an AI app that publishes its own details (its host is checked). */
export type Grant = { id: string; client: string; clientId?: string; scopes: string[]; createdAt: string; expiresAt: string | null };

const SELF: Msg = { th: "ชื่อที่แอปแจ้งเอง", en: "Name given by the app itself" };

/** The host of an https client id, else null (a self-registered app: its name is unchecked). */
export function verifiedDomain(clientId: string | undefined): string | null {
  if (!clientId) return null;
  try {
    const u = new URL(clientId);
    return u.protocol === "https:" && u.hostname ? u.hostname : null;
  } catch {
    return null;
  }
}

export function grantOrigin(g: Grant): Msg {
  const d = verifiedDomain(g.clientId);
  return d ? { th: `เผยแพร่โดย ${d}`, en: `Published by ${d}` } : SELF;
}

export const grantSince = (g: Grant): Msg => ({ th: `เชื่อมเมื่อ ${day(g.createdAt, "th")}`, en: `Connected ${day(g.createdAt, "en")}` });

/** Reading is always granted; drafts only when the box was ticked at consent. */
export const scopeText = (scopes: string[]): Msg =>
  scopes.includes("peerapos.draft") ? { th: "อ่านข้อมูล และสร้างร่าง", en: "Read and create drafts" } : { th: "อ่านข้อมูล", en: "Read" };
