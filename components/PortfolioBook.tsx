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
    !isMobile && slides.length % 2 !== 0
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
      const maxW = Math.min(window.innerWidth * 0.42, 560);
      const w = Math.max(380, maxW);
      setDimensions({ width: Math.round(w), height: Math.round(w * 1.35) });
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

        <div style={{ position: "relative" }}>
          {/* Mobile 3D book layers */}
          {isMobile && (() => {
            const progress = totalPages > 1 ? currentPage / (totalPages - 1) : 0;
            const atEnd = currentPage >= totalPages - 1;
            const atStart = currentPage === 0;
            const rightLayers = Math.round((1 - progress) * 4);
            const leftLayers = Math.round(progress * 4);
            const edgeGrad = "linear-gradient(to right, rgba(60,58,55,1), rgba(80,77,72,1), rgba(65,62,58,1))";
            const edgeGradV = "linear-gradient(to bottom, rgba(60,58,55,1), rgba(80,77,72,1), rgba(65,62,58,1))";

            return (
              <>
                {/* Right-side page stack (unread) */}
                {Array.from({ length: rightLayers }, (_, idx) => idx + 1).map((i) => (
                  <div
                    key={`mr-${i}`}
                    style={{
                      position: "absolute",
                      top: i * 1.5,
                      left: i * 0.5,
                      right: -(i * 1.5),
                      bottom: -(i * 1.5),
                      borderRadius: 3,
                      background: `rgba(${45 + i * 6}, ${42 + i * 5}, ${40 + i * 4}, 1)`,
                      border: "1px solid rgba(255,255,255,0.04)",
                      pointerEvents: "none",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}

                {/* Left-side page stack (read) */}
                {Array.from({ length: leftLayers }, (_, idx) => idx + 1).map((i) => (
                  <div
                    key={`ml-${i}`}
                    style={{
                      position: "absolute",
                      top: i * 1.5,
                      left: -(i * 1.5),
                      right: i * 0.5,
                      bottom: -(i * 1.5),
                      borderRadius: 3,
                      background: `rgba(${45 + i * 6}, ${42 + i * 5}, ${40 + i * 4}, 1)`,
                      border: "1px solid rgba(255,255,255,0.04)",
                      pointerEvents: "none",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}

                {/* Right edge strip */}
                {!atEnd && (
                  <div style={{ position: "absolute", top: 2, right: -6, bottom: -2, width: 6, borderRadius: "0 2px 2px 0", background: edgeGrad, pointerEvents: "none", zIndex: 1, transition: "opacity 0.3s ease" }} />
                )}

                {/* Left edge strip */}
                {!atStart && (
                  <div style={{ position: "absolute", top: 2, left: -6, bottom: -2, width: 6, borderRadius: "2px 0 0 2px", background: edgeGrad, pointerEvents: "none", zIndex: 1, transition: "opacity 0.3s ease" }} />
                )}

                {/* Bottom edge strip */}
                <div style={{ position: "absolute", left: -2, right: -2, bottom: -6, height: 6, borderRadius: "0 0 2px 2px", background: edgeGradV, pointerEvents: "none", zIndex: 1, transition: "all 0.4s ease" }} />

                {/* Table shadow */}
                <div style={{ position: "absolute", left: "5%", right: "-3%", bottom: -16, height: 24, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 70%)", pointerEvents: "none", zIndex: -1 }} />
              </>
            );
          })()}

          {/* Desktop 3D book layers — shift from right to left as pages are flipped */}
          {!isMobile && (() => {
            const progress = totalPages > 2 ? currentPage / (totalPages - 2) : 0;
            const atEnd = progress >= 1;
            const atStart = currentPage === 0;
            const rightLayers = Math.round((1 - progress) * 5);
            const leftLayers = Math.round(progress * 5);
            const edgeGrad = "linear-gradient(to right, rgba(60,58,55,1), rgba(80,77,72,1), rgba(65,62,58,1))";
            const edgeGradV = "linear-gradient(to bottom, rgba(60,58,55,1), rgba(80,77,72,1), rgba(65,62,58,1))";

            return (
              <>
                {/* Right-side page stack (unread pages) */}
                {Array.from({ length: rightLayers }, (_, idx) => idx + 1).map((i) => (
                  <div
                    key={`r-${i}`}
                    style={{
                      position: "absolute",
                      top: i * 2,
                      left: "50%",
                      right: -(i * 1.5),
                      bottom: -(i * 2),
                      borderRadius: "0 3px 3px 0",
                      background: `rgba(${45 + i * 6}, ${42 + i * 5}, ${40 + i * 4}, 1)`,
                      border: "1px solid rgba(255,255,255,0.04)",
                      borderLeft: "none",
                      pointerEvents: "none",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}

                {/* Left-side page stack (read pages) */}
                {Array.from({ length: leftLayers }, (_, idx) => idx + 1).map((i) => (
                  <div
                    key={`l-${i}`}
                    style={{
                      position: "absolute",
                      top: i * 2,
                      left: -(i * 1.5),
                      right: "50%",
                      bottom: -(i * 2),
                      borderRadius: "3px 0 0 3px",
                      background: `rgba(${45 + i * 6}, ${42 + i * 5}, ${40 + i * 4}, 1)`,
                      border: "1px solid rgba(255,255,255,0.04)",
                      borderRight: "none",
                      pointerEvents: "none",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}

                {/* Right page edge strip */}
                {!atEnd && (
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      right: -8,
                      bottom: -2,
                      width: 8,
                      borderRadius: "0 2px 2px 0",
                      background: edgeGrad,
                      pointerEvents: "none",
                      zIndex: 1,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                )}

                {/* Left page edge strip */}
                {!atStart && (
                  <div
                    style={{
                      position: "absolute",
                      top: 2,
                      left: -8,
                      bottom: -2,
                      width: 8,
                      borderRadius: "2px 0 0 2px",
                      background: edgeGrad,
                      pointerEvents: "none",
                      zIndex: 1,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                )}

                {/* Bottom page edge strip */}
                <div
                  style={{
                    position: "absolute",
                    left: atStart ? "50%" : -2,
                    right: atEnd ? "50%" : -2,
                    bottom: -8,
                    height: 8,
                    borderRadius: "0 0 2px 2px",
                    background: edgeGradV,
                    pointerEvents: "none",
                    zIndex: 1,
                    transition: "all 0.4s ease",
                  }}
                />

                {/* Table shadow */}
                <div
                  style={{
                    position: "absolute",
                    left: "5%",
                    right: "-3%",
                    bottom: -20,
                    height: 30,
                    borderRadius: "50%",
                    background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: -1,
                  }}
                />

                {/* Centre spine line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "50%",
                    width: 1,
                    background: "rgba(255,255,255,0.12)",
                    zIndex: 20,
                    pointerEvents: "none",
                  }}
                />

                {/* Spine shadow */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "calc(50% - 12px)",
                    width: 24,
                    background: "linear-gradient(to right, transparent, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.15) 60%, transparent)",
                    zIndex: 19,
                    pointerEvents: "none",
                  }}
                />
              </>
            );
          })()}

          {/* @ts-expect-error - react-pageflip types are incomplete */}
          <HTMLFlipBook
            ref={bookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={240}
            maxWidth={700}
            minHeight={320}
            maxHeight={950}
            drawShadow
            flippingTime={800}
            usePortrait={isMobile}
            startZIndex={5}
            autoSize
            maxShadowOpacity={0.5}
            showCover={false}
            mobileScrollSupport
            swipeDistance={30}
            clickEventForward={false}
            useMouseEvents
            onFlip={onFlip}
            className={isMobile ? "portfolio-book-mobile" : "portfolio-book-desktop"}
            style={
              isMobile
                ? {
                    borderRadius: 3,
                    position: "relative" as const,
                    zIndex: 10,
                  }
                : {
                    borderRadius: 3,
                    position: "relative" as const,
                    zIndex: 10,
                  }
            }
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
