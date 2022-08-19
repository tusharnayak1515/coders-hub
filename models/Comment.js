const mongoose = require("mongoose");
const {Schema} = mongoose;

const CommentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    comment: [
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
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    createdAt: Number,
    updatedAt: Number
},{timestamps: true});

const Comment = mongoose.models.Comment || mongoose.model("Comment",CommentSchema);
module.exports = Comment;