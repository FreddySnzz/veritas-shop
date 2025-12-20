import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://imgur.com/**'),
      new URL('https://i.imgur.com/**'),
      new URL('https://camo.githubusercontent.com/**'),
      new URL('https://img.shields.io/**'),
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
