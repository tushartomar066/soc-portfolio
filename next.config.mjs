/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // transpile three.js ecosystem packages for clean Vercel builds
  transpilePackages: ["three"],
};

export default nextConfig;
