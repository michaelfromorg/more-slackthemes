import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enable static exports
  basePath: process.env.GITHUB_ACTIONS ? "/more-slackthemes" : "", // Adjust this to your repo name
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
