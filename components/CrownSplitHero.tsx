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
  startZoom,
  skipIntro,
}: {
  scrollYRef: React.MutableRefObject<number>;
  onIntroDone: () => void;
  startZoom: boolean;
  skipIntro: boolean;
}) {
  const { viewport, size } = useThree();
  const groupRef = useRef<Group>(null);

  const introStartTimeRef = useRef<number | null>(null);
  const introDoneRef = useRef(skipIntro); // already done if skipping
  const meshReadyRef = useRef(false);
  const onIntroDoneRef = useRef(onIntroDone);
  onIntroDoneRef.current = onIntroDone;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Wait until the OBJ mesh has actually loaded
    if (!meshReadyRef.current) {
      let hasMesh = false;
      groupRef.current.traverse((child) => {
        if ((child as any).isMesh) hasMesh = true;
      });
      if (!hasMesh) {
        groupRef.current.visible = false;
        return;
      }
      meshReadyRef.current = true;
    }

    // Stay hidden until text animation is done and we're told to start
    if (!startZoom) {
      groupRef.current.visible = false;
      return;
    }
    groupRef.current.visible = true;

    // Start intro timer only once we're allowed to zoom.
    // When skipIntro is true, backdate the start so rawT is immediately 1.
    const INTRO_DURATION = 1.5;
    if (introStartTimeRef.current === null) {
      introStartTimeRef.current = skipIntro
        ? clock.getElapsedTime() - INTRO_DURATION - 0.01
        : clock.getElapsedTime();
    }

    // ── intro zoom (3× → 1× over 1.5s with ease-out) ───────────────────
    const elapsed = clock.getElapsedTime() - introStartTimeRef.current;
    const rawT = clamp(elapsed / INTRO_DURATION, 0, 1);
    const easedT = easeOutCubic(rawT);
    const introMultiplier = MathUtils.lerp(3.0, 1.0, easedT);

    if (rawT >= 1 && !introDoneRef.current) {
      introDoneRef.current = true;
      onIntroDoneRef.current();
    }

    const isMobile = size.width < 768;
    const progress = scrollYRef.current / window.innerHeight;

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

    // New final section thresholds (progress 7 → 9, section is 1000vh)
    const NEW_SEC_START    = 7.0;
    const NEW_SEC_TILT_END = 8.5;
    const isNewSection     = progress >= NEW_SEC_START;

    // ── scale ──────────────────────────────────────────────────────────────
    const baseScale = isMobile ? 2.0 : 5.0;
    let profileScale: number;
    if (isMobile && isNewSection) {
      const t = clamp(
        (progress - NEW_SEC_START) / (NEW_SEC_TILT_END - NEW_SEC_START),
        0, 1,
      );
      profileScale = MathUtils.lerp(1.0, 0.72, easeOutCubic(t));
    } else if (isMobile) {
      profileScale = 1.0;
    } else if (isNewSection) {
      // Grow from artist-section size (0.45) back up toward 0.78 as crown tilts front
      const t = clamp(
        (progress - NEW_SEC_START) / (NEW_SEC_TILT_END - NEW_SEC_START),
        0, 1,
      );
      profileScale = MathUtils.lerp(0.45, 0.32, easeOutCubic(t));
    } else {
      profileScale = MathUtils.lerp(1.0, 0.45, clamp((progress - 2.0) / 0.5, 0, 1));
    }
    groupRef.current.scale.setScalar(baseScale * introMultiplier * profileScale);

    // ── position ──────────────────────────────────────────────────────────
    const baseX = isMobile ? -viewport.width * 0.4 : -viewport.width * 0.5;
    const targetX = baseX * (1 - centerState);

    // Artist sections lift the crown up; new section eases it back to centre
    const section4State = clamp((progress - 2.0) / 0.5, 0, 1);
    const artistLift = section4State * (
      isMobile ? viewport.height * 0.22 : viewport.height * 0.18
    );
    const newSecDropT = clamp((progress - NEW_SEC_START) / 1.0, 0, 1);
    const newSecRestY = isMobile ? viewport.height * 0.18 : viewport.height * 0.14;
    const targetY = isNewSection
      ? MathUtils.lerp(artistLift, newSecRestY, easeOutCubic(newSecDropT))
      : artistLift;

    groupRef.current.position.x = MathUtils.lerp(
      groupRef.current.position.x, targetX, 0.06,
    );
    groupRef.current.position.y = MathUtils.lerp(
      groupRef.current.position.y, targetY, 0.06,
    );

    // ── rotation ──────────────────────────────────────────────────────────
    if (rawT >= 1) {
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        scrollYRef.current * 0.003,
        0.08,
      );
    } else {
      groupRef.current.rotation.y = 0;
    }

    // rotation X (forward/back tilt)
    let tiltTarget: number;
    if (isNewSection) {
      const t = clamp(
        (progress - NEW_SEC_START) / (NEW_SEC_TILT_END - NEW_SEC_START),
        0, 1,
      );
      tiltTarget = MathUtils.lerp(-Math.PI / 2, -0.22, easeOutCubic(t));
    } else if (progress < 1.0) {
      tiltTarget = (Math.PI / 2) * centerState;
    } else if (progress >= 2.0) {
      tiltTarget = (-Math.PI / 2) * centerState;
    } else {
      tiltTarget = 0;
    }

    if (rawT >= 1) {
      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        tiltTarget,
        0.06,
      );
    } else {
      groupRef.current.rotation.x = (Math.PI / 2);
    }

    // rotation Z (left-low / right-high diagonal in new section)
    const zTarget = isNewSection ? 0.28 : 0;
    groupRef.current.rotation.z = MathUtils.lerp(
      groupRef.current.rotation.z, zTarget, 0.06,
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
function Section1Text({ onAnimDone }: { onAnimDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const firedRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setProgress(window.scrollY / window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fire once after the last text animation finishes (TATTOO fill: 1500ms delay + 400ms duration = 1900ms)
  useEffect(() => {
    if (firedRef.current) return;
    const timer = setTimeout(() => {
      firedRef.current = true;
      onAnimDone();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onAnimDone]);

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
      {/* §2 desktop — Custom Tattoos with button */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{ opacity: opacity2, pointerEvents: opacity2 > 0.5 ? "auto" : "none" }}
      >
        <p className={eyebrow}>Ink Kings</p>
        <h1 className={heading}>Custom Tattoos</h1>
        <p className={body}>
          Large-scale realism, detailed portraits, and wildlife pieces designed and executed in-house.
        </p>
        <div style={{ marginTop: "2rem", display: "flex" }}>
          <a href="/contact" className="gold-btn">
            <span>REQUEST CUSTOM ART</span>
          </a>
        </div>
      </div>

      {/* §3 desktop — Best Parlor with button */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{ opacity: opacity3, pointerEvents: opacity3 > 0.5 ? "auto" : "none" }}
      >
        <p className={eyebrow}>Recognition</p>
        <h1 className={heading}>Best Parlor</h1>
        <p className={body}>
          Voted Best Tattoo Parlor in 2020, 2021, and 2022 by Sun Media Readers.
        </p>
        <div style={{ marginTop: "2rem", display: "flex" }}>
          <a href="/location" className="gold-btn">
            <span>OUR LOCATION</span>
          </a>
        </div>
      </div>

      {/* §4 is rendered as a separate bottom-pinned block outside this container */}
    </div>
  );
}

// ─── artist profiles ─────────────────────────────────────────────────────────
const profiles = [
  {
    name:        "Steve De Los Reyes",
    slug:        "steve",
    status:      "Books Are Currently Closed",
    bio:         "Award-winning artist and owner of Ink Kings Tattoo in Otsego, MN. With over 30 years as an artist and a degree in Technical Illustration from Cal State Fullerton, Steve brings expertise in realism, portraits, and wildlife. Tattooing since 2009 — opening Ink Kings in 2016.",
    photo:       "/Steve.png",
    booksClosed: true,
  },
  {
    name:        "Hunter Hulley",
    slug:        "hunter",
    status:      "Accepting New Clients",
    bio:         "Specializing in geometric and illustrative black and gray tattoos — mandalas, flowers, animals, portraits, and more. 5 years at Ink Kings. Fine Arts graduate, University of Wisconsin La-Crosse.",
    photo:       "/Hunter.png",
    booksClosed: false,
  },
  {
    name:        "Austin Jackels",
    slug:        "austin",
    status:      "Accepting New Clients",
    bio:         "Realism specialist with a passion for color pieces. Apprenticed under Steve De Los Reyes in 2018, working with traditional coil machines and focused on color blending, saturation, and technique.",
    photo:       "/Austin.png",
    booksClosed: false,
  },
  {
    name:        "Nick Gagnon",
    slug:        "nick",
    status:      "Accepting New Clients",
    bio:         "Black and grey realism specialist. Tattooing since 2011, with experience across Minnesota and the Carolinas. Known for surrealism, dark art, horror, wildlife, portraiture, and geometric blackwork.",
    photo:       "/Nick.png",
    booksClosed: false,
  },
  {
    name:        "John Carpenter",
    slug:        "john",
    status:      "Accepting New Clients",
    bio:         "Specializing in black and grey realism and color realism. Looking forward to working with clients on creative, challenging pieces.",
    photo:       "/John.png",
    booksClosed: false,
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
        className="absolute left-1/2 z-20 -translate-x-1/2 top-[5%] md:top-[8%]"
        style={{
          opacity: photoOpacity,
          width: "clamp(320px, 80vw, 480px)",
          height: "clamp(320px, 80vw, 480px)",
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
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {profile.booksClosed ? (
            <>
              <span className="maroon-btn" aria-label="Books closed">
                <span>BOOKS CLOSED</span>
              </span>
              <a href={`/portfolio/${profile.slug}`} className="gold-btn">
                <span>PORTFOLIO</span>
              </a>
            </>
          ) : (
            <>
              <a href="/contact" className="gold-btn">
                <span>BOOK A SESSION</span>
              </a>
              <a href={`/portfolio/${profile.slug}`} className="gold-btn">
                <span>PORTFOLIO</span>
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ─── hero root ────────────────────────────────────────────────────────────────

const SCROLL_KEY = "ik_scroll_pos";

export default function CrownSplitHero() {
  const scrollYRef = useRef(0);

  // Read sessionStorage synchronously so skipIntro is correct on the very first render,
  // preventing even a single frame of the intro animation when returning from a sub-page.
  const [skipIntro] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SCROLL_KEY) !== null;
  });

  const [textAnimDone, setTextAnimDone] = useState(skipIntro);
  const [introDone, setIntroDone] = useState(skipIntro);
  const [scrollProgress, setScrollProgress] = useState(0);

  // On mount: restore saved scroll position and skip intro
  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved !== null) {
      const y = parseInt(saved, 10);
      sessionStorage.removeItem(SCROLL_KEY);
      setTextAnimDone(true);
      setIntroDone(true);
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      });
    }
  }, []);

  // Continuously save scroll position so portfolio pages can restore it
  useEffect(() => {
    const save = () => sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, []);

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
    <section className="relative w-full" style={{ height: "1000vh" }}>
      {/* Anchor for "Meet the Team" deep-links — positioned at the scroll depth where Steve's profile appears */}
      <div id="artists" style={{ position: "absolute", top: "200vh", left: 0, height: 0, pointerEvents: "none" }} />
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
            <CrownScene scrollYRef={scrollYRef} onIntroDone={() => setIntroDone(true)} startZoom={textAnimDone} skipIntro={skipIntro} />
          </Canvas>
        </div>

        <Section1Text onAnimDone={() => setTextAnimDone(true)} />

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
              <div style={{ marginTop: "1.5rem", display: "flex" }}>
                <a href="/contact" className="gold-btn">
                  <span>REQUEST CUSTOM ART</span>
                </a>
              </div>
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
          <h1 className="mb-3 text-5xl font-semibold leading-tight">
            Best Parlor
          </h1>
          <p className="font-body text-sm font-light leading-relaxed text-neutral-300">
            Voted Best Tattoo Parlor in 2020, 2021, and 2022 by Sun Media Readers.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex" }}>
            <a href="/location" className="gold-btn">
              <span>OUR LOCATION</span>
            </a>
          </div>
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
            ? clamp((scrollProgress - photoFadeIn) / 0.25, 0, 1) *
              clamp(1 - (scrollProgress - 6.9) / 0.2, 0, 1)
            : clamp((scrollProgress - photoFadeIn) / 0.25, 0, 1) *
              clamp(1 - (scrollProgress - photoFadeOut) / 0.25, 0, 1);
          const photoOp = isLast
            ? clamp((scrollProgress - photoFadeIn) / 0.25, 0, 1) *
              clamp(1 - (scrollProgress - 6.9) / 0.2, 0, 1)
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

        {/* Last section — centre content (social icons + heading + body + cta) */}
        {(() => {
          const op = clamp((scrollProgress - 7.0) / 0.3, 0, 1);
          if (op <= 0) return null;
          const iconStyle: React.CSSProperties = {
            filter: "brightness(0) invert(1)",
            opacity: 0.7,
          };
          return (
            <div
              style={{
                position: "absolute",
                bottom: "clamp(8rem, 18vh, 14rem)",
                left: 0,
                right: 0,
                zIndex: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0 1.5rem",
                opacity: op,
                pointerEvents: op > 0.5 ? "auto" : "none",
              }}
            >
              <h2
                className="mb-4 text-4xl font-semibold leading-tight md:mb-8 md:text-6xl lg:text-7xl"
                style={{ fontFamily: '"trajan-pro-3", serif', letterSpacing: "0.05em", color: "#f5f5f5" }}
              >
                Claim Your Crown
              </h2>
              <p
                className="font-body text-base font-light leading-relaxed text-neutral-300 md:text-xl"
                style={{ maxWidth: 480, margin: "0 0 1.75rem" }}
              >
                Bring us your idea, your reference, or just a rough concept. Our artists will help turn it into a tattoo you&apos;ll be proud to wear.
              </p>
              <a href="/contact" className="gold-btn">
                <span>REQUEST CUSTOM ART</span>
              </a>

              {/* Social icons */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "1.5rem" }}>
                <a
                  href="https://www.facebook.com/InkKingsTattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ink Kings Tattoo on Facebook"
                >
                  <img src="/facebook.svg" alt="" width={28} height={28} style={iconStyle} />
                </a>
                <a
                  href="https://www.instagram.com/inkkingstattoo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ink Kings Tattoo on Instagram"
                >
                  <img src="/instagram.svg" alt="" width={28} height={28} style={iconStyle} />
                </a>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
