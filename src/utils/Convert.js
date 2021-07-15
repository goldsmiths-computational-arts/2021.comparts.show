import PostModel from "../models/PostModel";

export class Convert {
  // Takes in CSV line
  static toPostModel = (csv) => {
    // Returns post model
    return new PostModel(csv.title, csv.slug);
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
