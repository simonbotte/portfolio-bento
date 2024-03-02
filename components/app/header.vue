<script setup>
const isOpen = ref(false);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <header class="fixed left-0 flex justify-center items-center p-4 top-2 w-full backdrop-blur box-border lg:top-8">
        <div :class="`flex justify-between items-center w-full max-w-5xl bg-jungle-700-80 p-4 relative transition-all duration-300 ${isOpen ?'rounded-t-2xl':'rounded-2xl'}`">
            <div @click="toggleMenu" class="flex sm:hidden flex-col justify-center items-center">
                <span :class="`w-6 bg-sand-100 h-0.5 block rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1':'-translate-y-0.5'}`"></span>
                <span :class="`w-6 bg-sand-100 h-0.5 block rounded transition-all duration-300 my-0.5 ${isOpen ? 'opacity-0':''}`"></span>
                <span :class="`w-6 bg-sand-100 h-0.5 block rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1':'translate-y-0.5'}`"></span>
            </div>
            <NuxtLink to="/"><h1 class="font-bold text-sand-100 text-4xl">Simon Botté</h1></NuxtLink>
            <nav :class="`block left-0  absolute bottom-0 w-full p-4 rounded-b-2xl bg-jungle-700-80 transition-all duration-300 sm:relative sm:block sm:w-fit sm:opacity-100 sm:bg-transparent sm:flex-row sm:p-0 sm:translate-y-0 sm:bottom-auto sm:pointer-events-auto${isOpen ?' translate-y-full opacity-100':' pointer-events-none translate-y-3/4 opacity-0'}`">
                <ul class="flex flex-col gap-4 sm:flex-row">
                    <li><nuxt-link class="text-xl" to="/">À propos</nuxt-link></li>
                    <li><nuxt-link class="text-xl" to="/">Projets</nuxt-link></li>
                    <li><nuxt-link class="text-xl" to="/">Contact</nuxt-link></li>
                </ul>
            </nav>
        </div>
    </header>
</template>
