<script>
  import { GeneralShowInfo } from '../constants'
</script>

<svelte:head>
  <title>{GeneralShowInfo.fullShowName}</title>
  <meta name="description" content={GeneralShowInfo.description} />
  <meta property="og:title" content={GeneralShowInfo.fullShowName} />
  <meta property="og:description" content={GeneralShowInfo.description} />
  <meta property="og:type" content={'website'} />
  <meta
    property="og:image"
    content={'./img/socialImages/Social_card_Facebook_event.jpg'}
  />
  <meta property="og:url" content={GeneralShowInfo.url} />
  <meta property="twitter:title" content={GeneralShowInfo.fullShowName} />
  <meta property="twitter:description" content={GeneralShowInfo.description} />
  <meta
    property="twitter:image:src"
    content={'./img/socialImages/Social_card_Facebook_event.jpg'}
  />
</svelte:head>
