<script setup>
const apiUrl = `/api/strapi/about/`;
const { data: projectsData } = await useFetch(apiUrl, {
    method: "GET",
});
const content = ref(projectsData.value?.data);
const buttonCV = ref(false);
const config = useRuntimeConfig();
const apiHost = config.public.STRAPI_URL;
useSeoMeta({
    title: content.value.metaTitle,
    description: content.value.metaDescription,
    image: "https://www.simonbotte.fr/og-image/home.jpg",
    url: "https://www.simonbotte.fr",
    ogImage: "https://www.simonbotte.fr/og-image/home.jpg",
    ogSiteName: content.value.metaTitle,
    ogType: "website",
    ogLocale: "fr_FR",
    ogUrl: "https://www.simonbotte.fr",
    ogTitle: content.value.metaTitle,
    ogDescription: content.value.metaDescription,
    twitterCard: "summary_large_image",
    twitterSite: "@simonbotte",
    twitterCreator: "@simonbotte",
    twitterImage: "https://www.simonbotte.fr/og-image/home.jpg",
    canonical: "https://www.simonbotte.fr/a-propos",
    author: "Simon Botté",
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
            :src="apiHost + content.picture.formats.large.url"
            alt="Photo d'un suricate"
            class="tablet:col-start-1 tablet:row-start-2"
        />
        
        <BentoAboutStack class="tablet:col-start-2 tablet:row-start-3" />
        <BentoJourney class="tablet:row-start-1" />
        <div
            class="flex flex-col gap-6 col-span-2 row-span-2 table:col-span-1 tablet:col-start-3 tablet:row-start-1 tablet:row-end-10 laptop:row-end-3"
        >
            <AboutContent :content="$rcTranslator(content.introduction)" class="" />
            <AboutContent :content="$rcTranslator(content.plans)" class="" />
            <div ref="buttonCV">
                <AppButton
                    text="Télécharger mon CV"
                    target="_blanc"
                    :to="apiHost + content.cv.url"
                    class="col-span-2"
                />
            </div>

            <AboutContent :content="$rcTranslator(content.passions)" class="" />
        </div>
        <div class="grid grid-cols-2 gap-4 w-full col-span-2 laptop:row-start-3 laptop:gap-8">
            <BentoLink
                :title="'LinkedIn'"
                :icon="'/icons/linkedin.svg'"
                :link="'https://www.linkedin.com/in/simon-botte-530938175/'"
            />
            <BentoLink :title="'GitHub'" :icon="'/icons/github.svg'" :link="'https://github.com/simonbotte'" />
        </div>
    </section>
</template>
