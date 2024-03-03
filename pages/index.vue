<script setup></script>

<template>
    <section class="grid grid-cols-2 w-full max-w-mobile px-4 m-auto gap-4 tablet:max-w-tablet tablet:grid-cols-3 laptop:max-w-laptop laptop:grid-cols-4">
        <BentoHi class="col-span-2 h-bento-mobile tablet:h-bento-tablet laptop:h-bento-laptop" />
        <BentoEmpty class="col-span-1 h-full" />
        <BentoEmpty class="col-span-1 row-span-2 h-full aspect-1/2" />
    </section>
</template>
