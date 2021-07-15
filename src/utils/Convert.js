import PostModel from "../models/PostModel";

export class Convert {
  static toPostModel = (csv) => {

    return new PostModel(csv.title, csv.slug);
  };


  static toModelArray = (csvList, modelConverter) => {
    const modelArray = [];
    csvList.forEach(csvModel => {
      let model = modelConverter(csvModel);
      modelArray.push(model);
    });
    return modelArray;
  };
}
