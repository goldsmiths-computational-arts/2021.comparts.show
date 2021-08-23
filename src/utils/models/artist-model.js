export default class ArtistModel {
  fullName
  preferredName
  uniEmail
  artistBio
  instagram
  website
  youtube
  vimeo
  twitch
  facebook
  twitter
  email
  constructor(
    fullName,
    preferredName,
    uniEmail,
    artistBio,
    instagram,
    website,
    youtube,
    vimeo,
    twitch,
    facebook,
    twitter,
    email
  ) {
    this.fullName = fullName
    this.preferredName = preferredName
    this.uniEmail = uniEmail
    this.artistBio = artistBio
    this.instagram = instagram
    this.website = website
    this.youtube = youtube
    this.vimeo = vimeo
    this.twitch = twitch
    this.facebook = facebook
    this.twitter = twitter
    this.email = email
  }
}
