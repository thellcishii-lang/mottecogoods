// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/collections/:handle", destination: "/products", permanent: true },
      { source: "/pages/:handle", destination: "/:handle", permanent: true },
      // /products/:handle → /products/:handle は無限ループになるので削除
    ];
  },
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
