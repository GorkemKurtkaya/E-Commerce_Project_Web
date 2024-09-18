import mongoose from "mongoose";


const { Schema } = mongoose;

const adressSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Adress = mongoose.model("Address", adressSchema);

export default Adress;