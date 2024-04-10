export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const strapiUrl = config.STRAPI_URL;
    const strapiToken = config.STRAPI_TOKEN;
    const response = await $fetch(`${strapiUrl}/api/portfolio-home`, {
        headers: {
            Authorization: `Bearer ${strapiToken}`,
        },
    });
    return response
});
