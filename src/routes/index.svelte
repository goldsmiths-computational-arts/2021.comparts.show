<script>
  import { onMount } from 'svelte'
  import { FollowMouse } from 'sketches'
  import names from 'constants/names'
  import 'css/global.css'

  let P5

  onMount(async () => {
    const module = await import('p5-svelte')
    P5 = module.default
  })
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<body>
  <div id="sketch-container" class="fullscreen-sketch">
    <svelte:component this={P5} sketch={FollowMouse} />
  </div>
  <div class="body-container">
    <div class="title">{names.index}</div>
  </div>
</body>

<style>
  .body-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
  }

  .title {
    position: fixed;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: fadeIn linear 2s;
    font-size: 100px;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
