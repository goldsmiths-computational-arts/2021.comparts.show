#!/usr/bin/env node -r esm
import fs from "fs";
import { execSync } from "child_process";
import { csvParseRows, tsvFormat } from "d3-dsv";
import ProgressBar from "progress";
import { slugify } from "../src/js/helpers";

const FULL_THING = true;

const rawDir = `${__dirname}/../raw`;
const dataDir = `${__dirname}/../data`;
const biosDir = `${__dirname}/../data/bios`;
const photosDir = `${__dirname}/../static/img/bios`;

[biosDir, photosDir].forEach((d) => fs.mkdirSync(d, { recursive: true }));

const megaCsv = `${rawDir}/mega.csv`;
const artistsCsv = `${rawDir}/artists.csv`;
const artistsTsv = `${dataDir}/artists.tsv`;

const headers = `
timestamp
email
name
showOtherName
otherName
otherNameLanguage
bioImage
location
oldBioTextOrFile
oldBioText
oldBioMarkdown
website
youtube
vimeo
twitch
facebook
twitter
instagram
publicEmail
blank1
blank2
bioText
`
  .trim()
  .split("\n");

const isRemote = new Map();

csvParseRows(fs.readFileSync(megaCsv, "utf-8"), (row, i) => {
  const email = row[2];
  const username = email.split("@")[0];

  const remote = /Remotely/.test(row[5]);
  isRemote.set(username, remote);
  // console.log({ username, remote });
});

const artistRows = csvParseRows(
  fs.readFileSync(artistsCsv, "utf-8"),
  (row, i) => {
    if (!i) return null;
    const out = {};
    headers.forEach((h, j) => {
      const value = row[j].trim();
      out[h] = value;
    });
    return out;
  }
);

const artistsMap = new Map();

const bar = new ProgressBar(":percent  [:bar]", { total: artistRows.length });

artistRows.forEach((d) => {
  delete d.showOtherName;
  delete d.otherNameLanguage;
  delete d.timestamp;

  delete d.oldBioTextOrFile;
  delete d.oldBioText;
  delete d.oldBioMarkdown;
  delete d.blank1;
  delete d.blank2;

  d.slug = slugify(d.name);

  d.username = d.email.split("@")[0];

  d.isRemote = isRemote.get(d.username);

  if (d.website && !/^https?:\/\//.test(d.website)) {
    d.website = "http://" + d.website;
  }

  d.vimeo = d.vimeo.replace("https://vimeo.com/", "");
  d.facebook = d.facebook.replace("https://www.facebook.com/", "");
  d.youtube = d.youtube.replace("https://www.youtube.com/channel/", "");
  d.instagram = d.instagram.replace("https://www.instagram.com/", "");
  d.instagram = d.instagram.replace("@", "");
  d.instagram = d.instagram.replace(/\/$/, "");
  d.twitter = d.twitter.replace("@", "");
  d.twitch = d.twitch.replace("https://www.twitch.tv/", "");

  delete d.email;

  if (FULL_THING && d.bioText) {
    fs.writeFileSync(`${biosDir}/${d.username}.md`, d.bioText.trim());
  }
  delete d.bioText;

  if (FULL_THING && d.bioImage) {
    const id = d.bioImage.split("=")[1];
    // Resize the images and convert to JPEG, some are PNGs just with .jpeg extension
    execSync(
      `sips -s format jpeg -Z 600 ${rawDir}/photos/${id}.jpeg --out ${photosDir}/${d.username}.jpeg`,
      { stdio: "pipe" }
    );
  }
  delete d.bioImage;

  artistsMap.set(d.slug, d);
  bar.tick();
});

const artists = Array.from(artistsMap.values());

// console.log(artists);
fs.writeFileSync(artistsTsv, tsvFormat(artists));
