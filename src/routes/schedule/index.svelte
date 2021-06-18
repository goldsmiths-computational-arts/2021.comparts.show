<script context="module">
  export async function preload({ params }) {
    const scheduleRows = await this.fetch("schedule.tsv").then(d => d.text());
    const artistsRows = await this.fetch("artists.tsv").then(d => d.text());

    return { scheduleRows, artistsRows };
  }
</script>

<script>
  import { tsvParse, autoType } from "d3-dsv";
  import { ascending, group } from "d3-array";
  import { slugify, formatDate, formatDay, formatTime } from "../../js/helpers";
  import { EVENT_URL } from "../../js/constants";
  import { now } from "../../js/stores";

  export let scheduleRows;
  export let artistsRows;

  const ONSITE = "ONSITE";
  const ONLINE = "ONLINE";

  // Make a list of unique artist names
  let artists;
  let events;
  let artistByUsername = new Map();

  let filter = null;

  $: {
    artists = tsvParse(artistsRows);
    artists.forEach(artist => {
      artistByUsername.set(artist.username, artist);
      artist.slug = slugify(artist.name);
    });

    events = tsvParse(scheduleRows, autoType)
      .map(row => {
        // row.themes = row.themes.split(/,\s*/);
        // row.medium = row.medium.split(/,\s*/);

        row.artists = [];
        if (row.username && row.username.trim()) {
          row.username.split(/,\s*/).forEach(username => {
            const artist = artistByUsername.get(username);
            if (artist) {
              row.artists.push(artist);
            } else {
              console.log(`Couldn't find "${username}"`);
            }
          });
        }

        row.startsAt = new Date(row.startTime);

        return row;
      })
      .filter(d => d.startTime);

    // console.log(events);
  }


  $: filteredEvents = events.filter(d => {
    if (!filter) {
      return true;
    } else {
      // TODO make some constants
      // TODO tidy up the sheet parsing
      if (filter === ONSITE) {
        return d.physical;
      }
      if (filter === ONLINE) {
        return d.livestream;
      }
    }
  });

  $: eventsByDay = group(filteredEvents, d =>
    d.startTime.toISOString().slice(0, 10)
  );
  $: eventsByDay2 = Array.from(eventsByDay.entries())
    .sort((a, b) => ascending(a[0], b[0]))
    .map(([key, events]) => {
      // JB - sorry this is messy!
      events.sort((a, b) => a.startsAt - b.startsAt);
      return [key, events];
    });

  function happeningNow(event) {
    return event.startsAt >= now && event.endsAt < now;
  }

  function inPast(event) {
    return event.endsAt < now;
  }

  function eventBdClass(event) {
    if (inPast(event)) {
      return "bd-col-7";
    }

    if (happeningNow(event.startsAt)) {
      return "bd-col-1"; // TODO design shows red colour not in pallette
    }
  }

  function scrollTo({ target }) {
    document.querySelector(target.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  }
</script>

<style>

h2 {
color: white;
font-family: 'Montserrat', sans-serif;
}

  .event {
    background-color: black;
    margin-bottom: 1rem;
    border-left: 6px solid transparent;
    padding: 24px;
  }

  .event-description {
    margin: 0.5rem 0;
    color: white;
  }

  .artist-name {
    font-weight: 600;
    margin: 0em 0.5em 0em 0em;
  }
  .event-time {
    font-size: 18px;
    font-weight: 600;
    color: #ffffa1;
  }

  .event-title {
    font-size: 18px;
    font-weight: 600;
    color: white;
  }

  .text-align-right {
    text-align: right;
  }
  .location-data {
    padding-left: 0;
  }
  .location-data .rounded-link {
    font-size: 0.75em;
    margin-bottom: 0.5em;
    display: inline-block;
  }

  .bio-photo {
    border-radius: 50%;
    width: 45%;
    height: 0px;
    padding-bottom: 45%;
    display: inline-block;
    background-position: center;
    background-size: contain;
    background-color: #a6a8ab;
  }

  @media only screen and (max-width: 1100px) {
    .location-data .rounded-link {
      font-size: 0.6em;
    }
  }

  @media only screen and (max-width: 768px) {
    .bio-photo {
      border-radius: 50%;
      width: 20%;
      height: 0px;
      padding-bottom: 20%;
      display: inline-block;
      background-position: center;
      background-size: contain;
      background-color: #a6a8ab;
    }
    .text-align-right {
      padding-top: 0px;
      padding-bottom: 0px;
    }

    .location-data {
      padding-left: 0.75rem;
    }

    .location-data .rounded-link {
      font-size: 1em;
    }
  }

  .filter-items {
    margin-top: 20px;
  }

  .filter-item {
    padding-top: 14px;
    margin-right: 20px;
    cursor: pointer;
    color: #999;
    border-bottom: 3px solid transparent;
  }

  .filter-item.is-selected {
    color: black;
    border-bottom-color: black;
  }
</style>

<svelte:head>
  <title>Schedule - Final Show - 2021</title>
</svelte:head>

<section class="section bg-col-7">
  <div class="container page-max-width">
    <div class="content">

      <h2>Events</h2>

      <p>
        The online component of Chimera Garden features a mixture of live
        performance, discussion and demonstrations, streamed directly from St
        James Hatcham Church and remote artists’ locations. You will be able to
        catch the online stream <a href="/live">here on our website</a> during the
        show.
      </p>

      <p>
        Below you can find the line up of events, some that will be happening
        physically in St James Hatcham Church and those that will be streaming
        online. Below you can register for free tickets for the online events.
        If you would like to visit us at St James Hatcham Church please read our
        <a href="/getting-there">safety guidelines and register here.</a>
      </p>

      <h2>Schedule</h2>
      <div>
        {#each eventsByDay2 as [date, events]}
          <!-- no need for location data <a
            class="rounded-link bd-col-1 col-1"
            href="#{formatDay(events[0].startsAt).toLowerCase()}"
            on:click|preventDefault={scrollTo}>
            {formatDay(events[0].startsAt)}
          </a> -->
        {/each}
        <a class="rounded-link bd-col-2 col-2" href={EVENT_URL} target="_blank">
          Free online tickets
        </a>
      </div>

      <!-- no need for this <div class="filter-items">
        <span
          class="filter-item"
          class:is-selected={filter === null}
          on:click={() => (filter = null)}>
          ALL
        </span>
        <span
          class="filter-item"
          class:is-selected={filter === ONLINE}
          on:click={() => (filter = ONLINE)}>
          ONLINE
        </span>
        <span
          class="filter-item"
          class:is-selected={filter === ONSITE}
          on:click={() => (filter = ONSITE)}>
          ONSITE
        </span>
      </div> -->

      {#each eventsByDay2 as [date, events]}
        <h2 id={formatDay(events[0].startsAt).toLowerCase()}>
          {formatDate(events[0].startsAt)}
        </h2>

        <!-- TODO reimport the events schedule after it has been fixed up a bit, I manually just edited it for the events that are physical and online just to style.-->

        {#each events as event, i}
          <div
            id={event.id}
            class=" event {eventBdClass(event)}"
            live={event.livestream}
            physical={event.physical}>

            <!-- TODO for next release convert to links to live page and getting there-->
             <div class="columns">
              <div class="column is-1 location-data">
                {#if event.livestream}
                  <!-- <span class="rounded-link col-6 bd-col-6">ONLINE</span> -->
                  <a href="/live" class="rounded-link bd-col-1 col-1">ONLINE</a>
                  <!-- <a href="/live" class="col-3 bd-col-3">ONLINE</a> -->
                {/if}
                {#if event.physical}
                  <!-- <span class="rounded-link col-6 bd-col-6">ONSITE</span> -->
                  <a href="/getting-there" class="rounded-link bd-col-1 col-1">ONLINE</a>
                  <!-- <a href="/getting-there" class="col-3 bd-col-3">ONSITE</a> -->
                {/if}
              </div> 

              <div class="column is-9">
                <div class="event-time col-3">
                  {formatTime(event.startsAt)} {formatDay(event.startsAt)}
                </div>
                <div class="event-title">{event.title}</div>
                <div class="event-description">{event.desc}</div>

                {#each event.artists as artist}
                  <a href="artists/{artist.slug}" class="artist-name col-5">
                    {artist.name}
                  </a>
                {/each}
              </div>

              <div class="column text-align-right">

                {#each event.artists as artist}
                  <a href="artists/{artist.slug}">
                    <!-- Changed all bio photos to background images as it solves the missing image problems and the wrong file resolution -->
                    <span
                      class="bio-photo"
                      style="background-image:url(img/bios/{artist.username}.jpeg)" />
                  </a>
                {/each}

              </div>

              <!-- TODO I think let's wait on the tags and themes until we have some sort of filtering? If that is still happening? -->
              <!--             <ul>
                {#each event.themes as theme}
                  <li>{theme}</li>
                {/each}
              </ul>

              <ul>
                {#each event.medium as media}
                  <li>{media}</li>
                {/each}
              </ul> -->
            </div>
          </div>
        {/each}
      {/each}

    </div>
  </div>
</section>
