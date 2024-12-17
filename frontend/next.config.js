/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const path = require('path');

const nextConfig = {
    redirects: async () => [
        {
            source: '/:path*',
            has: [{ type: 'host', value: 'www.redgalar.shop' }],
            destination: 'https://redgalar.shop/:path*',
            permanent: true,
        },
    ],
    productionBrowserSourceMaps: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    eslint: {
        dirs: ['src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/icons',
            },
        ],
    },
};

module.exports = nextConfig;
