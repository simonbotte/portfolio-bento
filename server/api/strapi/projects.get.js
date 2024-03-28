export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const strapiUrl = config.STRAPI_URL;
    const strapiToken = config.STRAPI_TOKEN;
    const response = await $fetch(`${strapiUrl}/api/projects?populate[1]=sections&populate[2]=technologies`, {
        headers: {
            Authorization: `Bearer ${strapiToken}`,
        },
    });
    return response
});
