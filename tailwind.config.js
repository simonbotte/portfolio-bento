/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        screens: {
            tablet: "768px",
            laptop: "1200px",
        },
        extend: {
            maxWidth: {
                mobile: "375px",
                tablet: "768px",
                laptop: "1200px",
            },
            height: {
                "bento-mobile": "10.25rem",
                "bento-tablet": "14.625rem",
                "bento-laptop": "17.5rem",
                "bento-mobile-2": "21.5rem",
                "bento-tablet-2": "28.5rem",
                "bento-laptop-2": "34.5rem",
            },
        },

        colors: {
            transparent: "transparent",
            current: "currentColor",
            jungle: {
                50: "#EEF1EF",
                100: "#D8DEDA",
                200: "#BFC9C2",
                300: "#A7B4AB",
                400: "#909F95",
                500: "#7A8A80",
                600: "#59685F",
                700: "#404C45",
                800: "#2A322D",
                900: "#181C1A",
                "700-80": "rgba(64, 76, 68, 0.8)",
            },
            sand: {
                50: "#F6F0EB",
                100: "#E8DACF",
                200: "#D8C3B1",
                300: "#C6AC95",
                400: "#B3967B",
                500: "#9F8165",
                600: "#7B6045",
                700: "#5B4530",
                800: "#3C2E1F",
                900: "#211A13",
                "200-80": "rgba(216, 195, 177, 0.8)",
            },
        },
    },
};
