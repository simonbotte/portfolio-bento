<script setup>
definePageMeta({
    pageTransition: {
        name: "project",
        mode: "out-in",
    },
});

const config = useRuntimeConfig();
const apiHost = config.public.STRAPI_URL;
const route = useRoute();
const apiUrl = `/api/strapi/project/`;
const { data: projectsData } = await useFetch(apiUrl, {
    method: "GET",
    headers: {
        "project-slug": route.params.slug,
    },
});

const project = ref(projectsData.value?.project?.data[0]);
const nextProject = ref(projectsData.value?.nextProject?.data[0]);
const previousProject = ref(projectsData.value?.previousProject?.data[0]);

useSeoMeta({
    title: project.value.metaTitle + ' | Simon Botté',
    description: project.value.metaDescription,
    image: apiHost + project.value.ogImage?.url,
    url: "https://www.simonbotte.fr",
    ogImage: apiHost + project.value.ogImage?.url,
    ogSiteName: "Simon Botté | Développeur web full-stack | Portfolio",
    ogType: "website",
    ogLocale: "fr_FR",
    ogUrl: "https://www.simonbotte.fr",
    ogTitle: project.value.metaTitle + ' | Simon Botté',
    ogDescription: project.value.metaDescription,
    twitterCard: "summary_large_image",
    twitterSite: "@simonbotte",
    twitterCreator: "@simonbotte",
    twitterImage: apiHost + project.value.ogImage?.url,
});

if (project.value.content == null) {
    await navigateTo("/projets", 302);
}
if (project.value == null) {
    await navigateTo("/projets", 301);
}

console.log(project.value);

</script>

<template>
    <section
        v-if="project != undefined"
        class="w-full max-w-mobile px-4 m-auto pb-20 flex flex-col gap-4 translate-y-0 duration-300 tablet:max-w-tablet laptop:max-w-laptop"
    >
        <div class="grid grid-cols-1 gap-4 tablet:grid-cols-2 relative laptop:grid-cols-3 laptop:items-start">
            <div class="flex flex-col gap-4 tablet:sticky tablet:h-fit tablet:top-36 laptop:top-44">
                <ProjectBack />
                <ProjectHeading :project="project" />
            </div>

            <div class="flex flex-col gap-4">
                <div
                    v-if="Array.isArray(project.content)"
                    v-html="$rcTranslator(project.content)"
                ></div>
            </div>

            <div
                class="grid grid-cols-2 w-auto max-w-mobile m-auto gap-4 tablet:col-start-2 tablet:row-start-2 tablet:ml-0 laptop:col-start-auto laptop:row-start-auto laptop:sticky laptop:top-44 laptop:h-fit laptop:mr-0 laptop:my-0 laptop:ml-auto laptop:max-w-full"
            >
                <BentoProjectPicture
                    v-for="(picture, i) in project.pictures"
                    :alt="project.name"
                    :src="
                        project.pictures?.length == 3 && i == 2
                            ? apiHost + picture.formats.medium.url
                            : apiHost + picture.formats.small.url
                    "
                    class="w-full shrink-0"
                    :size="project.pictures?.length == 3 && i == 2 ? 'large' : 'small'"
                />
            </div>
            <div class="tablet:row-start-3 tablet:col-start-2 flex justify-between">
                <div>
                    <NuxtLink
                        v-if="previousProject != undefined && previousProject.content?.length > 0"
                        :to="`/projets/${previousProject.slug}`"
                        class="text-sand-100 text-sm font-bold flex items-center gap-2"
                    >
                        <AppIcon name="arrow-left" class="text-sand-100 h-4 w-4" />
                        <span class="flex flex-col">
                            <span>Projet précédent</span>
                            <span class="text-xs">({{ previousProject.name }})</span>
                        </span>
                    </NuxtLink>
                </div>
                <div>
                    <NuxtLink
                        v-if="nextProject != undefined && nextProject.content?.length > 0"
                        :to="`/projets/${nextProject.slug}`"
                        class="text-sand-100 text-sm font-bold flex items-center gap-2"
                    >
                        <span class="flex flex-col items-end">
                            <span>Projet suivant</span>
                            <span class="text-xs">({{ nextProject.name }})</span>
                        </span>
                        <AppIcon name="arrow-right" class="text-sand-100 h-4 w-4" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
