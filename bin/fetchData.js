#!/usr/bin/env node -r esm
import fs from 'fs'
import { normalize } from 'path'
import { google } from 'googleapis'
import { nameProcessor } from '../src/utils/nameProcessor'

const getMegaformData = async (sheets) => {
  const megaformId = '1S4O-JEDzgWDxOrDTc3jPegqzBU-KtbIOAe7Tl_xBFHk'
  const artworkDir = normalize(`${__dirname}/../src/utils/data`)

  const megaformResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: megaformId,
    range: 'Form responses 1!2:119',
  })

  let megaformData =
    'fullName,preferredName,uniEmail,artistBio,instagram,website,youtube,vimeo,twitch,facebook,twitter,email\n'

  megaformResponse.data.values.forEach((data) => {
    const fullName = data[1]
    const preferredName = data[2]
    const uniEmail = data[4]
    const artistBio = data[32]
    const instagram = data[47]
    const website = data[48]
    const youtube = data[49]
    const vimeo = data[50]
    const twitch = data[51]
    const facebook = data[52]
    const twitter = data[53]
    const email = data[54]

    megaformData += `${fullName},${preferredName},${uniEmail},"${artistBio.replace(
      /["']/g,
      `'`
    )}",${instagram},${website},${youtube},${vimeo},${twitch},${facebook},${twitter},${email}\n`
  })
  fs.writeFileSync(`${artworkDir}/artists.csv`, megaformData)
}

const getPortrait = async (portraitUrl, preferredName, drive) => {
  if (!portraitUrl) return

  console.log(`Getting portrait pic for ${preferredName}`)

  const bioPicsDir = normalize(`${__dirname}/../static/img/bios`)
  const fileId = portraitUrl.replace('https://drive.google.com/open?id=', '')
  const picName = nameProcessor(preferredName)
  const bioPicDest = fs.createWriteStream(`${bioPicsDir}/${picName}.jpg`)

  drive.files.get(
    {
      fileId,
      alt: 'media',
    },
    { responseType: 'stream' },
    function (err, res) {
      res.data
        .on('done', () => {
          console.log('done')
        })
        .on('error', (err) => {
          console.log('error', err)
        })
        .pipe(bioPicDest)
    }
  )
}

const getArtworks = async (photoUrl, preferredName, drive) => {
  if (!photoUrl) return

  console.log(`Getting artwork pics for ${preferredName}`)
  const artworkPicsDir = normalize(`${__dirname}/../static/img/artworks`)
  const artworkPicsArray = photoUrl.split(',')

  artworkPicsArray.forEach((piece, index) => {
    const artworkDriveId = piece
      .trim()
      .replace('https://drive.google.com/open?id=', '')

    const artworkPicName = `${nameProcessor(preferredName)}-artwork-${index}`
    const artworkPicDest = fs.createWriteStream(
      `${artworkPicsDir}/${artworkPicName}.jpg`
    )

    drive.files.get(
      {
        fileId: artworkDriveId,
        alt: 'media',
      },
      { responseType: 'stream' },
      function (err, res) {
        res.data
          .on('done', () => {
            console.log('done')
          })
          .on('error', (err) => {
            console.log('error', err)
          })
          .pipe(artworkPicDest)
      }
    )
  })
}

const getArtworkFormData = async (sheets, drive) => {
  const artworkFormId = '1K7rP_yPAI_diZDHKWRflxb3ytx23SJOpUJcmtvCbavc'
  const artworkDir = normalize(`${__dirname}/../src/utils/data`)

  const artworkFormResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: artworkFormId,
    range: 'Form responses 1!2:119',
  })

  let artworkSubmissionFormData =
    'email,legalName,preferredName,bio,title,artwork,photoUrl,videoUrlOne,videoUrlTwo,instructions\n'

  artworkFormResponse.data.values.forEach((data) => {
    const [
      timestamp,
      non,
      email,
      legalName,
      preferredName,
      portraitUrl,
      bio,
      title,
      artwork,
      photoUrl,
      videoUrlOne,
      videoUrlTwo,
      instructions,
    ] = data

    getPortrait(portraitUrl, preferredName, drive)
    getArtworks(photoUrl, preferredName, drive)

    artworkSubmissionFormData += `${email},${legalName},${preferredName},"${bio.replace(
      /["']/g,
      `'`
    )}","${title.replace(/["']/g, `'`)}","${artwork.replace(
      /["']/g,
      `'`
    )}","${photoUrl}",${videoUrlOne},${videoUrlTwo},"${instructions}" \n`
  })
  fs.writeFileSync(`${artworkDir}/artworks.csv`, artworkSubmissionFormData)
}

const getPublicProgrammingData = async (sheets) => {
  const spreadsheetId = '1Yh28jT6cQgCvzye8lgq724SpDe3g8fbERv2QJh-j-_M'
  const artworkDir = normalize(`${__dirname}/../src/utils/data`)

  const publicProgrammingData = await sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: 'Sheet1!2:119',
  })

  let publicProgrammingScheduleData = 'speakerName, keyWords, time, location\n'

  publicProgrammingData.data.values.forEach((data) => {
    const [speakerName, keyWords, time, location] = data
    publicProgrammingScheduleData += `${speakerName},${keyWords},${time},${location}`
  })
  fs.writeFileSync(
    `${artworkDir}/publicProgrammingSchedule.csv`,
    publicProgrammingScheduleData
  )
}

const main = async () => {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/drive'],
    keyFile: `${__dirname}/../secrets/gold-comparts.json`,
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const drive = google.drive({ version: 'v2', auth })

  getMegaformData(sheets)
  getArtworkFormData(sheets, drive)
  getPublicProgrammingData(sheets)
}

main()
