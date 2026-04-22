import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
