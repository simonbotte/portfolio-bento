<script setup></script>

<template>
    <section class="grid grid-cols-2 w-full max-w-mobile px-4 m-auto gap-4 tablet:max-w-tablet tablet:grid-cols-3 laptop:max-w-laptop laptop:grid-cols-4">
        <BentoHi class="col-span-2 h-bento-mobile tablet:h-bento-tablet laptop:h-bento-laptop" />
        <BentoEmpty class="col-span-1" />
        <BentoPicture src="/images/suricate.jpeg" alt="Photo d'un suricate" />
        <BentoEmpty class="col-span-1" />
        <BentoProject/>
    </section>
</template>
