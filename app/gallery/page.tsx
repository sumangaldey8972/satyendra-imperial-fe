import type { Metadata } from "next";
import GalleryPage from "../components/GalleryPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imperialsatyendra.com";

export const metadata: Metadata = {
  title: "Hotel Photos and Gallery in Patna | Imperial Satyendra",
  description: "View photos of Imperial Satyendra in Patna, including hotel rooms, wedding celebrations, restaurant dining, architecture and guest moments.",
  keywords: ["hotel photos Patna", "hotel gallery Patna", "Imperial Satyendra photos", "hotel rooms Patna photos", "wedding venue Patna photos", "restaurant Patna photos"],
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Hotel Photos and Gallery in Patna | Imperial Satyendra", description: "Explore rooms, celebrations, dining and hotel spaces at Imperial Satyendra in Patna.", url: `${siteUrl}/gallery`, type: "website", images: [{ url: "/images/imperial-courtyard-day.jpg", width: 1672, height: 941, alt: "Imperial Satyendra hotel in Patna" }] },
  twitter: { card: "summary_large_image", title: "Imperial Satyendra Hotel Gallery", description: "See rooms, celebrations, dining and hotel spaces in Patna.", images: ["/images/imperial-courtyard-day.jpg"] },
};

const galleryImages = [
  ["imperial-courtyard-day.jpg", "Imperial Satyendra hotel in Patna"],
  ["stay-hero-room.jpg", "Hotel room at Imperial Satyendra in Patna"], ["imperial-suite.jpg", "Suite at Imperial Satyendra"], ["stay-bathroom.jpg", "Hotel bathroom"],
  ["celebrate-ceremony.jpg", "Wedding ceremony in Patna"], ["celebrate-family-arrival.jpg", "Family celebration arrival"], ["celebrate-reception-night.jpg", "Evening wedding reception"],
  ["dine-hero.jpg", "Restaurant dining at Imperial Satyendra"], ["dine-lunch.jpg", "Indian lunch served at the hotel"], ["dine-tea.jpg", "Evening tea at the hotel"],
  ["imperial-courtyard-night.jpg", "Hotel courtyard at night"], ["imperial-arrival-hall.jpg", "Arched hotel arrival hall"], ["imperial-corridor.jpg", "Hotel corridor"],
  ["story-welcome-family.jpg", "Family welcome at Imperial Satyendra"], ["celebrate-planning.jpg", "Celebration planning"], ["story-wedding-arrival.jpg", "Wedding guest arrival"],
];

export default function Page() {
  const imageGallery = { "@context": "https://schema.org", "@type": "ImageGallery", name: "Imperial Satyendra Hotel Gallery", description: "Photos of hotel rooms, weddings, dining, architecture and guest moments at Imperial Satyendra in Patna.", url: `${siteUrl}/gallery`, associatedMedia: galleryImages.map(([file,caption]) => ({ "@type": "ImageObject", contentUrl: `${siteUrl}/images/${file}`, caption })) };
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Gallery", item: `${siteUrl}/gallery` }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(imageGallery)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/><GalleryPage/></>;
}
