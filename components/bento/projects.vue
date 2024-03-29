<script setup>
const projectsBento = ref(false);
onMounted(() => {
    useApparitionAnimation(projectsBento.value);
});
</script>

<template>
    <div ref="projectsBento" class=" flex items-center bg-sand-800 h-bento-mobile rounded-2xl tablet:h-bento-tablet laptop:h-bento-laptop">
        <NuxtLink
            :to="'/projets'"
            class="relative flex flex-col justify-center items-center p-2 gap-4  group tablet:p-4"
        >
            <p class="relative z-10 text-2xl text-center font-bold tablet:text-3xl laptop:text-4xl">Voir mes projets</p>
            <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex opacity-40 justify-center w-full items-center"
            >
                <NuxtImg
                    src="/images/bento-project-left.png"
                    alt="Image projet"
                    :width="250"
                    class="shrink-0 w-16 object-contain transition-transform duration-500 scale-125 group-hover:scale-150 tablet:w-24"
                />
                <NuxtImg
                    src="/images/bento-project-right.png"
                    alt="Image projet"
                    :width="150"
                    class="shrink-0 w-10 object-contain transition-transform duration-500 group-hover:scale-125 tablet:w-16"
                />
            </div>
        </NuxtLink>
    </div>
</template>
