import type { Metadata, Viewport } from "next";
import { Cinzel, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { HiringBanner } from "@/components/layout/HiringBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { EstimateWidget } from "@/components/layout/EstimateWidget";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { IMAGES as IMG } from "@/lib/images";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_PATH
    ? `https://astridbonoan.github.io${process.env.NEXT_PUBLIC_BASE_PATH}`
    : "https://tamayenterprises.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Construction Company in West Haven, CT | Tamay Enterprises",
    template: "%s | Tamay Enterprises",
  },
  description:
    "Tamay Enterprises is a West Haven, CT–based multi-service company providing construction, real estate, and logistics services.",
  openGraph: {
    images: [IMG.og],
  },
};

export const viewport: Viewport = {
  themeColor: "#35558f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${cinzel.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen flex flex-col antialiased text-base">
        <div className="relative">
          <HiringBanner />
          <SiteHeader />
        </div>
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <EstimateWidget />
        <CookieBanner />
      </body>
    </html>
  );
}
