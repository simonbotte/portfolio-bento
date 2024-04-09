<script setup>
const aboutBento = ref(false);
onMounted(() => {
    useApparitionAnimation(aboutBento.value);
});
</script>

<template>
    <section ref="aboutBento" class="relative overflow-hidden bg-sand-800 h-bento-mobile col-span-2 p-4 rounded-2xl flex flex-col justify-between tablet:h-bento-tablet tablet:gap-4 tablet:py-8 laptop:h-bento-laptop laptop:px-6 laptop:py-10">
        <BentoPictureBackgroundWide class="absolute w-full h-full top-0 left-0 rounded-2xl scale-[1.2] origin-top" />
        <div class="relative z-10 flex flex-col gap-2">
            <h2 class="text-sand-800 text-2xl leading-6 font-bold tablet:text-3xl ">Mon aventure dans le web</h2>
            <p class="text-sand-800 text-sm leading-4 tablet:text-base">
                À défaut d'échanger avec moi, ces lignes vous permettront d'en apprendre davantage sur moi et qui je suis dans la vie de tous les jours.
            </p>
        </div>
        <AppButton text="Lire la suite" to="/a-propos" :theme="'full-sand-dark'"/>
    </section>
</template>
