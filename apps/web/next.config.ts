import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@achieva/types", "@achieva/utils"],
};

export default nextConfig;
