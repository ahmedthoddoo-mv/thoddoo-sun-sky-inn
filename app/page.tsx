import Link from "next/link";
import type { Metadata } from "next";
import { bookingTransitionPath } from "./lib/booking";
import { absoluteUrl } from "./lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Thoddoo Sun Sky Inn | Guesthouse on Thoddoo Island, Maldives" },
  description:
    "Stay at Thoddoo Sun Sky Inn, a boutique guesthouse on Thoddoo Island, Maldives with comfortable rooms, curated island experiences, and direct booking support.",
  keywords: [
    "Thoddoo guesthouse",
    "hotel in Thoddoo Maldives",
    "Thoddoo Island accommodation",
    "where to stay in Thoddoo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Thoddoo Sun Sky Inn | Guesthouse on Thoddoo Island, Maldives",
    description:
      "Stay at Thoddoo Sun Sky Inn, a boutique guesthouse on Thoddoo Island, Maldives with comfortable rooms, curated island experiences, and direct booking support.",
    url: absoluteUrl("/"),
    siteName: "Thoddoo Sun Sky Inn",
    images: [{ url: "/og.png", alt: "Thoddoo Sun Sky Inn in Thoddoo Island, Maldives" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thoddoo Sun Sky Inn | Guesthouse on Thoddoo Island, Maldives",
    description:
      "Stay at Thoddoo Sun Sky Inn, a boutique guesthouse on Thoddoo Island, Maldives with comfortable rooms, curated island experiences, and direct booking support.",
    images: ["/og.png"],
  },
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src="/images/hero.webp"
          alt="Thoddoo Sun Sky Inn on Thoddoo Island, Maldives"
          width={1800}
          height={1013}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="shell hero-copy">
          <span className="eyebrow light">Boutique island stay · Thoddoo, Maldives</span>
          <h1>Thoddoo Sun Sky Inn on Thoddoo Island, Maldives</h1>
          <p>
            A welcoming nine-room guesthouse where warm Maldivian hospitality,
            comfortable accommodation, island experiences, and direct booking support
            come together.
          </p>
          <div className="actions">
            <a className="btn btn-gold" href={bookingTransitionPath}>
              Check availability
            </a>
            <Link className="btn btn-glass" href="/stay">
              Explore your stay
            </Link>
          </div>
        </div>
      </section>

      <section className="quick-strip">
        <div>
          <b>From USD 85</b>
          <span>per room</span>
        </div>
        <div>
          <b>Breakfast included</b>
          <span>fresh island mornings</span>
        </div>
        <div>
          <b>Direct support</b>
          <span>WhatsApp concierge</span>
        </div>
        <div>
          <b>9 rooms</b>
          <span>personal hospitality</span>
        </div>
      </section>

      <section className="section shell split">
        <div>
          <span className="eyebrow">Stay close to everything</span>
          <h2>A calm base for discovering Thoddoo</h2>
          <p>
            Rest in bright, comfortable rooms, enjoy breakfast in the garden, and let our
            local team help coordinate transfers and island activities during your holiday.
          </p>
          <Link className="text-link" href="/stay">
            Discover the rooms →
          </Link>
        </div>
        <img
          className="rounded"
          src="/images/room-hero.webp"
          alt="Guest room at Thoddoo Sun Sky Inn"
          width={1400}
          height={933}
          loading="lazy"
          decoding="async"
        />
      </section>

      <section className="section section-cream">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">Curated for your holiday</span>
              <h2>Signature experiences</h2>
            </div>
            <Link className="text-link" href="/experiences">
              Explore all experiences →
            </Link>
          </div>
          <div className="card-grid three">
            <article className="image-card">
              <img
                src="/images/experience-half-day-trip.webp"
                alt="Half Day Trip excursion"
                width={1200}
                height={1600}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>Half Day Trip</h3>
                <p>A compact island-and-sea outing arranged for Sun Sky Inn guests.</p>
              </div>
            </article>
            <article className="image-card">
              <img
                src="/images/experience-manta-snorkeling.webp"
                alt="Manta Snorkeling excursion"
                width={1400}
                height={788}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>Manta Snorkeling</h3>
                <p>A memorable marine-life experience arranged around local conditions.</p>
              </div>
            </article>
            <article className="image-card">
              <img
                src="/images/experience-sandbank-trip.webp"
                alt="Sandbank Trip excursion"
                width={1400}
                height={788}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>Sandbank Trip</h3>
                <p>Scenic time on a sandbank with details confirmed by our team.</p>
              </div>
            </article>
            <article className="image-card">
              <img
                src="/images/experience-dolphin-cruise.webp"
                alt="Dolphin Cruise excursion"
                width={1400}
                height={788}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>Dolphin Cruise</h3>
                <p>A relaxed ocean cruise ideal for golden-hour island evenings.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section shell cta">
        <span className="eyebrow light">Book with confidence</span>
        <h2>Your Thoddoo story starts here.</h2>
        <p>
          Reserve directly or speak with our team for rooms, transfers, and experiences
          arranged for Thoddoo Sun Sky Inn guests.
        </p>
        <div className="actions">
          <a className="btn btn-gold" href={bookingTransitionPath}>
            Book direct
          </a>
          <a className="btn btn-glass" href="https://wa.me/9609910136">
            WhatsApp us
          </a>
        </div>
      </section>
    </>
  );
}
