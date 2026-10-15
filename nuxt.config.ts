import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/4.x/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: ".",

  devtools: {
      enabled: true,

      timeline: {
          enabled: true,
      },
  },

  app: {
      pageTransition: { name: "page", mode: "out-in" },
  },

  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/image","nuxt-gtag"],

  gtag: {
      id: process.env.GOOGLE_ANALYTICS_ID,
  },

  vite: {
      plugins: [tailwindcss()],
  },

  runtimeConfig: {
      APPLE_TEAM_ID: process.env.APPLE_TEAM_ID,
      APPLE_KEY_ID: process.env.APPLE_KEY_ID,
      APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY,
      APPLE_USER_TOKEN: process.env.APPLE_USER_TOKEN,
      appleMusicCacheFile: "",
      STRAPI_TOKEN: process.env.STRAPI_TOKEN,
      STRAPI_URL: process.env.STRAPI_URL,
      public: {
          STRAPI_URL: process.env.STRAPI_URL,
      },
  },

  compatibilityDate: "2025-05-10",
});
