/**
 * Cross-section of a styling barrel. Air arrives in a straight line, meets the
 * curved surface, and stays attached to it instead of carrying on — the Coanda
 * effect. Hair gets dragged along the same path. This is the mechanism the
 * whole Air range is built on, so it gets drawn rather than described.
 */
export function CoandaDiagram({ className = "" }: { className?: string }) {
  // Barrel is centred at (240,170) with r=58. Each flow line is a straight
  // lead-in at the barrel's tangent height, then an arc concentric to it.
  const flows = [
    { r: 84, w: 1 },
    { r: 70, w: 1.4 },
    { r: 63, w: 1 },
  ];

  return (
    <svg
      viewBox="0 0 512 320"
      className={className}
      fill="none"
      role="img"
      aria-label="Cross-section of a styling barrel: airflow arrives straight, attaches to the curved surface, and wraps 180 degrees, pulling hair with it."
    >
      {/* Barrel */}
      <circle cx="240" cy="170" r="58" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.6" />
      <circle cx="240" cy="170" r="42" stroke="var(--color-ink)" strokeWidth="0.7" opacity="0.35" />
      <circle cx="240" cy="170" r="4" fill="var(--color-ink)" />

      {/* Airflow: straight until the surface, attached after it. */}
      {flows.map(({ r, w }) => (
        <path
          key={r}
          d={`M 24 ${170 - r} L 240 ${170 - r} A ${r} ${r} 0 0 1 240 ${170 + r}`}
          stroke="var(--color-accent)"
          strokeWidth={w}
          strokeLinecap="round"
        />
      ))}

      {/* Direction markers on the fastest line. */}
      <path d="M 120 94 l 12 6 -12 6" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 306 194 l 4 13 -13 3" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Hair, following the same attached path and leaving with the curl in it. */}
      <path
        d="M 24 112 L 240 112 A 58 58 0 0 1 240 228 C 214 244 196 258 190 282"
        stroke="var(--color-ink)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Callouts — leader lines, set in the utility face. */}
      <g fontFamily="var(--font-jetbrains), monospace" fontSize="9" letterSpacing="1.6" fill="var(--color-graphite)">
        <line x1="60" y1="70" x2="60" y2="86" stroke="var(--color-hairline)" strokeWidth="1" />
        <text x="60" y="60" textAnchor="middle">AIRFLOW IN</text>

        <line x1="240" y1="112" x2="366" y2="112" stroke="var(--color-hairline)" strokeWidth="1" />
        <circle cx="240" cy="112" r="2.4" fill="var(--color-ink)" />
        <text x="372" y="109">ATTACHMENT POINT</text>
        <text x="372" y="122" fill="var(--color-ink)">HAIR MEETS SURFACE</text>

        <line x1="298" y1="170" x2="366" y2="170" stroke="var(--color-hairline)" strokeWidth="1" />
        <text x="372" y="167">LOW PRESSURE</text>
        <text x="372" y="180" fill="var(--color-ink)">HOLDS THE WRAP</text>

        <line x1="190" y1="282" x2="120" y2="282" stroke="var(--color-hairline)" strokeWidth="1" />
        <text x="114" y="279" textAnchor="end">CURL LEAVES</text>
        <text x="114" y="292" textAnchor="end" fill="var(--color-ink)">SHAPED BY AIR</text>
      </g>
    </svg>
  );
}

/**
 * The heat scale. Ember is the only place a second colour appears, and it
 * appears because the content is literally temperature.
 */
export function HeatScale() {
  const stops = [
    { c: 50, use: "Delicate work" },
    { c: 78, use: "Everyday drying" },
    { c: 105, use: "Sets a look fast" },
  ];

  return (
    <div>
      <div
        className="h-1.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-hairline) 0%, #ffb08c 46%, var(--color-ember) 100%)",
        }}
      />
      <dl className="mt-4 grid grid-cols-3 gap-3">
        {stops.map((s) => (
          <div key={s.c} className="border-t border-hairline pt-3">
            <dt className="t-data text-base">
              {s.c}
              <span className="text-graphite"> °C</span>
            </dt>
            <dd className="t-label mt-1 text-graphite">{s.use}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
