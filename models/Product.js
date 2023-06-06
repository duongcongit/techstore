import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    productID: { type: String},
    productName: { type: String },
    detail: { type: String },
    stock: { type: Number },
    sold: { type: Number },
    price: { type: Number },
    status: { type: Number },
    categoryID: { type: String },
    brandID: { type: String },
    productImage: { type: String }
  }
);


export default mongoose.model("Product", Product);