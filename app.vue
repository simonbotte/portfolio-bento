<script setup>
useHead({
    title: "Simon Botté | Développeur web full-stack | Portfolio",
    meta: [
        {
            hid: "description",
            name: "description",
            content:
                "Développeur web full-stack, je suis spécialisé dans la création de sites web et d'applications web. Je suis basé à Bordeaux, France.",
        },
    ],
    bodyAttrs: {
        class: "bg-jungle-900 text-sand-100 antialiased",
    },
});
</script>

<template>
    <AppHeader />
    <NuxtPage class="pt-36 laptop:pt-44" />
</template>
