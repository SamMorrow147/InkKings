import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";

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
          <Image src="/PHimage.png" alt="John Carpenter" width={320} height={320} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} priority />
        </div>

        <h1 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 0.5rem" }}>
          John Carpenter
        </h1>
        <p style={{ fontSize: "0.75rem", fontWeight: 300, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", margin: "0 0 1.5rem" }}>
          Tattoo Artist &nbsp;·&nbsp; Ink Kings Tattoo
        </p>

        {/* Book button */}
        <div style={{ marginBottom: "2.5rem" }}>
          <style>{`.gold-btn-j{outline:0;border:0;background:transparent;position:relative;cursor:pointer;font-size:clamp(11px,1.5vw,14px);overflow:hidden;}.gold-btn-j span{position:relative;z-index:2;display:block;font-weight:bold;padding:.5em 1.4em;letter-spacing:.15em;font-family:"trajan-pro-3",serif;background:linear-gradient(295deg,#ffe5a2 5%,#bf841a 50%,#ffcd74 95%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}.gold-btn-j:before{content:"";position:absolute;inset:0;background:conic-gradient(transparent 0deg,rgba(143,168,255,0.2) 100deg,transparent 150deg,transparent 230deg,rgba(191,122,0,0.75) 250deg,rgba(242,187,90,0.9) 280deg,#ffe195 280deg,rgba(242,187,90,0.9) 300deg,rgba(191,122,0,0.75) 310deg,transparent 360deg);transform:scaleX(4) scaleY(2) rotate(0deg);transition:.5s transform;}.gold-btn-j:hover:before{transform:scaleX(4) scaleY(2) rotate(-360deg);}.gold-btn-j:after{content:"";position:absolute;inset:.05em;background-color:#000;}.gold-btn-j span:before{content:"";position:absolute;inset:0;background-image:linear-gradient(295deg,#ffe195 0%,rgba(242,187,90,0.8) 15%,rgba(191,122,0,0.75) 30%,transparent 95%);opacity:0;transition:opacity .5s ease;}.gold-btn-j:hover span:before{opacity:1;}.gold-btn-j:hover span{background:#fff;-webkit-background-clip:text;background-clip:text;}`}</style>
          <button className="gold-btn-j" type="button">
            <span>BOOK A SESSION</span>
          </button>
        </div>

        {/* Bio */}
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

      <section style={{ background: "#000", padding: "4rem 0 6rem", overflow: "hidden" }}>
        <p style={{ textAlign: "center", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "3rem" }}>
          Portfolio
        </p>
        <PortfolioSlideshow slides={slides} />
      </section>
    </main>
  );
}
