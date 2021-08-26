<script>
  import ppSchedule from '../utils/data/publicProgrammingSchedule.csv'
  import { nameProcessor } from '../utils/nameProcessor'
</script>

<table>
  <p />
  <tr>
    <th>Guest</th>
    <th>Speaker</th>
    <th>Speaker</th>
    <th>Speaker</th>
    <th>Panel</th>
    <th>Time</th>
    <th>Location</th>
    <th>Additional Info</th>
  </tr>
  <!-- <p /> -->
  {#each ppSchedule as item}
    <tr>
      <td>{item.guestSpeaker}</td>
      <td
        ><a href="/artist/{nameProcessor(item.artistSpeakerOne)}"
          >{item.artistSpeakerOne}</a
        ></td
      >
      <td
        ><a href="/artist/{nameProcessor(item.artistSpeakerTwo)}"
          >{item.artistSpeakerTwo}</a
        ></td
      >
      <td
        ><a href="/artist/{nameProcessor(item.artistSpeakerThree)}"
          >{item.artistSpeakerThree}</a
        ></td
      >
      <td>{item.panel}</td>
      <td>{item.time}</td>
      <td>{item.location}</td>
      <td>{item.additionalInfo}</td>
    </tr>{/each}
</table>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }
  td {
    text-align: center;
    font-size: 0.75rem;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
  th {
    font-size: 1rem;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline dotted;
  }
  /* table td + td {
    border-left: 1px solid rgba(0, 0, 0, 0.25);
  } */
</style>
