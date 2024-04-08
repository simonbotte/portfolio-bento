<script lang="ts" setup></script>

<template>
    <section
        class="grid grid-cols-2 w-full max-w-mobile px-4 m-auto gap-4 pb-32 tablet:max-w-tablet tablet:grid-cols-3 laptop:max-w-laptop laptop:grid-cols-4 laptop:gap-8"
    >
    <div class="col-span-2 flex flex-col tablet:col-span-3 laptop:col-span-4">
        <h1 class="text-3xl font-bold text-sand-100 tablet:text-4xl">Contactez-moi</h1>
        <p class="text-base text-sand-100">
            Vous souhaitez me contacter ? N'hésitez pas à m'envoyer un mail sur <a class="underline" href="mailto:simon.botte@icloud.com">mon adresse</a> ou à me contacter sur <a class="underline" href="https://www.linkedin.com/in/simon-botte-530938175/">LinkedIn</a>.
        </p>
    </div>
    <BentoLink :title="'LinkedIn'" :icon="'/icons/linkedin.svg'" :link="'https://www.linkedin.com/in/simon-botte-530938175/'" class="laptop:row-start-2"/>
    <BentoLink :title="'GitHub'" :icon="'/icons/github.svg'" :link="'https://github.com/simonbotte'" class="laptop:row-start-2" />
    </section>
</template>
