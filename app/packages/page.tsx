import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import { buildBreadcrumbList, createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Holiday Packages in Thoddoo",
  description:
    "Explore flexible Thoddoo Sun Sky Inn holiday packages with accommodation, breakfast options, and curated island planning support.",
  path: "/packages",
  keywords: [
    "Thoddoo holiday packages",
    "Maldives guesthouse packages",
    "Thoddoo stay offers",
  ],
});

const packs = [
  ["Stay & Breakfast", "A simple, flexible island stay.", ["Accommodation", "Daily breakfast", "Wi-Fi", "Guest support"]],
  ["Island Explorer", "Our most complete Thoddoo introduction.", ["Accommodation", "Daily breakfast", "Return speedboat assistance", "Half Day Adventure"]],
  ["Romantic Escape", "An intimate island getaway for two.", ["Accommodation", "Daily breakfast", "Romantic room setup", "Private experience planning"]],
];

const breadcrumbData = buildBreadcrumbList([{ name: "Packages", path: "/packages" }]);

export default function Packages() {
  return (
    <>
      <JsonLd data={breadcrumbData} />
      <PageHero
        title="Choose the holiday that feels right"
        kicker="Stay packages"
        image="/images/island.webp"
      >
        <p>Clear inclusions, flexible planning and direct support from our team.</p>
      </PageHero>
      <section className="section shell">
        <div className="card-grid three">
          {packs.map(([name, description, list], idx) => (
            <article className={`package-card ${idx === 1 ? "featured" : ""}`} key={name as string}>
              {idx === 1 && <span className="popular">Most popular</span>}
              <h2>{name}</h2>
              <p>{description}</p>
              <ul>
                {(list as string[]).map(item => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
              <a className="btn btn-gold" href="https://wa.me/9609910136">
                Request package
              </a>
            </article>
          ))}
        </div>
        <div className="partner-callout">
          <div>
            <span className="eyebrow">Referred by a travel partner?</span>
            <h2>Unlock your private invitation benefits</h2>
            <p>Use the separate invitation page so public rates stay clear for every guest.</p>
          </div>
          <a className="btn btn-dark" href="/partner">
            Enter partner code
          </a>
        </div>
      </section>
    </>
  );
}
