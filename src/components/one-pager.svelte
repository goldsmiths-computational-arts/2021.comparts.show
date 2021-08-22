<script>
  import { onMount } from 'svelte'
  import { GeneralShowInfo } from '../constants'
  import ArtistsCSV from '../utils/data/artworks.csv'
  import anime from 'animejs/lib/anime.es.js'
  import { nameProcessor } from '../utils/nameProcessor'

  let isMobile

  const random = (min, max) => {
    return Math.random() * (max - min) + min
  }

  let startPosXA = random(0, 1000)
  let startPosYA = random(0, 1000)
  let startPosXB = random(150, 1000)
  let startPosYB = random(150, 1000)
  let startPosXC = random(300, 1000)
  let startPosYC = random(300, 1000)

  let imageIdOne = Math.floor(random(1, 163)).toString().padStart(5, '0')
  let imageIdTwo = Math.floor(random(1, 163)).toString().padStart(5, '0')
  let imageIdThree = Math.floor(random(1, 163)).toString().padStart(5, '0')

  let windowWidth
  let windowHeight
  let isPortrait

  onMount(async () => {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight

    isMobile = windowWidth < 768

    window.onresize = () => {
      windowWidth = window.innerWidth
      windowHeight = window.innerHeight
    }

    isPortrait = windowWidth < windowHeight

    startPosXA = random(0, windowWidth)
    startPosYA = random(0, windowHeight)
    startPosXB = random(150, windowWidth)
    startPosYB = random(150, windowHeight)
    startPosXC = random(300, windowWidth)
    startPosYC = random(300, windowHeight)

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
            'M 161,54.69 C 230.4,4.986 303.7,8.661 414.4,92.19 465.7,130.9 432.3,211.4 460,279.5 481,331.2 449.7,430.4 381.1,427 287.1,422.3 172.4,503.8 99.27,444.6 21.03,381.1 10.32,258.3 55.25,145.6 73.73,99.3 129.3,77.36 161,54.69 Z',
        },
        {
          value:
            'M 119.8,69.41 C 213.5,18.01 367.2,-1.306 440.4,76.58 482.9,121.9 435.3,200.8 432.9,262.9 431.1,310.6 461.3,372.1 427.7,406 342.4,492 158.3,499.3 64.62,422.5 10.09,377.8 18.76,282.6 32.51,213.5 43.46,158.4 70.61,96.36 119.8,69.41 Z',
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

  console.log(ArtistsCSV)

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
      {#each firstSectionOfArtists as artist, i}
        <a
          class="artist-link"
          href={`/artist/${nameProcessor(artist.preferredName)}`}
        >
          {#if i < firstSectionOfArtists.length - 1}
            {`${artist.preferredName.trim()},`}
          {:else}
            {`${artist.preferredName.trim()}`}
          {/if}
        </a>
      {/each}
    </div>
    <div class="key-text">
      <span class="show-title">
        Shivers — Computational Arts MA/MFA Degree Show</span
      >
      <span class="parenthesis">(About)</span>
      , 1st - 5th September 2021.
      <span class="parenthesis">(Schedule)</span>
      Opening night Wednesday 1st September. Join us this September for the end of
      year exhibition of Goldsmiths Computational Arts Masters students.
      <span class="parenthesis">(Floor map)</span>
      This exhibition will feature ground-breaking immersive performances, interactive
      installations, virtual and augmented realities, and thought-provoking conceptual
      works by mixed disciplinary artists from a diverse range of fields including
      fine art, design, psychology, music and creative computation. More information
      will be available via this website in the coming weeks.
    </div>
    <div class="key-text">
      Location: St. James Hatcham Building, <a
        href="https://goo.gl/maps/wXMErm3a1NbEAq1y5"
        target="_blank"
        rel="noref">25 St James', London SE14 6AD</a
      >. Please
      <a
        href="https://www.eventbrite.co.uk/e/shivers-computational-arts-degree-show-mamfa-2021-tickets-164981515153"
        target="_blank"
        rel="noref">book a ticket here</a
      > ahead of time. We are looking forward to seeing you there
    </div>
    <div class="names">
      {#each secondSectionOfArtists as artist, i}
        <a
          class="artist-link"
          href={`/artist/${nameProcessor(artist.preferredName)}`}
        >
          {#if i < secondSectionOfArtists.length - 1}
            {`${artist.preferredName.trim()},`}
          {:else}
            {`${artist.preferredName.trim()}`}
          {/if}
        </a>
      {/each}
    </div>

    <svg
      preserveAspectRatio="xMinYMid meet"
      class="bubble-overlay"
      fill="none"
      style="width:{windowWidth}px; height:{windowHeight}px;"
      viewBox="0 0 {windowWidth} {windowHeight}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath
        id="myClip"
        style="width:{windowWidth}px; height:{windowHeight}px;"
      >
        <path
          class="blob-path"
          style="transform: translateX({startPosXA}px) translateY({startPosYA}px) scale({isMobile
            ? '0.4'
            : '1'};"
          d="M171.5,-191.9C215.3,-167.6,239.1,-107,234.1,-53.5C229,0.1,195,46.5,157.5,71.5C119.9,96.5,78.8,99.9,37.7,123.4C-3.3,146.9,-44.2,190.4,-72.4,185.9C-100.7,181.3,-116.1,128.7,-133.1,84.2C-150.1,39.7,-168.6,3.3,-177.6,-46.2C-186.7,-95.8,-186.2,-158.6,-155,-185.1C-123.8,-211.6,-61.9,-201.8,1,-202.9C63.9,-204.1,127.7,-216.2,171.5,-191.9Z"
          fill="#000"
        />
      </clipPath>
      <g clip-path="url(#myClip)">
        <image
          class="svg-overlay-img"
          style={isPortrait
            ? 'object:cover; height:100vh'
            : 'object:cover; width:100vw'}
          href="./img/overlayImages/shivers_artist_{imageIdOne}.png"
        />
      </g>
    </svg>

    <svg
      preserveAspectRatio="xMinYMid meet"
      class="bubble-overlay"
      fill="none"
      style="width:{windowWidth}px; height:{windowHeight}px;"
      viewBox="0 0 {windowWidth} {windowHeight}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath
        id="myClip2"
        style="width:{windowWidth}px; height:{windowHeight}px;"
      >
        <path
          class="blob-path"
          style="transform: translateX({startPosXB}px) translateY({startPosYB}px) scale({isMobile
            ? '0.3'
            : '1'}); "
          d="M95,-109.2C143.2,-72.7,216.4,-61.9,232.3,-32C248.2,-2.2,206.8,46.6,170.7,88.7C134.7,130.7,103.9,165.9,67.2,175C30.6,184.2,-12.1,167.3,-52.4,150C-92.8,132.7,-130.8,115.1,-141.6,86.6C-152.3,58,-135.7,18.5,-134,-29.3C-132.4,-77.1,-145.6,-133.1,-125.7,-174.6C-105.8,-216.1,-52.9,-243.1,-14.8,-225.5C23.4,-207.8,46.7,-145.7,95,-109.2Z"
          fill="#000"
        />
      </clipPath>
      <g clip-path="url(#myClip2)">
        <image
          class="svg-overlay-img"
          style={isPortrait
            ? 'object:cover; height:100vh'
            : 'object:cover; width:100vw'}
          href="./img/overlayImages/shivers_artist_{imageIdTwo}.png"
        />
      </g>
    </svg>

    <svg
      preserveAspectRatio="xMinYMid meet"
      class="bubble-overlay"
      fill="none"
      style="width:{windowWidth}px; height:{windowHeight}px;"
      viewBox="0 0 {windowWidth} {windowHeight}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath
        id="myClip3"
        style="width:{windowWidth}px; height:{windowHeight}px;"
      >
        <path
          class="blob-path"
          style="transform: translateX({startPosXB}px) translateY({startPosYB}px) scale({isMobile
            ? '0.3'
            : '0.6'}); "
          d="M 119.8,69.41 C 213.5,18.01 367.2,-1.306 440.4,76.58 482.9,121.9 435.3,200.8 432.9,262.9 431.1,310.6 461.3,372.1 427.7,406 342.4,492 158.3,499.3 64.62,422.5 10.09,377.8 18.76,282.6 32.51,213.5 43.46,158.4 70.61,96.36 119.8,69.41Z"
          fill="#000"
        />
      </clipPath>
      <g clip-path="url(#myClip3)">
        <image
          class="svg-overlay-img"
          style={isPortrait
            ? 'object:cover; height:100vh'
            : 'object:cover; width:100vw'}
          href="./img/overlayImages/shivers_artist_{imageIdThree}.png"
        />
      </g>
    </svg>
  </div>
</body>

<style>
  body {
    margin: 5px;
    font-family: dotgothic16;
    font-weight: 400;
    font-style: normal;
  }

  .text-layer {
    font-size: 2rem;
    text-align: justify;
  }

  .text-layer-mobile {
    font-size: 1rem;
    text-align: justify;
  }

  .show-title {
    text-transform: uppercase;
  }

  .bubble-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    pointer-events: none;
  }

  .svg-overlay-img {
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

  .artist-link {
    text-decoration: none;
  }

  .artist-link:hover {
    color: red;
    text-decoration: underline dotted;
    /* text-decoration-style: dashed; */
  }

  a {
    text-decoration-style: dotted;
  }

  a:hover {
    text-decoration: none;
  }

  .parenthesis {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .parenthesis:hover {
    text-decoration: underline dotted;
  }

  @media (max-width: 768px) {
    .text-layer {
      font-size: 4vh;
    }
  }
</style>
