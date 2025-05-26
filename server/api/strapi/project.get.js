export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);
    //get slug from GET params url
    const slug = event.headers.get('project-slug');
    const strapiUrl = config.STRAPI_URL;
    const strapiToken = config.STRAPI_TOKEN;
    const project = await $fetch(`${strapiUrl}/api/projects?filters[slug][$eq]=${slug}`, {
        headers: {
            Authorization: `Bearer ${strapiToken}`,
        },
    });
    
    const nextProject = await $fetch(`${strapiUrl}/api/projects?filters[order][$gt]=${project.data[0].order}&sort[0]=order&pagination[page]=1&pagination[pageSize]=1`, {
        headers: {
            Authorization: `Bearer ${strapiToken}`,
        },
    });
    const previousProject = await $fetch(`${strapiUrl}/api/projects?filters[order][$lt]=${project.data[0].order}&sort[0]=order:desc&pagination[page]=1&pagination[pageSize]=1`, {
        headers: {
            Authorization: `Bearer ${strapiToken}`,
        },
    });
    return {
        project: project,
        nextProject: nextProject,
        previousProject: previousProject
    };
});
