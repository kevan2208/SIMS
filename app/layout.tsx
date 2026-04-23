import type { Metadata, Viewport } from "next";
import { Manrope, Prata } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/footer";
import { PageLoadOverlay } from "@/components/ui/page-load-overlay";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/content/site";

const displayFont = Prata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simshairandbeauty.com"),
  title: `${siteConfig.name} | Hair, Facials & Nails in ${siteConfig.location}`,
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  keywords: [
    "hair salon mauritius",
    "beauty salon mauritius",
    "facials mauritius",
    "gel nails mauritius",
    "hair treatment mauritius",
    "salon flacq",
    "hair repair treatment",
    "molecular treatment",
    "book salon whatsapp"
  ].join(", "),
  authors: [{ name: "Sim's Hair and Beauty" }],
  creator: "Sim's Hair and Beauty",
  publisher: "Sim's Hair and Beauty",
  formatDetection: {
    email: false,
    telephone: false
  },
  openGraph: {
    type: "website",
    locale: "en_MU",
    url: "https://simshairandbeauty.com",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Hair, Facials & Nails`,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@simshairbeauty",
    images: ["/twitter-image"]
  },
  icons: {
    icon: "/logo-sims-hair-beauty.png",
    shortcut: "/logo-sims-hair-beauty.png",
    apple: "/logo-sims-hair-beauty.png"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLines[0].split(",")[0],
      addressLocality: "Flacq",
      addressRegion: siteConfig.location,
      postalCode: "40606",
      addressCountry: "MU"
    },
    telephone: siteConfig.fixedLineDisplay.replace(/\s/g, ""),
    image: "/opengraph-image",
    url: "https://simshairandbeauty.com",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "17:30"
      }
    ],
    sameAs: siteConfig.socials.map((social) => social.href)
  };

  return (
    <html lang="en">
      <head>
        <Script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          id="schema-organization"
          type="application/ld+json"
        />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <Script id="tailwind-runtime-config" strategy="beforeInteractive">
          {`
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    brand: {
                      ink: "#231217",
                      red: "#8b2639",
                      cream: "#f4e8ea",
                      stone: "#ceb7bc",
                      mist: "#6d565d",
                      petal: "#e8c8cf",
                      blush: "#ddb3bc",
                      shell: "#f7edef",
                      rose: "#efd8dd",
                      noir: "#2c171d",
                      berry: "#a4475c"
                    }
                  },
                  fontFamily: {
                    display: ["var(--font-display)", "Bodoni 72", "Baskerville", "Palatino Linotype", "serif"],
                    body: ["var(--font-body)", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"]
                  },
                  boxShadow: {
                    soft: "0 16px 40px rgba(87, 59, 55, 0.08), 0 6px 16px rgba(87, 59, 55, 0.04)",
                    lift: "0 24px 54px rgba(87, 59, 55, 0.14), 0 10px 26px rgba(87, 59, 55, 0.08)"
                  },
                  keyframes: {
                    fadeUp: {
                      "0%": { opacity: "0", transform: "translate3d(0, 18px, 0)" },
                      "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" }
                    },
                    drift: {
                      "0%, 100%": { transform: "translate3d(0, 0, 0)" },
                      "50%": { transform: "translate3d(0, -12px, 0)" }
                    }
                  },
                  animation: {
                    fadeUp: "fadeUp 720ms ease-out both",
                    drift: "drift 12s ease-in-out infinite"
                  }
                }
              }
            };
          `}
        </Script>
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
        <PageLoadOverlay />
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
