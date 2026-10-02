"use client";

import { useEffect, useRef, useState } from "react";

interface FilmDetails {
  badge: string;
  tag: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  chapters: { time: number; label: string; desc: string }[];
}

const FILM_CONFIG: Record<string, FilmDetails> = {
  "air-ultra-pro": {
    badge: "Air Ultra Pro · Action Film",
    tag: "Series 5 · 1300W Precision",
    title: "Pro performance in motion",
    description:
      "Watch the 1300W digital brushless motor and fluted Coanda barrels wrap curls, lift roots, and dry hair with salon precision.",
    src: "/videos/air-ultra-pro-action-film.mp4",
    poster: "/videos/air-ultra-pro-action-film-poster.webp",
    chapters: [
      { time: 0, label: "01 · Stand & Power", desc: "Precision gunmetal chassis and 1300W high-speed BLDC turbine" },
      { time: 5, label: "02 · Pre-Dry Nozzle", desc: "Concentrated airflow rapidly prepares hair for styling" },
      { time: 10, label: "03 · Fluted Auto-Wrap", desc: "Coanda aerodynamic flutes coil hair without heat damage" },
      { time: 16, label: "04 · Gloss & Shine", desc: "Long-lasting voluminous bounce with high shine" },
    ],
  },
  "air-ultra-6-in-1": {
    badge: "AirUltra 6-in-1 · Action Film",
    tag: "Multi-Styler · 6 Interchangeable Heads",
    title: "Effortless styles in action",
    description:
      "Watch the AirUltra 6-in-1 switch seamlessly from high-speed pre-drying to auto-wrap curling and smooth root volumizing.",
    src: "/videos/air-ultra-action-film.mp4",
    poster: "/videos/air-ultra-action-film-poster.webp",
    chapters: [
      { time: 0, label: "01 · Dock & Attach", desc: "Magnetic quick-release collar locks heads in one click" },
      { time: 6, label: "02 · High-Velocity Dry", desc: "12.5 m/s focused airflow pre-dries without scorched heat" },
      { time: 11, label: "03 · Auto-Wrap Curl", desc: "Aerodynamic airflow wraps hair symmetrically without twisting" },
      { time: 16, label: "04 · Salon Finish", desc: "Continuous ionic discharge leaves hair smooth and radiant" },
    ],
  },
  "silkcomb-cordless": {
    badge: "Silkcomb Cordless · Action Film",
    tag: "Cordless Straightener · 4000mAh Battery",
    title: "Cordless freedom in motion",
    description:
      "Watch the Silkcomb Cordless glide effortlessly through strands with ceramic PTC heat and negative ions, delivering naturally sleek, frizz-free hair anywhere.",
    src: "/videos/silkcomb-action-film.mp4",
    poster: "/videos/silkcomb-action-film-poster.webp",
    chapters: [
      { time: 0, label: "01 · Precision 3D Reveal", desc: "Ergonomic Sky Blue chassis with real-time digital LCD temperature readout" },
      { time: 2, label: "02 · Instant Ceramic Glide", desc: "Anti-scald ceramic bristles heat evenly for smooth, effortless passes" },
      { time: 4, label: "03 · Negative Ion Shine", desc: "Negative ion stream eliminates static and seals the hair cuticle" },
      { time: 6, label: "04 · Salon-Grade Finish", desc: "Bouncy, naturally straight, and radiant hair with zero cords attached" },
    ],
  },
};

export function ActionStyleFilm({ handle = "air-ultra-6-in-1" }: { handle?: string }) {
  const film = FILM_CONFIG[handle] || FILM_CONFIG["air-ultra-6-in-1"];
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(20);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Autoplay when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
              setIsPlaying(true);
            } else {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 20);
  };

  const seekTo = (sec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = sec;
    setCurrentTime(sec);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentChapter =
    [...film.chapters].reverse().find((c) => currentTime >= c.time) || film.chapters[0];

  return (
    <section className="bg-ink text-paper py-20 lg:py-28 overflow-hidden">
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-10 border-b border-hairline-dark">
          <div>
            <div className="flex items-center gap-3">
              <span className="t-label bg-accent text-ink px-2.5 py-1 font-semibold rounded-xs">
                In-Action Film
              </span>
              <span className="t-label text-graphite tracking-widest">
                {film.tag}
              </span>
            </div>
            <h2 className="t-display mt-4 text-[clamp(2.25rem,6vw,4.25rem)] text-white">
              {film.title}
            </h2>
          </div>
          <p className="max-w-[42ch] text-graphite text-base leading-relaxed">
            {film.description}
          </p>
        </div>

        {/* Video Player Theater */}
        <div
          ref={containerRef}
          className="relative mt-12 overflow-hidden border border-hairline-dark bg-black shadow-2xl group"
        >
          {/* Main Video Stream */}
          <div className="relative aspect-16/9 w-full bg-black cursor-pointer" onClick={togglePlay}>
            <video
              ref={videoRef}
              src={film.src}
              poster={film.poster}
              playsInline
              loop
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="h-full w-full object-cover"
            />

            {/* Play / Pause Big Center Overlay Indicator when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-all">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent bg-ink/80 text-white shadow-xl transition-transform hover:scale-110">
                  <svg className="h-8 w-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Top Overlay Badge & Sound Trigger */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
              <div className="pointer-events-auto flex items-center gap-2 bg-ink/80 backdrop-blur-md px-3 py-1.5 border border-hairline-dark text-xs font-mono text-paper-alt">
                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>{currentChapter.label}</span>
              </div>

              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="pointer-events-auto flex items-center gap-2 bg-ink/85 backdrop-blur-md px-3.5 py-1.5 border border-hairline-dark text-xs font-mono text-paper hover:border-accent hover:text-accent transition-colors"
                title={isMuted ? "Click to unmute" : "Mute audio"}
              >
                {isMuted ? (
                  <>
                    <svg className="w-4 h-4 text-graphite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                    <span>Unmute Audio</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-accent animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    <span className="text-accent">Sound On</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Player Timeline & Controls Bar */}
          <div className="bg-ink-soft p-4 sm:p-6 border-t border-hairline-dark">
            {/* Timeline Scrubber */}
            <div
              role="slider"
              aria-label="Video scrubber"
              aria-valuenow={Math.round(progressPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
                seekTo(pos * duration);
              }}
              className="group/scrub relative h-3 flex items-center cursor-pointer mb-4"
            >
              <div className="w-full h-1 group-hover/scrub:h-2 bg-hairline-dark rounded-full overflow-hidden transition-all">
                <div
                  className="h-full bg-accent transition-all duration-75"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Chapter Jump Rail */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {film.chapters.map((c) => {
                const active =
                  currentTime >= c.time &&
                  (film.chapters[film.chapters.indexOf(c) + 1]
                    ? currentTime < film.chapters[film.chapters.indexOf(c) + 1].time
                    : true);
                return (
                  <button
                    key={c.label}
                    onClick={() => seekTo(c.time)}
                    className={`text-left p-2 border transition-all ${
                      active
                        ? "border-accent bg-paper/5 text-white"
                        : "border-hairline-dark/60 text-graphite hover:text-white hover:border-graphite"
                    }`}
                  >
                    <p className="t-label text-[0.625rem] truncate">{c.label}</p>
                    <p className="text-[0.6875rem] text-graphite truncate mt-0.5 hidden sm:block">
                      {c.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Control Buttons & Timestamp */}
            <div className="flex items-center justify-between text-xs text-graphite font-mono">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-1.5 text-paper hover:text-accent transition-colors"
                >
                  {isPlaying ? "❚❚ Pause" : "▶ Play"}
                </button>
                <span>
                  {Math.floor(currentTime)}s / {Math.floor(duration)}s
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-graphite">{film.badge}</span>
                <button
                  onClick={toggleFullscreen}
                  className="hover:text-accent transition-colors"
                  title="Toggle Fullscreen"
                >
                  [ ⛶ Fullscreen ]
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
