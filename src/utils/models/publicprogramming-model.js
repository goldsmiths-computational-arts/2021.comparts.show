export default class G05ScheduleModel {
  guestSpeaker
  artistSpeakerOne
  artistSpeakerTwo
  artistSpeakerThree
  panel
  time
  location
  additionalInfo

  constructor(
    guestSpeaker,
    artistSpeakerOne,
    artistSpeakerTwo,
    artistSpeakerThree,
    panel,
    time,
    location,
    additionalInfo
  ) {
    this.guestSpeaker = guestSpeaker
    this.artistSpeakerOne = artistSpeakerOne
    this.artistSpeakerTwo = artistSpeakerTwo
    this.artistSpeakerThree = artistSpeakerThree
    this.panel = panel
    this.time = time
    this.location = location
    this.additionalInfo = additionalInfo
  }
}
