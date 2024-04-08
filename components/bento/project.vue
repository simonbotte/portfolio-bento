<script setup>
const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
});

const projectBento = ref(null);

onMounted(() => {
    useApparitionAnimation(projectBento.value);
});
</script>

<template>
    <div
        ref="projectBento"
        class="col-span-2 row-span-2 h-bento-mobile-2 bg-sand-800 rounded-2xl p-4 flex flex-col justify-between tablet:h-bento-tablet tablet:row-span-1 laptop:p-6 laptop:h-bento-laptop"
    >
        <div class="flex flex-col gap-4 tablet:gap-0">
            <div class="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between">
                <h3 class="text-2xl font-bold laptop:text-3xl">{{ project.name }}</h3>

                <p class="text-xs">
                    <span
                        v-for="technology in project.technologies"
                        class="text-xs after:content-['-'] after:mx-1 last:after:content-none last:after:mx-0"
                        >{{ technology.name.trim() }}</span
                    >
                </p>
            </div>
            <p v-if="project.close" class="text-sm">Arrêté</p>
            <p class="font-bold text-sm tablet:mb-3 laptop:text-base">{{ project.baseline }}</p>
            <p class="text-sm leading-4 laptop:text-base laptop:leading-5">{{ project.description }}</p>
        </div>
        <div class="flex gap-4">
            <AppButton v-if="project.content?.length > 0" :to="`/projets/${project.slug}`" text="En savoir plus" />
            <AppButton
                v-else-if="project.link != ''"
                :to="`${project.link}`"
                text="Voir le projet"
                :target="'_blank'"
                :theme="'border-sand'"
            />
        </div>
    </div>
</template>
