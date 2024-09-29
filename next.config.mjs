/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },       
            {
              protocol: 'https',
              hostname: 'i.postimg.cc',
              
            },     
        ],
    },
    async redirects() {
        return [
          {
            source: '/programs',
            destination: '/programs/flagship-program',
            permanent: true, // Use true for 301 (permanent) redirect
          },
        ]
      },
};

export default nextConfig;

