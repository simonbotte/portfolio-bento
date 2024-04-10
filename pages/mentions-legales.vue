<script setup>
const apiUrl = `/api/strapi/legals/`;
const { data: legalsData } = await useFetch(apiUrl, {
    method: "GET",
});
const data = ref(legalsData.value?.data.attributes);

useSeoMeta({
    title: "Simon Botté | Développeur web full-stack | Mentions légales",
    description:
        "Mentions légales du site de Simon Botté, développeur web full-stack. Découvrez les informations légales du site de Simon Botté.",
    image: "https://www.simonbotte.fr/og-image/home.jpg",
    url: "https://www.simonbotte.fr",
    ogImage: "https://www.simonbotte.fr/og-image/home.jpg",
    ogSiteName: "Simon Botté | Développeur web full-stack | Mentions légales",
    ogType: "website",
    ogLocale: "fr_FR",
    ogUrl: "https://www.simonbotte.fr",
    ogTitle: "Simon Botté | Développeur web full-stack | Mentions légales",
    ogDescription:
        "Mentions légales du site de Simon Botté, développeur web full-stack. Découvrez les informations légales du site de Simon Botté.",
    twitterCard: "summary_large_image",
    twitterSite: "@simonbotte",
    twitterCreator: "@simonbotte",
    twitterImage: "https://www.simonbotte.fr/og-image/home.jpg",
});
</script>

<template>
    <section class="flex flex-col w-full max-w-mobile mx-auto p-4 gap-6 tablet:max-w-tablet laptop:max-w-laptop">
        <h1 class="text-3xl font-bold text-sand-100 tablet:text-4xl">{{ data.title }}</h1>

        <div class="flex flex-col" v-html="$rcTranslator(data.content)"></div>
    </section>
</template>
