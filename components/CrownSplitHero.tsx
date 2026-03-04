"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import {
  Box3,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
  Vector3,
} from "three";
import LiquidBackground from "./LiquidBackground";

// ─── helpers ─────────────────────────────────────────────────────────────────
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

// ─── 3-D crown mesh (Vectary export with MTL + textures) ─────────────────────
const MODEL_DIR = "/models/gold_crown_1-6";

function CrownMesh() {
  const materials = useLoader(
    MTLLoader,
    `${MODEL_DIR}/gold_crown_1.mtl`,
    (loader) => { loader.setResourcePath(`${MODEL_DIR}/`); },
  );

  const rawObject = useLoader(
    OBJLoader,
    `${MODEL_DIR}/gold_crown_1.obj`,
    (loader) => { materials.preload(); loader.setMaterials(materials); },
  );

  const normalMap    = useLoader(TextureLoader, `${MODEL_DIR}/wood_Wood_006_NormalMap.jpg`);
  const roughnessMap = useLoader(TextureLoader, `${MODEL_DIR}/_&wood_Wood_006_Roughness_3.jpg`);

  const centeredObject = useMemo(() => {
    const object = rawObject.clone();

    object.traverse((child) => {
      if (!(child as Mesh).isMesh) return;
      const mesh   = child as Mesh;
      const oldMat = mesh.material as MeshStandardMaterial;

      mesh.material = new MeshStandardMaterial({
        map:          oldMat.map,
        normalMap,
        roughnessMap,
        metalness:    0.85,
        roughness:    0.4,
        side:         DoubleSide,
      });
    });

    const box     = new Box3().setFromObject(object);
    const center  = box.getCenter(new Vector3());
    const size    = box.getSize(new Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z);
    const scale   = maxAxis > 0 ? 1 / maxAxis : 1;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    return object;
  }, [rawObject, normalMap, roughnessMap]);

  return <primitive object={centeredObject} />;
}

// ─── easing ──────────────────────────────────────────────────────────────────
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// ─── crown scene ──────────────────────────────────────────────────────────────
//
// progress = scrollY / vh   (0 → 3 across the 400 vh hero)
//
// centerState drives BOTH position (left ↔ centre) and tilt (front ↔ top-down):
//   §1  (p 0–0.5)    : centerState = 1   → centred, top-down
//   T1  (p 0.5–1.0)  : centerState 1→0  → slides left, untilts
//   §2  (p 1.0–1.5)  : centerState = 0   → left, front-facing
//   §3  (p 1.5–2.0)  : centerState = 0   → left, front-facing
//   T2  (p 2.0–2.5)  : centerState 0→1  → slides back, tilts top-down
//   §4  (p 2.5–3.0)  : centerState = 1   → centred, top-down
//
function CrownScene({
  scrollYRef,
  onIntroDone,
}: {
  scrollYRef: React.MutableRefObject<number>;
  onIntroDone: () => void;
}) {
  const { viewport, size } = useThree();
  const groupRef = useRef<Group>(null);

  const introStartTimeRef = useRef<number | null>(null);
  const introDoneRef = useRef(false);
  const onIntroDoneRef = useRef(onIntroDone);
  onIntroDoneRef.current = onIntroDone;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Record time on the very first frame
    if (introStartTimeRef.current === null) {
      introStartTimeRef.current = clock.getElapsedTime();
    }

    // ── intro zoom (3× → 1× over 1.5s with ease-out) ───────────────────
    const INTRO_DURATION = 1.5; // seconds
    const elapsed = clock.getElapsedTime() - introStartTimeRef.current;
    const rawT = clamp(elapsed / INTRO_DURATION, 0, 1);
    const easedT = easeOutCubic(rawT);
    const introMultiplier = MathUtils.lerp(3.0, 1.0, easedT);

    if (rawT >= 1 && !introDoneRef.current) {
      introDoneRef.current = true;
      onIntroDoneRef.current();
    }

    const isMobile = size.width < 768;
    const progress = scrollYRef.current / window.innerHeight; // 0 → 3

    // centerState: 1 = centred+top-down, 0 = left+front-facing
    let centerState: number;
    if (progress < 0.5) {
      centerState = 1;
    } else if (progress < 1.0) {
      centerState = 1 - clamp((progress - 0.5) / 0.5, 0, 1); // T1: 1→0
    } else if (progress < 2.0) {
      centerState = 0;
    } else if (progress < 2.5) {
      centerState = clamp((progress - 2.0) / 0.5, 0, 1);      // T2: 0→1
    } else {
      centerState = 1;
    }

    // ── scale (base × intro zoom multiplier) ──────────────────────────────
    const baseScale = isMobile ? 2.0 : 5.0;
    groupRef.current.scale.setScalar(baseScale * introMultiplier);

    // ── position ──────────────────────────────────────────────────────────
    const baseX = isMobile ? -viewport.width * 0.4 : -viewport.width * 0.5;

    const targetX = baseX * (1 - centerState);

    // §4 lift starts at the same time as T2 centering (progress 2.0) so both
    // movements — slide to center + rise up — happen in one smooth motion
    const section4State = clamp((progress - 2.0) / 0.5, 0, 1);
    const section4Lift  = section4State * (isMobile ? viewport.height * 0.22 : viewport.height * 0.2);
    const targetY = section4Lift;

    groupRef.current.position.x = MathUtils.lerp(
      groupRef.current.position.x, targetX, 0.06,
    );
    groupRef.current.position.y = MathUtils.lerp(
      groupRef.current.position.y, targetY, 0.06,
    );

    // ── rotation ──────────────────────────────────────────────────────────
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollYRef.current * 0.003,
      0.08,
    );

    const tiltTarget =
      progress < 1.0
        ? (Math.PI / 2) * centerState
        : progress >= 2.0
          ? (-Math.PI / 2) * centerState
          : 0;

    groupRef.current.rotation.x = MathUtils.lerp(
      groupRef.current.rotation.x,
      tiltTarget,
      0.06,
    );

    groupRef.current.rotation.z = MathUtils.lerp(
      groupRef.current.rotation.z, 0, 0.08,
    );
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <CrownMesh />
      </Suspense>
    </group>
  );
}

// ─── §1 text — SVG with stroke-draw + fill animation, fades on scroll ───────
function Section1Text() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => setProgress(window.scrollY / window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const opacity = clamp(1 - (progress - 0.5) / 0.2, 0, 1);

  return (
    <>
      <style>{`
        @keyframes strokeDraw {
          from { stroke-dashoffset: 2000; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes fillFade {
          from { fill-opacity: 0; }
          to   { fill-opacity: 1; }
        }
      `}</style>

      <div
        className="absolute inset-0 z-20 flex items-center justify-center"
        style={{ opacity, pointerEvents: opacity > 0.5 ? "auto" : "none" }}
      >
        <svg
          viewBox="0 0 900 260"
          style={{ width: "92%", maxWidth: 780, overflow: "visible" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Line 1: INK KINGS */}
          <text
            x="450"
            y="70"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="96"
            fontFamily='"trajan-pro-3", serif'
            fontWeight="700"
            fill="white"
            fillOpacity="0"
            stroke="white"
            strokeWidth="1.2"
            strokeDasharray="2000"
            strokeDashoffset="2000"
            style={{
              animation:
                "strokeDraw 900ms ease-out 200ms forwards, " +
                "fillFade   400ms ease-in  1000ms forwards",
            }}
          >
            INK KINGS
          </text>

          {/* Line 2: TATTOO */}
          <text
            x="450"
            y="190"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="96"
            fontFamily='"trajan-pro-3", serif'
            fontWeight="300"
            letterSpacing="18"
            fill="white"
            fillOpacity="0"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="2000"
            strokeDashoffset="2000"
            style={{
              animation:
                "strokeDraw 900ms ease-out 800ms forwards, " +
                "fillFade   400ms ease-in  1500ms forwards",
            }}
          >
            TATTOO
          </text>
        </svg>
      </div>
    </>
  );
}

// ─── §2-4 text — right half desktop / bottom half mobile ─────────────────────
function SectionsText() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => setProgress(window.scrollY / window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const opacity2 =
    clamp((progress - 0.6) / 0.2, 0, 1) *
    clamp(1 - (progress - 1.2) / 0.2, 0, 1);
  const opacity3 =
    clamp((progress - 1.3) / 0.2, 0, 1) *
    clamp(1 - (progress - 1.9) / 0.2, 0, 1);
  const opacity4 = clamp((progress - 2.0) / 0.2, 0, 1);

  const eyebrow = "mb-3 text-sm font-light uppercase tracking-[0.28em] text-neutral-300 md:mb-5 md:text-base";
  const heading = "mb-4 text-4xl font-semibold leading-tight md:mb-8 md:text-6xl lg:text-7xl";
  const body    = "font-body text-base font-light leading-relaxed text-neutral-300 md:text-xl";

  // Desktop-only block (sections 2 & 3 use bottom-pinned mobile versions)
  const desktopBlock = (opacity: number, eyebrowText: string, h: string, b: string) => (
    <div
      className="absolute inset-0 hidden md:block"
      style={{ opacity, pointerEvents: opacity > 0.5 ? "auto" : "none" }}
    >
      <p className={eyebrow}>{eyebrowText}</p>
      <h1 className={heading}>{h}</h1>
      <p className={body}>{b}</p>
    </div>
  );

  // All-breakpoints block (section 4 keeps centred mobile layout)
  const block = (opacity: number, eyebrowText: string, h: string, b: string) => (
    <div
      className="absolute inset-0"
      style={{ opacity, pointerEvents: opacity > 0.5 ? "auto" : "none" }}
    >
      <p className={eyebrow}>{eyebrowText}</p>
      <h1 className={heading}>{h}</h1>
      <p className={body}>{b}</p>
    </div>
  );

  return (
    <div className="relative">
      {desktopBlock(
        opacity2,
        "Ink Kings",
        "Custom Tattoos",
        "Large-scale realism, detailed portraits, and wildlife pieces designed and executed in-house."
      )}

      {desktopBlock(
        opacity3,
        "Recognition",
        "Best Tattoo Parlor",
        "Voted Best Tattoo Parlor in 2020, 2021, and 2022 by Sun Media Readers."
      )}

      {/* §4 is rendered as a separate bottom-pinned block outside this container */}
    </div>
  );
}

// ─── artist profiles ─────────────────────────────────────────────────────────
const profiles = [
  {
    name:   "Steve De Los Reyes",
    status: "Books Are Currently Closed",
    eyebrow: "Ink Kings",
    bio:    "Award-winning artist and owner of Ink Kings Tattoo in Otsego, MN. With over 30 years as an artist and a degree in Technical Illustration from Cal State Fullerton, Steve brings expertise in realism, portraits, and wildlife. Tattooing since 2009 — opening Ink Kings in 2016.",
    photo:  "/Steve.png",
  },
  {
    name:   "Lorem Ipsum Artist",
    status: "Accepting New Clients",
    eyebrow: "Ink Kings",
    bio:    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    photo:  "/PHimage.png",
  },
  {
    name:   "Dolor Sit Amet",
    status: "Limited Availability",
    eyebrow: "Ink Kings",
    bio:    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    photo:  "/PHimage.png",
  },
];

type Profile = (typeof profiles)[number];

function ProfileBlock({
  profile,
  opacity,
  photoOpacity,
}: {
  profile: Profile;
  opacity: number;
  photoOpacity: number;
}) {
  return (
    <>
      {/* Circle portrait — top center, fills crown interior */}
      <div
        className="absolute left-1/2 z-20 -translate-x-1/2"
        style={{
          top: "5%",
          opacity: photoOpacity,
          width: "clamp(320px, 80vw, 600px)",
          height: "clamp(320px, 80vw, 600px)",
          borderRadius: "50%",
          overflow: "hidden",
          maskImage: "radial-gradient(circle, black 50%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 78%)",
        }}
      >
        <img
          src={profile.photo}
          alt={profile.name}
          className="h-full w-full object-cover object-top"
        />
      </div>

      {/* Text — bottom center */}
      <div
        className="absolute bottom-0 left-0 z-20 w-full px-6 pb-8 text-center text-white"
        style={{ opacity, pointerEvents: opacity > 0.5 ? "auto" : "none" }}
      >
        <h1 className="mb-2 text-4xl font-semibold leading-tight md:text-6xl">
          {profile.name}
        </h1>
        <p className="mb-4 text-sm font-light uppercase tracking-widest text-neutral-400">
          {profile.status}
        </p>
        <p className="font-body mx-auto max-w-xl text-base font-light leading-relaxed text-neutral-300 md:text-xl">
          {profile.bio}
        </p>
      </div>
    </>
  );
}

// ─── hero root ────────────────────────────────────────────────────────────────
export default function CrownSplitHero() {
  const scrollYRef = useRef(0);
  const [introDone, setIntroDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Lock scroll while the crown zooms in
  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  useEffect(() => {
    const update = () => {
      scrollYRef.current = window.scrollY;
      setScrollProgress(window.scrollY / window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const section3Opacity =
    clamp((scrollProgress - 1.3) / 0.2, 0, 1) *
    clamp(1 - (scrollProgress - 1.9) / 0.2, 0, 1);

  return (
    <section className="relative w-full" style={{ height: "600vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <LiquidBackground className="z-0" interactive={false} zoom={2.5} />

        {/* Section 2 overlays — Tattoo.png behind crown */}
        {(() => {
          const op =
            clamp((scrollProgress - 0.6) / 0.2, 0, 1) *
            clamp(1 - (scrollProgress - 1.2) / 0.2, 0, 1);
          return op > 0 ? (
            <>
              {/* Desktop: left side, right edge fades out */}
              <div
                className="absolute left-0 top-0 z-[15] hidden h-full w-[45%] max-w-[600px] md:block"
                style={{
                  opacity: op * 0.85,
                  maskImage: "linear-gradient(to right, black 0%, black 50%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, black 0%, black 50%, transparent 100%)",
                }}
              >
                <img
                  src="/Tattoo.png"
                  alt=""
                  className="h-full w-full object-cover object-left"
                />
              </div>

              {/* Mobile: top half, full width, behind crown */}
              <div
                className="absolute left-0 right-0 top-0 z-[5] h-[50%] md:hidden"
                style={{
                  opacity: op * 0.85,
                  maskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
                }}
              >
                <img
                  src="/Tattoo.png"
                  alt=""
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </>
          ) : null;
        })()}

        {/* Section 3 overlays */}
        {section3Opacity > 0 && (
          <>
            {/* Desktop: photo on the left, fading to transparent on the right */}
            <div
              className="absolute left-0 top-0 z-[15] hidden h-full w-[45%] max-w-[600px] md:block"
              style={{
                opacity: section3Opacity * 0.65,
                maskImage: "linear-gradient(to right, black 0%, black 50%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 0%, black 50%, transparent 100%)",
              }}
            >
              <img
                src="/section3-award.png"
                alt=""
                className="h-full w-full object-cover object-left"
              />
            </div>

            {/* Desktop: award badge — top right */}
            <div
              className="absolute right-6 top-6 z-[16] hidden w-52 md:block lg:w-64"
              style={{ opacity: section3Opacity }}
            >
              <img
                src="/award+white.png"
                alt="Best Tattoo Parlor Award"
                className="w-full object-contain drop-shadow-lg"
              />
            </div>

{/* Mobile award badge now lives inside the §3 text block — see below */}

            {/* Mobile: photo — top, full width, behind crown (z below canvas z-10) */}
            <div
              className="absolute left-0 right-0 top-0 z-[5] h-[55%] md:hidden"
              style={{
                opacity: section3Opacity * 0.65,
                maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
              }}
            >
              <img
                src="/section3-award.png"
                alt=""
                className="h-full w-full object-cover object-top"
              />
            </div>
          </>
        )}

        <div className="absolute inset-0 z-10">
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
            <CrownScene scrollYRef={scrollYRef} onIntroDone={() => setIntroDone(true)} />
          </Canvas>
        </div>

        <Section1Text />

        {/* §2/3/4 desktop + §2/4 mobile — vertically centred */}
        <div className="absolute left-0 top-1/2 z-20 flex w-full -translate-y-1/2 items-center px-6 text-white md:left-auto md:right-0 md:top-0 md:h-full md:w-1/2 md:translate-y-0 md:px-0">
          <div className="w-full md:max-w-xl md:px-8 lg:px-12">
            <SectionsText />
          </div>
        </div>

        {/* §2 mobile only — pinned to bottom */}
        {(() => {
          const op = clamp((scrollProgress - 0.6) / 0.2, 0, 1) * clamp(1 - (scrollProgress - 1.2) / 0.2, 0, 1);
          return op > 0 ? (
            <div
              className="absolute bottom-0 left-0 z-20 w-full px-6 pb-8 text-white md:hidden"
              style={{ opacity: op, pointerEvents: op > 0.5 ? "auto" : "none" }}
            >
              <p className="mb-2 text-base font-light uppercase tracking-[0.28em] text-neutral-300">
                Ink Kings
              </p>
              <h1 className="mb-3 text-5xl font-semibold leading-tight">
                Custom Tattoos
              </h1>
              <p className="font-body text-base font-light leading-relaxed text-neutral-300">
                Large-scale realism, detailed portraits, and wildlife pieces designed and executed in-house.
              </p>
            </div>
          ) : null;
        })()}

        {/* §3 mobile only — pinned to bottom */}
        <div
          className="absolute bottom-0 left-0 z-20 w-full px-6 pb-8 text-white md:hidden"
          style={{
            opacity: section3Opacity,
            pointerEvents: section3Opacity > 0.5 ? "auto" : "none",
          }}
        >
          <img
            src="/award+white.png"
            alt="Best Tattoo Parlor Award"
            className="mb-3 w-36 object-contain drop-shadow-lg"
          />
          <p className="mb-2 text-sm font-light uppercase tracking-[0.28em] text-neutral-300">
            Recognition
          </p>
          <h1 className="mb-3 text-4xl font-semibold leading-tight">
            Best Tattoo Parlor
          </h1>
          <p className="font-body text-sm font-light leading-relaxed text-neutral-300">
            Voted Best Tattoo Parlor in 2020, 2021, and 2022 by Sun Media Readers.
          </p>
        </div>

        {/* §4-6 — artist profile blocks */}
        {profiles.map((profile, i) => {
          const fadeIn     = 2.0 + i;
          const isLast     = i === profiles.length - 1;

          // Text and photo fade in together once the crown is settled
          const photoFadeIn  = fadeIn + 0.4;
          // next profile's photoFadeIn = (fadeIn + 1) + 0.4 = fadeIn + 1.4
          const photoFadeOut = fadeIn + 1.4;
          const textOp = isLast
            ? clamp((scrollProgress - photoFadeIn) / 0.25, 0, 1)
            : clamp((scrollProgress - photoFadeIn) / 0.25, 0, 1) *
              clamp(1 - (scrollProgress - photoFadeOut) / 0.25, 0, 1);
          const photoOp = isLast
            ? clamp((scrollProgress - photoFadeIn) / 0.25, 0, 1)
            : clamp((scrollProgress - photoFadeIn) / 0.25, 0, 1) *
              clamp(1 - (scrollProgress - photoFadeOut) / 0.25, 0, 1);

          if (textOp <= 0 && photoOp <= 0) return null;
          return (
            <ProfileBlock
              key={profile.name}
              profile={profile}
              opacity={textOp}
              photoOpacity={photoOp}
            />
          );
        })}
      </div>
    </section>
  );
}
