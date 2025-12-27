import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  //修改默认 route
  async redirects() {
    return [
      {
        source: "/",
        destination: "/workflows",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
