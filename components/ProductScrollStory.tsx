"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 120;
const FRAME_PATH = (n: number) =>
  `/story/air-ultra-6-in-1/frames/frame_${String(n).padStart(3, "0")}.webp`;

interface Chapter {
  id: string;
  start: number;
  end: number;
  label: string;
  tag: string;
  title: string;
  description: string;
  badge: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "monolith",
    start: 0,
    end: 0.22,
    label: "01 · Overview",
    tag: "Monolith Architecture",
    title: "Six instruments. One precision handle.",
    description:
      "Crafted in matte graphite and brushed bronze. Consolidates your entire styling collection into a single balanced instrument.",
    badge: "1000W BLDC Core · Quick-Lock Collar",
  },
  {
    id: "propulsion",
    start: 0.23,
    end: 0.52,
    label: "02 · Propulsion",
    tag: "Powerplant & Thermal Core",
    title: "1000W digital turbine meets micro-control.",
    description:
      "The casing separates to reveal a brushless turbine driving 12.5 m/s airspeed with a pulse-width modulated heating element.",
    badge: "12.5 m/s Air Velocity · Smart Sensor PCB",
  },
  {
    id: "modular",
    start: 0.53,
    end: 0.78,
    label: "03 · Modular System",
    tag: "Toolhead Interchange",
    title: "Click-lock swap mid-styling flow.",
    description:
      "Attachments disconnect and align: 3x auto-wrap curling barrels, volumizing oval brush, smoothing comb, and high-velocity drying nozzles.",
    badge: "Quick-Lock Radial Mount · Symmetrical Barrels",
  },
  {
    id: "exploded",
    start: 0.79,
    end: 1.0,
    label: "04 · Anatomy",
    tag: "Dynamic Exploded Breakdown",
    title: "Engineered to the last millimeter.",
    description:
      "Full internal breakdown from intake filter to magnetic blower head. Every component exposed in its precise aerodynamic alignment.",
    badge: "Dual Thermal Cut-Off · 6 Interchangeable Heads",
  },
];

const COMPONENT_DETAILS: { [key: string]: { name: string; role: string } } = {
  motor: {
    name: "Internal BLDC Motor",
    role: "High-pressure turbine delivers constant 12.5 m/s airflow without rpm loss.",
  },
  pcb: {
    name: "Control PCB",
    role: "Sub-millisecond thermal sampling prevents heat spikes across all 3 heat tiers.",
  },
  element: {
    name: "Precision Heating Element",
    role: "Coiled thermal alloy lattice warms air uniformly across the barrel diameter.",
  },
  barrels: {
    name: "Air Curling Barrels (3x)",
    role: "Coanda aerodynamic flow wraps hair automatically without manual twisting.",
  },
  brushes: {
    name: "Volumizing & Smoothing Brushes",
    role: "Ceramic-coated nylon bristles direct ionic air to lift roots and seal the cuticle.",
  },
  diffuser: {
    name: "Diffuser & Blower Head",
    role: "Acoustic chamber converts chassis into a high-pressure dispersed drying tool.",
  },
};

export function ProductScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFrame, setActiveFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Smooth lerp progress state
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Preload frames with progressive feedback
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []);

  // Draw current frame to canvas full-screen full-bleed
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = images[frameIndex - 1];
      if (!img || !img.complete) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clean background fill matching the studio white frame background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Scale to fit viewport full-bleed cleanly while leaving breathing room for bottom HUD
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    },
    [images]
  );

  // Scroll tracking and smooth interpolation loop
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      targetProgress.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let lastFrame = 1;
    const renderLoop = () => {
      if (!isPlaying) {
        currentProgress.current +=
          (targetProgress.current - currentProgress.current) * 0.16;
      }

      const frameNumber = Math.min(
        Math.max(Math.round(currentProgress.current * (TOTAL_FRAMES - 1)) + 1, 1),
        TOTAL_FRAMES
      );

      if (frameNumber !== lastFrame) {
        lastFrame = frameNumber;
        setActiveFrame(frameNumber);
        drawFrame(frameNumber);
      }

      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [drawFrame, isPlaying]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(activeFrame);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame, activeFrame]);

  // Initial paint when first frame is ready
  useEffect(() => {
    if (images.length > 0 && images[0]?.complete) {
      drawFrame(1);
    }
  }, [images, drawFrame]);

  // Autoplay loop when play button is clicked
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      currentProgress.current += 1 / TOTAL_FRAMES;
      if (currentProgress.current > 1) {
        currentProgress.current = 0;
      }
      targetProgress.current = currentProgress.current;
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Jump to specific progress
  const jumpToProgress = (progressVal: number) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.offsetTop;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const scrollTarget = containerTop + totalScrollable * progressVal;
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  const progress = currentProgress.current;
  const currentChapter =
    CHAPTERS.find((c) => progress >= c.start && progress <= c.end) || CHAPTERS[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-ink"
      style={{ height: "260vh" }}
      aria-label="AirUltra 6-in-1 Full-Bleed 3D Scroll Story"
    >
      {/* Sticky Full-Screen Full-Bleed Stage */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-between bg-white">
        
        {/* Top Floating Glassmorphic Control Bar */}
        <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 backdrop-blur-md bg-white/85 border-b border-hairline/60">
          <div className="flex items-center gap-3">
            <span className="t-label bg-accent text-ink px-2 py-0.5 text-[0.625rem] font-semibold rounded-xs">
              3D Story
            </span>
            <span className="t-label text-ink font-semibold tracking-wider text-xs hidden sm:inline">
              AirUltra 6-in-1
            </span>
            <span className="hidden md:inline text-hairline">|</span>
            <span className="t-label text-graphite hidden md:inline">
              Dynamic Exploded Disassembly
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Auto-Play Toggle */}
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="flex items-center gap-2 px-3 py-1.5 border border-hairline bg-white text-xs font-mono transition-colors hover:border-accent"
              title={isPlaying ? "Pause autoplay" : "Auto-play disassembly"}
            >
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isPlaying ? "bg-ember animate-pulse" : "bg-accent"
                }`}
              />
              <span className="uppercase tracking-wider text-[0.6875rem]">
                {isPlaying ? "Pause" : "Auto Play"}
              </span>
            </button>

            {/* Inspect 2K Blueprint Modal Trigger */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-hairline bg-ink text-white text-xs font-mono transition-colors hover:bg-accent hover:text-ink"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
              <span className="hidden sm:inline">Inspect 2K Blueprint</span>
              <span className="sm:hidden">2K Master</span>
            </button>

            {/* Frame Counter */}
            <div className="t-data text-xs text-graphite bg-paper px-2.5 py-1.5 border border-hairline font-mono">
              {String(activeFrame).padStart(3, "0")}/{TOTAL_FRAMES}
            </div>
          </div>
        </div>

        {/* Central Full-Bleed Canvas Area (Unobstructed by text boxes) */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
          {/* Loading Indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-white/95 backdrop-blur-sm">
              <div className="w-48 h-1 bg-hairline overflow-hidden mb-3">
                <div
                  className="h-full bg-accent transition-all duration-200"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="t-label text-graphite">
                Loading 3D frames · {loadProgress}%
              </p>
            </div>
          )}

          {/* Full-bleed Canvas - no borders, no padding, zero obstruction */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain relative z-10"
          />

          {/* Optional Interactive Anatomy Inspector Chips: Placed in a subtle top-right strip so it NEVER covers product */}
          {progress >= 0.75 && (
            <div className="absolute top-4 right-4 sm:right-8 z-20 hidden lg:flex flex-col items-end gap-1.5 animate-in fade-in duration-300">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 border border-hairline shadow-sm">
                <span className="t-label text-[0.625rem] text-graphite px-2 font-mono">
                  Inspect:
                </span>
                {Object.entries(COMPONENT_DETAILS).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() =>
                      setActiveComponent(activeComponent === key ? null : key)
                    }
                    className={`px-2 py-1 text-[0.6875rem] font-mono border transition-all ${
                      activeComponent === key
                        ? "bg-accent text-white border-accent"
                        : "bg-paper hover:bg-white border-hairline text-ink"
                    }`}
                  >
                    {item.name.replace(/ \(3x\)/, "")}
                  </button>
                ))}
              </div>

              {activeComponent && (
                <div className="bg-white/95 backdrop-blur-md p-3 border border-hairline shadow-md max-w-xs text-right animate-in fade-in slide-in-from-top-2">
                  <p className="font-semibold text-xs text-ink">
                    {COMPONENT_DETAILS[activeComponent].name}
                  </p>
                  <p className="mt-1 text-[0.75rem] text-graphite leading-normal">
                    {COMPONENT_DETAILS[activeComponent].role}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Narrative HUD & Scrubbing Control Bar (Docked at bottom, never in between product) */}
        <div className="relative z-30 w-full backdrop-blur-md bg-white/92 border-t border-hairline/70 px-4 sm:px-8 lg:px-12 py-3.5 shadow-lg">
          {/* Narrative Content: Clean horizontal layout positioned safely at the bottom */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.5fr_0.8fr] gap-4 items-center mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="t-label text-accent font-semibold text-[0.6875rem]">
                  {currentChapter.tag}
                </span>
                <span className="text-hairline">·</span>
                <span className="t-label text-graphite text-[0.6875rem]">
                  {currentChapter.label}
                </span>
              </div>
              <h3 className="t-display text-lg sm:text-xl lg:text-2xl mt-0.5 text-ink leading-tight">
                {currentChapter.title}
              </h3>
            </div>

            <p className="text-xs text-graphite leading-relaxed hidden sm:block">
              {currentChapter.description}
            </p>

            <div className="text-right hidden md:block">
              <span className="t-label text-[0.625rem] text-graphite block">
                Engineering Spec
              </span>
              <span className="t-data text-xs font-semibold text-ink mt-0.5 inline-block bg-paper px-2.5 py-1 border border-hairline">
                {currentChapter.badge}
              </span>
            </div>
          </div>

          {/* Chapter Quick Jump Buttons */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-2.5">
            {CHAPTERS.map((c) => {
              const isActive = progress >= c.start && progress <= c.end;
              return (
                <button
                  key={c.id}
                  onClick={() => jumpToProgress(c.start)}
                  className={`text-left py-1 px-2 border-t-2 transition-all ${
                    isActive
                      ? "border-accent text-ink"
                      : "border-hairline text-graphite hover:text-ink hover:border-graphite"
                  }`}
                >
                  <span className="t-label block text-[0.625rem] truncate">
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Scrub Track */}
          <div className="flex items-center gap-3">
            <span className="t-label text-[0.625rem] text-graphite hidden sm:inline font-mono">
              Scrub
            </span>
            <div
              role="slider"
              aria-label="Story scrubber"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = Math.min(
                  Math.max((e.clientX - rect.left) / rect.width, 0),
                  1
                );
                jumpToProgress(clickPos);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") jumpToProgress(Math.min(progress + 0.05, 1));
                if (e.key === "ArrowLeft") jumpToProgress(Math.max(progress - 0.05, 0));
              }}
              className="group relative flex-1 h-3 flex items-center cursor-pointer"
            >
              <div className="w-full h-1.5 group-hover:h-2 bg-hairline rounded-full overflow-hidden transition-all">
                <div
                  className="h-full bg-accent transition-all duration-75"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
            <span className="t-data text-xs text-graphite font-mono">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* High-Resolution 2K Blueprint Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 lg:p-8 animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl max-h-[92vh] bg-white border border-hairline overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-paper">
              <div>
                <p className="t-label text-accent font-semibold">
                  Ultra-HD Blueprint
                </p>
                <h4 className="t-display text-lg mt-0.5">
                  Dynamic Exploded View (2752 × 1536)
                </h4>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="px-3 py-1.5 border border-hairline hover:bg-paper-alt transition-colors font-mono text-xs uppercase"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative flex-1 overflow-auto bg-white p-4 flex items-center justify-center">
              <Image
                src="/story/air-ultra-6-in-1/exploded-view-2k.jpg"
                alt="Exploded view of AirUltra 6-in-1 components"
                width={2752}
                height={1536}
                className="w-full h-auto max-h-[75vh] object-contain"
                priority
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 border-t border-hairline bg-paper text-xs text-graphite">
              <span className="t-label">
                Complete Component Nomenclature & Airflow Channels
              </span>
              <a
                href="/story/air-ultra-6-in-1/exploded-view-2k.jpg"
                target="_blank"
                rel="noreferrer"
                className="t-label text-accent hover:underline flex items-center gap-1"
              >
                Open Original 2K Master ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
