import ImperialHome from "./components/ImperialHome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.imperialsatyendra.com";

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Imperial Satyendra",
  description: "A refined hotel in Patna, Bihar for elegant stays, memorable weddings, private celebrations and gracious dining.",
  url: siteUrl,
  image: [
    `${siteUrl}/images/imperial-courtyard-day.png`,
    `${siteUrl}/images/imperial-suite.png`,
    `${siteUrl}/images/imperial-celebration.png`,
    `${siteUrl}/images/imperial-dining.png`,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Luxury rooms and suites", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wedding and celebration venue", value: true },
    { "@type": "LocationFeatureSpecification", name: "Restaurant and dining", value: true },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }} />
      <ImperialHome />
    </>
  );
}
