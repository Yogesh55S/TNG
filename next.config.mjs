/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Keep compiled pages in memory during development so chunks never expire / throw 404
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 50,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache: never writes temporary .pack.gz files to disk (fixes OneDrive ENOENT locks)
      // and keeps chunks persistently alive in RAM so browser never gets 404
      config.cache = {
        type: 'memory',
      };
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
