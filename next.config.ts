// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    loader: 'custom', // Use a custom loader for static export
    loaderFile: './my-loader.ts', // Path to your custom image loader
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