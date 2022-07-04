// @ts-check

module.exports = () => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        reactStrictMode: process.env.NODE_ENV === 'development',
        compress: true,
        output: 'standalone',
        sassOptions: {
            includePaths: [require('path').join(__dirname, './shared/styles')],
            prependData:
                '@import "styles/variables"; \
            @import "styles/mixins"; \
            @import "styles/animations"; \
            @import "styles/medias";',
        },
        images: {
            domains: ['via.placeholder.com'],
        },
    }

    return nextConfig
}
