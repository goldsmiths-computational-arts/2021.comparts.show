import ArtistModel from "./models/artist-model";



export class Convert {
    // Takes in CSV line
    static toArtistModel = (csv) => {
      // Returns post model
      return new ArtistModel(csv.name, csv.preferredName);
    };
  
    // Takes in CSV list and converter function and returns array of Model
    static toModelArray = (csvList, modelConverter) => {
      const modelArray = [];
      // Loops through CSV
      csvList.forEach(csvModel => {
        // Converts CSV line to Model
        let model = modelConverter(csvModel);
        modelArray.push(model);
      });
      return modelArray;
    };
  }