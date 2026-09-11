import type { Metadata } from "next";
import DinePage from "../components/DinePage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imperialsatyendra.com";

export const metadata: Metadata = {
  title: "Restaurant and Dining in Patna | Imperial Satyendra",
  description: "Enjoy breakfast, lunch, evening tea and dinner at Imperial Satyendra in Patna. Reserve a table for a family meal, group meal or relaxed hotel dining.",
  keywords: ["restaurant in Patna", "hotel restaurant in Patna", "family restaurant in Patna", "breakfast in Patna", "lunch in Patna", "dinner in Patna", "Imperial Satyendra dining"],
  alternates: { canonical: "/dine" },
  openGraph: { title: "Restaurant and Dining in Patna | Imperial Satyendra", description: "Good food, warm service and relaxed dining at Imperial Satyendra in Patna.", url: `${siteUrl}/dine`, type: "website", images: [{ url: "/images/dine-hero.jpg", width: 1536, height: 1024, alt: "Restaurant and dining at Imperial Satyendra in Patna" }] },
  twitter: { card: "summary_large_image", title: "Restaurant and Dining in Patna | Imperial Satyendra", description: "Breakfast, lunch, evening tea and dinner at Imperial Satyendra in Patna.", images: ["/images/dine-hero.jpg"] },
};

const faq = [
  { q: "Do I need to reserve a table?", a: "A reservation is helpful, especially for a family meal or group. Send your date, time and guest count so our team can guide you." },
  { q: "What kind of food can we ask about?", a: "You can speak with the team about Indian food, lighter meals and suitable choices for your group." },
  { q: "Can we discuss food preferences?", a: "Yes. Share important food preferences while making your reservation. The team will explain what can be arranged." },
  { q: "Can we plan a family or group meal?", a: "Yes. Tell us your expected guest count and the kind of meal you are planning so we can help with the next step." },
];

export default function Page() {
  const restaurant = { "@context": "https://schema.org", "@type": "Restaurant", name: "Imperial Satyendra", url: `${siteUrl}/dine`, image: `${siteUrl}/images/dine-hero.jpg`, description: "Hotel restaurant and dining in Patna for breakfast, lunch, evening tea, dinner and group meals.", servesCuisine: "Indian", address: { "@type": "PostalAddress", addressLocality: "Patna", addressRegion: "Bihar", addressCountry: "IN" }, parentOrganization: { "@type": "Hotel", name: "Imperial Satyendra", url: siteUrl } };
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Dine", item: `${siteUrl}/dine` }] };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(restaurant)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/><DinePage/></>;
}
