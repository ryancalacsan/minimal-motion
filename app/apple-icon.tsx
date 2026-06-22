import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// iOS home-screen icon — monochrome "M" monogram matching app/icon.svg
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f0f0f0",
          fontSize: 128,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: "-0.05em",
        }}
      >
        M
      </div>
    ),
    { ...size }
  )
}
