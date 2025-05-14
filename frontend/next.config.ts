/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src']
  },
  env: {
    JWT_SECRET: process.env.JWT_SECRET
  }
};

module.exports = nextConfig;
