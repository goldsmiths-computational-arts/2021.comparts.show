import fs from "fs";
import { tsvParse, autoType } from "d3-dsv";
import { timeParse } from "d3-time-format";
import { DATA_DIR } from "./server-constants";

const parseDate = timeParse("%a %d %b %Y %H:%M"); // Thu 17 Sep 2020

const scheduleRows = tsvParse(
  fs.readFileSync(`${DATA_DIR}/schedule.tsv`, "utf-8"),
  autoType
);

export const schedule = [];

scheduleRows.forEach((row, id) => {
  if (!(row.startDate && row.title)) return;

  let startTime = parseDate(row.startDate + " " + row.startTime);

  if (startTime) {
    startTime = startTime.toISOString();
  }
  // const startTime = parseDate(row.startDate + " " + row.startTime);
  // console.log(row);
  // console.log(row.startDate, row.startTime);

  const newRow = { ...row, id, startTime };
  delete newRow.startDate;

  schedule.push(newRow);
});
