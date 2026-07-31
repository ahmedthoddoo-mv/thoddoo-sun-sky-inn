import assert from "node:assert/strict";
import test from "node:test";
import { getPartnerDestination, partnerCodeError } from "../app/partner/partner-code.ts";

const publicRoutes = [
  "/",
  "/stay",
  "/experiences",
  "/packages",
  "/gallery",
  "/discover",
  "/partner",
  "/contact",
];

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

function render(pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("homepage renders the Sun Sky Inn brand", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Thoddoo Sun Sky Inn \| Boutique Hotel in Thoddoo, Maldives<\/title>/i);
  assert.match(html, /Thoddoo Sun Sky Inn/);
  assert.match(html, /Wake up to island life\./);
});

test("all public routes render successfully", async (t) => {
  for (const pathname of publicRoutes) {
    await t.test(pathname, async () => {
      const response = await render(pathname);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
      assert.match(await response.text(), /Thoddoo Sun Sky Inn/);
    });
  }
});

test("valid partner code redirects to the private offer", () => {
  assert.equal(getPartnerDestination("BEZCESTOVKY"), "/bez-cestovky");
});

test("partner code matching ignores case and surrounding spaces", () => {
  assert.equal(getPartnerDestination("  bezcestovky  "), "/bez-cestovky");
});

test("invalid partner code returns the accessible error", () => {
  assert.equal(getPartnerDestination("not-a-valid-code"), null);
  assert.equal(
    partnerCodeError,
    "This partner code is not valid. Please check the code or contact Sun Sky Inn.",
  );
});
