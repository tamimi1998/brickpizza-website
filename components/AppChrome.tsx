"use client";

import type { ReactNode } from "react";
import { PerformanceProvider } from "@/components/PerformanceProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { MobileFloatingCtas } from "@/components/MobileFloatingCtas";

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <PerformanceProvider>
      <SmoothScrollProvider>
        <SiteHeader />
        <div className="pb-28 md:pb-0">{children}</div>
        <MobileFloatingCtas />
      </SmoothScrollProvider>
    </PerformanceProvider>
  );
}
