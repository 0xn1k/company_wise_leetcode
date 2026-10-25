import type { MetadataRoute } from "next";
import { getAllCompanySlugs } from "@/lib/data/get-company";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/companies`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/questions`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const companyRoutes: MetadataRoute.Sitemap = getAllCompanySlugs().map((slug) => ({
    url: `${SITE_URL}/companies/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...companyRoutes];
}
