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
    <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold leading-6 text-sand-100 tablet:text-3xl">{{ title }}</h2>
        <div class="text-sm tablet:text-base" v-html="content"></div>
    </div>
</template>
