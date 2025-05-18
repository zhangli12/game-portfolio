/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'thrangra.sirv.com',
    }]
  }
};

export default nextConfig;
