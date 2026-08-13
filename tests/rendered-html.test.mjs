import assert from "node:assert/strict";
import test from "node:test";
import { officialBookingEngineUrl } from "../app/lib/booking.ts";
import { getPartnerDestination, partnerCodeError } from "../app/partner/partner-code.ts";

const publicRoutes = [
  "/",
  "/booking",
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

test("booking transition page points to the official AIOSELL booking engine", async () => {
  const response = await render("/booking");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();

  assert.match(
    html,
    new RegExp(`window\\.setTimeout\\(function\\(\\)\\{window\\.location\\.replace\\(${JSON.stringify(officialBookingEngineUrl).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\);\\},2000\\);`, "i"),
  );
  assert.match(
    html,
    new RegExp(`href="${officialBookingEngineUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "i"),
  );
  assert.match(html, /Continue to Secure Booking/);
  assert.doesNotMatch(html, /https:\/\/be\.aiosell\.com\/book\/22ffd2f355/);
  assert.doesNotMatch(html, /https:\/\/book\.thoddoosunskyinn\.com/);
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

test("private Slovak partner page renders the complete fixed offer", async () => {
  const response = await render("/bez-cestovky");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /BEZCESTOVKY/);
  for (const price of ["70 USD", "90 USD", "110 USD", "18 USD", "23 USD", "28 USD"]) {
    assert.match(html, new RegExp(price));
  }
  assert.match(html, /\+960 991 0136/);
  assert.match(html, /reservation@thoddoosunskyinn\.com/);
  assert.match(html, /Táto suma je orientačná/);
  assert.match(html, /rýchloloďou/);
  assert.match(html, /Ako sa dostať na Thoddoo/);
  assert.match(html, /Pláže na Thoddoo/);
  assert.match(html, /Prečo si vybrať Thoddoo/);
  assert.match(html, /8 nocí a viac/);
  assert.match(html, /30 až 45 minút šnorchlovania/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"\/>/i);

  assert.doesNotMatch(html, /https:\/\/be\.aiosell\.com\/book\/22ffd2f355/);
  assert.doesNotMatch(html, /https:\/\/book\.thoddoosunskyinn\.com/);
  assert.doesNotMatch(html, /\+960 914 2538/);
  assert.doesNotMatch(html, /ahmedthoddoo@gmail\.com/);
});

test("private partner page remains excluded from the sitemap", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const sitemap = await response.text();
  assert.doesNotMatch(sitemap, /bez-cestovky/);
  assert.match(sitemap, /https:\/\/thoddoosunskyinn\.com\/partner/);
});
