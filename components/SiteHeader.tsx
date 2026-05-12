"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV } from "@/lib/site";
import { NavLink } from "@/components/NavLink";

const LINKS = [
  { href: NAV.home, label: "Home" },
  { href: NAV.menu, label: "Menu" },
  { href: NAV.detroit, label: "Detroit Pizza" },
  { href: NAV.ny, label: "NY Pizza" },
  { href: NAV.sauces, label: "Sauces" },
  { href: NAV.gallery, label: "Gallery" },
  { href: NAV.about, label: "About" },
  { href: NAV.visit, label: "Visit Us" },
] as const;

const linkClass =
  "text-sm font-medium text-amber-100/80 transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,160,90,0.45)]";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#070302]/85 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-black/55 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 md:h-16 md:px-8">
        <NavLink
          href={NAV.home}
          className={`font-[family-name:var(--font-hero-display)] text-xl tracking-tight text-white transition-transform duration-300 hover:scale-[1.02] md:text-2xl ${
            scrolled ? "drop-shadow-none" : "drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
          }`}
        >
          Brick Pizza
        </NavLink>

        <nav className="hidden items-center gap-1 lg:gap-2" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} className={`rounded-lg px-2.5 py-2 ${linkClass}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg border border-white/15 bg-white/[0.06] p-2 text-amber-100 backdrop-blur-md transition-all hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(255,120,60,0.25)] lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#070302]/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex max-h-[min(70vh,calc(100dvh-3.5rem))] flex-col gap-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    href={l.href}
                    className="block rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base font-medium text-amber-50 transition-all hover:border-amber-400/35 hover:shadow-[inset_0_0_24px_rgba(255,100,40,0.08)]"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
