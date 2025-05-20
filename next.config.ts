import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com'
      }
    ]
  },
};

export default nextConfig;
