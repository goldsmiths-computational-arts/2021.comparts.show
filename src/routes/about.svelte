<style>
  h2 {
    color: white;
  }
  .subtitle {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 2.5rem;
    color: #fcfcfc;
  }
  .introBody {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 1.3rem;
    color: #fcfcfc;
    padding-bottom: 1.2rem;
  }
  .content {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 1.1rem;
    color: #fcfcfc;
    padding-top: 4rem;
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>
<section class="section">

  <div class="container page-max-width">
    <div class="content">
      <div>
        <!-- <h2 class="showDates">17-20 September 2020</h2> -->
        <h2 class="subtitle">Positioning Statement</h2>
        <!-- <h2 class="location">Goldsmiths, University of London</h2> -->
      </div>
      <div class="introBody">
        Third ____ brings together a c✴nstellati✴n of works which have escaped their tethers to a [material conception]1 or [ideological representation]2 of space to approach  an[other]3 third space that overcomes the bina⚭ries of the first two, where ⇶linkages can be made in an infin∞ number of ways. As such, the title is never static but is alive, ever-changing and evolving to reflect the simultaneously inward juxtapositi⊗n and outward distributi⊙n of art and technology. ____ is not an invitation to be fill▥ed nor is it an open-ended ⸮peculation into the future. It is a transparent vision to blast spectrums of knowable⟷unimaginable, structure⟷agency, everyday life⟷unending history out of chronological ⇄ continuity into a 3√radical dimension beyond an empirical or manifest order of knowledge.
      </div>
      <!--       <p>
        Chimera Garden is a blend of physical and online installation and
        performance, a four-day festival open to all via free ticket
        registration on this site soon.
      </p>
 -->
    </div>
  </div>

  <div style="display: none;">
    <!-- These links are to get Sapper to work, ignore them -->
    <a href="/sitemap.xml">sitemap</a>
    <!-- <a href="/live">live</a> -->
  </div>

</section>

<!-- TWITCH EMBED CODE -->
<div class="container page-max-width top-framed-element">
    <section>
      <div class="container">
        <div class="responsive-iframe">
          <iframe
            id="twitch-video"
            title="Twitch video stream"
            src="https://player.twitch.tv/?channel=forsen&parent={BASE_HOST}" 
            autoplay = "true"
            frameborder="0"
            allowfullscreen="true"
            scrolling="no"
            height="500"
            width="900">
          </iframe>
        </div>
      </div>
    </section>
</div>

<!-- ORIGINAL TWITCH LINK "https://player.twitch.tv/?channel=goldsmiths_comparts&amp;parent={BASE_HOST}"  -->

<section class="section bg-col-7">
  <div class="container page-max-width">

    <section class="chat">
      <div class="content">
        <div class="columns">
          <div class="column">
            <h2 class="subtitle">Live Broadcast</h2>
            <p>To join in our audience Q&A, you can use the chat below after signing up for a <a href="https://www.twitch.tv/signup" target="_blank">Twitch account</a>.
          </div>
          <div class="column events-button-container">
            <a href="/schedule" class="rounded-link col-2 bg-col-7">
              EVENTS SCHEDULE
            </a>
          </div>
        </div>
        <iframe
          id="twitch-chat"
          title="Twitch chat"
          src="https://www.twitch.tv/embed/forsen/chat?parent={BASE_HOST}"
          height="500"
          width="900">
        </iframe>
      </div>
    </section>

    <!-- ORIGINAL TWITCH LINK "https://www.twitch.tv/embed/goldsmiths_comparts/chat?parent={BASE_HOST}"  -->

  </div>
</section>
