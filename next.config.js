// @ts-check

const { join } = require('path')

module.exports = () => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        reactStrictMode: process.env.NODE_ENV === 'development',
        compress: true,
        output: 'standalone',
        sassOptions: {
            includePaths: [join(__dirname, './styles')],
            prependData:
                '@import "styles/variables"; \
            @import "styles/animations"; \
            @import "styles/medias";',
        },
        images: {
            domains: ['via.placeholder.com'],
        },
    }

    return nextConfig
}
