import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortfolioBook from "@/components/PortfolioBook";

export const metadata: Metadata = {
  title: "Breaelle — Portfolio | Ink Kings Tattoo",
  description:
    "Portfolio of tattoo artist Breaelle at Ink Kings Tattoo in Otsego, MN.",
};

// Placeholder slides until portfolio images are added (add images to public/portfolio/breaelle/ and update)
const slides = [
  { image: "/Breaelle.png", alt: "Breaelle" },
  { image: "/Breaelle.png", alt: "Breaelle" },
];

export default function BreaellePortfolioPage() {
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
      </div>

      <div className="flex flex-col">
        {/* About the artist */}
        <section className="order-2 md:order-1" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem 1.5rem 4rem", maxWidth: 760, margin: "0 auto", width: "100%" }}>
          <div style={{ width: "clamp(220px,50vw,320px)", height: "clamp(220px,50vw,320px)", borderRadius: "50%", overflow: "hidden", marginBottom: "2rem", maskImage: "radial-gradient(circle, black 55%, transparent 80%)", WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 80%)", flexShrink: 0 }}>
            <Image src="/Breaelle.png" alt="Breaelle" width={320} height={320} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} priority />
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 0.5rem" }}>
            Breaelle
          </h1>
          <p style={{ fontSize: "0.75rem", fontWeight: 300, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 1.5rem" }}>
            Tattoo Artist &nbsp;·&nbsp; Ink Kings Tattoo
          </p>

          <div style={{ marginBottom: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <a href="/request" className="gold-btn">
              <span>BOOK A SESSION</span>
            </a>
          </div>

          <p style={{ fontFamily: '"myriad-pro","Helvetica Neue",Arial,sans-serif', fontWeight: 300, fontSize: "clamp(0.9rem,2vw,1.05rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 660 }}>
            About Breaelle — placeholder. Add bio and details here.
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
