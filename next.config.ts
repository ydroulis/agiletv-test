import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mydroulisblog.netlify.app',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
