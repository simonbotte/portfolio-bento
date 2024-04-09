<script setup lang="js">
const apiUrl = `/api/strapi/projects/`;
const { data: projectsData } = await useFetch(apiUrl, {
    method: "GET",
});
const projects = projectsData.value?.data;
const archivedProjects = projects.filter((project) => project.attributes.archive === true);
const currentProjects = projects.filter((project) => project.attributes.archive === false);


useHead({
    title: "Simon Botté | Développeur web full-stack | Mes projets",
    meta: [
        {
            name: "title",
            content: "Simon Botté | Développeur web full-stack | Mes projets",
        },
        {
            name: "description",
            content:
                "Découvrez les technologies que j'aime a travers mes projets personnel et professionnel",
        },
        {
            name: "og:title",
            content: "Simon Botté | Développeur web full-stack | Mes projets",
        },
        {
            name: "og:description",
            content:
                "Découvrez les technologies que j'aime a travers mes projets personnel et professionnel",
        },
        {
            name: "og:image",
            content: "https://pre.simonbotte.fr/og-image/home.jpg",
        },
        {
            name: "twitter:title",
            content: "Simon Botté | Développeur web full-stack | Portfolio",
        },
        {
            name: "twitter:description",
            content:
            "Je suis Simon Botté et bienvenu sur mon portfolio. Explorez mes projets de développement web full-stack (front et back) avec mon portfolio bento",
        },
        {
            name: "twitter:image",
            content: "https://pre.simonbotte.fr/og-image/home.jpg",
        },
    ],
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
                    :project="project.attributes"
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
                    :project="project.attributes"
                    class="tablet:col-span-3 laptop:col-span-2"
                />
            </div>
        </div>
    </section>
</template>
