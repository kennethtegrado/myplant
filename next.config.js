/** @type {import('next').NextConfig} */
const STUDIO_REWRITE = {
    source: '/admin/:path*',
    destination:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3333/admin/:path*'
            : '/admin/index.html',
};

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    rewrites: () => [STUDIO_REWRITE],
    images: { domains: ['cdn.sanity.io'] },
};

module.exports = nextConfig;
