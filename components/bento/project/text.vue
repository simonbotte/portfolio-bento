<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        class="bg-sand-800 h-bento-mobile-2 col-span-2 row-span-2 p-4 rounded-2xl flex flex-col justify-center gap-2 
        tablet:h-bento-tablet-2 tablet:gap-4 tablet:justify-center 
        laptop:h-bento-laptop laptop:p-6 laptop:col-span-3 laptop:row-span-1 "
    >
        <h2 class="text-2xl font-bold text-sand-100">{{ title }}</h2>
        <div class="text-sm" v-html="content"></div>
    </div>
</template>
