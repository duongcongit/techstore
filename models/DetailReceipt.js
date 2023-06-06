import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DetailReceipt = new Schema(
  {
    receiptID: { type: String},
    productID: { type: String },
    price: { type: Number },
    quantityBuy: { type: Number },
    amount: { type: Number }
  }
);


export default mongoose.model("DetailReceipt", DetailReceipt);