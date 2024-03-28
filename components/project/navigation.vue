<script setup>
const props = defineProps({
    prevProject: {
        type: Object,
        required: true,
    },
    nextProject: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="flex">
        <NuxtLink :to="`/projets/${prevProject.slug}`">
            {{ prevProject.name }}
        </NuxtLink>
        <NuxtLink :to="`/projets/${nextProject.slug}`">
            {{ nextProject.name }}
        </NuxtLink>
    </div>

</template>