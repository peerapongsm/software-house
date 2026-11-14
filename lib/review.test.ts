import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import assert from "node:assert/strict";
import ts from "typescript";
import { checkoutNext, payStep } from "./buy.ts";

const require = createRequire(import.meta.url);
const source = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const compile = (text: string) => ts.transpileModule(text, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

test("PayStep: delayed signed-in retry and polling exhaustion", async () => {
  const states: unknown[] = [];
  let cursor = 0;
  const effects: (() => void)[] = [];
  const intervals: { fn: () => void; ms: number; active: boolean }[] = [];
  const timeouts: { fn: () => void; ms: number }[] = [];
  const exports: { default?: (props: object) => unknown } = {};
  const Spinner = () => null;
  const OrderBox = () => null;
  const hooks = {
    useState(initial: unknown) {
      const i = cursor++;
      if (!(i in states)) states[i] = initial;
      return [states[i], (v: unknown) => { states[i] = v; }];
    },
    useEffect(fn: () => void) { effects.push(fn); },
  };
  new Function("require", "exports", "setInterval", "clearInterval", "setTimeout", "clearTimeout", "document", "window", compile(source("components/account/PayStep.tsx")))(
    (id: string) => id === "react" ? hooks : id === "@/app/site-info" ? { EMAIL: "test@example.com" }
      : id.includes("OrderBox") ? { default: OrderBox } : id.includes("Spinner") ? { default: Spinner }
      : id.includes("api.ts") ? { api: async () => ({ ok: true, data: { status: "open", lines: [{ id: "account", priceSatang: 100 }] } }) }
      : id.includes("buy.ts") ? { payStep } : require(id), exports,
    (fn: () => void, ms: number) => { const timer = { fn, ms, active: true }; intervals.push(timer); return timer; },
    (timer: { active: boolean }) => { timer.active = false; },
    (fn: () => void, ms: number) => { timeouts.push({ fn, ms }); return timeouts.length; }, () => {},
    { visibilityState: "visible" }, { scrollTo() {} },
  );
  const props = { lang: "en", id: "O-0123456789", cancelled: false, signedIn: true, lic: null, email: "test@example.com", onOrdered() {}, accountErr: null, onRetry() {} };
  const render = (signedIn = true, confirming = false) => { cursor = 0; return exports.default!({ ...props, signedIn, confirming }); };
  type Node = { type?: unknown; props?: { children?: unknown; onClick?: () => void; previousOrder?: string } };
  function nodes(value: unknown): Node[] {
    if (Array.isArray(value)) return value.flatMap(nodes);
    if (!value || typeof value !== "object") return [];
    const node = value as Node;
    return [node, ...nodes(node.props?.children)];
  }
  render();
  effects.splice(0).forEach((fn) => fn());
  await Promise.resolve();
  render();
  effects.splice(0).forEach((fn) => fn());
  assert.equal(nodes(render()).some((n) => n.type === OrderBox), false);
  const delay = timeouts.find((t) => t.ms === 25_000);
  assert.ok(delay, "retry becomes available after 25 seconds");
  delay.fn();
  const retry = nodes(render()).find((n) => n.type === "button");
  assert.ok(retry, "signed-in buyer can reopen payment");
  assert.equal(nodes(render(false)).some((n) => n.type === "button"), false);
  retry.props!.onClick!();
  assert.equal(nodes(render()).find((n) => n.type === OrderBox)?.props?.previousOrder, props.id);
  const confirming = nodes(render(true, true));
  assert.equal(confirming.some((n) => n.type === "button" || n.type === OrderBox), false);
  assert.match(JSON.stringify(confirming), /Payment received, confirming/);
  const poll = intervals.find((t) => t.ms === 5000)!;
  for (let i = 0; i <= 360; i++) if (poll.active) poll.fn();
  const ended = nodes(render());
  assert.equal(ended.some((n) => n.type === Spinner), false);
  assert.match(JSON.stringify(ended), /refresh.*later/i);
});

for (const [page, name, reset] of [["pro", "buy", null], ["account", "pay", false]] as const) {
  for (const confirming of (page === "pro" ? [false, true] : [false])) {
    test(`${page} checkout: resets busy before location.assign (confirming=${confirming})`, async () => {
      const text = source(`app/${page}/page.tsx`);
      const start = text.indexOf(`  async function ${name}(`);
      const end = text.indexOf("\n  return (", start);
      const body = compile(text.slice(start, end) + `\nexports.run = ${name};`);
      let busy: unknown = false;
      let assigned = false;
      const before = "2027-01-01";
      let stored: string | null = null;
      const exports: { run?: (arg: unknown) => Promise<void> } = {};
      new Function("exports", "busy", "prices", "consent", "proOnSale", "setBusy", "setErr", "api", "checkoutNext", "location", "proBuyError", "orderError", "pro", "account", "sessionStorage", body)(
        exports, false, {}, true, true, (v: unknown) => { busy = v; }, () => {},
        async (path: string) => {
          if (path === "/api/pro/checkout") assert.equal(stored, before, "snapshot saved before checkout starts");
          return { ok: true, data: path === "/api/pro/checkout" && confirming
            ? { status: "confirming", orderId: "O-0123456789" }
            : { url: "https://checkout.stripe.com/test", licence: { pro: { until: before } } } };
        },
        checkoutNext,
        { assign(url: string) { assert.equal(busy, reset); assert.equal(url, confirming ? "/account?pro=done" : "https://checkout.stripe.com/test"); assigned = true; } }, () => ({}), () => ({}),
        { until: before }, { data: { licence: null } },
        { setItem(key: string, value: string) { assert.equal(key, "pro:before"); stored = value; } },
      );
      await exports.run!(page === "pro" ? "month" : undefined);
      assert.equal(assigned, true);
    });
  }
}
