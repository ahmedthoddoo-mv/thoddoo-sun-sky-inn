import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import { buildBreadcrumbList, createPageMetadata } from "../lib/seo";

export const metadata = createPageMetadata({
  title: "Photo Gallery",
  description:
    "View rooms, dining, garden spaces, and island scenes from Thoddoo Sun Sky Inn in Thoddoo, Maldives.",
  path: "/gallery",
  keywords: ["Thoddoo hotel gallery", "Thoddoo Sun Sky Inn photos", "guesthouse Maldives photos"],
});

const images = [
  "room-hero.webp",
  "room-romance.webp",
  "bathroom.webp",
  "breakfast.webp",
  "garden-room.webp",
  "reception.webp",
  "courtyard.webp",
  "entrance.webp",
  "sandbank.webp",
  "lagoon.webp",
  "island.webp",
  "garden-room-2.webp",
];

const breadcrumbData = buildBreadcrumbList([{ name: "Gallery", path: "/gallery" }]);

export default function Gallery() {
  return (
    <>
      <JsonLd data={breadcrumbData} />
      <PageHero title="A glimpse of your island stay" kicker="Gallery" image="/images/courtyard.webp" />
      <section className="section shell">
        <div className="masonry">
          {images.map((image, index) => (
            <img
              key={image}
              src={`/images/${image}`}
              alt={`Thoddoo Sun Sky Inn gallery image ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </section>
    </>
  );
}
