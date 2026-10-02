"use client";

import { createElement, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Product3DViewerProps {
  src: string;
  poster: string;
  title: string;
}

export function Product3DViewer({ src, poster, title }: Product3DViewerProps) {
  const viewerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeAngle, setActiveAngle] = useState<"perspective" | "top" | "front" | "side">("perspective");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!customElements.get("model-viewer")) {
        const script = document.createElement("script");
        script.type = "module";
        script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js";
        script.onload = () => setIsReady(true);
        document.head.appendChild(script);
      } else {
        setIsReady(true);
      }
    }
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleProgress = (event: any) => {
      setProgress(Math.round((event.detail.totalProgress || 0) * 100));
    };

    const handleLoad = () => {
      setIsLoaded(true);
    };

    viewer.addEventListener("progress", handleProgress);
    viewer.addEventListener("load", handleLoad);

    return () => {
      viewer.removeEventListener("progress", handleProgress);
      viewer.removeEventListener("load", handleLoad);
    };
  }, [isReady]);

  const setCameraAngle = (angle: "perspective" | "top" | "front" | "side", orbit: string) => {
    setActiveAngle(angle);
    if (viewerRef.current) {
      viewerRef.current.cameraOrbit = orbit;
      viewerRef.current.fieldOfView = "45deg";
      viewerRef.current.jumpCameraToGoal?.();
    }
  };

  const resetView = () => {
    setCameraAngle("perspective", "45deg 60deg 2m");
    setAutoRotate(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-hairline bg-gradient-to-b from-[#fbfbfa] to-[#ecece9] shadow-sm select-none"
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline px-6 py-4 bg-white/70 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </span>
          <div>
            <h3 className="t-display-tight text-sm font-semibold tracking-wide text-ink">
              Interactive 3D Hardware Explorer
            </h3>
            <p className="t-label text-[0.625rem] text-graphite">
              Click & drag to rotate 360° · Scroll or pinch to zoom
            </p>
          </div>
        </div>

        {/* Camera Preset Quick Buttons */}
        <div className="flex items-center gap-1.5 bg-[#f0eee9] p-1 rounded-lg border border-hairline text-xs">
          <button
            type="button"
            onClick={() => setCameraAngle("perspective", "45deg 60deg auto")}
            className={`px-3 py-1 rounded-md transition-all font-medium ${
              activeAngle === "perspective"
                ? "bg-white text-ink shadow-xs"
                : "text-graphite hover:text-ink"
            }`}
          >
            Perspective
          </button>
          <button
            type="button"
            onClick={() => setCameraAngle("top", "0deg 0deg auto")}
            className={`px-3 py-1 rounded-md transition-all font-medium ${
              activeAngle === "top"
                ? "bg-white text-ink shadow-xs"
                : "text-graphite hover:text-ink"
            }`}
          >
            Cooking Surface
          </button>
          <button
            type="button"
            onClick={() => setCameraAngle("front", "0deg 75deg auto")}
            className={`px-3 py-1 rounded-md transition-all font-medium ${
              activeAngle === "front"
                ? "bg-white text-ink shadow-xs"
                : "text-graphite hover:text-ink"
            }`}
          >
            Control Dial
          </button>
          <button
            type="button"
            onClick={() => setCameraAngle("side", "90deg 75deg auto")}
            className={`px-3 py-1 rounded-md transition-all font-medium ${
              activeAngle === "side"
                ? "bg-white text-ink shadow-xs"
                : "text-graphite hover:text-ink"
            }`}
          >
            Profile
          </button>
        </div>
      </div>

      {/* 3D Canvas / Model-Viewer Container */}
      <div className="relative w-full h-[420px] md:h-[540px] flex items-center justify-center">
        {/* Loading overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-paper-alt/80 backdrop-blur-xs p-6 text-center">
            <div className="relative w-40 h-28 mb-4 opacity-75">
              <Image
                src={poster}
                alt={title}
                fill
                className="object-contain"
              />
            </div>
            <p className="t-label text-xs font-semibold text-ink mb-2">
              Loading High-Definition 3D Model...
            </p>
            <div className="w-56 h-1.5 bg-hairline rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-accent transition-all duration-300 rounded-full"
                style={{ width: `${progress || 10}%` }}
              />
            </div>
            <span className="t-data text-xs text-graphite font-mono">
              {progress > 0 ? `${progress}%` : "Initializing WebGL"}
            </span>
          </div>
        )}

        {isReady &&
          createElement("model-viewer", {
            ref: viewerRef,
            src: src,
            poster: poster,
            alt: title,
            "auto-rotate": autoRotate ? "true" : undefined,
            "auto-rotate-delay": "1000",
            "rotation-per-second": "20deg",
            "camera-controls": "true",
            "shadow-intensity": "1.2",
            "shadow-softness": "0.8",
            exposure: "1.05",
            loading: "lazy",
            reveal: "auto",
            "interaction-prompt": "none",
            "camera-orbit": "45deg 60deg auto",
            style: {
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              outline: "none",
            },
          })}

        {/* Floating action overlay at bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between pointer-events-none gap-2">
          {/* Status pill */}
          <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-hairline shadow-xs flex items-center gap-2">
            <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-graphite">
              360° Realtime 3D
            </span>
            <span className="h-1 w-1 rounded-full bg-graphite" />
            <span className="text-[0.6875rem] font-medium text-ink">
              InfraNova 3500W
            </span>
          </div>

          {/* Quick interactive tools */}
          <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-hairline shadow-xs">
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              aria-label={autoRotate ? "Pause auto-rotation" : "Start auto-rotation"}
              className={`px-3 py-1 text-xs rounded-full transition-colors flex items-center gap-1.5 ${
                autoRotate
                  ? "bg-accent/20 text-accent font-semibold"
                  : "bg-paper-alt text-graphite hover:text-ink"
              }`}
            >
              <span>{autoRotate ? "Auto-Spin ON" : "Auto-Spin OFF"}</span>
            </button>
            <button
              type="button"
              onClick={resetView}
              aria-label="Reset camera angle"
              className="px-3 py-1 text-xs rounded-full bg-paper-alt text-graphite hover:text-ink transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Toggle full screen"
              className="px-3 py-1 text-xs rounded-full bg-paper-alt text-graphite hover:text-ink transition-colors"
            >
              Fullscreen
            </button>
          </div>
        </div>
      </div>

      {/* Feature callouts bar below 3D model */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-hairline border-t border-hairline bg-white/60 text-center py-4">
        <div className="px-4 py-2">
          <span className="t-label text-[0.625rem] text-graphite block">HEATING DECK</span>
          <strong className="t-display-tight text-xs md:text-sm text-ink block mt-0.5">Heavy Crystal Glass</strong>
        </div>
        <div className="px-4 py-2">
          <span className="t-label text-[0.625rem] text-graphite block">CONTROLS</span>
          <strong className="t-display-tight text-xs md:text-sm text-ink block mt-0.5">Touch & Rotary Dial</strong>
        </div>
        <div className="px-4 py-2">
          <span className="t-label text-[0.625rem] text-graphite block">HANDLES</span>
          <strong className="t-display-tight text-xs md:text-sm text-ink block mt-0.5">Brushed Steel Grab Rails</strong>
        </div>
        <div className="px-4 py-2">
          <span className="t-label text-[0.625rem] text-graphite block">THERMAL CORE</span>
          <strong className="t-display-tight text-xs md:text-sm text-ink block mt-0.5">3500W Far-Infrared</strong>
        </div>
      </div>
    </div>
  );
}
