import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortfolioBook from "@/components/PortfolioBook";

export const metadata: Metadata = {
  title: "Nick Gagnon — Portfolio | Ink Kings Tattoo",
  description:
    "Portfolio of tattoo artist Nick Gagnon at Ink Kings Tattoo in Otsego, MN. Specializing in black and grey realism, surrealism, dark art, and wildlife.",
};

const slides = [
  { image: "/portfolio/nick/nick-01.jpg", alt: "Tattoo by Nick Gagnon" },
  { image: "/portfolio/nick/nick-02.jpg", alt: "Tattoo by Nick Gagnon" },
  { image: "/portfolio/nick/nick-03.jpg", alt: "Tattoo by Nick Gagnon" },
  { image: "/portfolio/nick/nick-04.jpg", alt: "Tattoo by Nick Gagnon" },
  { image: "/portfolio/nick/nick-05.jpg", alt: "Tattoo by Nick Gagnon" },
  { image: "/portfolio/nick/nick-06.jpg", alt: "Tattoo by Nick Gagnon" },
  { image: "/portfolio/nick/nick-07.jpg", alt: "Tattoo by Nick Gagnon" },
  { image: "/portfolio/nick/nick-08.jpg", alt: "Tattoo by Nick Gagnon" },
  { image: "/portfolio/nick/nick-09.jpg", alt: "Tattoo by Nick Gagnon" },
];

const specialties = [
  "Horror portraits",
  "Portraits — movies, music, celebrities, athletes",
  "Pet portraits",
  "Family portraits",
  "Wildlife & nature",
  "Blackwork / Blackouts",
  "Geometric / Mandalas (large scale)",
  "Music & instrument imagery",
  "Cars / automotive / motorsport",
  "Surrealist art",
  "Eyes",
  "Skulls",
  "Space / Sci-fi",
  "Aliens",
  "Video Games",
];

export default function NickPortfolioPage() {
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
            <Image src="/Nick.png" alt="Nick Gagnon" width={320} height={320} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} priority />
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 0.5rem" }}>
            Nick Gagnon
          </h1>
          <p style={{ fontSize: "0.75rem", fontWeight: 300, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 1.5rem" }}>
            Tattoo Artist &nbsp;·&nbsp; Ink Kings Tattoo
          </p>

          <div style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <a href="/contact" className="gold-btn">
              <span>BOOK A SESSION</span>
            </a>
            <a
              href="https://www.instagram.com/nick_tattoos/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nick Gagnon on Instagram"
              className="artist-social-link"
            >
              <img src="/instagram.svg" alt="" width={24} height={24} style={{ filter: "brightness(0) invert(1)", display: "block" }} />
            </a>
          </div>

          <p style={{ fontFamily: '"myriad-pro","Helvetica Neue",Arial,sans-serif', fontWeight: 300, fontSize: "clamp(0.9rem,2vw,1.05rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 660, marginBottom: "2rem" }}>
            Nick is a born and raised Minnesotan. He began tattooing in 2011 and spent 5 years
            tattooing around Minnesota before making his way to the Carolinas to focus on his art and
            work alongside other artists. He has since returned to Minnesota and is taking on new and
            challenging projects.
            <br /><br />
            Nick&apos;s primary focus is capturing realistic black and grey imagery in the skin. He
            occasionally creates color pieces as well. Nick is a fan of surrealism, dark art, horror,
            wildlife, human portraiture, geometric and blackwork pieces.
            <br /><br />
            I appreciate all of you for your continued support and creativity. I look forward to
            hearing your ideas and seeing what we can accomplish together. &nbsp;Much love! —Nick
          </p>

          <div style={{ textAlign: "left", maxWidth: 560, width: "100%" }}>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>
              Currently Accepting
            </p>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0 }}>
              {specialties.map((s) => (
                <li key={s} style={{ fontSize: "0.75rem", letterSpacing: "0.1em", padding: "0.3em 0.8em", border: "1px solid rgba(191,132,26,0.3)", color: "rgba(255,255,255,0.6)" }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Portfolio slider */}
        <section className="order-1 md:order-2" style={{ background: "#000", padding: "0 0 4rem", overflow: "hidden" }}>
          <PortfolioBook slides={slides} />
        </section>
      </div>
    </main>
  );
}
