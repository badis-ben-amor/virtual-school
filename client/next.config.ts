import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { domains: [process.env.PREFIX_CLOUDINAR_DOMAIN_IMAGE!] },
};

export default nextConfig;
