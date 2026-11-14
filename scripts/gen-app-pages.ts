import { readFile, writeFile } from "node:fs/promises";
import { ALL_APPS, appBySlug, slugOf } from "../app/apps-data.ts";
import { APP_PAGES, type AppPage } from "../app/app-pages-data.ts";
import { PAGE_COPY_SCHEMA, promptFor, validatePageCopy } from "../lib/app-page-copy.ts";

async function main() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) { console.error("OPENAI_API_KEY is required"); process.exitCode = 1; return; }
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== "--only" || !appBySlug(args[1]))) {
    console.error("Usage: node scripts/gen-app-pages.ts [--only <known-slug>]");
    process.exitCode = 1;
    return;
  }
  const apps = args.length ? [appBySlug(args[1])!] : ALL_APPS.filter(app => !Object.hasOwn(APP_PAGES, slugOf(app)));
  const pages: Record<string, AppPage> = { ...APP_PAGES };
  let changed = false;
  for (const app of apps) {
    const slug = slugOf(app);
    const { system, user } = promptFor(app);
    let errors: string[] = [];
    let page: AppPage | undefined;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || "gpt-5.5",
            input: [
              { role: "system", content: system },
              { role: "user", content: attempt ? `${user}\nCorrect these errors from the previous attempt:\n${errors.join("\n")}` : user },
            ],
            text: { format: { type: "json_schema", name: "app_page", schema: PAGE_COPY_SCHEMA, strict: true } },
          }),
        });
        if (!response.ok) {
          errors = [`API returned HTTP ${response.status}`];
          continue;
        }
        const result = await response.json();
        if (result.status !== "completed") { errors = ["API response was not completed"]; continue; }
        const output = result.output?.flatMap((item: { type: string; content?: { type: string; text?: string }[] }) =>
          item.type === "message" ? (item.content ?? []).filter(part => part.type === "output_text").map(part => part.text ?? "") : []).join("");
        page = JSON.parse(output);
        errors = validatePageCopy(app, page);
        if (!errors.length) break;
      } catch {
        // Do not echo exception text or API response bodies: they may contain credentials.
        errors = ["Request failed or response was not valid page-copy JSON"];
      }
    }
    if (errors.length || !page) {
      console.error(`FAILED ${slug}: ${errors.join("; ")}`);
      process.exitCode = 1;
    } else {
      pages[slug] = page;
      changed = true;
      console.log(`ok ${slug}`);
    }
  }
  if (changed) {
    const file = new URL("../app/app-pages-data.ts", import.meta.url);
    const source = await readFile(file, "utf8");
    const marker = "export const APP_PAGES: Record<string, AppPage> = ";
    const at = source.indexOf(marker);
    if (at < 0) throw new Error("APP_PAGES declaration not found");
    const ordered = Object.fromEntries([
      ...ALL_APPS.map(slugOf).filter(slug => Object.hasOwn(pages, slug)).map(slug => [slug, pages[slug]]),
      ...Object.entries(pages).filter(([slug]) => !appBySlug(slug)),
    ]);
    await writeFile(file, `${source.slice(0, at)}${marker}${JSON.stringify(ordered, null, 2)};\n`, "utf8");
  }
}

main().catch(() => { console.error("Generator failed; no credentials or response details logged"); process.exitCode = 1; });
