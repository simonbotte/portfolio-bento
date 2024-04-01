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
    theme: {
        type: String,
        default: "full-sand",
    },
});
const classButtonStyle = ref("");
const classHoverStyle = ref("");
switch (props.theme) {
    case "full-sand":
        classButtonStyle.value =
            "bg-sand-200 text-sand-800 border-sand-100 group-hover:text-sand-100 group-hover:bg-sand-500 group-hover:border-sand-500";
        classHoverStyle.value = "bg-sand-500/60";
        break;
    case "full-sand-dark":
        classButtonStyle.value =
            "bg-sand-800 text-sand-100 border-sand-800 group-hover:text-sand-100 group-hover:bg-sand-500 group-hover:border-sand-500";
        classHoverStyle.value = "bg-sand-500/60";
        break;
    case "border-sand":
        classButtonStyle.value =
            "border-sand-200 text-sand-200 group-hover:text-sand-100 group-hover:bg-sand-500 group-hover:border-sand-500";
        classHoverStyle.value = "bg-sand-500/60";
        break;
    default:
        classButtonStyle.value =
            "bg-sand-200 text-sand-800 border-sand-100 group-hover:text-sand-100 group-hover:bg-sand-500 group-hover:border-sand-500";
        classHoverStyle.value = "bg-sand-500/60";
        break;
}
</script>

<template>
    <div class="">
        <NuxtLink :class="`group relative inline-flex`" :to="to" :target="target">
            <span
                :class="`${classButtonStyle} border transition-all duration-500 ease-smooth relative z-10 text-sm font-bold px-4 py-2 rounded-md inline-flex laptop:text-base`"
                >{{ text }}</span
            >
            <span
                :class="`transition-all duration-500 ease-smooth absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${classHoverStyle} w-full h-full flex rounded-lg opacity-0 pointer-events-none group-hover:w-[calc(100%+0.5rem)] group-hover:h-[calc(100%+0.5rem)] group-hover:opacity-100`"
            ></span>
        </NuxtLink>
    </div>
</template>
