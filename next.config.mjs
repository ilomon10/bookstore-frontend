/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/server/:path*",
        destination: "http://localhost:3050/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
