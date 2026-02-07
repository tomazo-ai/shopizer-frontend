import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.56.1',
        port: '8080',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;