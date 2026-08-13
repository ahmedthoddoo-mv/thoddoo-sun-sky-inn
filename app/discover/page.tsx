import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import { bookingTransitionPath } from "../lib/booking";
import { buildBreadcrumbList, createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Discover Thoddoo Island",
  description:
    "Discover Thoddoo Island beaches, local atmosphere, and practical trip planning from Thoddoo Sun Sky Inn.",
  path: "/discover",
  keywords: [
    "Thoddoo Island guide",
    "things to do in Thoddoo",
    "Thoddoo beaches",
    "Thoddoo Maldives holiday",
  ],
});

const breadcrumbData = buildBreadcrumbList([{ name: "Discover", path: "/discover" }]);

export default function Discover() {
  return (
    <>
      <JsonLd data={breadcrumbData} />
      <PageHero
        title="A local island with room to breathe"
        kicker="Discover Thoddoo"
        image="/images/island.webp"
      >
        <p>White-sand beaches, fruit farms, cafés and warm island life.</p>
      </PageHero>

      <section className="section shell">
        <div className="card-grid three">
          <article className="info-card">
            <h2>Bikini Beach</h2>
            <p>Swim, relax and enjoy Thoddoo&apos;s turquoise water and wide sandy beach.</p>
          </article>
          <article className="info-card">
            <h2>Fruit farms</h2>
            <p>Discover the island&apos;s famous watermelon and tropical farming culture.</p>
          </article>
          <article className="info-card">
            <h2>Local life</h2>
            <p>Walk to cafés, shops, the harbour and community spaces at an easy pace.</p>
          </article>
        </div>
      </section>

      <section className="section section-cream">
        <div className="shell split">
          <img
            className="rounded"
            src="/images/entrance.webp"
            alt="Sun Sky Inn entrance on Thoddoo Island"
            loading="lazy"
            decoding="async"
          />
          <div>
            <span className="eyebrow">Easy island planning</span>
            <h2>We help before and during your stay</h2>
            <p>
              Ask us about airport speedboats, arrival assistance, excursions, dining,
              and practical island information.
            </p>
            <div className="actions compact-actions">
              <a className="btn btn-dark" href="https://wa.me/9609910136">
                Plan on WhatsApp
              </a>
              <a className="btn btn-outline" href="/stay">
                View rooms
              </a>
              <a className="btn btn-outline" href="/experiences">
                Explore experiences
              </a>
              <a className="btn btn-outline" href={bookingTransitionPath}>
                Book direct
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
