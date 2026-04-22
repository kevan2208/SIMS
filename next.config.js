/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: false
      }
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;
