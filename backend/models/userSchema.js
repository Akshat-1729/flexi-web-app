import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String, // Assuming the profile image will be stored as a path or URL
        default: null// Default value if no profile image is set
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    bookmarks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);