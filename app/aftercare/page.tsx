import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tattoo Aftercare | Ink Kings Tattoo",
  description:
    "Aftercare instructions for your new tattoo from Ink Kings Tattoo in Otsego, MN. Follow these steps to ensure proper healing and vibrant results.",
};

const steps = [
  {
    number: "01",
    title: "Leave the Bandage On",
    body: "Keep the bandage or wrap your artist applied for at least 2–4 hours, or as directed. This protects the fresh tattoo from bacteria and contaminants.",
  },
  {
    number: "02",
    title: "Wash Gently",
    body: "After removing the bandage, wash the tattoo with clean hands using a fragrance-free, mild soap. Use lukewarm water and a light touch — no scrubbing. Pat dry with a clean paper towel.",
  },
  {
    number: "03",
    title: "Moisturize",
    body: "Apply a thin layer of unscented lotion or a tattoo-specific aftercare product 2–3 times per day. Less is more — a thin layer is all you need. Avoid petroleum-based products.",
  },
  {
    number: "04",
    title: "Let It Breathe",
    body: "Do not re-wrap the tattoo unless instructed by your artist. Allow air circulation to help the skin heal naturally.",
  },
  {
    number: "05",
    title: "Do Not Pick or Scratch",
    body: "Peeling and itching are normal parts of healing. Do not pick, scratch, or peel the skin. Doing so can pull out ink and cause scarring or fading.",
  },
  {
    number: "06",
    title: "Avoid Sun & Water",
    body: "Keep your new tattoo out of direct sunlight, tanning beds, pools, hot tubs, lakes, and the ocean until fully healed — typically 2–4 weeks. Sun exposure is the fastest way to fade a tattoo.",
  },
  {
    number: "07",
    title: "No Soaking",
    body: "Showers are fine, but avoid submerging the tattoo. Long baths or soaking will draw ink out and interfere with healing.",
  },
  {
    number: "08",
    title: "Wear Loose Clothing",
    body: "Tight clothing rubbing against a fresh tattoo can cause irritation and ink loss. Wear loose, breathable fabric over the area during the first week.",
  },
];

const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.35)",
};

export default function AftercarePage() {
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

      {/* Header */}
      <section
        style={{
          textAlign: "center",
          padding: "1rem 1.5rem 3.5rem",
          maxWidth: 760,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>Ink Kings Tattoo</p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            margin: "0 0 1.5rem",
          }}
        >
          Tattoo Aftercare
        </h1>
        <p
          style={{
            fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.65)",
            maxWidth: 580,
            margin: "0 auto",
          }}
        >
          Proper aftercare is essential to preserving the quality of your tattoo.
          Follow these steps to ensure clean healing and long-lasting, vibrant results.
          When in doubt, reach out to your artist.
        </p>
      </section>

      {/* Steps */}
      <section
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
          width: "100%",
        }}
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            style={{
              display: "flex",
              gap: "1.5rem",
              padding: "2rem 0",
              borderTop: i === 0 ? "1px solid rgba(191,132,26,0.2)" : undefined,
              borderBottom: "1px solid rgba(191,132,26,0.2)",
            }}
          >
            {/* Number */}
            <div
              style={{
                fontFamily: '"trajan-pro-3", serif',
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                fontWeight: 600,
                color: "rgba(191,132,26,0.35)",
                lineHeight: 1,
                flexShrink: 0,
                paddingTop: "0.1em",
                minWidth: "2.5rem",
              }}
            >
              {step.number}
            </div>

            {/* Content */}
            <div>
              <h2
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  margin: "0 0 0.6rem",
                  textTransform: "uppercase",
                }}
              >
                {step.title}
              </h2>
              <p
                style={{
                  fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 300,
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </div>
          </div>
        ))}

        {/* Footer note */}
        <p
          style={{
            fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
            fontSize: "0.85rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            marginTop: "3rem",
            letterSpacing: "0.05em",
          }}
        >
          Questions about your healing tattoo? Contact us and we&apos;ll get back to you as soon as possible.
        </p>
      </section>

      {/* Recommended Products */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#f5f5f5",
            textAlign: "center",
            margin: "0 0 2.5rem",
          }}
        >
          Recommended Products
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                border: "1px solid rgba(191,132,26,0.2)",
                borderRadius: 4,
                aspectRatio: "3 / 4",
                background: "rgba(255,255,255,0.02)",
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
