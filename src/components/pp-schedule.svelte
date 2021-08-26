<script>
  import ppSchedule from '../utils/data/publicProgrammingSchedule.csv'
  import { nameProcessor } from '../utils/nameProcessor'
</script>

{#each ppSchedule as item}
  <div class="item-container">
    <h2>{item.panel}</h2>
    <div><span class="dt">Time</span>: {item.time}</div>
    <div><span class="dt">Location</span>: {item.location}</div>
    <div><span class="dt">Guest Speaker</span>: {item.guestSpeaker}</div>
    {#if item.artistSpeakerOne !== ''}
      <div>
        <span class="dt">Artist Speaker</span>:
        <a href="/artist/{nameProcessor(item.artistSpeakerOne)}"
          >{item.artistSpeakerOne}</a
        >
      </div>
    {/if}
    {#if item.artistSpeakerTwo !== ''}
      <div>
        <span class="dt">Artist Speaker</span>:
        <a href="/artist/{nameProcessor(item.artistSpeakerTwo)}"
          >{item.artistSpeakerTwo}</a
        >
      </div>
    {/if}
    {#if item.artistSpeakerThree !== ''}
      <div>
        <span class="dt">Artist Speaker</span>:
        <a href="/artist/{nameProcessor(item.artistSpeakerTwo)}"
          >{item.artistSpeakerTwo}</a
        >
      </div>
    {/if}
    <div><span class="dt">Additional Info</span>: {item.additionalInfo}</div>
  </div>
{/each}

<style>
  .item-container {
    margin-top: 2.5vh;
    margin-bottom: 2.5vh;
    margin-left: 2vw;
  }

  .dt {
    text-decoration: underline dashed;
  }

  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline dotted;
  }
</style>
