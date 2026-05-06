"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group } from "three";
import { CrownMesh } from "./CrownSplitHero";

function SpinningCrownGroup({ speed = 0.25 }: { speed?: number }) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * speed;
  });

  return (
    <group position={[0.45, 0.85, 0]} rotation={[-0.3, 0, -0.35]}>
      <group ref={groupRef} scale={1.25}>
        <Suspense fallback={null}>
          <CrownMesh />
        </Suspense>
      </group>
    </group>
  );
}

interface SpinningCrownProps {
  speed?: number;
  opacity?: number;
}

export default function SpinningCrown({
  speed = 0.25,
  opacity = 0.85,
}: SpinningCrownProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          opacity: inView ? opacity : 0,
          transform: inView ? "translateX(0)" : "translateX(80vw)",
          transition:
            "transform 1100ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease-out",
          willChange: "transform, opacity",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <ambientLight intensity={1.6} />
          <directionalLight position={[3, 4, 5]} intensity={2.5} />
          <directionalLight position={[-4, 3, -2]} intensity={1.2} color="#ffe8b0" />
          <pointLight position={[0, 2, 3]} intensity={3.0} color="#ffe4a0" />
          <pointLight position={[0, -3, 2]} intensity={1.2} color="#fff0c0" />
          <SpinningCrownGroup speed={speed} />
        </Canvas>
      </div>
    </div>
  );
}
