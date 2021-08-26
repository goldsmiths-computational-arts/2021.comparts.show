<script context="module">
  let artistId
  export async function preload({ params }) {
    artistId = params.slug
  }
</script>

<script>
  import ArtworksCSV from '../../utils/data/artworks.csv'
  import ArtistsCSV from '../../utils/data/artists.csv'
  import { nameProcessor } from '../../utils/nameProcessor'
  import { goto } from '@sapper/app'
  import Carousel from '@beyonk/svelte-carousel'
  import anime from 'animejs/lib/anime.es.js'
  import { onMount } from 'svelte'
  let history
  onMount(() => {
    history = window.history
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
  })
  const handleBackButton = () => {
    history.back()
  }
  const artworkInfo = ArtworksCSV.find(
    (element) => nameProcessor(element.preferredName) === artistId
  )
  const artistInfo = ArtistsCSV.find(
    (element) =>
      element.uniEmail.split('@')[0] === artworkInfo.email.split('@')[0]
  )
  let artworkDescription
  let artistBio
  if (artworkInfo) {
    artworkDescription = artworkInfo.artwork.split('\n')
  }
  let instagram, website, youtube, vimeo, twitch, facebook, twitter, email
  if (artistInfo) {
    artistBio = artistInfo.artistBio.split('\n')
    instagram = artistInfo.instagram
    website = artistInfo.website
    youtube = artistInfo.youtube.replace('no', '')
    vimeo = artistInfo.vimeo.replace('n/a', '').replace('no', '')
    twitch = artistInfo.twitch.replace('n/a', '').replace('no', '')
    facebook = artistInfo.facebook.replace('n/a', '')
    twitter = artistInfo.twitter
    email = artistInfo.email
  }
  if (artworkInfo.bio !== '') {
    artistBio = artworkInfo.bio.split('\n')
  }
  const artworkUrlArray = artworkInfo.photoUrl.split(',')
  console.log(facebook, twitch, twitter, vimeo)
</script>

<div class="container">
  {#if !artworkInfo || !artistInfo}
    <div class="error-message">Artist data not found</div>
    <div on:click={handleBackButton} class="go-back">Go back.</div>
  {:else}
    <div class="top-bar">
      <img
        src="/img/icons/arrow.svg"
        alt="back"
        class="back-arrow"
        on:click={handleBackButton}
      />
      <div class="title">{artworkInfo.title}</div>
      <svg preserveAspectRatio="none" viewBox="0 0 100 100">
        <clipPath id="myClip">
          <path
            class="blob-path"
            d="M171.5,-191.9C215.3,-167.6,239.1,-107,234.1,-53.5C229,0.1,195,46.5,157.5,71.5C119.9,96.5,78.8,99.9,37.7,123.4C-3.3,146.9,-44.2,190.4,-72.4,185.9C-100.7,181.3,-116.1,128.7,-133.1,84.2C-150.1,39.7,-168.6,3.3,-177.6,-46.2C-186.7,-95.8,-186.2,-158.6,-155,-185.1C-123.8,-211.6,-61.9,-201.8,1,-202.9C63.9,-204.1,127.7,-216.2,171.5,-191.9Z"
            fill="#000"
            style="transform: translateX(50px) translateY(50px) scale(0.2);"
          />
        </clipPath>
        <g clip-path="url(#myClip)">
          <image
            href="./img/bios/{artistId}.jpg"
            alt={artistId}
            class="small-image"
          />
        </g>
      </svg>
    </div>
    <Carousel perPage={1}>
      <span class="control" slot="left-control">
        {#if artworkUrlArray.length > 1}
          <img src="/img/icons/chevron-l.svg" alt="chevronL" class="chevron" />
        {/if}
      </span>
      {#each artworkUrlArray as url, index}
        <img
          src="/img/artworks/{artistId}-artwork-{index}.jpg"
          alt="{artistId}-artwork-{index}.jpg"
          class="artwork-image"
        />
      {/each}
      <span class="control" slot="right-control">
        {#if artworkUrlArray.length > 1}
          <img src="/img/icons/chevron-r.svg" alt="chevronR" class="chevron" />
        {/if}
      </span>
    </Carousel>

    <div class="description">
      {#each artworkDescription as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>

    <img src="/img/bios/{artistId}.jpg" alt={artistId} class="bio-image" />
    <div class="description">
      {#each artistBio as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
    <div class="media-icons">
      {#if email !== ''}
        <a href="mailto:{artistInfo.email}" target="_blank" rel="noreferrer"
          ><img src="/img/icons/email.svg" alt="back" class="back-arrow" /></a
        >
      {/if}
      {#if facebook}
        <a
          href="https://www.facebook.com/{facebook.replace(
            'https://www.facebook.com/',
            ''
          )}"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/img/icons/fb.svg" alt="back" class="back-arrow" />
        </a>
      {/if}
      {#if instagram}
        <a
          href="https://www.instagram.com/{instagram
            .replace('@', '')
            .replace('https://www.instagram.com/', '')}"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/img/icons/ig.svg" alt="back" class="back-arrow" />
        </a>
      {/if}
      {#if twitch}
        <img src="/img/icons/twitch.svg" alt="back" class="back-arrow" />
      {/if}
      {#if twitter}
        <a
          href="https://www.twitter.com/{twitter
            .replace('https://www.twitter.com/', '')
            .replace('https://twitter.com/', '')}"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/img/icons/twitter.svg" alt="back" class="back-arrow" />
        </a>
      {/if}
      {#if vimeo}
        <a href={vimeo} target="_blank" rel="noreferrer">
          <img src="/img/icons/vimeo.svg" alt="back" class="back-arrow" />
        </a>
      {/if}
      {#if website}
        <a
          href="https://{website.replace('https://', '')}"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/img/icons/website.svg" alt="back" class="back-arrow" />
        </a>
      {/if}
      {#if youtube}
        <a href={youtube} target="_blank" rel="noreferrer">
          <img src="/img/icons/yt.svg" alt="back" class="back-arrow" />
        </a>
      {/if}
    </div>
    <div class="footer-text" on:click={handleBackButton}>
      SHIVERS - COMPUTATIONAL ARTS MA/MFA DEGREE SHOW
    </div>
  {/if}
</div>

<style>
  .container {
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    font-family: dotgothic16;
  }
  .top-bar {
    display: flex;
    flex: 1;
    padding-top: 10px;
  }
  .title {
    font-size: 1.5rem;
    margin-left: 1vw;
    align-self: center;
    display: flex;
  }
  .back-arrow {
    width: 30px;
    margin-left: 0.5vw;
    cursor: pointer;
  }
  .artwork-image {
    margin-top: 2vh;
    width: 100%;
  }
  .description {
    font-size: 1rem;
    margin-left: 7vw;
    margin-right: 7vw;
    margin-top: 4vh;
  }
  .bio-image {
    align-self: center;
    justify-self: center;
    width: 20vw;
    padding-top: 4vh;
  }
  .footer-text {
    color: red;
    font-size: 2rem;
    align-self: center;
    padding-top: 1vh;
    padding-bottom: 1vh;
    cursor: pointer;
  }
  .error-message {
    font-family: dotgothic16;
    color: red;
    font-size: 2rem;
  }
  .media-icons {
    align-self: center;
    padding-top: 4vh;
    padding-bottom: 4vh;
  }
  .go-back {
    cursor: pointer;
  }
  .chevron {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px;
    border-radius: 100px;
  }
  .chevron:hover {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    border-radius: 100px;
  }
  svg {
    width: 10vh;
    height: 10vh;
    margin-left: auto;
    margin-right: 1vw;
  }
  .small-image {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 768px) {
    .bio-image {
      align-self: center;
      justify-self: center;
      width: 75%;
      padding-top: 4vh;
    }
  }
</style>
