import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import { bookingTransitionPath } from "../lib/booking";
import { buildBreadcrumbList, createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Rooms & Stay in Thoddoo",
  description:
    "Explore rooms at Thoddoo Sun Sky Inn for a comfortable stay in Thoddoo, Maldives with breakfast, Wi-Fi, and direct support.",
  path: "/stay",
  keywords: [
    "rooms in Thoddoo",
    "Thoddoo accommodation",
    "Thoddoo guesthouse rooms",
    "stay in Thoddoo Maldives",
  ],
});

const breadcrumbData = buildBreadcrumbList([{ name: "Stay", path: "/stay" }]);

export default function Stay() {
  return (
    <>
      <JsonLd data={breadcrumbData} />
      <PageHero
        title="Rest easy in the heart of Thoddoo"
        kicker="Your stay"
        image="/images/room-wide.webp"
      >
        <p>Comfortable rooms, thoughtful essentials and personal island hospitality.</p>
      </PageHero>

      <section className="section shell">
        <div className="room-layout">
          <div>
            <img
              className="rounded"
              src="/images/room-hero.webp"
              alt="Deluxe Double Room at Thoddoo Sun Sky Inn"
              width={1400}
              height={933}
              loading="lazy"
              decoding="async"
            />
            <div className="thumb-row">
              <img
                src="/images/room-detail.webp"
                alt="Room detail"
                width={1400}
                height={933}
                loading="lazy"
                decoding="async"
              />
              <img
                src="/images/bathroom.webp"
                alt="Private bathroom"
                width={1400}
                height={1929}
                loading="lazy"
                decoding="async"
              />
              <img
                src="/images/garden-room.webp"
                alt="Garden room view"
                width={1400}
                height={933}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="room-copy">
            <span className="eyebrow">From USD 85</span>
            <h2>Deluxe Double Room</h2>
            <p>
              A bright, inviting room designed for couples and solo travellers seeking a
              relaxed island stay.
            </p>
            <ul className="feature-list">
              <li>Queen bed</li>
              <li>Air conditioning</li>
              <li>Private bathroom</li>
              <li>Wi-Fi</li>
              <li>Breakfast included</li>
              <li>Daily housekeeping</li>
            </ul>
            <div className="actions compact-actions">
              <a className="btn btn-gold" href={bookingTransitionPath}>
                Check availability
              </a>
              <a className="btn btn-outline" href="/experiences">
                Explore experiences
              </a>
              <a className="btn btn-outline" href="/contact">
                Contact reservations
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="shell split reverse">
          <img
            className="rounded"
            src="/images/breakfast.webp"
            alt="Breakfast at Thoddoo Sun Sky Inn"
            width={1179}
            height={1539}
            loading="lazy"
            decoding="async"
          />
          <div>
            <span className="eyebrow">Island mornings</span>
            <h2>Breakfast made part of the experience</h2>
            <p>
              Start the day with fresh fruit, warm dishes and easy conversation before
              heading to the beach or the ocean.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
