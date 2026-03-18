import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Upcoming Events | Ink Kings Tattoo",
  description:
    "See where Ink Kings Tattoo will be — conventions, guest spots, and events. Minnesota and beyond.",
};

const events = [
  {
    date: "Aug 26, 2016 at 2PM – Aug 28, 2016 at 7PM",
    duration: "3 days",
    title: "Tattoo You Minnesota 25",
    venue: "DAKOTA EXPOSITION CENTER",
    description:
      "Bringing Minnesota some of the finest tattoo artists for 25 years. Come to this Minnesota Made event for the tattoos, stay because you're part of the family.",
  },
  {
    date: "Oct 12, 2016 at 10AM – Oct 14, 2016 at 6PM",
    duration: "3 days",
    title: "Midwest Ink & Art Expo",
    venue: "MINNEAPOLIS CONVENTION CENTER",
    description:
      "A gathering of top artists from across the region. Live tattooing, seminars, and vendors. Ink Kings will be at the main floor booth.",
  },
  {
    date: "Dec 2, 2016 at 12PM – Dec 3, 2016 at 8PM",
    duration: "2 days",
    title: "Holiday Flash Weekend",
    venue: "INK KINGS TATTOO — OTSEGO, MN",
    description:
      "Special flash designs and holiday rates at the shop. Walk-ins welcome; appointments recommended for larger pieces.",
  },
];

const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  marginBottom: "1rem",
  display: "block",
};

export default function EventsPage() {
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
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
          width: "100%",
        }}
      >
        <p style={{ ...labelStyle, marginBottom: "1.25rem" }}>Ink Kings Tattoo</p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            margin: "0 0 0.5rem",
          }}
        >
          Upcoming Events
        </h1>
        <p
          style={{
            fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
            fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
            marginBottom: "2.5rem",
          }}
        >
          Conventions, guest spots, and events. See where we&apos;ll be.
        </p>

        <ul className="space-y-6" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {events.map((event, i) => (
            <li
              key={i}
              className="rounded border border-neutral-600 bg-neutral-900/40 px-4 py-4 md:px-5 md:py-5"
            >
              <p
                style={{
                  fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "0.5rem",
                }}
              >
                {event.date} · {event.duration}
              </p>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  margin: "0 0 0.25rem",
                  color: "#f5f5f5",
                }}
              >
                {event.title}
              </h2>
              <p
                style={{
                  fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "0.75rem",
                }}
              >
                {event.venue}
              </p>
              <p
                style={{
                  fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {event.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
