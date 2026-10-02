// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  mages: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

module.exports = nextConfig;
