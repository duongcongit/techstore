import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    userID: { type: String},
    username: { type: String},
    fullname: { type: String },
    phone: { type: String },
    email: {type: String},
    address: {type: String},
    password: {type: String},
    status: {type: Number},
    role: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    createAt: {type: String},
    deleteAt: {type: String},
    activeAt: {type: String},
    activeCode: {type: String}
  }
);


export default mongoose.model("User", User);