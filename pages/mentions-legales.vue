<script setup>
const apiUrl = `/api/strapi/legals/`;
const { data: legalsData } = await useFetch(apiUrl, {
    method: "GET",
});
const data = ref(legalsData.value?.data.attributes);

useHead({
    title: "Simon Botté | Développeur web full-stack | Mentions légales",
    meta: [
        {
            hid: "description",
            name: "description",
            content:
                "Lisez les mentions légales de mon portfolio bento. Pour rappel, Je suis développeur web full-stack",
        },
        {
            name: "title",
            content: "Simon Botté | Développeur web full-stack | Mentions légales",
        },
        {
            name: "description",
            content:
            "Lisez les mentions légales de mon portfolio bento. Pour rappel, Je suis développeur web full-stack",
        },
        {
            name: "og:title",
            content: "Simon Botté | Développeur web full-stack | Mentions légales",
        },
        {
            name: "og:description",
            content:
            "Lisez les mentions légales de mon portfolio bento. Pour rappel, Je suis développeur web full-stack",
        },
        {
            name: "og:image",
            content: "https://pre.simonbotte.fr/og-image/home.jpg",
        },
        {
            name: "twitter:title",
            content: "Simon Botté | Développeur web full-stack | Mentions légales",
        },
        {
            name: "twitter:description",
            content:
            "Lisez les mentions légales de mon portfolio bento. Pour rappel, Je suis développeur web full-stack",
        },
        {
            name: "twitter:image",
            content: "https://pre.simonbotte.fr/og-image/home.jpg",
        },
    ],
});
</script>

<template>
    <section class="flex flex-col w-full max-w-mobile mx-auto p-4 gap-6 tablet:max-w-tablet laptop:max-w-laptop">
        <h1 class="text-3xl font-bold text-sand-100 tablet:text-4xl">{{ data.title }}</h1>

        <div class="flex flex-col" v-html="$rcTranslator(data.content)"></div>
    </section>
</template>
