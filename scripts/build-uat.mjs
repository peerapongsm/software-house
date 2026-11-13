import { spawnSync } from "node:child_process";

const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: { ...process.env, NEXT_PUBLIC_API_BASE: "https://api-uat.peerapongsm.dev", PEERAPOS_UAT: "true" },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
