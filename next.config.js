/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ⚠️ officially not supported, lekin Next.js 14+ me kaam karta
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
