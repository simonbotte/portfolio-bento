<script setup></script>

<template>
    <section class="grid grid-cols-2 w-full max-w-mobile px-4 m-auto gap-4 pb-8 tablet:max-w-tablet tablet:grid-cols-3 laptop:max-w-laptop laptop:grid-cols-4 laptop:gap-8">
        <BentoHi class="col-span-2 h-bento-mobile tablet:h-bento-tablet laptop:h-bento-laptop" />
        <BentoEmpty/>
        <BentoPicture src="/images/suricate.jpeg" alt="Photo d'un suricate" class="tablet:col-start-1 tablet:row-start-2 laptop:col-start-4 laptop:row-start-1" />
        <LazyBentoMusic/>
        <BentoAbout class="tablet:row-start-2"/>
        <BentoProject/>
        <BentoJourney class="tablet:col-start-3 tablet:row-start-3 laptop:col-start-1 laptop:row-start-2"/>
        <BentoLink :title="'LinkedIn'" :icon="'/icons/linkedin.svg'" :link="'https://apple.com'"/>
        <BentoLink :title="'LinkedIn'" :icon="'/icons/linkedin.svg'" :link="'https://apple.com'"/>
        <BentoProject class="tablet:col-start-2 tablet:row-start-5 laptop:col-start-2 laptop:row-start-4"/>
    </section>
</template>
