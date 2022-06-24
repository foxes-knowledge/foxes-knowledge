import { defineConfig } from 'cypress'

export default defineConfig({
    projectId: 'yyt6mi',
    defaultCommandTimeout: 6000,

    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, config) {},
    },

    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
})
