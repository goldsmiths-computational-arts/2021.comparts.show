<script>
  import { onMount } from "svelte";
  import Nav from "../components/Nav.svelte";

  import { stores } from "@sapper/app";
  import { tick } from "svelte";

  const { page } = stores();

  let firstView = true;

  $: {
    if (!firstView) {
      console.log(`tracking`, $page.path);
      gtag("config", "UA-147134681-1", { page_path: $page.path });
    }
    firstView = false;
  }
</script>

<style>
  #gradient {
    position: fixed;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background: rgb(0, 0, 0);
    background: radial-gradient(
      circle at bottom right,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 53%,
      rgba(0, 0, 0, 1) 100%
    );
  }
</style>

<div id="gradient" />

<main>
  <Nav />
  <slot />
</main>
