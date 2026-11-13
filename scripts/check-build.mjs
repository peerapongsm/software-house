// Run after npm run build:uat or npm run build. Checks the actual static export.
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
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
console.log(mode + " export: correct API, robots metadata and robots.txt");
