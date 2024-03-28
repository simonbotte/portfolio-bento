<script setup>
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
const project = ref(projectsData.value?.data[0]);
console.log(project.value);
</script>

<template>
    <section class="w-full max-w-mobile px-4 m-auto pb-8 flex flex-col gap-4 tablet:max-w-tablet laptop:max-w-laptop">
        <div class="grid grid-cols-1 gap-4 tablet:grid-cols-2 relative laptop:grid-cols-3 laptop:items-start">
            <div class="flex flex-col gap-4 tablet:sticky tablet:top-44 tablet:h-fit">
                <ProjectBack />
                <ProjectHeading :project="project.attributes" />
            </div>

            <div class="flex flex-col gap-4">
                <ProjectContent
                    v-for="content in project.attributes.sections"
                    :title="content.title"
                    :content="$rcTranslator(content.content)"
                />
            </div>
            <div
                class="grid grid-cols-2 w-auto max-w-mobile m-auto gap-4 tablet:col-start-2 tablet:row-start-2 tablet:ml-0 laptop:col-start-auto laptop:row-start-auto laptop:sticky laptop:top-44 laptop:h-fit laptop:mr-0 laptop:ml-auto laptop:my-0"
            >
                <BentoProjectPicture
                    v-for="(picture, i) in project.attributes.pictures.data"
                    :alt="project.attributes.name"
                    :src="project.attributes.pictures.data.length == 3 && i == 2 ? apiHost + picture.attributes.formats.medium.url : apiHost + picture.attributes.formats.small.url"
                    class="max-w-full"
                    :size="project.attributes.pictures.data.length == 3 && i == 2 ? 'large' : 'small'"
                />
            </div>
        </div>
    </section>
</template>
