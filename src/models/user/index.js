import mongoose from "mongoose";
import { Schema, model } from "mongoose";
const userSchema = new Schema({
    FullName: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
}, { timestamps: true });

const userModel = mongoose.models.user || model("user", userSchema);
export default userModel