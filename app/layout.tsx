import type { Metadata } from "next";
import HamburgerMenu from "@/components/HamburgerMenu";
import "./globals.css";

// Priority order for the site URL:
//  1. NEXT_PUBLIC_SITE_URL  — set this once your custom domain is live
//  2. VERCEL_URL            — auto-injected by Vercel on every deploy (covers the interim)
//  3. Hardcoded fallback    — used only in local dev
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    ?? "https://ink-kings.vercel.app"
).replace(/\/$/, "");

const ogImage = `${siteUrl}/Tattoo.png`;

const sharedTitle       = "Ink Kings Tattoo";
const sharedDescription = "Award-winning tattoo studio in Otsego, Minnesota. Specializing in large-scale realism, portraits, and wildlife. Voted Best Tattoo Parlor 2020, 2021 & 2022.";

export const metadata: Metadata = {
  // ── Basic ────────────────────────────────────────────────────────────────
  title: {
    default:  sharedTitle,
    template: "%s | Ink Kings Tattoo",
  },
  description: sharedDescription,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },

  // ── Open Graph (Facebook, iMessage, WhatsApp, LinkedIn, Slack, Discord) ─
  openGraph: {
    title:       sharedTitle,
    description: sharedDescription,
    url:         siteUrl,
    siteName:    "Ink Kings Tattoo",
    locale:      "en_US",
    type:        "website",
    images: [
      {
        url:       "/Tattoo.png",   // relative — metadataBase makes this absolute
        secureUrl: ogImage,          // explicit https: copy for strict parsers
        width:     1290,
        height:    1682,
        type:      "image/png",
        alt:       "Ink Kings Tattoo — Award-winning tattoo studio in Otsego, MN",
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    title:       sharedTitle,
    description: sharedDescription,
    images:      [ogImage],
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true },
  },

  // ── Extra platform coverage ──────────────────────────────────────────────
  // `other` emits <meta name="key" content="value"> for platforms that don't
  // use og: or twitter: tags (Windows tiles, some legacy scrapers, etc.)
  other: {
    "msapplication-TileImage": ogImage,
    thumbnail:                 ogImage,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        Extra <head> elements that can't be expressed via the Next.js
        Metadata API — kept minimal to avoid conflicts with auto-generated tags.
        `image_src` is read by some older crawlers and iMessage link previews.
      */}
      <head>
        <link rel="image_src" href={ogImage} />
      </head>
      <body>
        <HamburgerMenu>{children}</HamburgerMenu>
      </body>
    </html>
  );
}
