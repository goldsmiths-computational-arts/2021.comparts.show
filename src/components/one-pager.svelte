<script>
    import { onMount } from 'svelte'
    import { GeneralShowInfo, ArtistNames } from "../constants";

    const random = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    onMount(async () => {
        const moveCircles = () => {
            Array.from(document.querySelectorAll(".bubble-overlay")).forEach(svgElement => {
                const circles = Array.from(svgElement.querySelectorAll(".image-circle"));
                const cx = random(0, 100);
                const cy = random(0, 100);
                // console.log({ cx, cy })
                circles.forEach(circleEl => {
                    circleEl.setAttribute("cx", cx);
                    circleEl.setAttribute("cy", cy)
                })
            })
        }
        setTimeout(() => {
            moveCircles();
            setInterval(moveCircles, 10000)
        }, 500)
    })

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    shuffleArray(ArtistNames)
    const half = Math.ceil(ArtistNames.length / 2)

    const namesOne = ArtistNames.slice(0, half).toString().replace(/,/g, ', ')
    const namesTwo = ArtistNames.slice(-half).toString().replace(/,/g, ', ')
</script>

<body>
<div class="text-layer">
    <div class="names">
        {namesOne}
    </div>
    <div class="key-text">
        <span class="show-title"> {GeneralShowInfo.fullShowName}</span>
        {GeneralShowInfo.description}
    </div>
    <div class="names">
        {namesTwo}
    </div>

    <svg preserveAspectRatio="xMinYMid meet" class="bubble-overlay" viewBox="0 0 100 100"
         xmlns="http://www.w3.org/2000/svg">
        <clipPath id="myClip">
            <circle class="image-circle" cx="40" cy="35" r="20" />
        </clipPath>
        <image class="svg-overlay-img" href="./img/one-pager/overlay-bg-1.png" clip-path="url(#myClip)"  />
        <circle class="image-circle" vector-effect="non-scaling-stroke" cx="40" cy="35" r="20" stroke="black"
                stroke-width="3" fill="none" />
    </svg>

    <svg preserveAspectRatio="xMinYMid meet" class="bubble-overlay" viewBox="0 0 100 100"
         xmlns="http://www.w3.org/2000/svg">
        <clipPath id="myClip2">
            <ellipse class="image-circle" cx="80" cy="5" rx="20" ry="15" />
        </clipPath>
        <image class="svg-overlay-img" href="./img/one-pager/overlay-bg-2.png" clip-path="url(#myClip2)" />
        <ellipse class="image-circle" vector-effect="non-scaling-stroke" cx="80" cy="5" rx="20" ry="15" stroke="black"
                 stroke-width="3" fill="none" />
    </svg>
</div>
</body>

<style>
    body {
        margin: 5px;
        font-family: ab-neuron, sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .text-layer {
        font-size: 36px;
        text-align: justify;
    }

    .names {
         /*filter: blur(5px);*/
    }

    .show-title {
        text-transform: uppercase;
    }

    .key-text {}

    .bubble-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        pointer-events: none;
    }

    .svg-overlay-img {
        width: 200px;
    }

    .image-circle {
        transition: all 10s ease;
    }

    .names:first-child {
        margin-bottom: 1em;
    }

    .key-text {
        margin-bottom: 1em;
        color: red;
    }

</style>