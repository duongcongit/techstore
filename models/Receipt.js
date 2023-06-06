import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Receipt = new Schema(
  {
    receiptID: { type: String},
    customerID: { type: String },
    employeeID: { type: String },
    timeBuy: { type: String },
    paymentMethod: { type: String },
    consigneeName: { type: String },
    phoneNumber: { type: String },
    deliveryAddress: { type: String },
    status: {type: Number},

  }
);


export default mongoose.model("Receipt", Receipt);