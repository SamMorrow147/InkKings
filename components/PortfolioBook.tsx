"use client";

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import HTMLFlipBook from "react-pageflip";

interface Slide {
  image: string;
  alt: string;
}

interface PortfolioBookProps {
  slides: Slide[];
}

const Page = forwardRef<HTMLDivElement, { image: string; alt: string }>(
  ({ image, alt }, ref) => (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#111",
      }}
    >
      <img
        src={image}
        alt={alt}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </div>
  )
);
Page.displayName = "Page";

export default function PortfolioBook({ slides }: PortfolioBookProps) {
  const bookRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 400, height: 550 });
  const [currentPage, setCurrentPage] = useState(0);
  const [mounted, setMounted] = useState(false);

  const paddedSlides =
    slides.length % 2 !== 0
      ? [...slides, { image: "", alt: "" }]
      : slides;

  const totalPages = paddedSlides.length;

  const updateDimensions = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    if (mobile) {
      const w = Math.min(window.innerWidth - 48, 420);
      setDimensions({ width: w, height: Math.round(w * 1.38) });
    } else {
      const maxW = Math.min(window.innerWidth * 0.38, 480);
      const w = Math.max(320, maxW);
      setDimensions({ width: Math.round(w), height: Math.round(w * 1.38) });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    setMounted(true);
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const onFlip = useCallback(
    (e: { data: number }) => setCurrentPage(e.data),
    []
  );

  const flipPrev = () => bookRef.current?.pageFlip()?.flipPrev("top");
  const flipNext = () => bookRef.current?.pageFlip()?.flipNext("bottom");

  const pageLabel = isMobile
    ? `${currentPage + 1} / ${totalPages}`
    : `${currentPage + 1}–${Math.min(currentPage + 2, totalPages)} / ${totalPages}`;

  if (!mounted) return null;

  const arrowStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.65)",
    border: "1px solid rgba(191,132,26,0.5)",
    color: "#bf841a",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 2,
    boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
    lineHeight: 1,
    flexShrink: 0,
    transition: "opacity 0.2s",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        padding: "0 1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <button onClick={flipPrev} aria-label="Previous page" style={arrowStyle}>
          ‹
        </button>

        <div
          style={{
            width: isMobile ? dimensions.width : dimensions.width * 2,
            height: dimensions.height,
            boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 2px 12px rgba(0,0,0,0.4)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* @ts-expect-error - react-pageflip types are incomplete */}
          <HTMLFlipBook
            ref={bookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={200}
            maxWidth={600}
            minHeight={280}
            maxHeight={840}
            drawShadow
            flippingTime={800}
            usePortrait={isMobile}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.5}
            showCover={false}
            mobileScrollSupport={false}
            swipeDistance={30}
            clickEventForward={false}
            useMouseEvents
            onFlip={onFlip}
            className="portfolio-book"
            style={{}}
          >
            {paddedSlides.map((slide, i) =>
              slide.image ? (
                <Page key={i} image={slide.image} alt={slide.alt} />
              ) : (
                <div
                  key={i}
                  ref={React.createRef()}
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#111",
                  }}
                />
              )
            )}
          </HTMLFlipBook>
        </div>

        <button onClick={flipNext} aria-label="Next page" style={arrowStyle}>
          ›
        </button>
      </div>

      {/* Page indicator */}
      <p
        style={{
          fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
          fontSize: "0.75rem",
          fontWeight: 300,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.35)",
          margin: 0,
        }}
      >
        {pageLabel}
      </p>
    </div>
  );
}
