<script setup>
const aboutShortBento = ref(false);
onMounted(() => {
    useApparitionAnimation(aboutShortBento.value);
});
</script>

<template>
    <div
        ref="aboutShortBento"
        class="relative overflow-hidden flex justify-center items-center flex-col bg-sand-800 h-bento-mobile rounded-2xl tablet:h-bento-tablet laptop:h-bento-laptop"
    >
        <p class="z-10 text-xl text-center font-bold tablet:text-3xl laptop:text-4xl text-sand-800">
            Full-Stack
        </p>
        <p class="z-10 text-xl text-center font-bold tablet:text-3xl laptop:text-4xl text-sand-800">
            Bordeaux
        </p>
        <p class="z-10 text-2xl text-center font-bold tablet:text-3xl laptop:text-4xl text-sand-800">
            24 ans
        </p>

        <BentoPictureBackground class="pointer-events-none absolute w-full h-full top-0 left-0 rounded-2xl rotate-45 scale-150" />
    </div>
</template>
