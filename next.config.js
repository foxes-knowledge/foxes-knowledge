// @ts-check

const { join } = require('path')

module.exports = (phase, { defaultConfig }) => {
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        reactStrictMode: process.env.NODE_ENV === 'development',
        compress: true,
        sassOptions: {
            includePaths: [join(__dirname, './styles')],
            prependData: '@import "variables";@import "animations";@import "medias";',
        },
        experimental: {
            outputStandalone: true,
        },
    }

    return nextConfig
}
