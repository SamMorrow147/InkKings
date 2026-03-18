import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Ink Kings Tattoo",
  description:
    "News, studio updates, and insights from Ink Kings Tattoo in Otsego, MN. Realism, custom tattoos, and the craft behind the art.",
};

const posts = [
  {
    slug: "opening-ink-kings-2016",
    title: "Opening Ink Kings: Why Otsego",
    date: "March 15, 2016",
    excerpt:
      "After years on the road and in other shops, opening our own space in Otsego felt like coming home. Here's why we chose this community and what we're building.",
  },
  {
    slug: "realism-vs-reference",
    title: "Realism vs. Reference — How We Work With Your Ideas",
    date: "February 2, 2016",
    excerpt:
      "Bringing your reference to life means more than copying a photo. We talk through composition, scale, placement, and how to make a piece that's yours.",
  },
  {
    slug: "best-parlor-sun-media-2022",
    title: "Voted Best Tattoo Parlor Again — Thank You, Sun Media Readers",
    date: "January 10, 2022",
    excerpt:
      "For the third year in a row, you voted us Best Tattoo Parlor. We don't take it for granted. Thank you to every client, friend, and supporter who made this possible.",
  },
  {
    slug: "aftercare-basics",
    title: "Aftercare Basics: What We Tell Every Client",
    date: "November 8, 2021",
    excerpt:
      "The tattoo doesn't end when you leave the chair. Simple, consistent aftercare makes the difference between a piece that heals sharp and one that fades or scars. Our go-to steps.",
  },
  {
    slug: "conventions-guest-spots",
    title: "Why We Still Do Conventions and Guest Spots",
    date: "October 20, 2021",
    excerpt:
      "Even with a full book at home, we hit the road. Conventions and guest spots keep us connected to the wider tattoo community and bring new ideas back to the shop.",
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

export default function BlogPage() {
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
          Blog
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
          Studio news, process, and what we&apos;re thinking about.
        </p>

        <ul className="space-y-6" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {posts.map((post) => (
            <li
              key={post.slug}
              className="rounded border border-neutral-600 bg-neutral-900/40 px-4 py-4 md:px-5 md:py-5"
            >
              <p
                style={{
                  fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "0.5rem",
                }}
              >
                {post.date}
              </p>
              <h2
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  margin: "0 0 0.5rem",
                  color: "#f5f5f5",
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
                  fontSize: "0.95rem",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: "inline-block",
                  marginTop: "0.75rem",
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                }}
              >
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
