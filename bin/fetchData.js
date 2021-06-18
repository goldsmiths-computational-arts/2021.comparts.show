#!/usr/bin/env node -r esm
import fs from "fs";
import { normalize } from "path";
import { google } from "googleapis";
import PQueue from "p-queue";

const rawDir = normalize(`${__dirname}/../raw`);
const photosDir = `${rawDir}/photos`;
const biosDir = `${rawDir}/bios`;

fs.mkdirSync(photosDir, { recursive: true });
fs.mkdirSync(biosDir, { recursive: true });

const queue = new PQueue({ concurrency: 1 });

const megaForm = "1mxVo-yHN-KYJ827BCbOhfOlaRhoEIMlxqs3WMSX3s9Y";
const artistsForm = "1cFp1oZc4CSHddOLnevgeJIAc3JT8s7uewNPp9TLViVo";
const schedule = "1yyrr3frgtnz4TnLlPAJRwanqLC8fNSMsr9g9ZnzdTRM";
const artworkForm = "1df60MvCLtNCL3puT3QTe5QZc_wtcJVmLcxWhLzI40E8";

const auth = new google.auth.GoogleAuth({
  keyFile: `${__dirname}/../secrets/goldcomparts-show-592cf6b0475d.json`,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth,
});

main();

async function main() {
  await exportFile(megaForm, "text/csv", `${rawDir}/mega.csv`);
  await exportFile(artistsForm, "text/csv", `${rawDir}/artists.csv`);
  await exportFile(schedule, "text/csv", `${rawDir}/schedule.csv`);
  await exportFile(artworkForm, "text/csv", `${rawDir}/artworks.csv`);

  let listedAll = false;
  let pageToken = null;
  let photos = [];

  while (!listedAll) {
    let res = await drive.files.list({
      q: "mimeType='image/jpeg' or mimeType='image/png'",
      pageToken,
    });

    photos = photos.concat(res.data.files);

    if (res.data.nextPageToken) {
      pageToken = res.data.nextPageToken;
    } else {
      listedAll = true;
    }

    // console.log(res);
  }

  console.log("num photos", photos.length);

  // return;

  await queue.addAll(
    photos.map((d) => () => {
      // We save all files with .jpeg and convert them later using SIPS
      return downloadFile(d.id, `${photosDir}/${d.id}.jpeg`).catch((err) =>
        console.log(err)
      );
    })
  );

  // TODO extract out paginated results query above
  let res = await drive.files.list({
    q: "mimeType='text/plain'",
  });
  const bios = res.data.files;

  await queue.addAll(
    bios.map((d) => () => {
      return downloadFile(d.id, `${biosDir}/${d.id}.md`).catch((err) =>
        console.log(err)
      );
    })
  );
}

function exportFile(fileId, mimeType, name) {
  return new Promise((resolve, reject) => {
    const dest = fs.createWriteStream(name);
    drive.files.export(
      {
        fileId: fileId,
        mimeType,
      },
      {
        responseType: "stream",
      },
      (err, response) => {
        if (err) return reject(err);
        response.data
          .on("error", reject)
          .on("end", () => {
            console.log(`Saved ${name}`);
            resolve();
          })
          .pipe(dest);
      }
    );
  });
}

function downloadFile(fileId, name) {
  return new Promise(async (resolve, reject) => {
    fs.access(name, fs.constants.F_OK, (err) => {
      if (!err) {
        console.log(`skipping ${name}`);
        return resolve();
      }

      const dest = fs.createWriteStream(name);
      drive.files.get(
        {
          fileId: fileId,
          alt: "media",
        },
        { responseType: "stream" },
        (err, response) => {
          if (err) return reject(err);
          response.data
            .on("error", reject)
            .on("end", () => {
              console.log(`Saved ${name}`);
              resolve();
            })
            .pipe(dest);
        }
      );
    });
  });
}
