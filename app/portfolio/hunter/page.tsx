import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";

export const metadata: Metadata = {
  title: "Hunter Hulley — Portfolio | Ink Kings Tattoo",
  description:
    "Portfolio of tattoo artist Hunter Hulley at Ink Kings Tattoo in Otsego, MN. Specializing in geometric and illustrative black and gray tattoos.",
};

const slides = [
  { image: "/portfolio/hunter/hunter-01.jpg", alt: "Tattoo by Hunter Hulley" },
  { image: "/portfolio/hunter/hunter-02.jpg", alt: "Tattoo by Hunter Hulley" },
  { image: "/portfolio/hunter/hunter-03.jpg", alt: "Tattoo by Hunter Hulley" },
  { image: "/portfolio/hunter/hunter-04.jpg", alt: "Tattoo by Hunter Hulley" },
  { image: "/portfolio/hunter/hunter-05.jpg", alt: "Tattoo by Hunter Hulley" },
  { image: "/portfolio/hunter/hunter-06.jpg", alt: "Tattoo by Hunter Hulley" },
  { image: "/portfolio/hunter/hunter-07.jpg", alt: "Tattoo by Hunter Hulley" },
  { image: "/portfolio/hunter/hunter-08.jpg", alt: "Tattoo by Hunter Hulley" },
  { image: "/portfolio/hunter/hunter-09.jpg", alt: "Tattoo by Hunter Hulley" },
  { image: "/portfolio/hunter/hunter-10.jpg", alt: "Tattoo by Hunter Hulley" },
];

const specialties = [
  "Geometric / Mandala",
  "Flowers",
  "Animals",
  "Lady Faces",
  "Fairies",
  "Mermaids",
  "Catdalas",
  "Disney characters (regular, trippy, gothic)",
  "Anime (Naruto, Death Note)",
];

export default function HunterPortfolioPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", color: "#f5f5f5", fontFamily: '"trajan-pro-3", serif' }}>
      <div className="px-6 py-6">
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

      <section style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "2rem 1.5rem 4rem", maxWidth: 760, margin: "0 auto" }}>
        {/* Portrait */}
        <div style={{ width: "clamp(220px,50vw,320px)", height: "clamp(220px,50vw,320px)", borderRadius: "50%", overflow: "hidden", marginBottom: "2rem", maskImage: "radial-gradient(circle, black 55%, transparent 80%)", WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 80%)", flexShrink: 0 }}>
          <Image src="/Hunter.png" alt="Hunter Hulley" width={320} height={320} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} priority />
        </div>

        <h1 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 0.5rem" }}>
          Hunter Hulley
        </h1>
        <p style={{ fontSize: "0.75rem", fontWeight: 300, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 1.5rem" }}>
          Tattoo Artist &nbsp;·&nbsp; Ink Kings Tattoo
        </p>

        {/* Book button */}
        <div style={{ marginBottom: "2.5rem" }}>
          <style>{`.gold-btn-h{outline:0;border:0;background:transparent;position:relative;cursor:pointer;font-size:clamp(11px,1.5vw,14px);overflow:hidden;}.gold-btn-h span{position:relative;z-index:2;display:block;font-weight:bold;padding:.5em 1.4em;letter-spacing:.15em;font-family:"trajan-pro-3",serif;background:linear-gradient(295deg,#ffe5a2 5%,#bf841a 50%,#ffcd74 95%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}.gold-btn-h:before{content:"";position:absolute;inset:0;background:conic-gradient(transparent 0deg,rgba(143,168,255,0.2) 100deg,transparent 150deg,transparent 230deg,rgba(191,122,0,0.75) 250deg,rgba(242,187,90,0.9) 280deg,#ffe195 280deg,rgba(242,187,90,0.9) 300deg,rgba(191,122,0,0.75) 310deg,transparent 360deg);transform:scaleX(4) scaleY(2) rotate(0deg);transition:.5s transform;}.gold-btn-h:hover:before{transform:scaleX(4) scaleY(2) rotate(-360deg);}.gold-btn-h:after{content:"";position:absolute;inset:.05em;background-color:#000;}.gold-btn-h span:before{content:"";position:absolute;inset:0;background-image:linear-gradient(295deg,#ffe195 0%,rgba(242,187,90,0.8) 15%,rgba(191,122,0,0.75) 30%,transparent 95%);opacity:0;transition:opacity .5s ease;}.gold-btn-h:hover span:before{opacity:1;}.gold-btn-h:hover span{background:#fff;-webkit-background-clip:text;background-clip:text;}`}</style>
          <button className="gold-btn-h" type="button">
            <span>BOOK A SESSION</span>
          </button>
        </div>

        {/* Bio */}
        <p style={{ fontFamily: '"myriad-pro","Helvetica Neue",Arial,sans-serif', fontWeight: 300, fontSize: "clamp(0.9rem,2vw,1.05rem)", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", maxWidth: 660, marginBottom: "2rem" }}>
          Hunter has been at Ink Kings for 5 years. He specializes in geometric and illustrative
          black and gray tattoos. Some of his favorite subjects include mandalas, flowers, animals,
          and portraits. He attended Watertown-Mayer High School and graduated from University of
          Wisconsin La-Crosse with a bachelor&apos;s degree in Fine Arts. In his free time he enjoys
          going to Timberwolves games, riding his electric scooter, and watching movies.
          <br /><br />
          Before inquiring, please make sure you are familiar with the style of his work! When
          sending in your submission you are agreeing to give Hunter creative freedom with your ideas.
          Hunter usually offers options for different routes to take with your final design.
        </p>

        {/* Specialties */}
        <div style={{ textAlign: "left", maxWidth: 560, width: "100%" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>
            Currently Accepting (Black &amp; Gray Only)
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

      <section style={{ background: "#000", padding: "4rem 0 6rem", overflow: "hidden" }}>
        <p style={{ textAlign: "center", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "3rem" }}>
          Portfolio
        </p>
        <PortfolioSlideshow slides={slides} />
      </section>
    </main>
  );
}
