"use client";

import { Share2, Mail } from "lucide-react";
import { BRICK_SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050201] px-4 py-16 sm:px-6 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-hero-display)] text-2xl font-bold tracking-tight text-white">
            Brick Pizza Kuwait
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-amber-100/55">
            Detroit-style & New York-style pizza in Salmiya. Open 3 PM – 12 AM · Closed Sundays. Dine in · Pickup ·
            Delivery.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 text-sm">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-orange-300/80">Explore</p>
            <ul className="mt-4 space-y-2 text-amber-100/60">
              <li>
                <a href="#menu" className="hover:text-white">
                  Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white">
                  Visit
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-orange-300/80">Connect</p>
            <ul className="mt-4 space-y-3 text-amber-100/60">
              <li className="flex items-center gap-2">
                <Share2 className="size-4 text-orange-400" strokeWidth={1.5} />
                <a
                  href={BRICK_SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {BRICK_SITE.instagramHandle}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-orange-400" strokeWidth={1.5} />
                <span className="text-amber-100/45">Add contact email when ready</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-14 max-w-6xl text-center text-xs text-amber-200/35">
        © {new Date().getFullYear()} Brick Pizza Kuwait. Best pizza in Kuwait · Detroit pizza Kuwait · Pizza Salmiya · New
        York pizza Kuwait.
      </p>
    </footer>
  );
}
