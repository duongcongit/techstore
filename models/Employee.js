import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Employee = new Schema(
  {
    employeeID: { type: String},
    username: { type: String},
    fullname: { type: String },
    gender: { type: String },
    phone: { type: String },
    email: {type: String},
    address: {type: String},
    password: {type: String},
    status: {type: Number}
  }
);


export default mongoose.model("Employee", Employee);