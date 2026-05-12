/** Public brand URLs */
export const BRICK_SITE = {
  name: "Brick Pizza",
  nameWithTag: "Brick Pizza Kuwait",
  instagramHandle: "@brickpizzakw",
  instagramUrl: "https://www.instagram.com/brickpizzakw/",
  talabatUrl: "https://www.talabat.com/kuwait/brick-pizza",
  /** All primary order CTAs point here */
  orderOnlineUrl: "https://www.talabat.com/kuwait/brick-pizza",
  mapsSearchUrl: "https://www.google.com/maps/search/Brick+Pizza+Salmiya+Kuwait",
  /** Query-based embed (no API key). Replace with “Share → Embed” iframe `src` from Google Maps for a pinned listing. */
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Brick+Pizza+Salmiya+Kuwait&hl=en&z=16&output=embed",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brickpizza-kuwait.vercel.app",
} as const;

export const BUSINESS_HOURS = {
  open: "3 PM",
  close: "12 AM",
  closedDay: "Sundays",
} as const;

export const EXTERNAL_REL = "noopener noreferrer" as const;

/** Section anchors for navbar / deep links */
export const NAV = {
  home: "#home",
  menu: "#menu",
  detroit: "#detroit",
  ny: "#ny-pizza",
  sauces: "#sauces",
  gallery: "#gallery",
  about: "#about",
  visit: "#visit",
} as const;
