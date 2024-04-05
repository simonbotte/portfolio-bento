<script setup>
const apiUrl = `/api/strapi/legals/`;
const { data: legalsData } = await useFetch(apiUrl, {
    method: "GET",
});
console.log(legalsData);
const data = ref(legalsData.value?.data.attributes);
</script>

<template>
    <section class="flex flex-col w-full max-w-mobile mx-auto p-4 gap-6 tablet:max-w-tablet laptop:max-w-laptop">
        <h1 class="text-3xl font-bold text-sand-100 tablet:text-4xl">{{ data.title }}</h1>

        <div class="flex flex-col" v-html="$rcTranslator(data.content)"></div>
    </section>
</template>
