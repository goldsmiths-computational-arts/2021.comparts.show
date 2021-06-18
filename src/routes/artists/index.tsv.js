import { tsvFormat } from "d3-dsv";
import { artists } from "../../js/artists";

const out = artists.map((d) => {
  return {
    username: d.username,
    name: d.name,
    otherName: d.otherName,
    years: d.years,
    title: d.title,
    themes: d.themes,
    media: d.media,
  };
});

export function get(req, res, next) {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end(tsvFormat(out));
}
