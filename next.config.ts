import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  basePath: isProd ? '/alkalist' : '',
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
