import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Brand = new Schema(
  {
    brandID: { type: String},
    brandName: { type: String},
    status: {type: Number}
  }
);


export default mongoose.model("Brand", Brand);