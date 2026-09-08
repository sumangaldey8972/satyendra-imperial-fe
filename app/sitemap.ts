import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.imperialsatyendra.com";
  return [{
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    images: [
      `${siteUrl}/images/imperial-courtyard-day.png`,
      `${siteUrl}/images/imperial-suite.png`,
      `${siteUrl}/images/imperial-celebration.png`,
      `${siteUrl}/images/imperial-dining.png`,
      `${siteUrl}/images/story-morning-suite.png`,
      `${siteUrl}/images/story-welcome-family.png`,
      `${siteUrl}/images/story-afternoon-dining.png`,
      `${siteUrl}/images/story-wedding-arrival.png`,
      `${siteUrl}/images/story-moonlit-balcony.png`,
    ],
  }];
}
