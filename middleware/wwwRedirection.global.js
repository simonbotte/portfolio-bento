export default defineNuxtRouteMiddleware(async () => {
    const nuxtApp = useNuxtApp();
    const oldDomains = ["simonbotte.fr"];
    const newDomain = "www.simonbotte.fr";
    const url = useRequestURL();
    if (oldDomains.includes(url.host)) {
        const newUrl = url.href.replace(url.host, newDomain);
        return navigateTo(newUrl, { external: true, redirectCode: 301 });
    }
});