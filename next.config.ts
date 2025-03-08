import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Disable optimization for static export (local images)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wshuzhrqeawdphkftpoa.supabase.co', // Replace with your Supabase domain
        port: '',
        pathname: '/storage/v1/object/public/images/**', // Path to your remote images
      },
    ],
  },
};

console.log("Next.js Config Loaded:", nextConfig);

export default nextConfig;