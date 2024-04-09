<script setup>
const apiUrl = `/api/strapi/about/`;
const { data: projectsData } = await useFetch(apiUrl, {
    method: "GET",
});
const content = ref(projectsData.value?.data);
const buttonCV = ref(false);
const config = useRuntimeConfig();
const apiHost = config.public.STRAPI_URL;

useHead({
    title: "Simon Botté | Développeur web full-stack | À propos de moi",
    meta: [
        {
            hid: "description",
            name: "description",
            content:
                "Apprenez en plus moi. Je suis développeur web full-stack et je suis spécialisé dans la création de sites web et d'applications web. Je suis basé à Bordeaux, France.",
        },
        {
            name: "title",
            content: "Simon Botté | Développeur web full-stack | À propos de moi",
        },
        {
            name: "description",
            content:
            "Apprenez en plus moi. Je suis développeur web full-stack et je suis spécialisé dans la création de sites web et d'applications web. Je suis basé à Bordeaux, France.",
        },
        {
            name: "og:title",
            content: "Simon Botté | Développeur web full-stack | À propos de moi",
        },
        {
            name: "og:description",
            content:
                "Apprenez en plus moi. Je suis développeur web full-stack et je suis spécialisé dans la création de sites web et d'applications web. Je suis basé à Bordeaux, France.",
        },
        {
            name: "og:image",
            content: "https://pre.simonbotte.fr/og-image/home.jpg",
        },
        {
            name: "twitter:title",
            content: "Simon Botté | Développeur web full-stack | À propos de moi",
        },
        {
            name: "twitter:description",
            content:
                "Apprenez en plus moi. Je suis développeur web full-stack et je suis spécialisé dans la création de sites web et d'applications web. Je suis basé à Bordeaux, France.",
        },
        {
            name: "twitter:image",
            content: "https://pre.simonbotte.fr/og-image/home.jpg",
        },
    ],
});

onMounted(() => {
    useApparitionAnimation(buttonCV.value);
});
</script>

<template>
    <section
        class="grid grid-cols-2 w-full max-w-mobile px-4 m-auto gap-4 pb-32 tablet:max-w-tablet tablet:grid-cols-3 laptop:max-w-laptop laptop:grid-cols-4 laptop:gap-8"
    >
        <BentoAboutShort />
        <BentoPicture
            :src="apiHost + content.attributes.picture.data.attributes.formats.large.url"
            alt="Photo d'un suricate"
            class="tablet:col-start-1 tablet:row-start-2"
        />
        <BentoAboutStack class="tablet:col-start-2 tablet:row-start-3" />
        <BentoJourney class="tablet:row-start-1" />
        <div
            class="flex flex-col gap-6 col-span-2 row-span-2 table:col-span-1 tablet:col-start-3 tablet:row-start-1 tablet:row-end-10 laptop:row-end-3"
        >
            <AboutContent :content="$rcTranslator(content.attributes.introduction)" class="" />
            <AboutContent :content="$rcTranslator(content.attributes.plans)" class="" />
            <div ref="buttonCV">
                <AppButton text="Télécharger mon CV" target="_blanc" :to="apiHost + content.attributes.cv.data.attributes.url" class="col-span-2" />
            </div>
            
            <AboutContent :content="$rcTranslator(content.attributes.passions)" class="" />
        </div>
        <div class="grid grid-cols-2 gap-4 w-full col-span-2 laptop:row-start-3 laptop:gap-8">
            <BentoLink :title="'LinkedIn'" :icon="'/icons/linkedin.svg'" :link="'https://www.linkedin.com/in/simon-botte-530938175/'" />
            <BentoLink :title="'GitHub'" :icon="'/icons/github.svg'" :link="'https://github.com/simonbotte'" />
        </div>
    </section>
</template>
