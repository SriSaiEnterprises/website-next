import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Disable image optimization for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wshuzhrqeawdphkftpoa.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/images/**',
      },
    ],
  },
};

console.log("Next.js Config Loaded:", nextConfig);

export default nextConfig;