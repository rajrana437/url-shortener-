import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:shortId", // Match root-level shortId
        destination: "/api/url/:shortId", // Redirect to the API handler
      },
    ];
  },
};

export default nextConfig;
