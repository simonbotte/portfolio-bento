<template>
    <footer class="p-4 w-full max-w-mobile mx-auto tablet:max-w-tablet laptop:max-w-laptop">
        <div class="w-full flex justify-between items-center bg-jungle-700/80 px-4 py-5 rounded-2xl laptop:px-6">
            <NuxtLink to="/" class="font-bold text-sand-100 text-2xl flex flex-col items-center tablet:gap-2 tablet:text-3xl">
                <span class="leading-6 target:leading-8">Simon</span>
                <span class="leading-6 target:leading-8">Botté</span>
            </NuxtLink>
            <nav class="flex flex-col gap-4">
                <ul class="flex gap-4">
                    <li><nuxt-link class="text-sm laptop:text-base" to="/projets">Projets</nuxt-link></li>
                    <li><nuxt-link class="text-sm laptop:text-base" to="/projets">Mentions légales</nuxt-link></li>
                </ul>
            </nav>
        </div>
    </footer>
</template>
