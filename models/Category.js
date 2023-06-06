import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Category = new Schema(
  {
    categoryID: { type: String},
    name: { type: String}
  }
);

export default mongoose.model("Category", Category);