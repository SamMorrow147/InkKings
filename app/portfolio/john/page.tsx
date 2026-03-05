import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortfolioBook from "@/components/PortfolioBook";

export const metadata: Metadata = {
  title: "John Carpenter — Portfolio | Ink Kings Tattoo",
  description:
    "Portfolio of tattoo artist John Carpenter at Ink Kings Tattoo in Otsego, MN. Specializing in black and grey realism and color realism.",
};

const slides = [
  { image: "/portfolio/john/john-01.jpg", alt: "Tattoo by John Carpenter" },
  { image: "/portfolio/john/john-02.jpg", alt: "Tattoo by John Carpenter" },
  { image: "/portfolio/john/john-03.jpg", alt: "Tattoo by John Carpenter" },
  { image: "/portfolio/john/john-04.jpg", alt: "Tattoo by John Carpenter" },
  { image: "/portfolio/john/john-05.jpg", alt: "Tattoo by John Carpenter" },
  { image: "/portfolio/john/john-06.jpg", alt: "Tattoo by John Carpenter" },
  { image: "/portfolio/john/john-07.jpg", alt: "Tattoo by John Carpenter" },
  { image: "/portfolio/john/john-08.jpg", alt: "Tattoo by John Carpenter" },
  { image: "/portfolio/john/john-09.jpg", alt: "Tattoo by John Carpenter" },
];

export default function JohnPortfolioPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "#f5f5f5", fontFamily: '"trajan-pro-3", serif' }}>
      <div className="px-6 py-4 pr-20 flex items-center gap-6">
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
          }}
        >
          ← Back
        </Link>
        <span style={{ fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          Portfolio
        </span>
      </div>

      <div className="flex flex-col">
        {/* About the artist */}
        <section className="order-2 md:order-1" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem 1.5rem 4rem", maxWidth: 760, margin: "0 auto", width: "100%" }}>
          <div style={{ width: "clamp(220px,50vw,320px)", height: "clamp(220px,50vw,320px)", borderRadius: "50%", overflow: "hidden", marginBottom: "2rem", maskImage: "radial-gradient(circle, black 55%, transparent 80%)", WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 80%)", flexShrink: 0 }}>
            <Image src="/John.png" alt="John Carpenter" width={320} height={320} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} priority />
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 0.5rem" }}>
            John Carpenter
          </h1>
          <p style={{ fontSize: "0.75rem", fontWeight: 300, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 1.5rem" }}>
            Tattoo Artist &nbsp;·&nbsp; Ink Kings Tattoo
          </p>

          <div style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <a href="/contact" className="gold-btn">
              <span>BOOK A SESSION</span>
            </a>
            <a
              href="https://www.instagram.com/johncarpenter1/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="John Carpenter on Instagram"
              className="artist-social-link"
            >
              <img src="/instagram.svg" alt="" width={24} height={24} style={{ filter: "brightness(0) invert(1)", display: "block" }} />
            </a>
          </div>

          <p style={{ fontFamily: '"myriad-pro","Helvetica Neue",Arial,sans-serif', fontWeight: 300, fontSize: "clamp(0.9rem,2vw,1.05rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 660, marginBottom: "1.5rem" }}>
            Hello, I&apos;m John. As a child, I did some stuff. As a young adult, I continued to do
            stuff and added things to the list. I&apos;ve had the pleasure of periodically falling down
            stairs, climbing stairs, climbing trees, falling out of trees. One might say that
            tattooing would be a perfect fit!
            <br /><br />
            So, since touring with a boy band is not in the cards, I&apos;ve decided to continue the
            pursuit of tattooing. I look forward to working with clients in Black and Grey realism as
            well as Color realism tattoos. Just keep your stairs to yourself.
          </p>
        </section>

        {/* Portfolio slider */}
        <section className="order-1 md:order-2" style={{ background: "#000", padding: "0 0 4rem", overflow: "hidden" }}>
          <PortfolioBook slides={slides} />
        </section>
      </div>
    </main>
  );
}
