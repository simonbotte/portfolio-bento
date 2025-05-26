<script setup lang="js">
const apiUrl = `/api/strapi/projects/`;
const { data: projectsData } = await useFetch(apiUrl, {
    method: "GET",
});
const projects = projectsData.value?.data;
const archivedProjects = projects.filter((project) => project.archive === true);
const currentProjects = projects.filter((project) => project.archive === false);

useSeoMeta({
    title: "Simon Botté | Développeur web full-stack | Mes projets",
    description:
        "Découvrez les technologies que j'aime a travers mes projets personnel et professionnel",
    image: "https://pre.simonbotte.fr/og-image/home.jpg",
    url: "https://www.simonbotte.fr",
    ogImage: "https://pre.simonbotte.fr/og-image/home.jpg",
    ogSiteName: "Simon Botté | Développeur web full-stack | Portfolio",
    ogType: "website",
    ogLocale: "fr_FR",
    ogUrl: "https://www.simonbotte.fr",
    ogTitle: "Simon Botté | Développeur web full-stack | Mes projets",
    ogDescription:
        "Découvrez les technologies que j'aime a travers mes projets personnel et professionnel",
    twitterCard: "summary_large_image",
    twitterSite: "@simonbotte",
    twitterCreator: "@simonbotte",
    twitterImage: "https://pre.simonbotte.fr/og-image/home.jpg",
});
</script>

<template>
    <section class="flex flex-col gap-12 w-full max-w-mobile px-4 m-auto pb-20 tablet:max-w-tablet laptop:max-w-laptop">
        <div class="flex flex-col mb-4 gap-4">
            <div class="flex flex-col">
                <h1 class="text-3xl font-bold text-sand-100 tablet:text-4xl">Projets web et plus</h1>
                <h2 class="text-xl font-medium text-sand-100 tablet:text-2xl">
                    Découvrez les technologies que j'aime a travers mes projets personnel et professionnel
                </h2>
            </div>
            <div
                class="grid grid-cols-2 w-full max-w-mobile m-auto gap-4 tablet:max-w-tablet tablet:grid-cols-3 laptop:max-w-laptop laptop:grid-cols-4 laptop:gap-8"
            >
                <BentoProject
                    v-for="project in currentProjects"
                    :key="project.id"
                    :project="project"
                    class="tablet:col-span-3 laptop:col-span-2"
                />
            </div>
        </div>

        <div class="flex flex-col mb-4 gap-4">
            <h2 class="text-xl font-medium text-sand-100 tablet:text-2xl">Archive</h2>

            <div
                class="grid grid-cols-2 w-full max-w-mobile m-auto gap-4 tablet:max-w-tablet tablet:grid-cols-3 laptop:max-w-laptop laptop:grid-cols-4 laptop:gap-8"
            >
                <BentoProject
                    v-for="project in archivedProjects"
                    :key="project.id"
                    :project="project"
                    class="tablet:col-span-3 laptop:col-span-2"
                />
            </div>
        </div>
    </section>
</template>
