export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    //get slug from GET params url
    const slug = event.headers.get('project-slug');
    const strapiUrl = config.STRAPI_URL;
    const strapiToken = config.STRAPI_TOKEN;
    const response = await $fetch(`${strapiUrl}/api/projects?populate[1]=sections&populate[2]=technologies&populate[3]=sections.image&populate[4]=pictures&filters[slug][$eq]=${slug}`, {
        headers: {
            Authorization: `Bearer ${strapiToken}`,
        },
    });
    return response
});
