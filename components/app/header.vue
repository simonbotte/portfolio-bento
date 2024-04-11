<script setup>
const isOpen = ref(false);
const route = useRoute();

watch(
    () => route.fullPath,
    () => {
        isOpen.value = false;
    }
);
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <header
        :class="`fixed z-10 left-1/2 -translate-x-1/2 flex justify-center items-center p-4 top-0 w-full max-w-mobile box-border pb-0 transition-all duration-300 tablet:max-w-tablet laptop:max-w-laptop`"
    >
        <div
            :class="`flex flex-col justify-between items-start bg-jungle-700/80 backdrop-blur w-full px-4 py-5 rounded-2xl ${isOpen ? 'gap-4' : 'gap-0'} transition-all duration-300 tablet:flex-row tablet:items-center`"
        >
            <div class="flex justify-between w-full">
                <div @click="toggleMenu" class="flex tablet:hidden flex-col justify-center items-center">
                    <span
                        :class="`w-6 bg-sand-100 h-0.5 block rounded transition-all duration-300 ${
                            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                        }`"
                    ></span>
                    <span
                        :class="`w-6 bg-sand-100 h-0.5 block rounded transition-all duration-300 my-0.5 ${
                            isOpen ? 'opacity-0' : ''
                        }`"
                    ></span>
                    <span
                        :class="`w-6 bg-sand-100 h-0.5 block rounded transition-all duration-300 ${
                            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                        }`"
                    ></span>
                </div>

                <NuxtLink to="/"
                    ><p class="font-bold text-sand-100 w-auto text-2xl tablet:text-3xl laptop:text-4xl">
                        Simon Botté
                    </p></NuxtLink
                >
            </div>
            <nav :class="`shrink-0 w-auto transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0 max-h-32' : 'opacity-0 pointer-events-none -translate-y-1/2 max-h-0'} tablet:opacity-100 tablet:pointer-events-auto tablet:translate-y-0 tablet:max-h-32` ">
                <ul class="flex flex-col gap-4 tablet:flex-row">
                    <li><nuxt-link class="text-xl" to="/a-propos">À propos</nuxt-link></li>
                    <li><nuxt-link class="text-xl" to="/projets">Projets</nuxt-link></li>
                    <li><nuxt-link class="text-xl" to="/contact">Contact</nuxt-link></li>
                </ul>
            </nav>
        </div>
    </header>
</template>
