import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";

import "@/app/globals.css";

import { BookingDock } from "@/components/layout/booking-dock";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { openingHours, siteConfig, siteUrl } from "@/content/site";
import { strings, type Lang } from "@/content/strings";
import { BookingProvider } from "@/lib/booking";
import { LangProvider } from "@/lib/i18n";

// Self-hosted (Google's latin subsets), so a build never depends on reaching Google Fonts.
const displayFont = localFont({
  src: "../../assets/fonts/web/prata-latin.woff2",
  weight: "400",
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman"
});
const bodyFont = localFont({
  src: "../../assets/fonts/web/manrope-latin.woff2",
  weight: "400 600",
  variable: "--font-body",
  display: "swap"
});

export function rootMetadata(lang: Lang): Metadata {
  const t = strings[lang];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s | ${siteConfig.name}` },
    description: t.meta.description,
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_MU" : "en_MU",
      siteName: siteConfig.name,
      description: t.meta.description
    },
    twitter: { card: "summary_large_image" }
  };
}

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbe3e9",
  colorScheme: "light"
};

function structuredData(lang: Lang) {
  const t = strings[lang];
  return [
    {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "@id": `${siteUrl}/#salon`,
      name: siteConfig.name,
      description: t.meta.description,
      url: lang === "fr" ? `${siteUrl}/fr` : siteUrl,
      image: `${siteUrl}/opengraph-image`,
      logo: `${siteUrl}/logo-sims.svg`,
      telephone: siteConfig.fixedLineDisplay.replace(/\s/g, ""),
      priceRange: "Rs 75 to Rs 8000",
      currenciesAccepted: "MUR",
      paymentAccepted: strings.en.visit.paymentMethods.join(", "),
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.locality,
        postalCode: siteConfig.address.postalCode,
        addressCountry: "MU"
      },
      geo: { "@type": "GeoCoordinates", latitude: siteConfig.geo.latitude, longitude: siteConfig.geo.longitude },
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
      inLanguage: lang,
      mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } }))
    }
  ];
}

// The homepage intro plays once per visit; after that, pages open straight away.
const introScript = `try{if(sessionStorage.getItem("sims-intro")){document.documentElement.dataset.intro="seen"}else{sessionStorage.setItem("sims-intro","1")}}catch(e){}`;

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const t = strings[lang];
  return (
    <html className={`${displayFont.variable} ${bodyFont.variable}`} lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(lang)) }} type="application/ld+json" />
        <a
          className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          href="#main"
        >
          {t.skip}
        </a>
        <LangProvider lang={lang}>
          <BookingProvider>
            <Navbar />
            <div id="main">{children}</div>
            <Footer />
            <BookingDock />
          </BookingProvider>
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
