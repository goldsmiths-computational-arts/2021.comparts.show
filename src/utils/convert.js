import ArtistModel from './models/artist-model'
import ArtworksModel from './models/artworks-model'

export class Convert {
  // Takes in CSV line
  static toArtistModel = (csv) => {
    // Returns post model
    return new ArtistModel(csv.name, csv.preferredName)
  }

  static toArtworksModel = (csv) => {
    return new ArtworksModel(
      csv.email,
      csv.legalName,
      csv.preferredName,
      csv.bio,
      csv.title,
      csv.artwork,
      csv.videoUrlOne,
      csv.videoUrlTwo,
      csv.instructions
    )
  }

  // Takes in CSV list and converter function and returns array of Model
  static toModelArray = (csvList, modelConverter) => {
    const modelArray = []
    // Loops through CSV
    csvList.forEach((csvModel) => {
      // Converts CSV line to Model
      let model = modelConverter(csvModel)
      modelArray.push(model)
    })
    return modelArray
  }
}
