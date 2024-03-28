// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    modules: ["@nuxt/image"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
        APPLE_KEY_ID: process.env.APPLE_KEY_ID,
        APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY,
        APPLE_USER_TOKEN: process.env.APPLE_USER_TOKEN,
        STRAPI_TOKEN: process.env.STRAPI_TOKEN,
        STRAPI_URL: process.env.STRAPI_URL,
        public: {
            STRAPI_URL: process.env.STRAPI_URL,
        },
    },
});
