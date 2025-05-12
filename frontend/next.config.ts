import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Only run ESLint on these directories during builds
    dirs: ['src']
  }
};

export default nextConfig;
