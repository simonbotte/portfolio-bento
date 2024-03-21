<script setup>
const props = defineProps({
    to: {
        type: String,
        required: true,
    },
    text:{
        type: String,
        default: "Contact me"
    
    }
});
</script>

<template>
    <div class="">
        <NuxtLink class="text-sm bg-sand-100 text-jungle-800 font-bold px-4 py-2 rounded-md inline-flex transition-all duration-300 hover:text-sand-100 hover:bg-jungle-700 laptop:text-base" :to="to">{{ text }}</NuxtLink>
    </div>
</template>
