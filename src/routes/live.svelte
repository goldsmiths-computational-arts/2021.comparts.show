<script>
  import { BASE_HOST } from "../js/constants";
</script>

<style>

  h2 {
    color: white;
  }

  iframe {
    display: block;
  }

  .chat h2{
    margin-bottom: 0.2em;
  }

  iframe {
    width:100%;
  }

  .responsive-iframe{
    width: 100%;
    height: 0px;
    padding-bottom: 57%;
  }

  .responsive-iframe iframe {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .events-button-container{
    text-align: right;
  }

  .feature-boxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 15px;
  }
  /*individual artworks*/
  .feature-box {
    display: inline-block;
    margin: 16px;
    text-align: left;
    background-color: transparent;
    border-color: white;
    border-style: solid;
    border-width: 2px;
    width: 285px;
  }

  .feature-box:hover{
    box-shadow: 5px 5px #ffffa1;
  }

  .feature-container {
    min-height: 80vh;
  }
  .feature-photo-container{
    position: relative;
    top: 0;
    left: 0;
  }
  .feature-photo-BG {
    position: relative;
    width: 100%;
    height: 280px;
    top: 0;
    left: 0;
    background-image:linear-gradient(grey , #ffffa1);
    background-position: center;
    background-size: cover;
  }
  .feature-photo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 280px;
    background-position: center;
    background-size: cover;
  }
  /*text for the artworks cards*/
  .feature-box p {
    padding: 0em 0.5em;
    margin-bottom: 1em;
    color: #C0C0C0 !important;
    line-height: 1.3em;
  }
  .feature-box h6 {
    padding: 0.5em 0.0em 0.5em 0.5em;
    margin-bottom: 0px;
    color: white !important;
    font-size: 22px;
  }

  @media screen and (max-width: 768px) {
    .feature-boxes {
      margin-top: 20px;
    }
    .feature-box {
      margin: 16px;
      width: 80%;
    }

    .events-button-container{
      text-align: left;
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
  }


</style>

<svelte:head>
<title>Live</title>
</svelte:head>

<!-- <section class="hero is-primary">
  <div class="hero-body">
    <div class="container page-max-width">
      <h1 class="title">Live</h1>
    </div>
  </div>
</section>
-->
<div class="container page-max-width top-framed-element">
    <section>
      <div class="container">
        <div class="responsive-iframe">
          <iframe 
          width="500" 
          height="900" 
          src="https://www.youtube.com/embed/3eKjXzT5QBI"
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>
</div>

<div class="container page-max-width top-framed-element">
    <section>
      <div class="container">
        <div class="responsive-iframe">
          <iframe 
          width="500" 
          height="900" 
          src="https://www.youtube.com/embed/DsArvMd1w8A"
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>
</div>

<section class="section">

  <div class="container page-max-width">
    <div class="content">
      <div>
        <h2 class="subtitle">Live Program</h2>
        <!-- <h2 class="showDates">6th-8th May 2021</h2> -->
        <!-- <h2 class="location">Goldsmiths, University of London</h2> -->
      </div>
      <div class="introBody">
        The public programme for Third ____ featured key events focussing on art and technology within the individual artworks on show and the professional practice of artists and curators part of the wider arts ecology. 
        <br><br> 
        Recordings of the events are available to watch here on the website. Information on the events is available below.
        <br><br>
      </div>
      <div>
        <div class="introBody">
          <b>
          Thursday, 6 May 2021<br>
          Opening Night Showcase<br>
          </b>
          Featuring Digital Arts Computing Students<br><br>
          An online exhibition opening hangout and livestream celebrating selected works by participating artists through a back-to-back spotlight of artworks in the form of a commentary exchange relay.<br> 
          <br> 
          <b>
          Saturday, 8 May 2021<br>
          Traversing the Binaries: Unstable States and Dual Truths<br>
          </b>
          Featuring Paula Strunden, Julia Greenway, Ibiye Camp<br>
          Moderated by Yasmin Morgan<br><br>

          An online panel discussion on the topic of technology-driven digital, networked art practices and their relationship to and potential disruption of existing conventions of space, architecture, and time.
          <br><br>
        </div>
      </div>
    </div>
    <div class="feature-boxes">
      <div class="feature-box">
        <a href="https://www.paulastrunden.com/" target="_blank">
          <div class="feature-photo-container">
            <div class="feature-photo-BG"/>
            <div class="feature-photo" style="background-image:url(img/ps.jpeg);" />
          </div>
          <h6>Paula Strunden</h6>
          <p>
            PhD researcher based between Amsterdam and Vienna creating multisensory mixed reality installations, exploring the imaginary potential of architecture between virtual and physical realms. Her room-scale XR installations have been exhibited at design and film festivals internationally, including the Royal Academy of Arts, Estonian Museum of Architecture, MU Artspace Eindhoven and Eye Film museum Amsterdam. Studied at the Bartlett School of Architecture and worked for Raumlabor and Herzog & de Meuron, Associate of Store, co-founder of Soft Bodies and the educational XR program Virtual Fruits.
          </p>
        </a>
      </div>
      <div class="feature-box">
        <a href="https://www.juliagreenway.com/" target="_blank">
          <div class="feature-photo-container">
            <div class="feature-photo-BG"/>
            <div class="feature-photo" style="background-image:url(img/jg.jpeg);" />
          </div>
          <h6>Julia Greenway</h6>
          <p>
            Independent curator originally from Detroit, Michigan with a focus on how digital media influences the aesthetic presentation of gender, economics, and environment. Her curatorial practice began with Interstitial, in Seattle, Washington going on to be named the 2017-2018 Curator-in-Residence with Disjecta Contemporary in Portland, Oregon. Upon relocating to London in 2018 to pursue an MFA in Curating at Goldsmiths, she independently produced Gery Georgieva’s UWU Channel Radiance at Cubitt Artists and Joey Holder’s Semelparous at Springhealth Leisure Centre in early 2020.
          </p>
        </a>
      </div>
      <div class="feature-box">
        <a href="https://cargocollective.com/ibiyecamp" target="_blank">
          <div class="feature-photo-container">
            <div class="feature-photo-BG"/>
            <div class="feature-photo" style="background-image:url(img/ic.jpeg);" />
          </div>
          <h6>Ibiye Camp</h6>
          <p>
            British Nigerian artist based in London following a Masters in Architecture from the Royal College of Art in 2019, Ibiye co-teaches with Dele Adeyemo and Dámaso Randulfe at the Royal College of Art. Together they run an Architecture Design Studio called Demonic Shores – Imaginaries of Indeterminacy in the Age of Logistics examining the tension between logistics and spaces of indeterminacy. Ibiye’s work forms an investigation into new technologies and the built environment. She utilizes architectural tools to create sound, video, and augmented reality to highlight the biases and conflicts of technology.
          </p>
        </a>
      </div>
    </div>
  </div>

  
  <div style="display: none;">
    <!-- These links are to get Sapper to work, ignore them -->
    <a href="/sitemap.xml">sitemap</a>
    <!-- <a href="/live">live</a> -->
  </div>

</section>
