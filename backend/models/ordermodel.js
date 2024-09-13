import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUri: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
