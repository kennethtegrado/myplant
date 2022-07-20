/** @type {import('next').NextConfig} */
const STUDIO_REWRITE = {
    source: '/studio/:path*',
    destination:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3333/studio/:path*'
            : '/studio/index.html',
};

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    rewrites: () => [STUDIO_REWRITE],
};

module.exports = nextConfig;
