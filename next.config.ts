import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/content/:path*",
        destination: "/content/:path*.html",
      },
    ];
  },
};

export default nextConfig;
