import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Custom Art | Ink Kings Tattoo",
  description:
    "Submit your tattoo idea for our artists. Custom art, booking, and tattoo openings at Ink Kings Tattoo in Otsego, MN.",
};

export default function RequestLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
