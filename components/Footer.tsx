"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ShoppingBag, Share2 } from "lucide-react";
import { BRICK_SITE, EXTERNAL_REL, BUSINESS_HOURS, NAV } from "@/lib/site";
import { NavLink } from "@/components/NavLink";

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel={EXTERNAL_REL}
      aria-label={label}
      className="cta-external flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-amber-200 hover:border-orange-400/45 hover:text-white"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050201] px-4 py-16 sm:px-6 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-hero-display)] text-2xl font-bold tracking-tight text-white">
            Brick Pizza Kuwait
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-amber-100/55">
            Detroit-style & New York-style pizza in Salmiya. Dine in · Pickup · Delivery.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialIcon href={BRICK_SITE.instagramUrl} label="Follow on Instagram">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.8" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon href={BRICK_SITE.talabatUrl} label="Order on Talabat">
              <ShoppingBag className="size-5" strokeWidth={1.6} />
            </SocialIcon>
            <SocialIcon href={BRICK_SITE.mapsSearchUrl} label="Open Google Maps">
              <MapPin className="size-5" strokeWidth={1.6} />
            </SocialIcon>
          </div>
        </div>

        <div className="flex flex-wrap gap-12 text-sm">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-orange-300/80">Visit</p>
            <div className="mt-4 space-y-2 text-amber-100/65">
              <p>Open {BUSINESS_HOURS.open} – {BUSINESS_HOURS.close}</p>
              <p>Closed {BUSINESS_HOURS.closedDay}</p>
              <p>Salmiya, Kuwait</p>
            </div>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-orange-300/80">Explore</p>
            <ul className="mt-4 space-y-2 text-amber-100/60">
              <li>
                <NavLink href={NAV.menu} className="transition-colors hover:text-white">
                  Menu
                </NavLink>
              </li>
              <li>
                <NavLink href={NAV.about} className="transition-colors hover:text-white">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink href={NAV.gallery} className="transition-colors hover:text-white">
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink href={NAV.visit} className="transition-colors hover:text-white">
                  Visit us
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-orange-300/80">Order & social</p>
            <ul className="mt-4 space-y-3 text-amber-100/60">
              <li className="flex items-center gap-2">
                <ShoppingBag className="size-4 shrink-0 text-orange-400" strokeWidth={1.5} />
                <a
                  href={BRICK_SITE.talabatUrl}
                  target="_blank"
                  rel={EXTERNAL_REL}
                  className="cta-external inline-block rounded-md hover:text-white"
                >
                  Order on Talabat
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Navigation className="size-4 shrink-0 text-orange-400" strokeWidth={1.5} />
                <a
                  href={BRICK_SITE.mapsSearchUrl}
                  target="_blank"
                  rel={EXTERNAL_REL}
                  className="cta-external inline-block rounded-md hover:text-white"
                >
                  Google Maps
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Share2 className="size-4 shrink-0 text-orange-400" strokeWidth={1.5} />
                <a
                  href={BRICK_SITE.instagramUrl}
                  target="_blank"
                  rel={EXTERNAL_REL}
                  className="cta-external inline-block rounded-md hover:text-white"
                >
                  {BRICK_SITE.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-6xl text-center text-xs text-amber-200/40">
        © {new Date().getFullYear()} Brick Pizza Kuwait. All rights reserved.
      </p>
    </footer>
  );
}
