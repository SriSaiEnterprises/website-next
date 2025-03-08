// next.config.js
module.exports = {
  Image: {
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

console.log("Next.js Config Loaded:", module.exports);