<script setup>
const {
    data,
    status,
    refresh,
} = await useFetch("/api/music/last-played", {
    key: "apple-music-last-played",
    query: { fresh: import.meta.client ? "1" : undefined },
    lazy: true,
    watch: false,
    timeout: 8_000,
});

const lastPlayedMusicData = ref(data.value?.track ?? null);
watch(data, (value) => {
    if (value?.track) {
        lastPlayedMusicData.value = value.track;
    }
});

const musicBento = ref(null);
let refreshTimer;
const refreshMusic = () => {
    if (document.visibilityState === "visible") {
        void refresh({ dedupe: "defer" });
    }
};

onMounted(() => {
    useApparitionAnimation(musicBento.value);
    refreshMusic();
    refreshTimer = setInterval(refreshMusic, 30_000);
    document.addEventListener("visibilitychange", refreshMusic);
    window.addEventListener("focus", refreshMusic);
    window.addEventListener("online", refreshMusic);
});

onBeforeUnmount(() => {
    clearInterval(refreshTimer);
    document.removeEventListener("visibilitychange", refreshMusic);
    window.removeEventListener("focus", refreshMusic);
    window.removeEventListener("online", refreshMusic);
});
</script>

<template>
    <div
        ref="musicBento"
        :class="{ 'musicBento--artwork': lastPlayedMusicData?.artworkUrl }"
        class="musicBento bg-sand-800 p-4 h-bento-mobile-1 flex flex-col gap-2 justify-between rounded-2xl overflow-hidden h-bento-mobile tablet:p-4 tablet:h-bento-tablet laptop:p-6 laptop:h-bento-laptop"
    >
        <div class="card-container relative w-8 h-8 tablet:w-10 tablet:h-10 laptop:w-12 laptop:h-12">
            <div class="card absolute w-full h-full ease-smooth duration-300">
                <NuxtImg
                    src="/icons/appleMusic.svg"
                    alt="Logo Apple Music"
                    :width="36"
                    class="card-img card-img-front shrink-0 w-full absolute top-0 left-0"
                />
                <NuxtLink v-if="lastPlayedMusicData?.artworkUrl" :to="lastPlayedMusicData.url" target="_blank" rel="noopener noreferrer" class="card-img card-img-back absolute top-0 left-0 w-full h-full">
                    <NuxtImg :src="lastPlayedMusicData.artworkUrl" class="w-full h-full object-cover rounded-md" :alt="`Pochette de ${lastPlayedMusicData.name}`"></NuxtImg>
                </NuxtLink>
                
            </div>
        </div>
        <div class="flex flex-col gap-1 tablet:gap-4">
            <div class="flex gap-2 flex-col items-start">
                <h2 class="text-sand-100 text-sm leading-4 tablet:text-xl tablet:leading-6">Dernière écoute</h2>
                <div v-if="lastPlayedMusicData" class="flex flex-col gap-1">
                    <h3
                        class="text-sand-100 leading-4 text-sm font-bold max-h-8 overflow-hidden tablet:text-lg tablet:leading-5 tablet:max-h-14"
                        :data-full-name="lastPlayedMusicData.name"
                    >
                        <NuxtLink :to="lastPlayedMusicData.url" target="_blank" rel="noopener noreferrer">{{
                            lastPlayedMusicData.name
                        }}</NuxtLink>
                    </h3>
                    <p class="text-sand-100/80 text-xs max-h-8 overflow-hidden">
                        {{ lastPlayedMusicData.artistName }}
                    </p>
                </div>
                <p v-else role="status" class="text-sand-100/80 text-xs">
                    {{ status === 'pending' ? 'Chargement de l’écoute…' : 'Dernière écoute indisponible pour le moment.' }}
                </p>
            </div>
        </div>
    </div>
</template>


<style>
.card{
    transform-style: preserve-3d;
    transform: 300ms ease;
}
.musicBento--artwork:hover .card{
    transform: rotateY(180deg);
}
.card-img{
    backface-visibility:hidden
}
.card-img-back{
    transform: rotateY(180deg);
}
</style>
