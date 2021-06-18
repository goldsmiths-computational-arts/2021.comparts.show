import { artists } from "../../js/artists";
import { schedule } from "../../js/schedule";
import { slugify } from "../../js/helpers";

const artistByUsername = new Map(
  artists.map((d) => {
    d.events = [];
    return [d.username, d];
  })
);

schedule.forEach((event, i) => {
  if (event.username) {
    event.username.split(/,\s*/).forEach((username) => {
      const artist = artistByUsername.get(username);
      if (artist) {
        artist.events.push(event);
      } else {
        console.log(
          `artists/[slug] - Couldn't find ${username} for event ${i}`
        );
      }
    });
  }
});

const artistBySlug = new Map(
  artists.map((d) => {
    return [slugify(d.name), JSON.stringify(d)];
  })
);

export function get(req, res, next) {
  const { slug } = req.params;

  if (artistBySlug.has(slug)) {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(artistBySlug.get(slug));
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: `Not found`,
      })
    );
  }
}
