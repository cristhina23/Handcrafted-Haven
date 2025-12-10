import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
<<<<<<< HEAD
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
=======
>>>>>>> seller-dashboard-3
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;
