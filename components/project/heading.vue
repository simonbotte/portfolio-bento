<script setup>
const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
});
console.log(props.project);
</script>

<template>
    <section class="flex flex-col gap-4">
        <div class="flex flex-col">
            <h1 class="text-3xl font-bold text-sand-100 tablet:text-4xl">{{ project.name }}</h1>
            <p class="text-xs">
                <span
                    v-for="technology in project.technologies"
                    class="text-xs after:content-['-'] after:mx-1 last:after:content-none last:after:mx-0 tablet:text-sm"
                    >{{ technology.name.trim() }}</span
                >
            </p>
        </div>
        <div class="flex flex-col gap-1">
            <p class="text-sm font-bold tablet:text-base">{{ project.baseline }}</p>
            <p class="text-sm leading-5 tablet:text-base">{{ project.description }}</p>
        </div>
        <AppButton v-if="project.link != ''" :to="`${project.link}`" text="Voir le projet" :target="'_blank'"/>
    </section>
</template>
