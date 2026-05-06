import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/portfolio/breaella",
        destination: "/portfolio/breaelle",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
