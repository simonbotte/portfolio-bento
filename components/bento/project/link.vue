<script setup>
    const props = defineProps({
        link: {
            type: String,
            required: true,
        },
    });
</script>

<template>
    <NuxtLink
        :to="link"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="title"
        class="flex flex-col justify-between p-2 gap-4 bg-sand-800 h-bento-mobile rounded-2xl tablet:p-4 tablet:h-bento-tablet laptop:h-bento-laptop"
    >
        <div class="h-8 shrink-0"></div>
        <p class="flex flex-col items-center justify-center h-full font-bold text-xl tablet:text-3xl">
            Voir le projet
        </p>
        <div class="w-8 h-8 flex items-center justify-center shrink-0 relative group">
            <div class="w-full h-full bg-sand-200 flex items-center justify-center rounded-full relative z-10">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.5531 2.41126C13.4296 2.23482 13.2453 2.12193 13.0103 2.08667L5.06431 0.697944C4.80027 0.651422 4.61258 0.698701 4.44317 0.817321C4.09735 1.05947 4.00704 1.50136 4.25414 1.85425C4.37275 2.02364 4.54288 2.14643 4.7349 2.18027L7.44262 2.68245L12.0335 3.27547L11.9276 2.82374L9.55614 4.27387L0.627969 10.5254C0.260961 10.7824 0.189732 11.2215 0.446712 11.5885C0.703698 11.9555 1.14063 12.0387 1.50764 11.7817L10.4358 5.53017L12.6096 3.79772L12.2263 3.55072L11.2084 8.06049L10.7542 10.7767C10.7154 10.9617 10.7775 11.1706 10.8961 11.34C11.1432 11.6929 11.5894 11.7592 11.9352 11.517C12.1046 11.3984 12.2083 11.2311 12.2556 10.9981L13.6725 3.03242C13.7197 2.79948 13.6767 2.58771 13.5531 2.41126Z"
                        fill="#404C45"
                    />
                </svg>
            </div>
            <div
                class="w-9 h-9 bg-sand-200/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full scale-50 transition-transform duration-300 group-hover:scale-100"
            ></div>
        </div>
    </NuxtLink>
</template>