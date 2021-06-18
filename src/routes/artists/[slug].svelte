<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`artists/${params.slug}.json`);
    const artist = await res.json();

    return { artist };
  }
</script>

<script>
  import { range } from "d3-array";
  import { slugify, formatFullTime } from "../../js/helpers";
  import Meta from "../../components/Meta.svelte";
  import SocialLink from "../../components/SocialLink.svelte";
  // import Slideshow from "../../components/Slideshow.svelte";
  import VideoEmbed from "../../components/VideoEmbed.svelte";

  import Carousel from "@beyonk/svelte-carousel";
  import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons";

  export let artist;

  $: {
    artist.events.forEach(event => {
      event.startsAt = new Date(event.startTime);
    });
  }

  $: artworkImages = range(artist.numImages).map(
    i => `/img/artworks/${artist.username}-${i + 1}.jpeg`
  );

  $: pageTitle = [artist.name, artist.title].filter(d => d).join(" — ");

  $: socialImage = artworkImages.length
    ? artworkImages[0]
    : `img/bios/${artist.username}.jpeg`;
</script>

<style>
  /*.content {*/
  /*display: grid;*/
  /*justify-content: center;*/
  /*grid-template-columns: 400px auto;*/
  /*grid-template-rows: 50px 400px 10px;*/
  /*grid-template-areas: "img name" "img bio" "links bio";*/
  /*}*/

  .control :global(svg) {
    width: 100%;
    height: 100%;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 32px;
  }

  .bio-photo {
    width: 100%;
    padding-bottom: 100%;
    height: 0px;
    display: block;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #a6a8ab;
  }

  h3 {
    margin-top: 0.6666em;
    color: white;
  }

  h2 {
  color: white;
  }

  a:not(.rounded-link) {
    color: #387194;
  }

  .artists-section {
    min-height: 100%;
  }

  .content ul {
    list-style: none;
    margin-left: 0em;
  }

  .top-framed-element {
    margin-bottom: -60px;
    z-index: 20;
  }

  .section.responsive-video {
    padding-left: 0px;
    padding-right: 0px;
  }

  .artwork-instructions {
    margin: 20px 0px 0px 0px;
  }

  .artist-tags {
    margin-top: 20px;
  }

  .artist-tags .tag {
    margin: 2px 0px;
  }

  .align-center {
    text-align: justify;
    max-width: 80%;
  }
  /*  .artist-bio {
    padding-top: 50px;
    grid-area: bio;
    padding-left: 10px;
  }

  .social-links {
    grid-area: links;
    display: flex;
    flex-direction: column;
  }

/*  .artist-name {
    grid-area: name;
    padding-left: 10px;
  }*/

  @media screen and (max-width: 768px) {
    /*    .content {
      display: grid;
      grid-template-columns: 400px;
      grid-template-rows: 400px 50px auto;
      grid-template-areas: "img" "name" "bio" "links";
    }*/

    h2 {
      margin-top: 0.5714em;
    }

    .align-center {
      text-align: center;
      max-width: 100%;
    }

    .social-links {
      padding-top: 25px;
    }

    .artwork-instructions {
      margin-bottom: 0;
    }

    section.artist-page {
      padding-left: 0px;
      padding-right: 0px;
    }

    section.responsive-video {
      padding-top: 0pc;
    }

    .see-more {
      text-align: center;
      max-width: 80%;
    }
  }
</style>

<svelte:head>
  <title>{pageTitle}</title>
  <Meta
    title={pageTitle}
    image={socialImage}
    imageWidth="1920"
    imageHeight="1080" />
  <meta property="og:type" content="profile" />
</svelte:head>

<!-- <section class="section responsive-video" style="padding: 0;">
            <div class="container">
              <VideoEmbed url={artist.videoDocUrl} />
            </div>
          </section> -->

<!-- hide all the artwork stuff if we don't have title -->
{#if artist.title}
  <div class="container page-max-width top-framed-element">
      {#if artworkImages.length === 1}
      {#if artist.videoDocUrl}
      <div class="slide-content">
              <VideoEmbed url={artist.videoDocUrl} />
        </div>
      {:else}
      <img src={artworkImages[0]} alt="" />
      {/if}
    {:else}
      <Carousel perPage="1">
      <span class="control" slot="left-control">
        {#if artworkImages.length > 1}
        <ChevronLeftIcon />
        {/if}
      </span>
      {#if artist.videoDocUrl}
      <div class="slide-content">
              <VideoEmbed url={artist.videoDocUrl} />
        </div>
      {/if}
      {#if artworkImages.length > 1}
    {#each artworkImages as image}
      <div class="slide-content">
        <img src={image} alt="" />
      </div>
    {/each}
    {/if}
      <span class="control" slot="right-control">
        {#if artworkImages.length > 1}
        <ChevronRightIcon />
        {/if}
      </span>
    </Carousel>
    <!-- <Slideshow images={artworkImages} /> -->
    {/if}
  </div>

  <section class="section bg-col-7 artist-page" style="margin-bottom: 10px; padding-bottom: 10px">
    <div class="container page-max-width">
      <div class="content">
        <section class="section bg-col-7" style="margin-bottom: 0px; padding-bottom: 0px">
          <div class="container align-center">
            <h2 class="artwork-title">{artist.title}</h2>
            <h3>
              {artist.name}
              {#if artist.otherName}({artist.otherName}){/if}
            </h3>
            <div class="artwork-desc">
              {#if artist.artworkHTML}
                {@html artist.artworkHTML}
              {/if}
            </div>

            {#if artist.webInstructionsHTML || artist.interactiveUrl || artist.streamTwitch || artist.streamYouTube}
              <div class="artwork-instructions">
                {#if artist.webInstructionsHTML}
                  <h3>How to interact</h3>
                  {@html artist.webInstructionsHTML}
                {/if}

                {#if artist.interactiveUrl}
                  <a
                    href={artist.interactiveUrl}
                    target="_blank"
                    class="rounded-link bg-col-1 bd-col-1 col-7">
                    See the work
                  </a>
                {/if}

                <!-- TODO if there is time embed stream channels do an embed? -->

                {#if artist.streamTwitch}
                  <a
                    href={'https://www.twitch.tv/' + artist.streamTwitch}
                    target="_blank"
                    class="rounded-link bg-col-1 bd-col-1 col-7">
                    Watch twitch stream
                  </a>
                {/if}

                {#if artist.streamYouTube}
                  <a
                    href={'https://www.youtube.com/channel/' + artist.streamYouTube}
                    target="_blank"
                    class="rounded-link bg-col-1 bd-col-1 col-7">
                    Watch youtube stream
                  </a>
                {/if}

              </div>
            {/if}

            <br />
            <div />
          </div>
        </section>

        <!-- {#if artist.videoDocUrl}
          <section class="section responsive-video">
            <div class="container">
              <VideoEmbed url={artist.videoDocUrl} />
            </div>
          </section>
        {/if} -->

        <!-- TODO:  Start if > Once logic for remote students is in  we can only show this blue block if events online and if in church -->

        {#if !artist.isRemote && artist.events.length}
          <section
            class="section bg-col-2 col-6"
            class:remote-only={artist.isRemote}>
            <div class="container see-more">
              <h2>Want to see more?</h2>
              <div class="columns">
                {#if artist.events.length}
                  <div class="column">
                    <p>LIVE ONLINE</p>
                    <div class="event-schedule" style="padding-bottom: 10px;">
                      <ul>
                        {#each artist.events as event}
                          {#if event.livestream == true}
                            <li>
                              <a
                                href="/schedule#{event.id}"
                                style="color: white;">
                                {event.title}
                              </a>
                              - {formatFullTime(event.startsAt)}
                            </li>
                          {/if}
                        {/each}
                      </ul>
                    </div>

                    {#if artist.events.length}
                      <div class="column is-hidden-desktop is-hidden-tablet">
                        <div>
                          <!-- <a href="../live" class="rounded-link bg-col-7">Watch Live</a> -->
                          <!-- TODO on Tues/Wednesday add in once live page is live -->
                          <a
                            href="../schedule"
                            class="rounded-link bg-col-7 bd-col-7 col-2">
                            Full Schedule
                          </a>
                        </div>
                      </div>
                    {/if}
                  </div>
                {/if}

                {#if !artist.isRemote}
                  <div class="column">
                    <p>ON SITE</p>
                    <p>
                      Goldsmiths, University of London
                      <br />
                      St James Hatcham Building
                    </p>
                    {#if artist.events.length}
                      <div class="event-schedule" style="padding-bottom: 10px;">
                        <ul>
                          {#each artist.events as event}
                            {#if event.physical}
                              <li>
                                <a
                                  href="/schedule#{event.id}"
                                  style="color: white;">
                                  {event.title}
                                </a>
                                - {formatFullTime(event.startsAt)}
                              </li>
                            {/if}
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  </div>
                {/if}

              </div>
              <div class="columns">

                {#if artist.events.length}
                  <div class="column is-hidden-mobile">
                    <div>
                      <!-- <a href="../live" class="rounded-link bg-col-7">Watch Live</a> -->
                      <!-- TODO on Tues/Wednesday add in once live page is live -->
                      <a
                        href="../schedule"
                        class="rounded-link bg-col-7 bd-col-7 col-2">
                        Full Schedule
                      </a>
                    </div>
                  </div>
                {/if}

                {#if !artist.isRemote}
                  <div class="column">
                    <div>
                      <a
                        href="../getting-there"
                        class="rounded-link bg-col-7 bd-col-7 col-2">
                        Getting There
                      </a>
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </section>
        {/if}
      </div>
    </div>
  </section>
{/if}

<!-- TODO:  End if  -> Once logic for remote students is in  we can only show this blue block if events online and if in church -->

<section class="section bg-col-7 artists-section">
  <div class="container page-max-width">

    <div class="content">
      <div class="columns">
        <div class="column is-one-third">

          <div
            class="bio-photo"
            style="background-image:url(img/bios/{artist.username}.jpeg)" />

          <div class="is-hidden-desktop is-hidden-tablet">
            <h2 class="artist-name">
              {artist.name}
              {#if artist.otherName}({artist.otherName}){/if}
            </h2>

            {#if artist.website || artist.instagram || artist.twitter || artist.facebook || artist.vimeo || artist.youtube || artist.twitch}
            <div class="social-links">
              <h3>Social links</h3>
              <SocialLink kind="website" value={artist.website} />
              <SocialLink kind="instagram" value={artist.instagram} />
              <SocialLink kind="twitter" value={artist.twitter} />
              <SocialLink kind="facebook" value={artist.facebook} />
              <SocialLink kind="vimeo" value={artist.vimeo} />
              <SocialLink kind="youtube" value={artist.youtube} />
              <SocialLink kind="twitch" value={artist.twitch} />
            </div>
          {/if}

          <!-- or display as tags? -->
          {#if (artist.themes && artist.themes.length) || (artist.media && artist.media.length) || (artist.years && artist.years.length)}
            <div class="artist-tags">
              <h6>Tags</h6>
              {#if artist.themes && artist.themes.length}
                {#each artist.themes as theme}
                  <span class="tag is-dark">{theme}</span>
                  &nbsp;
                {/each}
              {/if}

              {#if artist.media && artist.media.length}
                {#each artist.media as media}
                  <span class="tag is-dark">{media}</span>
                  &nbsp;
                {/each}
              {/if}

              {#if artist.years && artist.years.length}
                {#each artist.years as year}
                  <span class="tag is-dark">{year}</span>
                  &nbsp;
                {/each}
              {/if}

            </div>
          {/if}
          </div>

        </div>
        <div class="column is-hidden-mobile is-two-thirds">
          <h2 class="artist-name">
            {artist.name}
            {#if artist.otherName}({artist.otherName}){/if}
          </h2>

          {#if artist.website || artist.instagram || artist.twitter || artist.facebook || artist.vimeo || artist.youtube || artist.twitch}
            <div class="social-links">
              <h3>Social links</h3>
              <SocialLink kind="website" value={artist.website} />
              <SocialLink kind="email" value={artist.publicEmail} />
              <SocialLink kind="instagram" value={artist.instagram} />
              <SocialLink kind="twitter" value={artist.twitter} />
              <SocialLink kind="facebook" value={artist.facebook} />
              <SocialLink kind="vimeo" value={artist.vimeo} />
              <SocialLink kind="youtube" value={artist.youtube} />
              <SocialLink kind="twitch" value={artist.twitch} />
            </div>
          {/if}

          <!-- or display as tags? -->
          {#if (artist.themes && artist.themes.length) || (artist.media && artist.media.length) || (artist.years && artist.years.length)}
            <div class="artist-tags">
              <h6>Tags</h6>
              {#if artist.themes && artist.themes.length}
                {#each artist.themes as theme}
                  <span class="tag is-dark">{theme}</span>
                  &nbsp;
                {/each}
              {/if}

              {#if artist.media && artist.media.length}
                {#each artist.media as media}
                  <span class="tag is-dark">{media}</span>
                  &nbsp;
                {/each}
              {/if}

              {#if artist.years && artist.years.length}
                {#each artist.years as year}
                  <span class="tag is-dark">{year}</span>
                  &nbsp;
                {/each}
              {/if}

            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
