<script setup>
const aboutStackBento = ref(false);
onMounted(() => {
    useApparitionAnimation(aboutStackBento.value);
});
</script>

<template>
    <div
        ref="aboutStackBento"
        class="relative overflow-hidden flex justify-center items-center flex-col bg-sand-800 h-bento-mobile rounded-2xl p-4 tablet:h-bento-tablet laptop:h-bento-laptop"
    >
        <p class="z-10 text-sm text-center font-bold tablet:text-base laptop:text-lg text-sand-800">Nuxt • Vue.js • React • Node.js • JS • Symfony • Laravel • PHP • Tailwind • CSS • HTML • Et plus</p>

        <BentoPictureBackground class="pointer-events-none absolute w-full h-full top-0 left-0 rounded-2xl rotate-12 scale-150" />
    </div>
</template>
