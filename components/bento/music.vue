<script setup>
const token = ref("");
const { data: jwtToken } = await useFetch("/api/security/apple-jwt", { method: "POST" });
token.value = jwtToken.value.token;

const userToken = ref("");
const { data: dataUserToken } = await useFetch("/api/security/apple-user-token", { method: "POST" });
userToken.value = dataUserToken.value.userToken;

const musicUrl = ref(`https://api.music.apple.com/v1`);

const music = ref(null);

const {
    data: lastPlayedMusic,
    pending,
    error,
} = await useFetch(musicUrl.value + "/me/recent/played/tracks?limit=1", {
    headers: {
        Authorization: `Bearer ${token.value}`,
        "Music-User-Token": userToken.value,
    },
    method: "GET",
    lazy: true,
});

const musicBento = ref(null);

const getArtworkUrl = (url) => {
    return url.replace("{w}", "100").replace("{h}", "100");
};
console.log(getArtworkUrl(lastPlayedMusic.value.data[0].attributes.artwork.url));
onMounted(async () => {
    useApparitionAnimation(musicBento.value);
});
</script>

<template>
    <div
        ref="musicBento"
        class="musicBento bg-sand-800 p-4 h-bento-mobile-1 flex flex-col gap-2 justify-between rounded-2xl overflow-hidden h-bento-mobile tablet:p-4 tablet:h-bento-tablet laptop:p-6 laptop:h-bento-laptop"
    >
        <div class="card-container relative w-8 h-8 tablet:w-9 tablet:h-9 laptop:w-10 laptop:h-10">
            <div class="card absolute w-full h-full ease-smooth duration-300">
                <NuxtImg
                    src="/icons/appleMusic.svg"
                    alt="Logo Apple Music"
                    :width="36"
                    class="card-img card-img-front shrink-0 w-full absolute top-0 left-0"
                />
                <NuxtLink :to="lastPlayedMusic.data[0].attributes.url" target="_blank" class="card-img card-img-back absolute top-0 left-0 w-full h-full">
                    <NuxtImg :src="getArtworkUrl(lastPlayedMusic.data[0].attributes.artwork.url)" class="w-full h-full object-cover rounded-md"></NuxtImg>
                </NuxtLink>
                
            </div>
        </div>
        <div class="flex flex-col gap-1 tablet:gap-4">
            <div class="flex gap-2 flex-col items-start">
                <h2 class="text-sand-100 text-sm leading-4 tablet:text-xl tablet:leading-6">Dernière écoute</h2>
                <div v-if="pending == false" class="flex flex-col gap-1">
                    <h3
                        class="text-sand-100 leading-4 text-sm font-bold max-h-8 overflow-hidden tablet:text-lg tablet:leading-5 tablet:max-h-14"
                        :data-full-name="lastPlayedMusic.data[0].attributes.name"
                    >
                        <NuxtLink :to="lastPlayedMusic.data[0].attributes.url" target="_blank">{{
                            lastPlayedMusic.data[0].attributes.name
                        }}</NuxtLink>
                    </h3>
                    <p class="text-sand-100/80 text-xs max-h-8 overflow-hidden">
                        {{ lastPlayedMusic.data[0].attributes.artistName }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
.card{
    transform-style: preserve-3d;
    transform: 300ms ease;
}
.musicBento:hover .card{
    transform: rotateY(180deg);
}
.card-img{
    backface-visibility:hidden
}
.card-img-back{
    transform: rotateY(180deg);
}
</style>