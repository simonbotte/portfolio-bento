<script setup>
const apiProjectUrl = `/api/strapi/highlighted-projects/`;
const apiHomeUrl = `/api/strapi/home/`;
const { data: homeContent } = await useFetch(apiHomeUrl, {
    method: "GET",
});

useSeoMeta({
    title: homeContent.value?.data.metaTitle,
    description:
        homeContent.value?.data.metaDescription,
    image: "https://www.simonbotte.fr/og-image/home.jpg",
    url: "https://www.simonbotte.fr",
    ogImage: "https://www.simonbotte.fr/og-image/home.jpg",
    ogSiteName: homeContent.value?.data.metaTitle,
    ogType: "website",
    ogLocale: "fr_FR",
    ogUrl: "https://www.simonbotte.fr",
    ogTitle: homeContent.value?.data.metaTitle,
    ogDescription:
        homeContent.value?.data.metaDescription,
    twitterCard: "summary_large_image",
    twitterSite: "@simonbotte",
    twitterCreator: "@simonbotte",
    twitterImage: "https://www.simonbotte.fr/og-image/home.jpg",
});

const { data: projectsData } = await useFetch(apiProjectUrl, {
    method: "GET",
});

console.log(projectsData.value);


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
        <BentoProject :project="projects[0]" />
        <BentoJourney class="tablet:col-start-3 tablet:row-start-3 laptop:col-start-1 laptop:row-start-2" />
        <BentoLink
            :title="'LinkedIn'"
            :icon="'/icons/linkedin.svg'"
            :link="'https://www.linkedin.com/in/simon-botte-530938175/'"
        />
        <BentoLink :title="'GitHub'" :icon="'/icons/github.svg'" :link="'https://github.com/simonbotte'" />
        <BentoProject
            class="tablet:col-start-2 tablet:row-start-5 laptop:col-start-2 laptop:row-start-4"
            :project="projects[1]"
        />
    </section>
</template>
