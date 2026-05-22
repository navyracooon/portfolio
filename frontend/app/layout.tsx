import type { Metadata } from "next";
import { SiteFrame } from "@/components/SiteFrame";
import "./globals.css";

export const metadata: Metadata = {
  title: "Navy Racooon | Floating Portfolio",
  description:
    "Three.js floating island portfolio built with Next.js, TypeScript, React Three Fiber, drei, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
