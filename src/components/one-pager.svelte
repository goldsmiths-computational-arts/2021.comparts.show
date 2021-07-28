<script>
  import { onMount } from 'svelte'
  import { GeneralShowInfo } from '../constants'
  import ArtistsCSV from '../utils/data/artists.csv'
  import { stores } from '@sapper/app'
  import UAParser from 'ua-parser-js'
  import anime from 'animejs/lib/anime.es.js'

  var parser = new UAParser()
  const { session } = stores()
  parser.setUA($session['user-agent'])
  let isMobile = parser.getResult().device['type'] === 'mobile'

  const random = (min, max) => {
    return Math.random() * (max - min) + min
  }

  let imageIdOne
  let imageIdTwo
  let imageIdThree

  let startPosXA = random(500, 1000)
  let startPosYA = random(500, 1000)

  const startPosXB = random(500, 1000)
  const startPosYB = random(500, 1000)

  let windowWidth
  let windowHeight

  onMount(async () => {
    imageIdOne = Math.floor(random(1, 163)).toString().padStart(5, '0')
    imageIdTwo = Math.floor(random(1, 163)).toString().padStart(5, '0')
    imageIdThree = Math.floor(random(1, 163)).toString().padStart(5, '0')

    startPosXA = random(0, windowWidth)
    startPosYA = random(0, windowHeight)

    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    anime({
      targets: '#myClip .blob-path',
      d: [
        {
          value:
            'M95,-109.2C143.2,-72.7,216.4,-61.9,232.3,-32C248.2,-2.2,206.8,46.6,170.7,88.7C134.7,130.7,103.9,165.9,67.2,175C30.6,184.2,-12.1,167.3,-52.4,150C-92.8,132.7,-130.8,115.1,-141.6,86.6C-152.3,58,-135.7,18.5,-134,-29.3C-132.4,-77.1,-145.6,-133.1,-125.7,-174.6C-105.8,-216.1,-52.9,-243.1,-14.8,-225.5C23.4,-207.8,46.7,-145.7,95,-109.2Z',
        },
        {
          value:
            'M171.5,-191.9C215.3,-167.6,239.1,-107,234.1,-53.5C229,0.1,195,46.5,157.5,71.5C119.9,96.5,78.8,99.9,37.7,123.4C-3.3,146.9,-44.2,190.4,-72.4,185.9C-100.7,181.3,-116.1,128.7,-133.1,84.2C-150.1,39.7,-168.6,3.3,-177.6,-46.2C-186.7,-95.8,-186.2,-158.6,-155,-185.1C-123.8,-211.6,-61.9,-201.8,1,-202.9C63.9,-204.1,127.7,-216.2,171.5,-191.9Z',
        },
      ],
      easing: 'easeInOutSine',
      duration: 10000,
      direction: 'infinite alternate',
      loop: true,
    })

    anime({
      targets: '#myClip2 .blob-path',
      d: [
        {
          value:
            'M171.5,-191.9C215.3,-167.6,239.1,-107,234.1,-53.5C229,0.1,195,46.5,157.5,71.5C119.9,96.5,78.8,99.9,37.7,123.4C-3.3,146.9,-44.2,190.4,-72.4,185.9C-100.7,181.3,-116.1,128.7,-133.1,84.2C-150.1,39.7,-168.6,3.3,-177.6,-46.2C-186.7,-95.8,-186.2,-158.6,-155,-185.1C-123.8,-211.6,-61.9,-201.8,1,-202.9C63.9,-204.1,127.7,-216.2,171.5,-191.9Z',
        },
        {
          value:
            'M95,-109.2C143.2,-72.7,216.4,-61.9,232.3,-32C248.2,-2.2,206.8,46.6,170.7,88.7C134.7,130.7,103.9,165.9,67.2,175C30.6,184.2,-12.1,167.3,-52.4,150C-92.8,132.7,-130.8,115.1,-141.6,86.6C-152.3,58,-135.7,18.5,-134,-29.3C-132.4,-77.1,-145.6,-133.1,-125.7,-174.6C-105.8,-216.1,-52.9,-243.1,-14.8,-225.5C23.4,-207.8,46.7,-145.7,95,-109.2Z',
        },
      ],
      easing: 'easeInOutSine',
      duration: 10000,
      direction: 'infinite alternate',
      loop: true,
    })

    anime({
      targets: '#myClip3 .blob-path',
      d: [
        {
          value:
            'M171.5,-191.9C215.3,-167.6,239.1,-107,234.1,-53.5C229,0.1,195,46.5,157.5,71.5C119.9,96.5,78.8,99.9,37.7,123.4C-3.3,146.9,-44.2,190.4,-72.4,185.9C-100.7,181.3,-116.1,128.7,-133.1,84.2C-150.1,39.7,-168.6,3.3,-177.6,-46.2C-186.7,-95.8,-186.2,-158.6,-155,-185.1C-123.8,-211.6,-61.9,-201.8,1,-202.9C63.9,-204.1,127.7,-216.2,171.5,-191.9Z',
        },
        {
          value:
            'M95,-109.2C143.2,-72.7,216.4,-61.9,232.3,-32C248.2,-2.2,206.8,46.6,170.7,88.7C134.7,130.7,103.9,165.9,67.2,175C30.6,184.2,-12.1,167.3,-52.4,150C-92.8,132.7,-130.8,115.1,-141.6,86.6C-152.3,58,-135.7,18.5,-134,-29.3C-132.4,-77.1,-145.6,-133.1,-125.7,-174.6C-105.8,-216.1,-52.9,-243.1,-14.8,-225.5C23.4,-207.8,46.7,-145.7,95,-109.2Z',
        },
      ],
      easing: 'easeInOutSine',
      duration: 10000,
      direction: 'infinite alternate',
      loop: true,
    })

    const moveCircles = () => {
      Array.from(document.querySelectorAll('.bubble-overlay')).forEach(
        (svgElement) => {
          const circles = Array.from(svgElement.querySelectorAll('.blob-path'))
          const cx = random(0, windowWidth)
          const cy = random(0, windowHeight)

          circles.forEach((circleEl) => {
            // circleEl.setAttribute("transform", `translate(${cx},${cy})`);
            anime({
              targets: circleEl,
              translateX: cx,
              translateY: cy,
              easing: 'easeInOutSine',
              duration: 10000,
            })
          })
        }
      )
    }
    setTimeout(() => {
      moveCircles()
      setInterval(moveCircles, 10000)
    }, 500)
  })

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  shuffleArray(ArtistsCSV)
  const half = Math.ceil(ArtistsCSV.length / 2)

  const firstSectionOfArtists = ArtistsCSV.slice(0, half)
  const secondSectionOfArtists = ArtistsCSV.slice(-half)
</script>

<body>
  <div class={isMobile ? 'text-layer-mobile' : 'text-layer'}>
    <div class="names">
      {#each firstSectionOfArtists as artist}
        {`${artist.displayName}, `}
      {/each}
    </div>
    <div class="key-text">
      <span class="show-title"> {GeneralShowInfo.fullShowName}</span>
      {GeneralShowInfo.description}
    </div>
    <div class="names">
      {#each secondSectionOfArtists as artist}
        {`${artist.displayName}, `}
      {/each}
    </div>
  </div>

  <svg
    class="bubble-overlay"
    fill="none"
    preserveAspectRatio="xMinYMid meet"
    width={windowWidth}
    height={windowHeight}
    viewBox="0 0 {windowWidth} {windowHeight}"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="myClip">
      <path
        class="blob-path"
        style="transform: translateX({startPosXA}px) translateY({startPosYA}px);"
        d="M171.5,-191.9C215.3,-167.6,239.1,-107,234.1,-53.5C229,0.1,195,46.5,157.5,71.5C119.9,96.5,78.8,99.9,37.7,123.4C-3.3,146.9,-44.2,190.4,-72.4,185.9C-100.7,181.3,-116.1,128.7,-133.1,84.2C-150.1,39.7,-168.6,3.3,-177.6,-46.2C-186.7,-95.8,-186.2,-158.6,-155,-185.1C-123.8,-211.6,-61.9,-201.8,1,-202.9C63.9,-204.1,127.7,-216.2,171.5,-191.9Z"
        fill="#000"
      />
    </clipPath>
    <g clip-path="url(#myClip)">
      <image
        class="svg-overlay-img"
        href="./img/overlay-images/shivers_artist_{imageIdOne}.png"
        clip-path="url(#myClip)"
      />
    </g>
  </svg>

  <svg
    preserveAspectRatio="xMinYMid meet"
    class="bubble-overlay"
    width="1000"
    height="1000"
    fill="none"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="myClip2">
      <path
        class="blob-path"
        d="M95,-109.2C143.2,-72.7,216.4,-61.9,232.3,-32C248.2,-2.2,206.8,46.6,170.7,88.7C134.7,130.7,103.9,165.9,67.2,175C30.6,184.2,-12.1,167.3,-52.4,150C-92.8,132.7,-130.8,115.1,-141.6,86.6C-152.3,58,-135.7,18.5,-134,-29.3C-132.4,-77.1,-145.6,-133.1,-125.7,-174.6C-105.8,-216.1,-52.9,-243.1,-14.8,-225.5C23.4,-207.8,46.7,-145.7,95,-109.2Z"
        fill="#000"
      />
    </clipPath>
    <g clip-path="url(#myClip2)">
      <image
        class="svg-overlay-img"
        href="./img/overlay-images/shivers_artist_{imageIdTwo}.png"
        clip-path="url(#myClip2)"
      />
    </g>
  </svg>

  <svg
    preserveAspectRatio="xMinYMid meet"
    class="bubble-overlay"
    width="1000"
    height="1000"
    fill="none"
    viewBox="0 0 1000 1000"
    xmlns="http://www.w3.org/2000/svg"
  >
    <clipPath id="myClip3">
      <path
        class="blob-path"
        d="M95,-109.2C143.2,-72.7,216.4,-61.9,232.3,-32C248.2,-2.2,206.8,46.6,170.7,88.7C134.7,130.7,103.9,165.9,67.2,175C30.6,184.2,-12.1,167.3,-52.4,150C-92.8,132.7,-130.8,115.1,-141.6,86.6C-152.3,58,-135.7,18.5,-134,-29.3C-132.4,-77.1,-145.6,-133.1,-125.7,-174.6C-105.8,-216.1,-52.9,-243.1,-14.8,-225.5C23.4,-207.8,46.7,-145.7,95,-109.2Z"
        fill="#000"
        style="transform: translateX({startPosXB}px) translateY({startPosYB}px);"
      />
    </clipPath>
    <g clip-path="url(#myClip3)">
      <image
        class="svg-overlay-img"
        href="./img/overlay-images/shivers_artist_{imageIdThree}.png"
        clip-path="url(#myClip3)"
      />
    </g>
  </svg>
</body>

<style>
  body {
    margin: 5px;
    font-family: dotgothic16, sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  .text-layer {
    font-size: 2em;
    text-align: justify;
  }

  .text-layer-mobile {
    font-size: 1em;
    text-align: justify;
  }

  .show-title {
    text-transform: uppercase;
  }

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
    width: 1500px;
    y: 0;
    x: 0;
  }

  .names:first-child {
    margin-bottom: 1em;
  }

  .key-text {
    margin-bottom: 1em;
    color: red;
  }

  @media (max-width: 768px) {
    .text-layer {
      font-size: 4vh;
    }
  }
</style>
