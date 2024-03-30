import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const useApparitionAnimation = (el) => {
    gsap.registerPlugin(ScrollTrigger);
    //generate random delay between 0 and 0.5s
    const delay = Math.random() * 0.5;
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
        },
        y: 64,
        opacity: 0,
        duration: 0.2,
        delay: delay,
    });
};
