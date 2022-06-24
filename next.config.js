// @ts-check

const { join } = require('path')

module.exports = (_phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        reactStrictMode: process.env.NODE_ENV === 'development',
        compress: true,
        sassOptions: {
            includePaths: [join(__dirname, './styles')],
            prependData:
                '@import "styles/variables"; \
            @import "styles/animations"; \
            @import "styles/medias";',
        },
        experimental: {
            outputStandalone: true,
        },
        images: {
            domains: ['via.placeholder.com'],
        },
    }

    return nextConfig
}
