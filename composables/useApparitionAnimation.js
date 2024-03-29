import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useApparitionAnimation = (el) => {
    gsap.registerPlugin(ScrollTrigger);

    //apparition from the bottom animation
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
        },
        y: 64,
        opacity: 0,
        duration: 0.3,
    });
};
