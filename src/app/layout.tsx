import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { PageContactFloat } from "@/components/layout/PageContactFloat";
import { EstimatorPromoFloat } from "@/components/layout/EstimatorPromoFloat";
import { TawkWidget } from "@/components/layout/TawkWidget";
import { Providers } from "@/components/layout/Providers";
import { getResolvedSiteMedia } from "@/lib/siteImages";
import { getResolvedSiteCopy } from "@/lib/siteCopy";
import { SOCIAL_IMAGE } from "@/lib/socialMetadata";

const cinzel = localFont({
  src: [
    { path: "../fonts/Cinzel-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Cinzel-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Cinzel-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-cinzel",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://tamayenterprises.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Construction Company in West Haven, CT | Tamay Enterprises",
    template: "%s | Tamay Enterprises",
  },
  description:
    "Tamay Enterprises is a West Haven, CT–based multi-service company providing construction, real estate, and logistics services.",
  referrer: "strict-origin-when-cross-origin",
  // Fallback only for pages without dedicated social metadata.
  // The seven mapped public pages override this via buildSocialMetadata().
  openGraph: {
    type: "website",
    images: [
      {
        url: SOCIAL_IMAGE.home,
        width: 1536,
        height: 807,
        alt: "Tamay Enterprises",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [SOCIAL_IMAGE.home],
  },
};

export const viewport: Viewport = {
  themeColor: "#35558f",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [media, copy] = await Promise.all([getResolvedSiteMedia(), getResolvedSiteCopy()]);

  return (
    <html lang="en-US" className={`${cinzel.variable} ${sourceSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased text-base" suppressHydrationWarning>
        <Providers media={media} copy={copy}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CookieBanner />
          <PageContactFloat />
          <EstimatorPromoFloat />
          <TawkWidget />
        </Providers>
      </body>
    </html>
  );
}
