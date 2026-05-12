import { BRICK_SITE } from "@/lib/site";

const siteUrl = BRICK_SITE.siteUrl;

export function JsonLdRestaurant() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}#restaurant`,
    name: BRICK_SITE.nameWithTag,
    alternateName: BRICK_SITE.name,
    url: siteUrl,
    sameAs: [BRICK_SITE.instagramUrl],
    servesCuisine: ["Pizza", "Italian-American", "Detroit-style pizza", "New York-style pizza"],
    priceRange: "KD",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salmiya",
      addressRegion: "Hawalli Governorate",
      addressCountry: "KW",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "15:00",
        closes: "00:00",
      },
    ],
    areaServed: {
      "@type": "GeoCircle",
      name: "Kuwait",
    },
    description:
      "Brick Pizza Kuwait — Detroit-style and New York-style pizza in Salmiya. Dine in, pickup, and delivery. Best pizza in Kuwait.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
