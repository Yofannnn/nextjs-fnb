import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "9gzctbd73sdxjqzi.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
