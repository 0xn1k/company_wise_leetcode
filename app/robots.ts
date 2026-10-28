import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// AI assistants/crawlers (ChatGPT, Claude, Perplexity, Google's AI features)
// fetch pages under their own user agents. Listing them explicitly — on top
// of the default "*" allow — keeps this site crawlable by them even if a
// stricter default rule is ever added later.
const AI_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/prep"] },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
