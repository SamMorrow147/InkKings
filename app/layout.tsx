import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inkKingstattoo.com";
const thumbnail = `${siteUrl}/Thumbnail.png`;

export const metadata: Metadata = {
  title: "Ink Kings Tattoo",
  description:
    "Award-winning tattoo studio in Central Minnesota. Specializing in large-scale realism, portraits, and wildlife. Voted Best Tattoo Parlor 2020, 2021 & 2022.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Ink Kings Tattoo",
    description:
      "Award-winning tattoo studio in Central Minnesota. Specializing in large-scale realism, portraits, and wildlife.",
    url: siteUrl,
    siteName: "Ink Kings Tattoo",
    images: [
      {
        url: thumbnail,
        width: 1200,
        height: 630,
        alt: "Ink Kings Tattoo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ink Kings Tattoo",
    description:
      "Award-winning tattoo studio in Central Minnesota. Specializing in large-scale realism, portraits, and wildlife.",
    images: [thumbnail],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
