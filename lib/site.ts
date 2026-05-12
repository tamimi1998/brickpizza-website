/** Public brand URLs — update order/delivery link when official channel is available. */
export const BRICK_SITE = {
  name: "Brick Pizza",
  nameWithTag: "Brick Pizza Kuwait",
  instagramHandle: "@brickpizzakw",
  instagramUrl: "https://www.instagram.com/brickpizzakw/",
  /** Replace with official ordering partner URL when available */
  orderOnlineUrl: "https://www.instagram.com/brickpizzakw/",
  mapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Brick+Pizza+Salmiya+Kuwait",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brickpizza-kuwait.vercel.app",
} as const;

export const BUSINESS_HOURS = {
  open: "3 PM",
  close: "12 AM",
  closedDay: "Sundays",
} as const;
