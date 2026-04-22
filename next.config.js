/** @type {import('next').NextConfig} */
const nextConfig = {
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
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;
