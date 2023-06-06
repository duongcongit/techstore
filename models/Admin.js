import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Admin = new Schema(
  {
    username: { type: String},
    name: { type: String },
    gender: { type: String },
    email: { type: String },
    password: {type: String},
    status: { type: Number },
  }
);


export default mongoose.model("Admin", Admin);