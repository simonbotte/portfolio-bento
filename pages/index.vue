<script setup>
useHead({
    title: "Simon Botté | Développeur web full-stack | Portfolio",
    meta: [
        {
            hid: "description",
            name: "description",
            content:
                "Développeur web full-stack, je suis spécialisé dans la création de sites web et d'applications web. Je suis basé à Bordeaux, France.",
        },
        {
            name: "title",
            content: "Simon Botté | Développeur web full-stack | Portfolio",
        },
        {
            name: "description",
            content:
                "Je suis Simon Botté et bienvenu sur mon portfolio. Explorez mes projets de développement web full-stack (front et back) avec mon portfolio bento",
        },
        {
            name: "og:title",
            content: "Simon Botté | Développeur web full-stack | Portfolio",
        },
        {
            name: "og:description",
            content:
                "Je suis Simon Botté et bienvenu sur mon portfolio. Explorez mes projets de développement web full-stack (front et back) avec mon portfolio bento",
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
