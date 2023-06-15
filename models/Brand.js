import mongoose from "mongoose";

import slugGenerator from "mongoose-slug-updater";
mongoose.plugin(slugGenerator)

const Schema = mongoose.Schema;

const Brand = new Schema(
  {
    brandID: { type: String},
    brandName: { type: String},
    slug: { type: String, slug: 'brandName', unique: true},
  }
);


export default mongoose.model("Brand", Brand);