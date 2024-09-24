import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    user: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);

export default Address;