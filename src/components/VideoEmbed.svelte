<script>
  export let url;

  // I was getting embed codes from here
  // https://embedresponsively.com/

  $: embedCode = getVideoEmbed(url);

  function getVideoEmbed(url) {
    if (/vimeo/.test(url)) {
      const vimeoID = url.substring(18);
      return `<iframe src='https://player.vimeo.com/video/${vimeoID}' frameborder='0' allowFullScreen></iframe>`;
    }

    if (/youtu\.?be/.test(url)) {
      if (url.length > 28) {
        var queryString = {};
        url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function(
          $0,
          $1,
          $2,
          $3
        ) {
          queryString[$1] = $3;
        });
        var youtubeID = queryString["v"];
      } else {
        var youtubeID = url.substring(16);
      }
      return `<iframe src='https://www.youtube.com/embed/${youtubeID}' frameborder='0' allowfullscreen></iframe>`;
    }

    console.warn(`Not video embed code for '${url}'`);
  }
</script>

<style>
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }
  :global(.embed-container iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>

<div class="embed-container">
  {@html embedCode}
</div>
