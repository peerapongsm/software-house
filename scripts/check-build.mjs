// Run after npm run build:uat or npm run build. Checks the actual static export.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const mode = process.argv[2];
assert.ok(mode === "uat" || mode === "prod", "Usage: node scripts/check-build.mjs uat|prod");
const uat = mode === "uat";
const html = readFileSync("out/index.html", "utf8");
const robots = readFileSync("out/robots.txt", "utf8");
assert.equal(/<meta name="robots" content="[^"]*noindex/.test(html), uat);
assert.equal(/^Disallow: \/$/m.test(robots), uat);
if (!uat) assert.match(robots, /^Allow: \/$/m);
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? files(path) : path.endsWith(".js") ? [path] : [];
  });
}
const scripts = files("out/_next").map(path => readFileSync(path, "utf8")).join("\n");
assert.ok(scripts.includes(uat ? "https://api-uat.peerapongsm.dev" : "https://api.peerapongsm.dev"), "expected API missing from browser bundle");
assert.ok(!scripts.includes(uat ? "https://api.peerapongsm.dev" : "https://api-uat.peerapongsm.dev"), "other environment API found in browser bundle");
const appPages = readdirSync("out/apps").filter(name => name.endsWith(".html"));
assert.equal(appPages.length, 27, "expected 27 app pages");
for (const name of appPages) {
  const slug = name.slice(0, -5);
  const page = readFileSync(join("out/apps", name), "utf8");
  assert.equal(page.includes("application/ld+json"), !uat, `${slug}: JSON-LD visibility`);
  assert.equal(/<meta name="robots" content="[^"]*noindex/.test(page), uat, `${slug}: robots metadata`);
  if (!uat) {
    assert.ok(page.includes('"@type":"SoftwareApplication"'), `${slug}: SoftwareApplication missing`);
    assert.ok(page.includes(`<link rel="canonical" href="https://peerapongsm.dev/apps/${slug}"`), `${slug}: canonical missing`);
  }
}
const sitemap = readFileSync("out/sitemap.xml", "utf8");
const appLocations = sitemap.match(/<loc>https:\/\/peerapongsm\.dev\/apps\/[^<]+<\/loc>/g) ?? [];
assert.equal(appLocations.length, uat ? 0 : 27, "app URLs in sitemap");
if (!uat) {
  const llms = readFileSync("out/llms.txt", "utf8");
  assert.ok(llms.includes("Page: https://peerapongsm.dev/apps/wash"), "wash page missing from llms.txt");
  assert.ok(llms.includes("Page: https://peerapongsm.dev/apps/account"), "account page missing from llms.txt");
}
assert.ok(existsSync("out/apps/wash.png"), "wash icon missing");
console.log(mode + " export: correct API, robots metadata and robots.txt");
console.log(mode + " export: OK (27 app pages, JSON-LD, canonicals, sitemap, llms.txt and wash icon)");
