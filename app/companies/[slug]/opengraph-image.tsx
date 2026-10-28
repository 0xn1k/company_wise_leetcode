import { ImageResponse } from "next/og";
import { getCompany, getAllCompanySlugs } from "@/lib/data/get-company";
import { SITE_NAME } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllCompanySlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const company = getCompany(slug);
  const name = company?.name ?? "Company";
  const count = company?.timeframes.all.length ?? 0;

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
            fontSize: 84,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            marginTop: 24,
            color: "#a1a1aa",
          }}
        >
          {count} LeetCode interview questions, ranked by frequency
        </div>
      </div>
    ),
    { ...size }
  );
}
