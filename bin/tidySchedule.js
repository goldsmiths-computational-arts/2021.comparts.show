#!/usr/bin/env node -r esm
import fs from "fs";
import { csvParseRows, tsvFormat } from "d3-dsv";
import ProgressBar from "progress";
import { slugify } from "../src/js/helpers";

const rawDir = `${__dirname}/../raw`;
const dataDir = `${__dirname}/../data`;

fs.mkdirSync(dataDir, { recursive: true });

const scheduleCsv = `${rawDir}/schedule.csv`;
const scheduleTsv = `${dataDir}/schedule.tsv`;

const headers = `
startDate
startTime
duration
livestream
physical
title
username
themes
medium
desc`
  .trim()
  .split("\n");

const scheduleRows = csvParseRows(
  fs.readFileSync(scheduleCsv, "utf-8"),
  (row, i) => {
    if (i < 11) return null;
    if (!row.join("")) return null;

    const out = {};
    headers.forEach((h, j) => {
      const value = row[j].trim();
      out[h] = value;
    });
    return out;
  }
);

scheduleRows.forEach((d) => {
  d.livestream = d.livestream === "yes";
  d.physical = d.physical === "yes";
});

const schedule = Array.from(scheduleRows.values());

// console.log(scheduleTsv);
fs.writeFileSync(scheduleTsv, tsvFormat(schedule));
