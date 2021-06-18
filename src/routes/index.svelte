<script context="module">
  export async function preload({ params }) {
    const artistsRows = await this.fetch("artists.tsv").then((d) => d.text());

    return { artistsRows };
  }
</script>

<script>
  import { tsvParse } from "d3-dsv";
  import { slugify } from "../js/helpers";
  import Meta from "../components/Meta.svelte";
  import { REGISTER_URL } from "../js/constants";

  export let artistsRows;

  // console.log(artistsRows);

  $: artists = tsvParse(artistsRows).sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );

  let posText = "Third ___ brings together a c✴︎nstellati✴︎n of works which have escaped their tethers to a [material conception]₁ or [ideological representation]₂ of space to approach an[other]₃ third space where ⇶linkages can be made in an infin∞ number of ways. As such, the gateway⍈ is never static but is alive, ever-changing and evolving to reflect the simultaneously inward juxtapositi⊗n and outward distributi⊙n of art and technology. ___ is not an invitation to be fill▥ed nor is it an open-ended vision into the future. Offering up a ⸮peculative archive, Third ___ operates as a para||e| world of unstable states and dual truths; disrupting bina⚭ries of the knowable ⟷ unimaginable, structure ⟷ agency, everyday life ⟷ unending history out of chronological ⇄ continuity. A ³√radical dimension beyond an empirical or manifest order of knowledge."

  function handleMouseOver(e) {
    posText = 'Third ___ brings together a constellation of works which have escaped their tethers to a material conception or ideological representation of space, to approach an(other) third space where linkages can be made in an infinite number of ways. As such, this gateway is never static but is alive, ever-changing and evolving to reflect the simultaneously inward juxtaposition and outward distribution of art and technology. ___ is not an invitation to be filled nor is it an open-ended vision into the future. Offering up a speculative archive, Third ___ operates as a parallel world of unstable states and dual truths; disrupting binaries of the knowable and the unimaginable, structure and agency, everyday life and unending history out of chronological continuity. A radical dimension beyond an empirical or manifest order of knowledge.';
  }
  function handleMouseOut(e) {
    posText = 'Third ___ brings together a c✴︎nstellati✴︎n of works which have escaped their tethers to a [material conception]₁ or [ideological representation]₂ of space to approach an[other]₃ third space where ⇶linkages can be made in an infin∞ number of ways. As such, the gateway⍈ is never static but is alive, ever-changing and evolving to reflect the simultaneously inward juxtapositi⊗n and outward distributi⊙n of art and technology. ___ is not an invitation to be fill▥ed nor is it an open-ended vision into the future. Offering up a ⸮peculative archive, Third ___ operates as a para||e| world of unstable states and dual truths; disrupting bina⚭ries of the knowable ⟷ unimaginable, structure ⟷ agency, everyday life ⟷ unending history out of chronological ⇄ continuity. A ³√radical dimension beyond an empirical or manifest order of knowledge.';
  }
</script>

<svelte:head>
<Meta
title="Third ___ - Digital Arts Computing Degree Show Goldsmiths"
/>
</svelte:head>
<div class="hero-container">
  <section class="hero">
    <div class="hero-body">
      <div class="container is-widescreen">
        <div class="columns">
          <div class="column is-6 leftColumn" style="position:relative">
            <!-- animated text -->
            <div class="box">
              <div class="word">
                Third&nbsp;
                <span>___</span>
                <span>Copy</span>
                <span>Space</span>
                <span>Sight</span>
                <span>Perspective</span>
                <span>Room</span>
                <span>Reality</span>
                <span>Life</span>
                <span>Sky</span>
                <span>Door</span>
                <span>Flow</span>
                <span>Window</span>
                <span>Shift</span>
                <span>Stance</span>
                <span>Anatomy</span>
                <span>Gen</span>
                <span>Identity</span>
                <span>Feeling</span>
                <span>Warning</span>
                <span>Sentient</span>
                <span>___</span>
              </div>
            </div>
            <div class="animatedImage">
              <img
              src="/img/sphere.gif"
              opacity="0"
              width="400"
              height="400"
              alt="animated graphic"/>
            </div>
          </div>
          <div class="column is-6">
            <div>
              <h2 class="showDates">6 May 2021</h2>
              <h2 class="subtitle"> </h2>
              <h2 class="subtitle"> Digital Arts Computing Degree Show</h2>
              <h2 class="location">Goldsmiths, University of London</h2>
            </div>
            <div on:mouseover={handleMouseOver} on:mouseout={handleMouseOut} class="introBodyStrong" aria-hidden="true">
              {posText}
            </div>
          </div>
        </div>
        <div class="introAltText">
          (alt-text)<br>Third ___ brings together a constellation of works which have escaped their tethers to a material conception or ideological representation of space, to approach an(other) third space where linkages can be made in an infinite number of ways. As such, this gateway is never static but is alive, ever-changing and evolving to reflect the simultaneously inward juxtaposition and outward distribution of art and technology. ___ is not an invitation to be filled nor is it an open-ended vision into the future. Offering up a speculative archive, Third ___ operates as a parallel world of unstable states and dual truths; disrupting binaries of the knowable and the unimaginable, structure and agency, everyday life and unending history out of chronological continuity. A radical dimension beyond an empirical or manifest order of knowledge.
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  h2 {
    color: white;
  }
  .subtitle {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.8rem;
    color: #fcfcfc;
  }
  .showDates {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 1.5rem;
    color: #fcfcfc;
    padding-top: 3rem;
  }
  .location {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 1.5rem;
    color: #fcfcfc;
    margin-bottom: 2rem;
  }
  .introBodyStrong {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.15rem;
    color: #fcfcfc;
    padding: 0rem 0rem;
  }
  .introAltText {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1rem;
    color: #fcfcfc;
    padding: 2rem 0rem;
  }

  .animatedImage{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .box
{
    text-align: center;
    display: block;
    width: 50%;
    position: absolute;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 3.0rem;
    color: white;
    margin: 0 auto;
    background-color: transparent;
}
.word
{
    white-space: nowrap;
    position: absolute;
    display: inline-block;
    margin: 0 auto;
    color: white;
}
.word span
{
    position: absolute;
    display: inline-block;
    overflow: hidden;
    margin: 0 auto;
    animation: animate 40s linear infinite 0s;
    opacity: 0;
}

/* Third animation */
@keyframes animate
{
    0%
    {
        opacity: 0;
        transform: translateY(-50px);
    }
    2%
    {
        opacity: 1;
        transform: translateY(0px);
    }
    5%
    {
        opacity: 1;
        transform: translateY(0px);
    }
    6%
    {
        opacity: 0.5;
        transform: translateY(25px);
    }
    7%
    {
        opacity: 0;
        transform: translateY(50px);
    }    
    40%
    {
        opacity: 0;
        transform: translateY(50px);
    }
    100%
    {
        opacity: 0;
        transform: translateY(50px);
    }
}
.word span:nth-child(1)
{
    animation-delay: 0s;
}
.word span:nth-child(2)
{
    animation-delay: 2s;
}
.word span:nth-child(3)
{
    animation-delay: 4s;
}
.word span:nth-child(4)
{
    animation-delay: 6s;
}
.word span:nth-child(5)
{
    animation-delay: 8s;
}
.word span:nth-child(6)
{
    animation-delay: 10s;
}
.word span:nth-child(7)
{
    animation-delay: 12s;
}
.word span:nth-child(8)
{
    animation-delay: 14s;
}
.word span:nth-child(9)
{
    animation-delay: 16s;
}
.word span:nth-child(10)
{
    animation-delay: 18s;
}
.word span:nth-child(11)
{
    animation-delay: 20s;
}
.word span:nth-child(12)
{
    animation-delay: 22s;
}
.word span:nth-child(13)
{
    animation-delay: 24s;
}
.word span:nth-child(14)
{
    animation-delay: 26s;
}
.word span:nth-child(15)
{
    animation-delay: 28s;
}
.word span:nth-child(16)
{
    animation-delay: 30s;
}
.word span:nth-child(17)
{
    animation-delay: 32s;
}
.word span:nth-child(18)
{
    animation-delay: 34s;
}
.word span:nth-child(19)
{
    animation-delay: 36s;
}
.word span:nth-child(20)
{
    animation-delay: 38s;
}
.word span:nth-child(21)
{
    animation-delay: 40s;
}

@media only screen and (max-width: 1200px) and (min-width: 768px) {
  .box{
    text-align: center;
  }
}

  @media only screen and (max-width: 768px) {
    .leftColumn {
      height: 60vh;
      min-height: 200px;
      padding-top: 0;
    }
    .showDates {
      padding-top: 0rem;
    }
    .animatedImage{
      text-align: center;
      position: absolute;
      bottom: 10%;
    }
    .box{
      text-align: center;
      margin-left: -20px;
    }
    .hero-body{
      padding-top: 20px;
    }
  }
</style>
