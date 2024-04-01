<script setup>
const props = defineProps({
    content: {
        type: String,
        required: true,
    },
});
const aboutContent = ref(false);
onMounted(() => {
    useApparitionAnimation(aboutContent.value);
});
</script>

<template>
    <div ref="aboutContent" class="flex flex-col gap-2 col-span-2">
        <div class="text-sm tablet:text-base" v-html="content"></div>
    </div>
</template>
