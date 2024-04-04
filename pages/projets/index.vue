<script setup lang="js">
const apiUrl = `/api/strapi/projects/`;
const { data: projectsData } = await useFetch(apiUrl, {
    method: "GET",
});
const projects = ref(projectsData.value?.data);
</script>

<template>
    <section class="grid grid-cols-2 w-full max-w-mobile px-4 m-auto gap-4 pb-20 
    tablet:max-w-tablet tablet:grid-cols-3 
    laptop:max-w-laptop laptop:grid-cols-4 laptop:gap-8">
        <BentoProject v-for="project in projects" :key="project.id" :project="project.attributes" class="tablet:col-span-3 laptop:col-span-2" />
    </section>
</template>
