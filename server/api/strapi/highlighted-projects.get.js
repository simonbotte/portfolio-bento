export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    const strapiUrl = config.STRAPI_URL;
    const strapiToken = config.STRAPI_TOKEN;
    const response = await $fetch(`${strapiUrl}/api/projects?populate[1]=sections&populate[2]=technologies&filters[highlighted][$eq]=true&sort[0]=order`, {
        headers: {
            Authorization: `Bearer ${strapiToken}`,
        },
    });
    console.log(response);
    return response
});
