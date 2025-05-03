/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents:true,
    },
    async rewrites() {
        return [
            {
                source: '/api/guestbooks',
                destination: 'https://api.nvp.kr/v1/guestbooks',
            },
        ]
    },
};

export default nextConfig;


