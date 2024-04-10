<script setup>
useHead({
    meta: [
        {
            name: "apple-mobile-web-app-title",
            content: "Simon Botté | Portfolio",
        },
        {
            name: "application-name",
            content: "Simon Botté | Portfolio",
        },
        {
            name: "msapplication-TileColor",
            content: "#da532c",
        },
        {
            name: "theme-color",
            content: "#ffffff",
        },
        {
            name: "robots",
            content: "index, follow",
        },
        {
            name: "googlebot",
            content: "index, follow",
        },
        {
            name: "google-site-verification",
            content: "RvrIwIVpeiE6JCQchWjMyoajKEqSTJFmSRCFCqLYfy0",
        },
    ],
    link: [
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/apple-touch-icon.png?v=2",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png?v=2",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png?v=2",
        },
        {
            rel: "manifest",
            href: "/site.webmanifest?v=2",
        },
        {
            rel: "mask-icon",
            href: "/safari-pinned-tab.svg?v=2",
            color: "#5bbad5",
        },
        {
            rel: "shortcut icon",
            href: "/favicon.ico?v=2",
        },
        {
            rel: "mask-icon",
            href: "/safari-pinned-tab.svg?v=2",
            color: "#5bbad5",
        },
    ],
    bodyAttrs: {
        class: "bg-jungle-900 text-sand-100 antialiased",
    },
});

useSeoMeta({
    title: "Simon Botté | Développeur web full-stack",
    description:
        "Je suis Simon Botté, développeur web full-stack. Je suis spécialisé dans la création de sites web et d'applications web. Je suis basé à Bordeaux, France.",
    image: "https://www.simonbotte.fr/og-image/home.jpg",
    url: "https://www.simonbotte.fr",
    ogSiteName: "Simon Botté | Portfolio",
    ogType: "website",
    ogLocale: "fr_FR",
    ogUrl: "https://www.simonbotte.fr",
    twitterCard: "summary_large_image",
    twitterSite: "@simonbotte",
    twitterCreator: "@simonbotte",
    twitterImage: "https://www.simonbotte.fr/og-image/home.jpg",
    lang: "fr",
});
</script>


<template>
    <AppHeader />
    <NuxtLayout>
        <NuxtPage class="pt-36 laptop:pt-44" />
    </NuxtLayout>
    <AppFooter />
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 300ms;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(4px);
    transform: scale(0.8);
}

.project-enter-active,
.project-leave-active {
    transition: all 300ms;
}
.project-enter-to {
    padding-top: 200vh;
}
.project-enter-from,
.project-leave-to {
    padding-top: 200vh;
}
</style>
