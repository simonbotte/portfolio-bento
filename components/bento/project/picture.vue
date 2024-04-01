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
    size: {
        type: String,
        default: 'small',
    },
});

</script>

<template>
    <div
        :class="`relative ${size == 'small' ? 'col-span-1 h-bento-mobile':'col-span-2 h-bento-mobile-2'} aspect-square rounded-2xl flex flex-col justify-between w-full p-4`"
    >
        <BentoPictureBackground class="absolute w-full h-full top-0 left-0 rounded-2xl" />
        <NuxtImg :alt="alt" :src="src" class="relative z-10 rounded-2xl h-full object-contain w-full " />
    </div>
</template>
