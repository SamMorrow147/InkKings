import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data — in a real app this would come from CMS or markdown
const posts: Record<string, { title: string; date: string; body: string }> = {
  "opening-ink-kings-2016": {
    title: "Opening Ink Kings: Why Otsego",
    date: "March 15, 2016",
    body: "After years on the road and in other shops, opening our own space in Otsego felt like coming home. This is a placeholder for the full post.",
  },
  "realism-vs-reference": {
    title: "Realism vs. Reference — How We Work With Your Ideas",
    date: "February 2, 2016",
    body: "Bringing your reference to life means more than copying a photo. This is a placeholder for the full post.",
  },
  "best-parlor-sun-media-2022": {
    title: "Voted Best Tattoo Parlor Again — Thank You, Sun Media Readers",
    date: "January 10, 2022",
    body: "For the third year in a row, you voted us Best Tattoo Parlor. Thank you. This is a placeholder for the full post.",
  },
  "aftercare-basics": {
    title: "Aftercare Basics: What We Tell Every Client",
    date: "November 8, 2021",
    body: "The tattoo doesn't end when you leave the chair. This is a placeholder for the full post.",
  },
  "conventions-guest-spots": {
    title: "Why We Still Do Conventions and Guest Spots",
    date: "October 20, 2021",
    body: "Even with a full book at home, we hit the road. This is a placeholder for the full post.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post | Ink Kings Tattoo" };
  return {
    title: `${post.title} | Blog | Ink Kings Tattoo`,
    description: post.body.slice(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

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
          href="/blog"
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
          ← Back to Blog
        </Link>
      </div>

      <article
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "0.5rem",
          }}
        >
          {post.date}
        </p>
        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            fontWeight: 600,
            letterSpacing: "0.02em",
            margin: "0 0 1.5rem",
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          {post.body}
        </p>
      </article>
    </main>
  );
}
