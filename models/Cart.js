import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    customerID: { type: String},
    productID: { type: String },
    quantity: { type: Number },
    timeAdd: { type: String },
  }
);


export default mongoose.model("Cart", Cart);