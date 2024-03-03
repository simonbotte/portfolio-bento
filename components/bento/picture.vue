<script setup>
const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="h-bento-mobile-2 row-span-2 tablet:h-bento-tablet-2 laptop:h-bento-laptop-2 rounded-2xl overflow-hidden">
        <NuxtImg class="h-full w-full object-cover" :src="src" :alt="alt" :width="280"/>
    </div>
</template>
