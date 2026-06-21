/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow next/image to optimize avatars/images coming from GitHub.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
    ],
  },
  // transpile three.js ecosystem packages for clean Vercel builds
  transpilePackages: ["three"],
};

export default nextConfig;
