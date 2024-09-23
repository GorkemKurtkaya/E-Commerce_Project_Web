import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        validate: [validator.isAlphanumeric, "Name can only contain letters and numbers"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Invalid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [3, "Password must be at least 3 characters long"]
    },
    purchasedProducts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address"
    }
    ],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });


userSchema.pre("save", function (next) {
    const user = this;

    // Eğer password değişmemişse, hashleme işlemini atla
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", userSchema);

export default User;
