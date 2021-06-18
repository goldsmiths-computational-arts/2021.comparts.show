#!/usr/bin/env node -r esm
import fs from "fs";
import { resolve } from "path";
import { execSync } from "child_process";
import { csvParseRows, tsvFormat } from "d3-dsv";
import ProgressBar from "progress";
import { slugify } from "../src/js/helpers";

const rawDir = resolve(`${__dirname}/../raw`);
const dataDir = resolve(`${__dirname}/../data`);
const artworksDir = resolve(`${__dirname}/../data/artworks`);
const webInstructionsDir = resolve(`${__dirname}/../data/webInstructions`);
const wallTextDir = resolve(`${__dirname}/../data/wallText`);
const photosDir = resolve(`${__dirname}/../static/img/artworks`);

[artworksDir, webInstructionsDir, wallTextDir, photosDir].forEach((d) =>
  fs.mkdirSync(d, { recursive: true })
);

const artworksCsv = `${rawDir}/artworks.csv`;
const artworksTsv = `${dataDir}/artworks.tsv`;

const headers = `
timestamp
email
title
desc
webInstructions
wallTextInstructions
submitImagesLater
images
videoDocUrl
interactiveUrl
streamTwitch
streamYouTube
themes
media`
  .trim()
  .split("\n");

//   Timestamp
//   Your Goldsmiths email address
//   Art work title
//   Art work description
//   Interaction Instructions on the Website
//   Interaction Instructions for your wall text in the Church
//   I need to submit images later
//   Art Work Images ( 1920x 1080 )
//   Video documentation url
//   Url to interactive work
//   Live Stream: Twitch Channel ID
//   Live Stream: YouTube Channel ID
//   Themes
//   Media
//   I need to submit video later
//   Please can my featured media be:
//   I would like the chat embedded for my Twitch stream

const artworkRows = csvParseRows(
  fs.readFileSync(artworksCsv, "utf-8"),
  (row, i) => {
    if (!i) return null;
    if (!row.join("")) return null;

    const out = {};
    headers.forEach((h, j) => {
      const value = row[j].trim();
      out[h] = value;
    });
    return out;
  }
);

const artworksMap = new Map();

const bar = new ProgressBar(":percent  [:bar]", { total: artworkRows.length });

artworkRows.forEach((d) => {
  d.username = d.email.split("@")[0];

  fs.writeFileSync(`${artworksDir}/${d.username}.md`, d.desc.trim());
  delete d.desc;

  fs.writeFileSync(
    `${webInstructionsDir}/${d.username}.md`,
    d.webInstructions.trim()
  );
  delete d.webInstructions;

  if (d.wallTextInstructions.trim()) {
    fs.writeFileSync(
      `${wallTextDir}/${d.username}.md`,
      d.wallTextInstructions.trim()
    );
  }
  delete d.wallTextInstructions;

  if (d.images) {
    // console.log();
    // console.log(d.images);
    const images = d.images.split(", ");

    d.numImages = images.length;

    images.forEach((image, i) => {
      const id = image.split("=")[1];

      // Resize the images and convert to JPEG, some are PNGs just with .jpeg extension
      const cmd = `sips -z 1080 1920 ${rawDir}/photos/${id}.jpeg --out ${photosDir}/${
        d.username
      }-${i + 1}.jpeg`;
      // console.log(cmd);
      try {
        execSync(cmd, { stdio: "pipe" });
      } catch (err) {
        console.log(`Error with ${id} - ${d.username}`);
      }

      if (!i) {
        const cmd = `sips -z 270 480 ${rawDir}/photos/${id}.jpeg --out ${photosDir}/${d.username}-thumb.jpeg`;
        // console.log(cmd);
        try {
          execSync(cmd, { stdio: "pipe" });
        } catch (err) {
          console.log(`Error with ${id} - ${d.username}`);
        }
      }
    });
  }

  delete d.images;
  delete d.submitImagesLater;

  artworksMap.set(d.username, d);
  bar.tick();
});

const artworks = Array.from(artworksMap.values());

fs.writeFileSync(artworksTsv, tsvFormat(artworks));
