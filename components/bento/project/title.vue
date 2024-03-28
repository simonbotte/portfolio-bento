<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div
        class="bg-sand-800 h-bento-mobile col-span-2 p-4 rounded-2xl flex flex-col justify-between 
        tablet:h-bento-tablet tablet:gap-4 tablet:col-span-3 tablet:justify-center 
        laptop:h-bento-laptop laptop:p-6"
    >
        <h1 class="text-3xl font-bold text-sand-100">{{ title }}</h1>
        <p>{{ description }}</p>
        
    </div>
</template>
