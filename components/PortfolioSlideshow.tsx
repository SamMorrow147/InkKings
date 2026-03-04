'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Slide {
  image: string;
  alt: string;
}

interface PortfolioSlideshowProps {
  slides: Slide[];
}

const SLIDE_W = 400;
const SLIDE_H = 550;
const GAP = 24;
const TOTAL = SLIDE_W + GAP;

export default function PortfolioSlideshow({ slides }: PortfolioSlideshowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideElementsRef = useRef<HTMLElement[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHorizontalRef = useRef<boolean | null>(null); // null = undecided
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const scrollStartRef = useRef(0);

  const extendedSlides = [...slides, ...slides, ...slides, ...slides, ...slides];
  const startOffset = slides.length * 2;

  useLayoutEffect(() => {
    const c = scrollContainerRef.current;
    if (c) {
      c.scrollLeft = TOTAL * startOffset;
      requestAnimationFrame(() => setIsReady(true));
    }
  }, [startOffset]);

  const updateScales = () => {
    const c = scrollContainerRef.current;
    if (!c) return;
    const scrollPos = c.scrollLeft;
    if (Math.abs(scrollPos - lastScrollRef.current) < 0.5) return;
    lastScrollRef.current = scrollPos;
    const cRect = c.getBoundingClientRect();
    const cCenterX = cRect.left + cRect.width / 2;
    slideElementsRef.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - cCenterX);
      const max = cRect.width / 2 + r.width / 2;
      const n = Math.min(dist / max, 1);
      el.style.transform = `scale(${1 - n * 0.12})`;
      el.style.opacity = `${1 - n * 0.25}`;
    });
  };

  const handleInfiniteLoop = () => {
    const c = scrollContainerRef.current;
    if (!c) return;
    const idx = Math.round(c.scrollLeft / TOTAL);
    if (idx < slides.length || idx > slides.length * 4 - 1) {
      const norm = ((idx % slides.length) + slides.length) % slides.length;
      c.scrollLeft = (slides.length * 2 + norm) * TOTAL;
    }
  };

  const updateActiveIndex = (scrollPos: number) => {
    const idx = Math.round(scrollPos / TOTAL);
    setActiveIndex(((idx % slides.length) + slides.length) % slides.length);
  };

  useEffect(() => {
    const c = scrollContainerRef.current;
    if (!c) return;
    let timeout: ReturnType<typeof setTimeout>;
    let scrolling = false;
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        const tick = () => { if (!scrolling) return; updateScales(); animFrameRef.current = requestAnimationFrame(tick); };
        tick();
      }
      updateActiveIndex(c.scrollLeft);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        scrolling = false;
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        const nearest = Math.round(c.scrollLeft / TOTAL) * TOTAL;
        gsap.to(c, { scrollLeft: nearest, duration: 0.5, ease: 'power2.out', onUpdate: updateScales, onComplete: handleInfiniteLoop });
      }, 100);
    };
    c.addEventListener('scroll', onScroll, { passive: true });
    updateScales();
    return () => { c.removeEventListener('scroll', onScroll); clearTimeout(timeout); if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [slides.length]);

  const scrollToSlide = (index: number) => {
    const c = scrollContainerRef.current;
    if (!c) return;
    gsap.killTweensOf(c);
    gsap.to(c, { scrollLeft: (startOffset + index) * TOTAL, duration: 0.8, ease: 'power3.out', onUpdate: updateScales, onComplete: handleInfiniteLoop });
  };

  const goToNext = () => scrollToSlide((activeIndex + 1) % slides.length);
  const goToPrev = () => scrollToSlide((activeIndex - 1 + slides.length) % slides.length);

  const onPointerDown = (e: React.PointerEvent) => {
    const c = scrollContainerRef.current;
    if (!c) return;
    gsap.killTweensOf(c);
    isDraggingRef.current = true;
    isHorizontalRef.current = null; // reset direction lock
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    scrollStartRef.current = c.scrollLeft;
    c.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const c = scrollContainerRef.current;
    if (!c) return;

    const dx = Math.abs(e.clientX - dragStartXRef.current);
    const dy = Math.abs(e.clientY - dragStartYRef.current);

    // Determine gesture direction once we have enough movement
    if (isHorizontalRef.current === null && (dx > 4 || dy > 4)) {
      isHorizontalRef.current = dx >= dy;
    }

    // If vertical gesture (or undecided), let the panel scroll naturally
    if (!isHorizontalRef.current) return;

    e.preventDefault();
    c.style.cursor = 'grabbing';
    c.scrollLeft = scrollStartRef.current + (dragStartXRef.current - e.clientX) * 2;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const c = scrollContainerRef.current;
    if (!c) return;
    isDraggingRef.current = false;
    isHorizontalRef.current = null;
    c.style.cursor = 'grab';
    c.releasePointerCapture(e.pointerId);
  };

  useGSAP(
    () => {
      if (!isReady) return;
      const c = scrollContainerRef.current;
      if (!c) return;
      gsap.fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    },
    { dependencies: [isReady], scope: scrollContainerRef },
  );

  const arrowBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.7)',
    border: '1px solid rgba(191,132,26,0.5)',
    color: '#bf841a',
    fontSize: '2rem',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 3,
    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    lineHeight: 1,
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Prev arrow */}
      <button onClick={goToPrev} aria-label="Previous slide" style={{ ...arrowBase, left: '2rem' }}>‹</button>

      {/* Scroll track */}
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: GAP,
          overflowX: 'scroll',
          overflowY: 'hidden',
          padding: `0 calc(50vw - ${SLIDE_W / 2}px)`,
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-y',
          overscrollBehaviorX: 'contain',
          cursor: 'grab',
          opacity: 0,
        } as React.CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={`slide-${index}`}
            ref={(el) => { if (el) slideElementsRef.current[index] = el; }}
            style={{
              flexShrink: 0,
              width: SLIDE_W,
              height: SLIDE_H,
              userSelect: 'none',
              WebkitUserSelect: 'none',
              transformOrigin: 'center center',
              willChange: 'transform, opacity',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.alt}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
            />
          </div>
        ))}
      </div>

      {/* Next arrow */}
      <button onClick={goToNext} aria-label="Next slide" style={{ ...arrowBase, right: '2rem' }}>›</button>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2.5rem' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: activeIndex === i ? 12 : 10,
              height: activeIndex === i ? 12 : 10,
              borderRadius: '50%',
              background: activeIndex === i ? '#bf841a' : 'rgba(191,132,26,0.35)',
              border: `1px solid ${activeIndex === i ? '#bf841a' : 'rgba(191,132,26,0.4)'}`,
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
