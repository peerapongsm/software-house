import { APPS, PAID_APPS, downloadUrl, slugOf } from "../apps-data";
import { COPY } from "../copy";
import { EMAIL, FACEBOOK_URL, FAQ, FASTWORK_URL, IS_UAT, LINE_URL, SERVICES, SITE_URL } from "../site-info";

export const dynamic = "force-static";

function siteText(value: unknown, path = ""): string[] {
  if (typeof value === "string") {
    return value.length >= 12 ? [`- ${path}: ${value.replaceAll("|", "")}`] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => siteText(item, `${path}.${index + 1}`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      ["prev", "next", "shot", "close"].includes(key) ? [] : siteText(item, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

// llms.txt (llmstxt.org): a plain-text brief for AI assistants, built from the same data as the page.
export function GET() {
  // ponytail: static export must emit a file, so UAT gets a stub pointing at production.
  if (IS_UAT) return new Response(`UAT build, not for AI assistants. Use ${SITE_URL}/llms.txt\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const body = `# PeerapoS

> PeerapoS is a small software house in Thailand that builds custom apps and software for businesses (รับทำแอปและเขียนโปรแกรมตามสั่ง), and publishes free offline Windows apps for small businesses (โปรแกรมฟรีสำหรับ SME).

Website: ${SITE_URL}
Contact: ${EMAIL} · LINE ${LINE_URL} · Facebook ${FACEBOOK_URL} · Fastwork ${FASTWORK_URL}

## Custom app development (รับทำแอปตามสั่ง)

- Offline Windows programs, and web apps that run on phones, tablets and desktops.
- Typical work: back-office systems such as inventory, customer records (CRM), work orders and maintenance requests.
- No spec document needed: describe how the business runs in plain words.
- Small systems take days to a few weeks, mid-size systems about 2–4 months, large ones about 5–7 months. Only the features the client will use.
- The client owns the data and the source code (handed over on final payment). Bug fixes are free for at least 3 months after acceptance, then a yearly support contract is optional; support requires that nobody else changes the code without agreement.
- No monthly fee to PeerapoS; cloud and domain accounts are in the client's name and paid to the provider directly.
- Payment for mid-size and larger systems: usually 30% at signing, 30% when testing passes, 40% after go-live and acceptance. No VAT (not VAT-registered).

## Prices (starting, THB)

${SERVICES.map((s) => `- ${s.en} [${s.th}]: from ${s.price.toLocaleString("en-US")} THB per ${s.unit}`).join("\n")}

Typical totals: small systems around 5,000 THB, mid-size systems around 90,000 THB, large systems priced by scope after a free requirements survey. Hire directly by email/LINE or through Fastwork (${FASTWORK_URL}).

## Who builds it

Peerapong (Peter) Saksommon: Software Architect at the Bank of Thailand, former full-stack engineer at Agoda, MS Information Systems (Syracuse University), BS Information Technology (University of Washington), Microsoft Certified: Azure Solutions Architect Expert.

## Free Windows apps

Free within each app's limits, no ads, no account needed. Optional PeerapoS Pro subscription lifts the limits. Offline on Windows 10 and 11 (64-bit); data stays on the user's PC.

${APPS.map((a) => `- ${a.name}: ${a.en.tagline} ${a.en.description} [${a.th.tagline}] Download: ${downloadUrl(a)} Page: ${SITE_URL}/apps/${slugOf(a)}\n  Features: ${a.en.features.join("; ")} [${a.th.features.join(" / ")}]${a.en.chips.length || a.th.chips.length ? `\n  Chips: ${a.en.chips.join("; ")} [${a.th.chips.join(" / ")}]` : ""}`).join("\n")}

## Paid Windows apps (on sale now, one-time purchase)

${PAID_APPS.map((a) => `- ${a.name}: ${a.en.tagline} ${a.en.description} [${a.th.tagline}] One-time price: ฿${a.price?.toLocaleString("en-US")} Buy: ${SITE_URL}/buy?app=${a.id} Page: ${SITE_URL}/apps/${slugOf(a)}\n  Features: ${a.en.features.join("; ")} [${a.th.features.join(" / ")}]${a.en.chips.length || a.th.chips.length ? `\n  Chips: ${a.en.chips.join("; ")} [${a.th.chips.join(" / ")}]` : ""}`).join("\n")}

## Site text (Thai)

${siteText(COPY.th).join("\n")}

## FAQ

${[...FAQ.en, ...FAQ.th].map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Optional

- Privacy policy: ${SITE_URL}/privacy
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
