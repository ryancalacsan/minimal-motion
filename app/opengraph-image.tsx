import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Minimal Motion — Typography in Motion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#f0f0f0",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            textAlign: "center",
          }}
        >
          Minimal
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: "#f0f0f0",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            textAlign: "center",
          }}
        >
          Motion
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#a0a0a0",
            marginTop: 40,
            fontStyle: "italic",
            letterSpacing: "0.05em",
          }}
        >
          where typography meets interaction
        </div>
      </div>
    ),
    { ...size }
  );
}
