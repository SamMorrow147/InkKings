import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Ink Kings Tattoo",
  description:
    "Get in touch with Ink Kings Tattoo in Otsego, MN. For custom art, booking, or tattoo openings, use our request form.",
};

const inputStyle = {
  width: "100%",
  maxWidth: 360,
  margin: "0 auto",
  display: "block",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: 4,
  padding: "0.75rem 1rem",
  color: "#f5f5f5",
  fontSize: "1rem",
  fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
} as const;

export default function ContactPage() {
  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "#f5f5f5",
        fontFamily: '"trajan-pro-3", serif',
      }}
    >
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

      <section
        style={{
          maxWidth: 560,
          margin: "0 auto",
          padding: "4rem 1.5rem 6rem",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "1.25rem",
          }}
        >
          Ink Kings Tattoo
        </p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            margin: "0 0 1.5rem",
          }}
        >
          Contact
        </h1>

        <div style={{ marginBottom: "1.25rem", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Your message"
            style={{ ...inputStyle, marginBottom: "0.75rem" }}
            aria-label="Message"
          />
        </div>
        <div style={{ marginBottom: "0.75rem", textAlign: "center" }}>
          <input
            type="tel"
            placeholder="Phone number"
            style={inputStyle}
            aria-label="Phone number"
          />
        </div>
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <input
            type="email"
            placeholder="Email"
            style={inputStyle}
            aria-label="Email"
          />
        </div>
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <button type="submit" className="gold-btn">
            <span>SUBMIT</span>
          </button>
        </div>

        <p
          style={{
            fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
            fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.65)",
            margin: "0 0 2.5rem",
          }}
        >
          If this is about custom art, booking, or tattoo openings, please fill out our request form and our team will get back to you.
        </p>
        <Link href="/request" className="gold-btn">
          <span>REQUEST CUSTOM ART</span>
        </Link>
      </section>
    </main>
  );
}
