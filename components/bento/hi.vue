<script setup>
const hiBento = ref(false);
onMounted(() => {
    useApparitionAnimation(hiBento.value);
});
</script>

<template>
    <div ref="hiBento" class=" @container pr-4 bg-sand-800 rounded-2xl flex content-between items-center">
        <div class="shrink-0 h-full">
            <NuxtImg
                class="scale-110 origin-bottom h-full w-auto"
                src="/images/simon.webp"
                :width="180"
                alt="Photo de Simon"
            />
        </div>
        <div class="pl-6 relative">
            <p class="absolute text-base -top-2 tablet:text-xl">Salut !</p>
            <h1 class="text-base leading-5 max-w-64 tablet:max-w-full tablet:text-xl">
                Je suis <span class="text-4xl font-bold tablet:text-5xl">Simon</span>, développeur web full-stack
            </h1>
        </div>
    </div>
</template>
