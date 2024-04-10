<script setup>
useSeoMeta({
    title: "Simon Botté | Développeur web full-stack | Portfolio",
    description:
        "Je suis Simon Botté, développeur web full-stack. Je suis spécialisé dans la création de sites web et d'applications web. Je suis basé à Bordeaux, France.",
    image: "https://www.simonbotte.fr/og-image/home.jpg",
    url: "https://www.simonbotte.fr",
    ogImage: "https://www.simonbotte.fr/og-image/home.jpg",
    ogSiteName: "Simon Botté | Développeur web full-stack | Portfolio",
    ogType: "website",
    ogLocale: "fr_FR",
    ogUrl: "https://www.simonbotte.fr",
    ogTitle: "Simon Botté | Développeur web full-stack | Portfolio",
    ogDescription:
        "Je suis Simon Botté, développeur web full-stack. Je suis spécialisé dans la création de sites web et d'applications web. Je suis basé à Bordeaux, France.",
    twitterCard: "summary_large_image",
    twitterSite: "@simonbotte",
    twitterCreator: "@simonbotte",
    twitterImage: "https://www.simonbotte.fr/og-image/home.jpg",
    canonical: "https://www.simonbotte.fr",
});
const apiUrl = `/api/strapi/highlighted-projects/`;
const { data: projectsData } = await useFetch(apiUrl, {
    method: "GET",
});
const projects = ref(projectsData.value?.data);
</script>

<template>
    <section
        class="grid grid-cols-2 w-full max-w-mobile px-4 m-auto gap-4 pb-20 tablet:max-w-tablet tablet:grid-cols-3 laptop:max-w-laptop laptop:grid-cols-4 laptop:gap-8"
    >
        <BentoHi class="col-span-2 h-bento-mobile tablet:h-bento-tablet laptop:h-bento-laptop" />
        <BentoProjects class="col-span-1" />
        <BentoPicture
            src="/images/suricate.jpeg"
            alt="Photo d'un suricate"
            class="tablet:col-start-1 tablet:row-start-2 laptop:col-start-4 laptop:row-start-1"
        />
        <LazyBentoMusic />
        <BentoAbout class="tablet:row-start-2" />
        <BentoProject :project="projects[0].attributes" />
        <BentoJourney class="tablet:col-start-3 tablet:row-start-3 laptop:col-start-1 laptop:row-start-2" />
        <BentoLink :title="'LinkedIn'" :icon="'/icons/linkedin.svg'" :link="'https://www.linkedin.com/in/simon-botte-530938175/'" />
        <BentoLink :title="'GitHub'" :icon="'/icons/github.svg'" :link="'https://github.com/simonbotte'" />
        <BentoProject
            class="tablet:col-start-2 tablet:row-start-5 laptop:col-start-2 laptop:row-start-4"
            :project="projects[1].attributes"
        />
    </section>
</template>
