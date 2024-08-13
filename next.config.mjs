/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'neetguide.s3.ap-south-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
