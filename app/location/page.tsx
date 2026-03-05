import type { Metadata } from "next";
import Link from "next/link";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";

export const metadata: Metadata = {
  title: "Our Location | Ink Kings Tattoo",
  description:
    "Visit Ink Kings Tattoo in Otsego, MN — award-winning tattoo studio specializing in large-scale realism, portraits, and wildlife. Established 2016.",
};

const BASE = "https://images.squarespace-cdn.com/content/v1/673e7786e9ad932f4caa86bf";

const slides = [
  { image: `${BASE}/1732147098417-RR8VJHELLANA78HFXBZR/Exterior2.jpg`,        alt: "Ink Kings Tattoo exterior" },
  { image: `${BASE}/1732147098453-48XIAOC09MQTD1X04AFE/shop7.jpg`,            alt: "Inside Ink Kings Tattoo" },
  { image: `${BASE}/1732147098440-MMHAN8TZ1BFSD8SZDUHW/shop9.jpg`,            alt: "Inside Ink Kings Tattoo" },
  { image: `${BASE}/1732147098446-3QELKQK7IELC96SE0XXV/shop8.jpg`,            alt: "Inside Ink Kings Tattoo" },
  { image: `${BASE}/1732147098434-DKUTG3JXX2W4Q32RG3MX/shop10.jpg`,           alt: "Inside Ink Kings Tattoo" },
  { image: `${BASE}/1732147098459-EH91ZO9CBJO8BGW62EMJ/20200303_130702.jpg`,  alt: "Ink Kings Tattoo shop" },
  { image: `${BASE}/1732147098405-SMZEKIGLS2GOYNNSYTZA/Interior2.jpg`,         alt: "Ink Kings Tattoo interior" },
  { image: `${BASE}/1732147098412-FYMTNGJQYAOV6QSMC8N1/Interior1.jpg`,         alt: "Ink Kings Tattoo interior" },
  { image: `${BASE}/1732147098428-1SB4LKU3YWN2DX0FRY3P/shop1.jpg`,            alt: "Ink Kings Tattoo shop floor" },
  { image: `${BASE}/1732147098423-P8CHFFT3GRHINWKRWZ6Z/Plaques.jpg`,          alt: "Ink Kings Tattoo award plaques" },
];

const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  marginBottom: "1rem",
  display: "block",
};

export default function LocationPage() {
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
          }}
        >
          ← Back
        </Link>
      </div>

      <div className="flex flex-col">

        {/* Header */}
        <section
          style={{
            textAlign: "center",
            padding: "1rem 1.5rem 3rem",
            maxWidth: 760,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>Otsego, Minnesota</p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "0.05em",
              margin: "0 0 1.5rem",
            }}
          >
            Ink Kings Tattoo
          </h1>
          <p
            style={{
              fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 300,
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.65)",
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            Ink Kings Tattoo has been serving Central Minnesota since 2016. Our shop is a
            welcoming, professional environment built for serious tattoo work — large-scale
            realism, detailed portraiture, and custom wildlife pieces. Whether you're a
            first-timer or a collector, our team of award-winning artists is here to bring
            your vision to life. Voted Best Tattoo Parlor four consecutive years running,
            we take pride in every piece that leaves our studio.
          </p>
        </section>

        {/* Photo slideshow */}
        <section
          style={{
            background: "#000",
            padding: "1rem 0 4rem",
            overflow: "hidden",
          }}
        >
          <p style={{ textAlign: "center", ...labelStyle, marginBottom: "3rem" }}>
            The Shop
          </p>
          <PortfolioSlideshow slides={slides} />
        </section>

        {/* Google Maps placeholder */}
        <section
          style={{
            padding: "0 1.5rem 6rem",
            maxWidth: 900,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <p style={{ textAlign: "center", ...labelStyle, marginBottom: "2rem" }}>
            Find Us
          </p>

          {/* Address */}
          <p
            style={{
              textAlign: "center",
              fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 300,
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.55)",
              marginBottom: "2rem",
            }}
          >
            8564 Parell Ave NE &nbsp;·&nbsp; Otsego, MN 55330
          </p>

          {/* Map placeholder */}
          <div
            style={{
              width: "100%",
              height: "clamp(280px, 40vw, 420px)",
              borderRadius: 4,
              border: "1px solid rgba(191,132,26,0.2)",
              background: "rgba(255,255,255,0.03)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.4 }}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span
              style={{
                fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Google Maps — Coming Soon
            </span>
          </div>
        </section>

      </div>
    </main>
  );
}
