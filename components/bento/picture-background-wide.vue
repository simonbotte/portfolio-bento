<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns:svgjs="http://svgjs.dev/svgjs"
        viewBox="0 0 1920 1080"
        width="800"
        height="800"
        class="pointer-events-none h-full w-full"
    >
        <defs>
            <linearGradient
                gradientTransform="rotate(-203, 0.5, 0.5)"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="gggrain-gradient2"
            >
                <stop stop-color="#5B4530" stop-opacity="1" offset="-0%"></stop>
                <stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"></stop>
            </linearGradient>
            <linearGradient
                gradientTransform="rotate(203, 0.5, 0.5)"
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="gggrain-gradient3"
            >
                <stop stop-color="#C6AC95" stop-opacity="1"></stop>
                <stop stop-color="rgba(255,255,255,0)" stop-opacity="0" offset="100%"></stop>
            </linearGradient>
            <filter
                id="gggrain-filter"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.78"
                    numOctaves="2"
                    seed="2"
                    stitchTiles="stitch"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    result="turbulence"
                ></feTurbulence>
                <feColorMatrix
                    type="saturate"
                    values="0"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="turbulence"
                    result="colormatrix"
                ></feColorMatrix>
                <feComponentTransfer
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="colormatrix"
                    result="componentTransfer"
                >
                    <feFuncR type="linear" slope="3"></feFuncR>
                    <feFuncG type="linear" slope="3"></feFuncG>
                    <feFuncB type="linear" slope="3"></feFuncB>
                </feComponentTransfer>
                <feColorMatrix
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="componentTransfer"
                    result="colormatrix2"
                    type="matrix"
                    values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 20 -12"
                ></feColorMatrix>
            </filter>
            <filter
                id="gggrain-saturate"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feColorMatrix
                    type="saturate"
                    values="3"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    in="SourceGraphic"
                    result="colormatrix"
                ></feColorMatrix>
            </filter>
        </defs>
        <g filter="url(#gggrain-saturate)" class="h-full w-full">
            <rect width="100%" height="100%" fill="#a7b4ab"></rect>
            <rect width="100%" height="100%" fill="url(#gggrain-gradient3)"></rect>
            <rect width="100%" height="100%" fill="url(#gggrain-gradient2)"></rect>
            <rect
                width="100%"
                height="100%"
                fill="transparent"
                filter="url(#gggrain-filter)"
                opacity="0.53"
                style="mix-blend-mode: soft-light"
            ></rect>
        </g>
    </svg>
</template>
