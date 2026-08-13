import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import { buildBreadcrumbList, createPageMetadata } from "../lib/seo";

type Experience = {
  name: string;
  description: string;
  image: string;
};

type ExperienceCategory = {
  title: string;
  items: Experience[];
};

const requestPrice = "Price on request";
const whatsappBase = "https://wa.me/9609910136";
const teamEmail = "reservation@thoddoosunskyinn.com";

const categories: ExperienceCategory[] = [
  {
    title: "Snorkeling & Marine Life",
    items: [
      // TODO: Replace with original/CC-verified photo featuring an actual sea turtle snorkeling encounter.
      { name: "Turtle Snorkeling", description: "Guided snorkeling arranged for guests who want to explore Thoddoo’s reef areas.", image: "/images/experience-turtle-snorkeling.webp" },
      // TODO: Replace with original/CC-verified manta encounter photo from a real snorkeling trip.
      { name: "Manta Snorkeling", description: "A sought-after marine experience arranged around local sea conditions and seasonal movement.", image: "/images/experience-manta-snorkeling.webp" },
      { name: "Reef Snorkeling", description: "A flexible reef outing for guests who want a relaxed session in clear island waters.", image: "/images/experience-reef-snorkeling.webp" },
      // TODO: Replace with original/CC-verified whale shark excursion photo.
      { name: "Whale Shark Trip", description: "A full marine day coordinated on request with confirmed routing before departure.", image: "/images/experience-whale-shark-trip.webp" },
      // TODO: Replace with original/CC-verified shark-focused excursion photo.
      { name: "Shark Feeding", description: "A marine-life focused boat experience planned with operational and weather checks.", image: "/images/experience-shark-feeding.webp" },
    ],
  },
  {
    title: "Island Adventures",
    items: [
      { name: "Half Day Trip", description: "A compact sea-and-island itinerary arranged for guests who want a shorter outing.", image: "/images/experience-half-day-trip.webp" },
      { name: "Full Day Trip", description: "A longer day at sea arranged around guest preferences and available activities.", image: "/images/experience-full-day-trip.webp" },
      { name: "Island Hopping", description: "Visit nearby islands with routing coordinated around the day’s sea conditions.", image: "/images/experience-island-hopping.webp" },
      { name: "Sandbank Trip", description: "Time on a sandbank with optional add-ons coordinated by our team on request.", image: "/images/experience-sandbank-trip.webp" },
      // TODO: Replace with original/CC-verified resort-island day-trip photo.
      { name: "Resort Trip", description: "A day-visit style experience arranged with participating resorts and transfer timings.", image: "/images/experience-resort-trip.webp" },
    ],
  },
  {
    title: "Fishing & Local Experiences",
    items: [
      { name: "Sunset Fishing", description: "An evening fishing outing with island atmosphere and sunset views.", image: "/images/experience-sunset-fishing.webp" },
      // TODO: Replace with original/CC-verified octopus-focused reef activity photo.
      { name: "Octopus Hunting", description: "A local-style sea experience arranged with guidance from trusted operators.", image: "/images/experience-octopus-hunting.webp" },
    ],
  },
  {
    title: "Special Moments",
    items: [
      // TODO: Replace with original/CC-verified dolphin cruise photo.
      { name: "Dolphin Cruise", description: "A scenic cruise arranged for guests who want a relaxed ocean evening.", image: "/images/experience-dolphin-cruise.webp" },
      // TODO: Replace with original beach candle-lit dining setup photo.
      { name: "Beach Candle Lit Dinner", description: "A private beach dining setup coordinated for special evenings.", image: "/images/experience-beach-candle-lit-dinner.webp" },
      { name: "Drone Photo Shoot", description: "A photo-focused experience arranged for couples, families, and celebration trips.", image: "/images/experience-drone-photo-shoot.webp" },
      // TODO: Replace with original floating dinner setup photo.
      { name: "Romantic Floating Dinner", description: "A curated dining concept planned directly with guest preferences.", image: "/images/experience-romantic-floating-dinner.webp" },
      { name: "Fun Ride", description: "A light, sea-based activity arranged for guests who want a playful session on the water.", image: "/images/experience-fun-ride.webp" },
    ],
  },
];

function enquiryMessage(experienceName: string) {
  return [
    "Hello Thoddoo Sun Sky Inn,",
    "",
    "I am interested in:",
    experienceName,
    "",
    "Stay dates:",
    "Number of guests:",
    "",
    "Please confirm availability, current price and details.",
  ].join("\n");
}

function whatsappUrl(experienceName: string) {
  return `${whatsappBase}?text=${encodeURIComponent(enquiryMessage(experienceName))}`;
}

function emailUrl(experienceName: string) {
  return `mailto:${teamEmail}?subject=${encodeURIComponent(`Experience enquiry: ${experienceName}`)}&body=${encodeURIComponent(enquiryMessage(experienceName))}`;
}

export const metadata: Metadata = createPageMetadata({
  title: "Thoddoo Excursions & Island Experiences",
  description:
    "Discover snorkeling in Thoddoo, manta and reef outings, sandbank trips, fishing, and curated Maldives island experiences arranged for Thoddoo Sun Sky Inn guests.",
  path: "/experiences",
  keywords: [
    "Thoddoo excursions",
    "snorkeling in Thoddoo",
    "Maldives island experiences",
    "manta snorkeling Thoddoo",
    "sandbank trips Thoddoo",
    "Thoddoo fishing trips",
  ],
});

const breadcrumbData = buildBreadcrumbList([
  { name: "Experiences", path: "/experiences" },
]);

export default function Experiences() {
  return (
    <>
      <JsonLd data={breadcrumbData} />
      <PageHero
        title="Discover Thoddoo beyond the shore"
        kicker="ISLAND EXPERIENCES"
        image="/images/sandbank.webp"
      >
        <p>
          From manta encounters and reef snorkeling to sandbanks, fishing and unforgettable
          days at sea, our team can help arrange island experiences during your stay.
        </p>
      </PageHero>

      <section className="section shell experiences-intro">
        <p>Experiences arranged for Thoddoo Sun Sky Inn guests.</p>
      </section>

      {categories.map(category => (
        <section className="section shell experiences-section" key={category.title}>
          <div className="section-head experiences-head">
            <div>
              <span className="eyebrow">Curated collection</span>
              <h2>{category.title}</h2>
            </div>
          </div>
          <div className="experiences-grid">
            {category.items.map(item => (
              <article className="experience-card" key={item.name}>
                <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                <div>
                  <span className="eyebrow">{requestPrice}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="experience-actions">
                    <a className="btn btn-dark" href={whatsappUrl(item.name)} target="_blank" rel="noopener noreferrer">
                      Enquire on WhatsApp
                    </a>
                    <a className="btn btn-outline" href={emailUrl(item.name)}>
                      Ask our team
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="section shell experience-note">
        <p>
          Experience availability, timing and pricing depend on weather, sea conditions, guest
          numbers and operational availability. Our team will confirm the latest details before
          booking.
        </p>
        <p>Wildlife sightings are never guaranteed.</p>
      </section>
    </>
  );
}
