import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortfolioBook from "@/components/PortfolioBook";
import SpinningCrown from "@/components/SpinningCrown";

export const metadata: Metadata = {
  title: "Breaella De Los Reyes — Portfolio | Ink Kings Tattoo",
  description:
    "Portfolio of apprentice tattoo artist Breaella De Los Reyes at Ink Kings Tattoo in Otsego, MN. Specializing in small, detailed, meaningful tattoos.",
};

const slides = [
  { image: "/portfolio/Breaella/IMG_0206.JPG", alt: "Tattoo by Breaella De Los Reyes" },
  { image: "/portfolio/Breaella/IMG_0207.JPEG", alt: "Tattoo by Breaella De Los Reyes" },
  { image: "/portfolio/Breaella/IMG_0208.JPEG", alt: "Tattoo by Breaella De Los Reyes" },
  { image: "/portfolio/Breaella/IMG_0209.JPEG", alt: "Tattoo by Breaella De Los Reyes" },
  { image: "/portfolio/Breaella/IMG_0211.JPG", alt: "Tattoo by Breaella De Los Reyes" },
  { image: "/portfolio/Breaella/IMG_0212.JPG", alt: "Tattoo by Breaella De Los Reyes" },
  { image: "/portfolio/Breaella/IMG_0213.JPEG", alt: "Tattoo by Breaella De Los Reyes" },
  { image: "/portfolio/Breaella/IMG_0210.JPEG", alt: "Tattoo by Breaella De Los Reyes" },
];

export default function BreaellaPortfolioPage() {
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
              position: "relative",
              width: "clamp(340px, 78vw, 520px)",
              height: "clamp(340px, 78vw, 520px)",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <SpinningCrown />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "clamp(220px, 50vw, 320px)",
                height: "clamp(220px, 50vw, 320px)",
                borderRadius: "50%",
                overflow: "hidden",
                maskImage: "radial-gradient(circle, black 55%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 80%)",
              }}
            >
              <Image
                src="/Breaella.PNG"
                alt="Breaella De Los Reyes"
                width={320}
                height={320}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                priority
              />
            </div>
          </div>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              margin: "0 0 0.5rem",
            }}
          >
            Breaella De Los Reyes
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
            Apprentice Tattoo Artist &nbsp;·&nbsp; Ink Kings Tattoo
          </p>

          <div style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <a href="/request" className="gold-btn">
              <span>BOOK A SESSION</span>
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
            Breaella De Los Reyes is a dedicated tattoo artist and apprentice under her father,
            Steve De Los Reyes. With 5 years of experience at Ink Kings and 1.5 years into her
            apprenticeship, she has developed a strong foundation in the craft while continuing to
            refine her skills every day.
            <br />
            <br />
            Breaella specializes in small, detailed pieces, focusing on clean, tattooable designs
            that hold meaning for each client. She values connection and strives to create a
            comfortable, welcoming experience for everyone she works with.
            <br />
            <br />
            Passionate about growth, artistry, and people, Breaella is committed to evolving her
            style while bringing her clients&rsquo; ideas to life with precision and care.
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
          <PortfolioBook slides={slides} title="Breaella's Portfolio" />
        </section>
      </div>
    </main>
  );
}
