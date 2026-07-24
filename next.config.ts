import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'image2url.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-fa4842ac95b845ba9f2a3b9aa7bf24ae.r2.dev',
      }
    ],
  },
};

export default nextConfig;
