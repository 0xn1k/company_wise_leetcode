import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            color: "#4ade80",
            letterSpacing: -0.5,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          Prep by company,
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            color: "#4ade80",
          }}
        >
          not by chance.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 32,
            color: "#a1a1aa",
          }}
        >
          470 companies · every most-asked LeetCode question, tracked
        </div>
      </div>
    ),
    { ...size }
  );
}
