import mongoose from "mongoose";

import slugGenerator from "mongoose-slug-updater";
mongoose.plugin(slugGenerator)

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    productID: { type: String },
    productName: { type: String },
    slug: { type: String, slug: 'productName', unique: true},
    SKU: { type: String },
    detail: { type: String },
    stock: { type: Number },
    sold: { type: Number },
    price: { type: Number },
    status: { type: Number },
    category: [{ type: String, ref: 'Category' }],
    brand: { type: String, ref: 'Brand' },
    productImage: { type: Array }
  }
);

export default mongoose.model("Product", Product);