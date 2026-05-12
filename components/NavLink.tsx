"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useLenisScroll } from "@/hooks/useLenisScroll";

type NavLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export function NavLink({ href, children, onClick, ...rest }: NavLinkProps) {
  const { scrollToHash } = useLenisScroll();

  return (
    <a
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (!href.startsWith("#")) return;
        e.preventDefault();
        scrollToHash(href, -72);
      }}
    >
      {children}
    </a>
  );
}
