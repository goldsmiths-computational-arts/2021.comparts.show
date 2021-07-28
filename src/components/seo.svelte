<script>
    import {GeneralShowInfo} from '../constants'
</script>

<svelte:head>
  <title>{GeneralShowInfo.fullShowName}</title>
  <meta name="description" content={GeneralShowInfo.description}>
  <meta property="og:title" content={GeneralShowInfo.fullShowName}>
  <meta property="og:description" content={GeneralShowInfo.description}>
  <meta property="og:type" content={"website"}>
  <meta property="og:url" content={GeneralShowInfo.url}>
  <meta property="twitter:title" content={GeneralShowInfo.fullShowName}>
  <meta property="twitter:description" content={GeneralShowInfo.description}>
</svelte:head>