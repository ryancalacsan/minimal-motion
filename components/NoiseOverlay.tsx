"use client"

export default function NoiseOverlay() {
  return (
    <>
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-9997"
        style={{
          filter: "url(#noise-filter)",
          opacity: 0.04,
        }}
      />
    </>
  )
}
