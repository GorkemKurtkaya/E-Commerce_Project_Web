import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    imageUri: {
        type: String,
        required: true
    },
    category: { type: Array },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;