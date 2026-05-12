"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  MENU_TABS,
  getItemsForCategory,
  type MenuCategoryId,
  BEST_SELLER_ITEMS,
} from "@/lib/menu-data";
import { MenuCard } from "@/components/menu/MenuCard";

const SECTION_LABELS: Record<
  MenuCategoryId,
  { title: string; eyebrow: string; anchor: string }
> = {
  detroit: {
    anchor: "menu-detroit",
    eyebrow: "Featured / Detroit-style",
    title: "Detroit pizza",
  },
  ny: {
    anchor: "menu-ny",
    eyebrow: "48-hour dough",
    title: "New York pizza",
  },
  sauces: {
    anchor: "menu-sauces",
    eyebrow: "Dips & heat",
    title: "Sauces",
  },
  dessert: {
    anchor: "menu-dessert",
    eyebrow: "Sweet finish",
    title: "Dessert",
  },
  drinks: {
    anchor: "menu-drinks",
    eyebrow: "Sip cold",
    title: "Drinks",
  },
};

export function MenuExperience() {
  const [active, setActive] = useState<MenuCategoryId>("detroit");
  const sectionRefs = useRef<Record<MenuCategoryId, HTMLElement | null>>({
    detroit: null,
    ny: null,
    sauces: null,
    dessert: null,
    drinks: null,
  });

  const scrollToId = useCallback((id: MenuCategoryId) => {
    const el = sectionRefs.current[id];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.getAttribute("data-menu-section") as MenuCategoryId | null;
          if (id) setActive(id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0 },
    );

    for (const t of MENU_TABS) {
      const el = sectionRefs.current[t.id];
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <div id="menu" className="scroll-mt-4">
      <section className="border-b border-white/10 bg-[#0c0604] px-4 py-14 sm:px-6 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 md:mb-14"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300/80">Featured menu</p>
            <h2 className="mt-3 font-[family-name:var(--font-hero-display)] text-4xl font-bold text-white md:text-6xl">
              Fire-forged favorites
            </h2>
            <p className="mt-4 max-w-xl text-amber-100/70">
              Dine in, pickup, or delivery. Detroit-style & New York-style pies, house sauces, dessert, and drinks—all
              priced in KD.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/50">Guest favorites</p>
            <div className="scrollbar-thin flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:snap-none md:grid-cols-2 lg:grid-cols-4">
              {BEST_SELLER_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="min-w-[85vw] snap-center sm:min-w-[320px] md:min-w-0"
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="sticky top-0 z-30 -mx-4 mb-10 border-y border-white/10 bg-[#0a0503]/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:static md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
            <nav
              className="flex gap-1 overflow-x-auto pb-1 md:flex-wrap"
              aria-label="Menu categories"
            >
              {MENU_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setActive(t.id);
                    scrollToId(t.id);
                  }}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all md:text-sm ${
                    active === t.id
                      ? "bg-gradient-to-r from-amber-500/90 to-orange-600/90 text-[#1a0a04] shadow-[0_0_24px_rgba(255,140,66,0.35)]"
                      : "border border-white/15 bg-white/[0.04] text-amber-100/75 hover:border-amber-400/35 hover:text-white"
                  }`}
                >
                  {t.shortLabel}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-24 md:space-y-28">
            {MENU_TABS.map((t) => {
              const meta = SECTION_LABELS[t.id];
              const items = getItemsForCategory(t.id);
              return (
                <section
                  key={t.id}
                  id={meta.anchor}
                  data-menu-section={t.id}
                  ref={(el) => {
                    sectionRefs.current[t.id] = el;
                  }}
                  className="scroll-mt-28 md:scroll-mt-36"
                >
                  <div className="mb-8 flex flex-col gap-2 border-l-2 border-orange-500/60 pl-5 md:mb-10">
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/75">
                      {meta.eyebrow}
                    </span>
                    <h3 className="font-[family-name:var(--font-hero-display)] text-3xl text-white md:text-4xl">
                      {meta.title}
                    </h3>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                    {items.map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
