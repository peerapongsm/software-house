import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-info";

export const dynamic = "force-static";

// Everyone welcome, AI crawlers included (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…):
// being quoted by AI answers is the point.
export default function robots(): MetadataRoute.Robots {
  if (process.env.PEERAPOS_UAT === "true") return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
