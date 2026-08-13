import type { Metadata } from "next";
import PageHero from "../components/PageHero";

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
      { name: "Turtle Snorkeling", description: "Guided snorkeling arranged for guests who want to explore Thoddoo’s reef areas.", image: "/images/lagoon.webp" },
      { name: "Manta Snorkeling", description: "A sought-after marine experience arranged around local sea conditions and seasonal movement.", image: "/images/sandbank.webp" },
      { name: "Reef Snorkeling", description: "A flexible reef outing for guests who want a relaxed session in clear island waters.", image: "/images/lagoon.webp" },
      { name: "Whale Shark Trip", description: "A full marine day coordinated on request with confirmed routing before departure.", image: "/images/island.webp" },
      { name: "Shark Feeding", description: "A marine-life focused boat experience planned with operational and weather checks.", image: "/images/lagoon.webp" },
    ],
  },
  {
    title: "Island Adventures",
    items: [
      { name: "Half Day Trip", description: "A compact sea-and-island itinerary arranged for guests who want a shorter outing.", image: "/images/sandbank.webp" },
      { name: "Full Day Trip", description: "A longer day at sea arranged around guest preferences and available activities.", image: "/images/island.webp" },
      { name: "Island Hopping", description: "Visit nearby islands with routing coordinated around the day’s sea conditions.", image: "/images/island.webp" },
      { name: "Sandbank Trip", description: "Time on a sandbank with optional add-ons coordinated by our team on request.", image: "/images/sandbank.webp" },
      { name: "Resort Trip", description: "A day-visit style experience arranged with participating resorts and transfer timings.", image: "/images/courtyard.webp" },
    ],
  },
  {
    title: "Fishing & Local Experiences",
    items: [
      { name: "Sunset Fishing", description: "An evening fishing outing with island atmosphere and sunset views.", image: "/images/island.webp" },
      { name: "Octopus Hunting", description: "A local-style sea experience arranged with guidance from trusted operators.", image: "/images/lagoon.webp" },
    ],
  },
  {
    title: "Special Moments",
    items: [
      { name: "Dolphin Cruise", description: "A scenic cruise arranged for guests who want a relaxed ocean evening.", image: "/images/lagoon.webp" },
      { name: "Beach Candle Lit Dinner", description: "A private beach dining setup coordinated for special evenings.", image: "/images/dining.webp" },
      { name: "Drone Photo Shoot", description: "A photo-focused experience arranged for couples, families, and celebration trips.", image: "/images/entrance.webp" },
      { name: "Romantic Floating Dinner", description: "A curated dining concept planned directly with guest preferences.", image: "/images/dining.webp" },
      { name: "Fun Ride", description: "A light, sea-based activity arranged for guests who want a playful session on the water.", image: "/images/sandbank.webp" },
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

export const metadata: Metadata = {
  title: "Thoddoo Island Experiences",
  description:
    "Discover snorkeling in Thoddoo, manta snorkeling, sandbank trips, fishing trips, and curated Maldives island experiences arranged for Thoddoo Sun Sky Inn guests.",
  keywords: [
    "Thoddoo excursions",
    "snorkeling in Thoddoo",
    "Maldives island experiences",
    "manta snorkeling Thoddoo",
    "sandbank trips Thoddoo",
    "Thoddoo fishing trips",
  ],
  alternates: { canonical: "/experiences" },
};

export default function Experiences() {
  return (
    <>
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
