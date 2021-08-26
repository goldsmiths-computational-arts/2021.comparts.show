<script>
  import G05Schedule from '../utils/data/g05Schedule.csv'
  import { nameProcessor } from '../utils/nameProcessor'

  const dayOne = G05Schedule.filter((item) => item.date === '1/9/2021')
  const dayTwo = G05Schedule.filter((item) => item.date === '2/9/2021')

  const dayThree = G05Schedule.filter((item) => item.date === '3/9/2021')
  const dayThreeA = dayThree.slice(0, Math.floor(dayThree.length / 2))
  const dayThreeB = dayThree.slice(-Math.floor(dayThree.length / 2))

  const dayFour = G05Schedule.filter((item) => item.date === '4/9/2021')
  const dayFourA = dayFour.slice(0, Math.floor(dayFour.length / 2))
  const dayFourB = dayFour.slice(-Math.floor(dayFour.length / 2))

  const dayFive = G05Schedule.filter((item) => item.date === '5/9/2021')
</script>

<div class="container">
  <div class="gridContainer">
    <div class="gridItem">
      <h2>9/1 Wednesday</h2>
      <table>
        {#each dayOne as item}
          <tr>
            <td>{item.time}</td>
            <td>{item.title}</td>
            <td
              ><a href="/artist/{nameProcessor(item.artist)}">{item.artist}</a
              ></td
            >
          </tr>
        {/each}
      </table>
    </div>

    <div class="gridItem">
      <h2>9/2 Thursday</h2>
      <table>
        {#each dayTwo as item}
          <tr>
            <td>{item.time}</td>
            <td>{item.title}</td>
            <td
              ><a href="/artist/{nameProcessor(item.artist)}">{item.artist}</a
              ></td
            >
          </tr>
        {/each}
      </table>
    </div>

    <div class="gridItem">
      <h2>9/3 Friday</h2>
      <table>
        {#each dayThreeA as item}
          <tr>
            <td>{item.time}</td>
            <td>{item.title}</td>
            <td
              ><a href="/artist/{nameProcessor(item.artist)}">{item.artist}</a
              ></td
            >
          </tr>
        {/each}
      </table>
    </div>

    <div class="gridItem">
      <table>
        {#each dayThreeB as item}
          <tr>
            <td>{item.time}</td>
            <td>{item.title}</td>
            <td
              ><a href="/artist/{nameProcessor(item.artist)}">{item.artist}</a
              ></td
            >
          </tr>
        {/each}
      </table>
    </div>

    <div class="gridItem">
      <h2>9/4 Saturday</h2>
      <table>
        {#each dayFourA as item, index}
          <tr>
            <td>{item.time}</td>
            <td>{item.title}</td>
            <td
              ><a href="/artist/{nameProcessor(item.artist)}">{item.artist}</a
              ></td
            >
          </tr>
          {#if index === dayThree.length / 2}
            <p />
          {/if}
        {/each}
      </table>
    </div>

    <div class="gridItem">
      <table>
        {#each dayFourB as item}
          <tr>
            <td>{item.time}</td>
            <td>{item.title}</td>
            <td
              ><a href="/artist/{nameProcessor(item.artist)}">{item.artist}</a
              ></td
            >
          </tr>
        {/each}
      </table>
    </div>

    <div class="gridItem">
      <h2>9/5 Sunday</h2>
      <table>
        {#each dayFive as item}
          <tr>
            <td>{item.time}</td>
            <td>{item.title}</td>
            <td
              ><a href="/artist/{nameProcessor(item.artist)}">{item.artist}</a
              ></td
            >
          </tr>
        {/each}
      </table>
    </div>
  </div>
</div>

<style>
  .container {
    font-family: dotgothic16;
  }

  td {
    padding-right: 2vw;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline dotted;
  }

  .gridContainer {
    margin-left: 2vw;
    margin-right: 2vw;
    margin-top: 5vh;
    display: grid;
    grid-auto-flow: column;
    /* grid-auto-columns: 300px 100px; */
    grid-template-rows: repeat(3, minmax(30vh, 33%));
    grid-template-columns: repeat(3, minmax(30vh, 33%));
    gap: 1vw;
    margin-bottom: 25px;
    flex: 1;
    height: 50%;
  }

  .gridItem {
    display: grid;
    position: relative;
    margin-top: 2vh;
  }

  @media (max-width: 768px) {
    .gridContainer {
      display: flex;
      flex-direction: column;
    }
  }
</style>
