// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/collections/:handle", destination: "/products", permanent: true },
      { source: "/pages/:handle", destination: "/:handle", permanent: true },
      { source: "/products/:handle", destination: "/products/:handle", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      // 必要なら外部画像を許可
    ],
  },
};

module.exports = nextConfig;
