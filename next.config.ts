import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: isProd ? '/alkalist' : '',
  assetPrefix: isProd ? '/alkalist/alkalist/' : '',
  images: { unoptimized: true },
};

export default nextConfig;
