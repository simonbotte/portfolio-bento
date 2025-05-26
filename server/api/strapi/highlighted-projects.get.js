export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const strapiUrl = config.STRAPI_URL;
    const strapiToken = config.STRAPI_TOKEN;
    const response = await $fetch(`${strapiUrl}/api/projects?filters[highlighted][$eq]=true&sort[0]=order`, {
        headers: {
            Authorization: `Bearer ${strapiToken}`,
        },
    });
    return response
});
