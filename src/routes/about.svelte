<script>
  import { onMount } from 'svelte'

  let el
  onMount(async () => {
    const threeDemo = await import('sketches/three-demo')
    threeDemo.default().createScene(el)
  })
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<body>
  <div id="three-container" class="narrow-sketch">
    <canvas bind:this={el} />
  </div>
  <div class="title">About</div>
</body>

<style>
  .title {
    position: fixed;
    background-color: white;
    top: 0%;
    left: 50%;
    transform: translate(-50%, 0);
    animation: fadeIn linear 2s;
    font-size: 100px;
  }


  .narrow-sketch {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    z-index: 0;
  }
</style>
