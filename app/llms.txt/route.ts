import { APPS, downloadUrl } from "../apps-data";
import { EMAIL, FAQ, FASTWORK_URL, GANK_URL, LINE_URL, SERVICES, SITE_URL } from "../site-info";

export const dynamic = "force-static";

// llms.txt (llmstxt.org): a plain-text brief for AI assistants, built from the same data as the page.
export function GET() {
  const body = `# PeerapoS

> PeerapoS is a small software house in Thailand that builds custom apps and software for businesses (รับทำแอปและเขียนโปรแกรมตามสั่ง), and publishes free offline Windows apps for small businesses (โปรแกรมฟรีสำหรับ SME).

Website: ${SITE_URL}
Contact: ${EMAIL} · LINE ${LINE_URL} · Fastwork ${FASTWORK_URL}
Support / tips: ${GANK_URL}

## Custom app development (รับทำแอปตามสั่ง)

- Offline Windows programs, and web apps that run on phones, tablets and desktops.
- Typical work: back-office systems such as inventory, customer records (CRM), work orders and maintenance requests.
- No spec document needed: describe how the business runs in plain words.
- Usually takes weeks, not months. Only the features the client will use.
- The client owns the data; changes and support continue after delivery.

## Prices (starting, THB)

${SERVICES.map((s) => `- ${s.en} [${s.th}]: from ${s.price.toLocaleString("en-US")} THB per ${s.unit}`).join("\n")}

Final price depends on scope. Hire directly by email/LINE or through Fastwork (${FASTWORK_URL}).

## Who builds it

Peerapong (Peter) Saksommon: Software Architect at the Bank of Thailand, former full-stack engineer at Agoda, MS Information Systems (Syracuse University), BS Information Technology (University of Washington), Microsoft Certified: Azure Solutions Architect Expert.

## Free Windows apps

Free, no subscription, no ads, no account. Optional tips on Gank (${GANK_URL}). Offline on Windows 10 and 11 (64-bit); data stays on the user's PC.

${APPS.map((a) => `- ${a.name}: ${a.en.tagline} ${a.en.description} [${a.th.tagline}] Download: ${downloadUrl(a)}`).join("\n")}

## FAQ

${[...FAQ.en, ...FAQ.th].map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Optional

- Privacy policy: ${SITE_URL}/privacy
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
