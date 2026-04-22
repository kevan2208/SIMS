import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://simshairandbeauty.com"),
  title: `${siteConfig.name} | Hair, Facials & Nails in ${siteConfig.location}`,
  description: siteConfig.description,
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
        url: "/og-image.png",
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
    creator: "@simshairbeauty"
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
    telephone: siteConfig.bookingWhatsappDisplay.replace(/\s/g, ""),
    image: "/og-image.png",
    url: "https://simshairandbeauty.com",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "17:00"
      }
    ],
    sameAs: siteConfig.socials.map((social) => social.href),
    servesCuisine: ["Hair Care", "Skin Care", "Nail Care"]
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
      <body>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `
          }}
          id="google-analytics"
          strategy="afterInteractive"
        />

        {/* Facebook Pixel - Optional */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'XXXXXXXXXX');
              fbq('track', 'PageView');
            `
          }}
          id="facebook-pixel"
          strategy="afterInteractive"
        />
        <noscript>
          <img
            height="1"
            src="https://www.facebook.com/tr?id=XXXXXXXXXX&ev=PageView&noscript=1"
            style={{ display: "none" }}
            width="1"
          />
        </noscript>

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
                    display: ["var(--font-display)", "Georgia", "Cambria", "Times New Roman", "serif"],
                    body: ["var(--font-body)", "Avenir Next", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"]
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
