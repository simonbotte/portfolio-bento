<script setup>
// useHead({
//     script: [
//         {
//             src: "https://js-cdn.music.apple.com/musickit/v1/musickit.js",
//             async: true,
//             "data-web-components": "true",
//         },
//     ],
// });

const token = ref("");
const { data:jwtToken} = await useFetch("/api/security/apple-jwt", { method: "POST" });
token.value = jwtToken.value.token;

const userToken = ref("");
const { data:dataUserToken} = await useFetch("/api/security/apple-user-token", { method: "POST" });
userToken.value = dataUserToken.value.userToken;

const musicUrl = ref(`https://api.music.apple.com/v1`);

const music = ref(null);

// const loadMusic = async () => {
//     console.log("MusicKit is ready");
//     try {
//         await MusicKit.configure({
//             developerToken: token.value,
//             app: {
//                 name: "Portfolio bento",
//                 build: "1.0.0",
//             },
//         });
//     } catch (err) {
//         console.log(err);
//     }
//     // MusicKit instance is available
//     music.value = MusicKit.getInstance();
//     await music.value.authorize();
// };

const getRecentPlayed = async () => {
    const { data, error } = await useFetch(musicUrl.value + "/me/recent/played/tracks", {
        headers: {
            Authorization: `Bearer ${token.value}`,
            "Music-User-Token": userToken.value,
        },
        method: "GET",
    });
    console.log(data.value, error);
};
await getRecentPlayed();
onMounted(async () => {
    // console.log("MusicKit is ready not event");
    // document.addEventListener("musickitloaded", async function () {
    //     await loadMusic();
    // });
    // await loadMusic();

    
});
</script>

<template>
    <div
        class="bg-sand-800 px-4 py-6 h-bento-mobile-2 row-span-2 col-span-2 tablet:h-bento-tablet-2 tablet:col-span-1 laptop:h-bento-laptop-2 laptop:py-8 rounded-2xl overflow-hidden"
    ></div>
</template>
