import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";

export const metadata: Metadata = {
  title: "Austin Jackels — Portfolio | Ink Kings Tattoo",
  description:
    "Portfolio of tattoo artist Austin Jackels at Ink Kings Tattoo in Otsego, MN. Specializing in realism and color pieces.",
};

const slides = [
  { image: "/portfolio/austin/austin-01.jpg", alt: "Tattoo by Austin Jackels" },
  { image: "/portfolio/austin/austin-02.jpg", alt: "Tattoo by Austin Jackels" },
  { image: "/portfolio/austin/austin-03.jpg", alt: "Tattoo by Austin Jackels" },
  { image: "/portfolio/austin/austin-04.jpg", alt: "Tattoo by Austin Jackels" },
  { image: "/portfolio/austin/austin-05.jpg", alt: "Tattoo by Austin Jackels" },
  { image: "/portfolio/austin/austin-06.jpg", alt: "Tattoo by Austin Jackels" },
  { image: "/portfolio/austin/austin-07.jpg", alt: "Tattoo by Austin Jackels" },
  { image: "/portfolio/austin/austin-08.jpg", alt: "Tattoo by Austin Jackels" },
  { image: "/portfolio/austin/austin-09.jpg", alt: "Tattoo by Austin Jackels" },
];

export default function AustinPortfolioPage() {
  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "#f5f5f5",
        fontFamily: '"trajan-pro-3", serif',
      }}
    >
      {/* Back nav */}
      <div className="px-6 py-6">
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          ← Back
        </Link>
      </div>

      <div className="flex flex-col">
        {/* About the artist */}
        <section
          className="order-2 md:order-1"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem 1.5rem 4rem",
            maxWidth: 760,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "clamp(220px, 50vw, 320px)",
              height: "clamp(220px, 50vw, 320px)",
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: "2rem",
              maskImage: "radial-gradient(circle, black 55%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 80%)",
              flexShrink: 0,
            }}
          >
            <Image
              src="/PHimage.png"
              alt="Austin Jackels"
              width={320}
              height={320}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              priority
            />
          </div>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              margin: "0 0 0.5rem",
            }}
          >
            Austin Jackels
          </h1>

          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 300,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              margin: "0 0 1.5rem",
            }}
          >
            Tattoo Artist &nbsp;·&nbsp; Ink Kings Tattoo
          </p>

          <div style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <span className="gold-btn" style={{ cursor: "default" }}>
              <span>BOOK A SESSION</span>
            </span>
            <a
              href="https://www.instagram.com/austinjtattoos/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Austin Jackels on Instagram"
              className="artist-social-link"
            >
              <img src="/instagram.svg" alt="" width={24} height={24} style={{ filter: "brightness(0) invert(1)", display: "block" }} />
            </a>
          </div>

          <p
            style={{
              fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 300,
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 660,
            }}
          >
            Realism specialist with a passion for color pieces. Austin started his apprenticeship
            with Steve De Los Reyes in 2018, working with traditional coil tattoo machines and
            focused on color blending, saturation, and technique. Originally from Minnesota, he
            knew from the age of 15 that he had a future in art — not behind a desk, but
            tattooing. He looks forward to growing into a versatile artist while continuing to
            specialize in color realism.
          </p>
        </section>

        {/* Portfolio slider */}
        <section
          className="order-1 md:order-2"
          style={{
            background: "#000",
            padding: "2rem 0 4rem",
            overflow: "hidden",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "3rem",
            }}
          >
            Portfolio
          </p>
          <PortfolioSlideshow slides={slides} />
        </section>
      </div>
    </main>
  );
}
