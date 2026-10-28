import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", fr: "/fr", priority: 1 },
    { path: "/services", fr: "/fr/services", priority: 0.9 }
  ];
  return pages.flatMap(({ path, fr, priority }) => {
    const languages = { en: `${siteUrl}${path === "/" ? "" : path}`, fr: `${siteUrl}${fr}` };
    return [
      { url: languages.en, lastModified: new Date(), changeFrequency: "weekly" as const, priority, alternates: { languages } },
      { url: languages.fr, lastModified: new Date(), changeFrequency: "weekly" as const, priority: priority - 0.1, alternates: { languages } }
    ];
  });
}
