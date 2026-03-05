import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortfolioBook from "@/components/PortfolioBook";

export const metadata: Metadata = {
  title: "Steve De Los Reyes — Portfolio | Ink Kings Tattoo",
  description:
    "Portfolio of award-winning tattoo artist Steve De Los Reyes, owner of Ink Kings Tattoo in Otsego, MN. Specializing in realism, portraits, and wildlife.",
};

const slides = [
  { image: "/portfolio/steve-01.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-02.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-03.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-04.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-05.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-06.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-07.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-08.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-09.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-10.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-11.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-12.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-13.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-14.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-15.jpg", alt: "Tattoo by Steve De Los Reyes" },
  { image: "/portfolio/steve-16.jpg", alt: "Tattoo by Steve De Los Reyes" },
];

export default function StevePortfolioPage() {
  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "#f5f5f5",
        fontFamily: '"trajan-pro-3", serif',
      }}
    >
      <div className="px-6 py-4 pr-20 flex items-center gap-6">
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
              src="/Steve.png"
              alt="Steve De Los Reyes"
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
            Steve De Los Reyes
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
            Award-Winning Tattoo Artist &nbsp;·&nbsp; Owner, Ink Kings Tattoo
          </p>

          <div style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "center" }}>
            <span className="maroon-btn" aria-label="Books currently closed">
              <span>BOOKS CURRENTLY CLOSED</span>
            </span>
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
            Award-winning artist and owner of Ink Kings Tattoo in Otsego, MN. With over 30 years as
            an artist and a degree in Technical Illustration from California State Fullerton, Steve
            brings expertise spanning oil painting, charcoal portraits, woodcarving, wood burning, and
            custom airbrushing on motorcycles and cars. He began tattooing in 2009, built and managed
            a studio for several years, then opened Ink Kings in March 2016.
            <br />
            <br />
            Steve is renowned for his artistic versatility — brilliant wildlife pieces, hyper-realistic
            portraits, and unbelievable cover-ups — in both color and black &amp; gray. His clientele
            includes loyal clients from across the country who travel to Ink Kings and follow Steve to
            conventions nationwide.
          </p>
        </section>

        {/* Portfolio slider */}
        <section
          className="order-1 md:order-2"
          style={{
            background: "#000",
            padding: "0 0 4rem",
            overflow: "hidden",
          }}
        >
          <PortfolioBook slides={slides} />
        </section>
      </div>
    </main>
  );
}
