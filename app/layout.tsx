import type { Metadata, Viewport } from "next";
import { Manrope, Prata } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

import { BookingDock } from "@/components/layout/booking-dock";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { faqs, openingHours, siteConfig, siteUrl } from "@/content/site";
import { BookingProvider } from "@/lib/booking";

const displayFont = Prata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | Hair, Facials and Nails in Flacq, Mauritius`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_MU",
    siteName: siteConfig.name,
    description: siteConfig.description
  },
  twitter: {
    card: "summary_large_image"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbe3e9",
  colorScheme: "light"
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteUrl}/#salon`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/logo-sims.svg`,
    telephone: siteConfig.fixedLineDisplay.replace(/\s/g, ""),
    priceRange: "Rs 75 to Rs 8000",
    currenciesAccepted: "MUR",
    paymentAccepted: siteConfig.paymentMethods.join(", "),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "MU"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude
    },
    hasMap: siteConfig.directionsHref,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: openingHours.opens,
        closes: openingHours.closes
      }
    ],
    sameAs: siteConfig.socials.map((s) => s.href)
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  }
];

const introScript = `try{if(sessionStorage.getItem("sims-intro")){document.documentElement.dataset.intro="seen"}else{sessionStorage.setItem("sims-intro","1")}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${displayFont.variable} ${bodyFont.variable}`} lang="en" suppressHydrationWarning>
      <head>
        {/* The homepage intro plays once per visit; after that, pages open straight away. */}
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
        <a
          className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          href="#main"
        >
          Skip to content
        </a>
        <BookingProvider>
          <Navbar />
          <div id="main">{children}</div>
          <Footer />
          <BookingDock />
        </BookingProvider>
        <Analytics />
      </body>
    </html>
  );
}
