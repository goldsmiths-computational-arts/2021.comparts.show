export default class ArtworksModel {
  email
  legalName
  preferredName
  bio
  title
  artwork
  videoUrlOne
  videoUrlTwo
  instructions

  constructor(
    email,
    legalName,
    preferredName,
    bio,
    title,
    artwork,
    videoUrlOne,
    videoUrlTwo,
    instructions
  ) {
    this.email = email
    this.legalName = legalName
    this.preferredName = preferredName
    this.bio = bio
    this.title = title
    this.artwork = artwork
    this.videoUrlOne = videoUrlOne
    this.videoUrlTwo = videoUrlTwo
    this.instructions = instructions
  }
}
