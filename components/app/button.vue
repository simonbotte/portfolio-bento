<script setup>
const props = defineProps({
    to: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        default: "Contact me",
    },
    target: {
        type: String,
        default: "_self",
    },
    theme:{
        type: String,
        default:"full-sand"
    }
});
const classStyle = ref("");
switch (props.theme) {
    case "full-sand":
        classStyle.value = "bg-sand-100 text-jungle-700 border-sand-100 hover:text-sand-100 hover:bg-jungle-700/80 hover:border-jungle-700/80";    
        break;
    case "full-jungle":
        classStyle.value = "bg-jungle-800 text-sand-100 border-jungle-800 hover:text-jungle-800 hover:bg-sand-100 hover:border-jungle-800";
        break;
    case "border-sand":
        classStyle.value = " border-sand-100 text-sand-100 hover:text-jungle-700 hover:bg-sand-100 hover:border-sand-100";
        break;
    case "border-jungle":
        classStyle.value = " border-jungle-800 text-jungle-800 hover:text-sand-100 hover:bg-jungle-800 hover:border-jungle-800";
        break;
    default:
        classStyle.value = "bg-sand-100 text-jungle-800 border-sand-100 hover:text-sand-100 hover:bg-jungle-700";
        break;
}
</script>

<template>
    <div class="">
        <NuxtLink
            :class="`${classStyle} border text-sm font-bold px-4 py-2 rounded-md inline-flex transition-all duration-300 laptop:text-base`"
            :to="to"
            :target="target"
            >{{ text }}</NuxtLink
        >
    </div>
</template>
