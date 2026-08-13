import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import { bookingTransitionPath } from "../lib/booking";
import { buildBreadcrumbList, createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Contact & Reservations",
  description:
    "Contact Thoddoo Sun Sky Inn for room reservations, transfer planning, and island experience enquiries on Thoddoo Island, Maldives.",
  path: "/contact",
  keywords: [
    "Thoddoo Sun Sky Inn contact",
    "Thoddoo hotel reservation",
    "guesthouse Thoddoo WhatsApp",
  ],
});

const breadcrumbData = buildBreadcrumbList([{ name: "Contact", path: "/contact" }]);

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbData} />
      <PageHero title="Let’s plan your stay" kicker="Contact" image="/images/reception.webp">
        <p>Speak directly with our team for reservations, transfers and island experiences.</p>
      </PageHero>
      <section className="section shell contact-grid">
        <div>
          <span className="eyebrow">Official contacts</span>
          <h2>Thoddoo Sun Sky Inn</h2>
          <p>Thoddoo Island, Maldives</p>
          <a className="contact-line" href="https://wa.me/9609910136">
            WhatsApp: +960 991 0136
          </a>
          <a className="contact-line" href="mailto:reservation@thoddoosunskyinn.com">
            reservation@thoddoosunskyinn.com
          </a>
          <p>Check-in 14:00 · Check-out 11:00</p>
        </div>
        <div className="contact-card">
          <h3>Quick enquiry</h3>
          <p>
            For the fastest answer, send your dates, guest count and room preference
            through WhatsApp.
          </p>
          <a
            className="btn btn-gold"
            href="https://wa.me/9609910136?text=Hello%20Sun%20Sky%20Inn%2C%20I%20would%20like%20to%20check%20availability."
          >
            Start enquiry
          </a>
          <a className="btn btn-outline" href={bookingTransitionPath}>
            Open booking engine
          </a>
        </div>
      </section>
    </>
  );
}
