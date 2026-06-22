import { ImageResponse } from "next/og";

// Standard Open Graph size; auto-wired as the site's og:image.
export const runtime = "edge";
export const alt = "Tushar Singh Tomar — SOC Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#080010",
          padding: "80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Kali dragon watermark (centered, faint) */}
        <div
          style={{
            position: "absolute",
            right: 40,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            fontSize: 460,
            lineHeight: 1,
            color: "#9d00ff",
            opacity: 0.1,
          }}
        >
          🐉
        </div>

        {/* prompt label */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#ff003c",
            fontFamily: "monospace",
            marginBottom: 16,
          }}
        >
          {">_ whoami"}
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            color: "#e8e8f0",
            lineHeight: 1.05,
          }}
        >
          Tushar Singh Tomar
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#9d00ff",
            marginTop: 20,
          }}
        >
          SOC Analyst | Threat Hunter | Blue Teamer
        </div>

        {/* Social row */}
        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 24,
            color: "#8888aa",
            fontFamily: "monospace",
            marginTop: 48,
          }}
        >
          <span>LinkedIn</span>
          <span>·</span>
          <span>GitHub</span>
          <span>·</span>
          <span>TryHackMe</span>
          <span>·</span>
          <span>HackTheBox</span>
        </div>

        {/* bottom accent line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 8,
            background: "linear-gradient(90deg,#9d00ff,#ff003c)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
