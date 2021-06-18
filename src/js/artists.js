import fs from "fs";
import { DATA_DIR } from "./server-constants";
import { tsvParse, autoType } from "d3-dsv";
import { ascending } from "./helpers";
import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt();

export const artists = tsvParse(
  fs.readFileSync(`${DATA_DIR}/artists.tsv`, "utf-8"),
  autoType
);

const artworksByUsername = new Map();

export const artworks = tsvParse(
  fs.readFileSync(`${DATA_DIR}/artworks.tsv`, "utf-8"),
  autoType
);

artworks.forEach((artwork) => {
  artworksByUsername.set(artwork.username, artwork);

  artwork.themes = artwork.themes.split(", ");
  artwork.media = artwork.media.split(", ");
});

function getHTML(dir, username) {
  try {
    const md = fs.readFileSync(`${DATA_DIR}/${dir}/${username}.md`, "utf-8");
    return markdown.render(md);
  } catch (err) {
    // console.log(err)
  }
}

artists.forEach((artist) => {
  artist.bioHTML = getHTML("bios", artist.username);

  let artwork;
  if ((artwork = artworksByUsername.get(artist.username))) {
    artwork.found = true;
    Object.assign(artist, artwork);
    artist.webInstructionsHTML = getHTML("webInstructions", artist.username);
    artist.artworkHTML = getHTML("artworks", artist.username);
  }
});

artists.sort((a, b) => ascending(a.name, b.name));

console.log(
  `Artworks without artist:`,
  artworks
    .filter((d) => !d.found)
    .map((d) => d.username)
    .join(", ")
);
