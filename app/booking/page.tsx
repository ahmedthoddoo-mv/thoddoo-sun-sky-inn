import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import { officialBookingEngineUrl } from "../lib/booking";
import { buildBreadcrumbList, createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Secure Booking Transition",
  description: "Continue to the official Thoddoo Sun Sky Inn booking engine.",
  path: "/booking",
  robots: {
    index: false,
    follow: false,
  },
});

const breadcrumbData = buildBreadcrumbList([{ name: "Booking", path: "/booking" }]);

export default function Booking() {
  return (
    <>
      <JsonLd data={breadcrumbData} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.setTimeout(function(){window.location.replace(${JSON.stringify(officialBookingEngineUrl)});},2000);`,
        }}
      />
      <PageHero
        title="Redirecting to secure booking"
        kicker="Booking"
        image="/images/reception.webp"
      >
        <p>
          You will be redirected to our official AIOSELL booking engine in 2 seconds.
        </p>
      </PageHero>
      <section className="section shell">
        <div className="contact-card">
          <span className="eyebrow">Official booking engine</span>
          <h2>Continue your reservation</h2>
          <p>
            If the redirect does not start automatically, use the secure booking button
            below.
          </p>
          <div className="actions">
            <a className="btn btn-gold" href={officialBookingEngineUrl}>
              Continue to Secure Booking
            </a>
            <Link className="btn btn-outline" href="/contact">
              Contact our team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
