<script>
  import Carousel from "@beyonk/svelte-carousel";
  import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons";

  export let images;
</script>

<style>
  .control :global(svg) {
    width: 100%;
    height: 100%;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 32px;
  }
</style>

{#if images.length === 1}
  <img src={images[0]} alt="" />
{:else}
  <Carousel perPage="1">
    <span class="control" slot="left-control">
      <ChevronLeftIcon />
    </span>
    {#each images as image}
      <div class="slide-content">
        <img src={image} alt="" />
      </div>
    {/each}
    <span class="control" slot="right-control">
      <ChevronRightIcon />
    </span>
  </Carousel>
{/if}
