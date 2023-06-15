import mongoose from "mongoose";

import slugGenerator from "mongoose-slug-updater";
mongoose.plugin(slugGenerator)

const Schema = mongoose.Schema;

const Category = new Schema(
  {
    categoryID: { type: String},
    categoryName: { type: String},
    slug: { type: String, slug: 'categoryName', unique: true},
  }
);

export default mongoose.model("Category", Category);