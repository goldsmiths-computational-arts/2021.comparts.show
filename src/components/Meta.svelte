<script>
  import { onDestroy } from "svelte";
  import { stores } from "@sapper/app";
  const { page } = stores();

  import { BASE_URL } from "../js/constants";

  export let url = $page.path;
  export let title;
  export let description = "6 May 2021";
  export let image = "/img/social/facebook_1200x630.jpg";
  export let imageWidth = 1200;
  export let imageHeight = 630;

  onDestroy(() => {
    return () => {
      // delete these tags on unmount to fix client-side issue where
      // svelte:head just keeps appending and doesn't hydrate existing meta tags
      // see https://github.com/sveltejs/sapper/issues/976
      document.head.querySelector("title").remove();
      document.head.querySelector('link[rel="canonical"').remove();
      Array.from(document.head.querySelectorAll('meta[property*="og"')).forEach(
        d => d.remove()
      );
    };
  });
</script>

<link rel="stylesheet" href="css/global.css" />

<title>{title}</title>
<link rel="canonical" href={BASE_URL + url + '/'} />
<meta property="og:title" content={title} />
<meta property="og:url" content={BASE_URL + url + '/'} />
<meta property="og:description" content={description} />
<meta property="og:image" content={BASE_URL + image} />
<meta property="og:image:width" content={imageWidth} />
<meta property="og:image:height" content={imageHeight} />
