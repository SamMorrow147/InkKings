"use client";

import Link from "next/link";
import Script from "next/script";
import { useRef, useEffect } from "react";

export default function RequestPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Disable internal iframe scroll so only the page scrolls
    if (iframeRef.current) {
      iframeRef.current.setAttribute("scrolling", "no");
    }
  }, []);

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

      <section style={{ width: "100%", padding: "0 0 6rem" }}>
        <iframe
          ref={iframeRef}
          id="JotFormIFrame-260766664362061"
          title="Request Custom Art"
          onLoad={() => window.parent.scrollTo(0, 0)}
          allow="geolocation; microphone; camera; fullscreen; payment"
          src="https://form.jotform.com/260766664362061"
          style={{
            width: "100%",
            minHeight: "800px",
            border: "none",
            overflow: "hidden",
            display: "block",
          }}
        />
      </section>

      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        strategy="afterInteractive"
        onLoad={() => {
          (window as any).jotformEmbedHandler(
            "iframe[id='JotFormIFrame-260766664362061']",
            "https://form.jotform.com/"
          );
        }}
      />
    </main>
  );
}
