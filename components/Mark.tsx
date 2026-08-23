/**
 * The Orynthis mark, redrawn as vector so it survives on ink as well as paper.
 * A closed ring with a spiral hooking inward — the same figure the aperture
 * motif and the airflow diagram are built from.
 */
export function Mark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14.4" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M22.6 9.9a8.6 8.6 0 1 0 2 7.7c.7-4-1.9-7.2-5-7.2-2.7 0-4.9 2.1-4.9 4.7 0 2.2 1.7 3.8 3.7 3.8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-[1.35em] w-[1.35em] shrink-0" />
      <span
        className="t-display text-[0.95em] leading-none"
        style={{ letterSpacing: "0.06em" }}
      >
        Orynthis
      </span>
    </span>
  );
}

/**
 * Signature: concentric rings that counter-rotate and breathe. Read it as an
 * aperture, or as air leaving a nozzle — both are the brand.
 */
export function Aperture({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const line = tone === "ink" ? "#0b0c0e" : "#f8f9fa";
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="breathe">
        {/* Still rings — the structure air moves through. */}
        {[196, 162, 128, 94, 60].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            stroke={line}
            strokeWidth={i === 0 ? 1.4 : 0.7}
            opacity={0.16 + i * 0.05}
          />
        ))}
      </g>

      {/* Two dashed rings turning against each other: the vortex. */}
      <g className="spin-slow">
        <circle
          cx="200"
          cy="200"
          r="179"
          stroke={line}
          strokeWidth="1"
          strokeDasharray="2 16"
          opacity="0.5"
        />
        <circle
          cx="200"
          cy="200"
          r="145"
          stroke="#2b34f0"
          strokeWidth="1.6"
          strokeDasharray="64 300"
          strokeLinecap="round"
        />
      </g>
      <g className="spin-rev">
        <circle
          cx="200"
          cy="200"
          r="111"
          stroke={line}
          strokeWidth="1"
          strokeDasharray="40 220"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      {/* Cardinal ticks — a measuring instrument, not decoration. */}
      {[0, 90, 180, 270].map((a) => (
        <line
          key={a}
          x1="200"
          y1="4"
          x2="200"
          y2="18"
          stroke={line}
          strokeWidth="1.2"
          opacity="0.45"
          transform={`rotate(${a} 200 200)`}
        />
      ))}
    </svg>
  );
}
