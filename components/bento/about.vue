<script setup>
const aboutBento = ref(false);
onMounted(() => {
    useApparitionAnimation(aboutBento.value);
});
</script>

<template>
    <section ref="aboutBento" class=" bg-sand-800 h-bento-mobile col-span-2 p-4 rounded-2xl flex flex-col justify-between tablet:h-bento-tablet tablet:gap-4 tablet:py-8 laptop:h-bento-laptop laptop:px-6 laptop:py-10">
        <div class="flex flex-col gap-2">
            <h2 class="text-sand-100 text-2xl font-bold tablet:text-3xl ">Mon aventure dans le web</h2>
            <p class="text-sand-100 text-sm tablet:text-base">
                À défaut d’échanger avec moi, vous pouvez en apprendre plus sur moi avec ces lignes
            </p>
        </div>
        <AppButton text="Lire la suite" to="/" />
    </section>
</template>
