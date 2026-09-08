import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.imperialsatyendra.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Imperial Satyendra | Luxury Hotel & Wedding Venue in Patna",
    template: "%s | Imperial Satyendra Patna",
  },
  description: "Discover Imperial Satyendra, an elegant hotel in Patna, Bihar for luxurious stays, destination weddings, celebrations and refined dining.",
  keywords: [
    "luxury hotel in Patna",
    "best hotel in Patna Bihar",
    "wedding venue in Patna",
    "banquet hotel Patna",
    "destination wedding Bihar",
    "luxury rooms Patna",
    "Imperial Satyendra",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Imperial Satyendra",
    title: "Imperial Satyendra | A Grand Stay in Patna",
    description: "Elegant stays, joyful celebrations and warm Bihari hospitality in the heart of Patna.",
    images: [{ url: "/images/imperial-courtyard-day.png", width: 1536, height: 1024, alt: "Imperial Satyendra luxury hotel courtyard in Patna, Bihar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperial Satyendra | Luxury Hotel in Patna",
    description: "Stay beautifully. Celebrate grandly. Welcome to Imperial Satyendra, Patna.",
    images: ["/images/imperial-courtyard-day.png"],
  },
  category: "hospitality",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f3eee4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
