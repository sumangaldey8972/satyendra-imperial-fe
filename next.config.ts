import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/enquiries": ["./app/asset/satyendra-imperial-logo.png"],
  },
};

export default nextConfig;
