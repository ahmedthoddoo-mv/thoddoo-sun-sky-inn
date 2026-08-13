import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../components/PageHero";
import { officialBookingEngineUrl } from "../lib/booking";

export const metadata: Metadata = {
  title: "Secure Booking",
  description: "Continue to the official Sun Sky Inn booking engine.",
  alternates: {
    canonical: "/booking",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function Booking() {
  return (
    <>
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
