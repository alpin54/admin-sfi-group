/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // protocol: 'http',
        // hostname: 'localhost',
        // port: '4000',
        protocol: 'https',
        hostname: 'api.stellalunardy.com',
        port: '',
        pathname: '/uploads/**'
      }
    ]
  }
};

export default nextConfig;
