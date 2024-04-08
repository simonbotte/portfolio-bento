<script setup>
const props = defineProps({
    icon: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

const linkBento = ref(false);
onMounted(() => {
    useApparitionAnimation(linkBento.value);
});
</script>

<template>
    <div ref="linkBento" class=" bg-sand-800 h-bento-mobile rounded-2xl tablet:h-bento-tablet laptop:h-bento-laptop">
        <NuxtLink
            :to="link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="title"
            class="flex flex-col justify-between p-4 gap-2 h-full tablet:p-4"
        >
            <div class="h-8 shrink-0"></div>
            <div class="flex flex-col items-center justify-center h-full">
                <NuxtImg :src="icon" :alt="title" width="52" height="52" class="h-full w-auto max-h-12 tablet:max-h-20 laptop:max-h-28" />
            </div>
            <div class="w-8 h-8 flex items-center justify-center shrink-0 relative group">
                <div class="w-full h-full bg-sand-200 flex items-center justify-center rounded-full relative z-10">
                    <AppIcon name="arrow-right" class="text-sand-800 -rotate-45" />
                </div>
                <div
                    class="w-10 h-10 bg-sand-200/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full scale-50 transition-transform duration-500 ease-smooth group-hover:scale-100"
                ></div>
            </div>
        </NuxtLink>
    </div>
</template>
