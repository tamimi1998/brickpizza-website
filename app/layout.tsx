import type { Metadata } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { JsonLdRestaurant } from "@/components/JsonLdRestaurant";
import { BRICK_SITE } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebas = Bebas_Neue({
  variable: "--font-hero-display",
  subsets: ["latin"],
  weight: "400",
});

const title = "Brick Pizza Kuwait | Detroit & New York Pizza in Salmiya";
const description =
  "Brick Pizza Kuwait — Detroit-style and New York-style pizza in Salmiya. Open 3 PM – 12 AM, closed Sundays. Dine in, pickup, delivery. Best pizza in Kuwait, Detroit pizza Kuwait, pizza Salmiya, NY pizza Kuwait. @brickpizzakw";

const siteUrl = BRICK_SITE.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Brick Pizza Kuwait",
  },
  description,
  keywords: [
    "Brick Pizza Kuwait",
    "best pizza in Kuwait",
    "Detroit pizza Kuwait",
    "pizza Salmiya",
    "New York pizza Kuwait",
    "Salmiya pizza",
    "brick oven pizza Kuwait",
    "@brickpizzakw",
  ],
  authors: [{ name: "Brick Pizza Kuwait" }],
  creator: "Brick Pizza Kuwait",
  openGraph: {
    type: "website",
    locale: "en_KW",
    url: siteUrl,
    siteName: "Brick Pizza Kuwait",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bebas.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-[#0a0503] text-amber-50">
        <JsonLdRestaurant />
        {children}
      </body>
    </html>
  );
}
