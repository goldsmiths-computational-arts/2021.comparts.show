<script>
  import { BASE_URL } from "../js/constants";

  export let pages;
  export let lastmod;
</script>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {#each pages as page}
    <url>
      <loc>{BASE_URL + page}</loc>
      <lastmod>{lastmod}</lastmod>
    </url>
  {/each}
</urlset>
