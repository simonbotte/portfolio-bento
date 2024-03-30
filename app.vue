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
    <NuxtLayout>
        <NuxtPage class="pt-36 laptop:pt-44" />
    </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 300ms;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(4px);
    transform: scale(0.8);
}

.project-enter-active,
.project-leave-active {
    transition: all 300ms;
}
.project-enter-to{
    transform: translateY(100%);
}
.project-enter-from,
.project-leave-to {
    transform: translateY(100%);
}
</style>
