const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profilepic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    blogs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
    role: {
        type: String,
        default: "user",
        enum: ["user","admin"]
    },
    createdAt: Number,
    updatedAt: Number
},{timestamps: true});

const User = mongoose.models.User || mongoose.model("User",UserSchema);
module.exports = User;