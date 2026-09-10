import type { Metadata } from "next";
import CelebratePage from "../components/CelebratePage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.imperialsatyendra.com";

export const metadata: Metadata = {
  title: "Wedding Venue in Patna | Imperial Satyendra",
  description: "Plan a wedding, reception, engagement or family celebration at Imperial Satyendra in Patna, Bihar. Ask about event spaces, food, decoration and guest rooms.",
  keywords: [
    "wedding venue in Patna",
    "marriage venue in Patna",
    "wedding hotel in Patna",
    "reception venue in Patna",
    "banquet hall in Patna",
    "event venue in Patna",
    "wedding guest rooms Patna",
    "Imperial Satyendra wedding",
  ],
  alternates: { canonical: "/celebrate" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/celebrate",
    siteName: "Imperial Satyendra",
    title: "Wedding and Celebration Venue in Patna | Imperial Satyendra",
    description: "A welcoming place in Patna for weddings, receptions, engagements and family celebrations.",
    images: [{ url: "/images/celebrate-hero-arrival.jpg", width: 1672, height: 941, alt: "Indian wedding celebration at Imperial Satyendra in Patna" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Venue in Patna | Imperial Satyendra",
    description: "Plan your wedding or family celebration at Imperial Satyendra in Patna, Bihar.",
    images: ["/images/celebrate-hero-arrival.jpg"],
  },
};

const eventVenueSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Imperial Satyendra",
  url: `${siteUrl}/celebrate`,
  description: "Wedding and celebration venue in Patna for weddings, receptions, engagements and family events.",
  image: [
    `${siteUrl}/images/celebrate-hero-arrival.jpg`,
    `${siteUrl}/images/celebrate-ceremony.jpg`,
    `${siteUrl}/images/celebrate-reception-night.jpg`,
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
    { "@type": "ListItem", position: 2, name: "Celebrate", item: `${siteUrl}/celebrate` },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What celebrations can we plan at Imperial Satyendra?", acceptedAnswer: { "@type": "Answer", text: "You can ask about weddings, receptions, engagement functions, anniversaries, birthdays and family gatherings." } },
    { "@type": "Question", name: "Can Imperial Satyendra help with wedding guest rooms?", acceptedAnswer: { "@type": "Answer", text: "Yes. Share your event dates and expected room count. The team will explain the stay options available for your group." } },
    { "@type": "Question", name: "Can we discuss food and decoration?", acceptedAnswer: { "@type": "Answer", text: "Yes. Tell the team what you have in mind and they will guide you through suitable menu and decoration options for your event." } },
    { "@type": "Question", name: "How do we check the venue and available dates?", acceptedAnswer: { "@type": "Answer", text: "Send an enquiry with your preferred date and phone number. The team can confirm the next step and help arrange a venue visit." } },
  ],
};

export default function Page() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventVenueSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <CelebratePage />
  </>;
}
