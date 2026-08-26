/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
    // TMDB already serves pre-sized images (w92/w500/w1280 in the URL path).
    // Re-optimizing them through Vercel's Image Optimization burns free-tier
    // transformations for no benefit — skip it.
    unoptimized: true,
  },
};

module.exports = nextConfig;
