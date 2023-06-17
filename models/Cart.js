import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    username: { type: String},
    productID: { type: String },
    quantity: { type: Number },
    timeAdd: { type: String },
  }
);


export default mongoose.model("Cart", Cart);