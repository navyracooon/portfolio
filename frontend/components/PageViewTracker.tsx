"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { recordPageView } from "@/lib/interactions";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    void recordPageView(pathname).catch(() => undefined);
  }, [pathname]);

  return null;
}
