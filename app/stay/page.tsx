import type { Metadata } from "next";
import StayPage from "../components/StayPage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.imperialsatyendra.com";

export const metadata: Metadata = {
  title: "Hotel Rooms in Patna | Comfortable Stay at Imperial Satyendra",
  description: "Ask about comfortable hotel rooms in Patna for couples, families, wedding guests and work trips at Imperial Satyendra, Bihar.",
  keywords: [
    "hotel rooms in Patna",
    "comfortable rooms in Patna",
    "family hotel rooms in Patna",
    "rooms for wedding guests in Patna",
    "hotel for business trip in Patna",
    "Imperial Satyendra rooms",
  ],
  alternates: { canonical: "/stay" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/stay",
    siteName: "Imperial Satyendra",
    title: "Comfortable Hotel Rooms in Patna | Imperial Satyendra",
    description: "Rooms for couples, families, wedding guests and work trips in Patna, Bihar.",
    images: [{ url: "/images/stay-hero-room.png", width: 1855, height: 848, alt: "Comfortable hotel room at Imperial Satyendra in Patna" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Rooms in Patna | Imperial Satyendra",
    description: "Ask about a comfortable room for your next stay in Patna.",
    images: ["/images/stay-hero-room.png"],
  },
};

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Imperial Satyendra",
  url: `${siteUrl}/stay`,
  description: "Hotel rooms in Patna for couples, families, wedding guests and work trips.",
  image: [
    `${siteUrl}/images/stay-hero-room.png`,
    `${siteUrl}/images/stay-family-room.png`,
    `${siteUrl}/images/stay-evening-room.png`,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Stay", item: `${siteUrl}/stay` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How do I choose the right room?", acceptedAnswer: { "@type": "Answer", text: "Tell us how many people are staying and why you are visiting Patna. Our team will explain the suitable room options." } },
    { "@type": "Question", name: "Can I ask about a family stay?", acceptedAnswer: { "@type": "Answer", text: "Yes. Share the number of adults and children in your group. We will confirm the room setup available for your dates." } },
    { "@type": "Question", name: "Can wedding guests stay together?", acceptedAnswer: { "@type": "Answer", text: "You can ask about rooms for a wedding group. Share the dates and expected number of guests so the team can guide you." } },
  ],
};

export default function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <StayPage />
  </>;
}
