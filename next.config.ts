import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // If you're using external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}
module.exports = nextConfig