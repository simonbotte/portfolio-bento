<script setup>
const props = defineProps({
    alt: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        class="bg-sand-800 h-bento-mobile-2 col-span-2 rounded-2xl flex flex-col justify-between 
        tablet:h-bento-tablet tablet:col-span-1 tablet:gap-4 tablet:justify-center 
        laptop:h-bento-laptop laptop:row-span-1 laptop:col-span-1"
    >
        <NuxtImg :alt="alt" :src="src" class="rounded-2xl h-full object-contain w-full" />
    </div>
</template>
