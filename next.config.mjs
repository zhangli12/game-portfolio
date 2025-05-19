/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'zhangli.sirv.com',
    }]
  }
};

export default nextConfig;
