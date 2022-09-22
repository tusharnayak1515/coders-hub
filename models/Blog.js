const mongoose = require("mongoose");
const {Schema} = mongoose;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    content: [
       {
        subtitle: {
            type: String,
            default: null
        },
        language: {
            type: String,
            default: null
        },
        code: {
            type: String,
            default: null
        }
       }
    ],
    category: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number
},{timestamps: true});

const Blog = mongoose.models.Blog || mongoose.model("Blog",BlogSchema);
module.exports = Blog;