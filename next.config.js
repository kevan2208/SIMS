/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: false
      },
      {
        source: "/landingPageTrial",
        destination: "/",
        permanent: false
      },
      {
        source: "/contact",
        destination: "/#visit",
        permanent: false
      },
      {
        source: "/price-list",
        destination: "/services#price-list",
        permanent: false
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          }
        ]
      }
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;
