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

</script>

<svelte:head>
<Meta
title="2021.Comparts.Show"
/>
</svelte:head>
<div >
  <section>
    <h2 class="text-center"> Home Page </h2>
  </section>
</div>

<style>
  .text-center {
    text-align: center;
  }
</style>
