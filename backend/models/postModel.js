const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  caption: { type: String },
  image: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],
});
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
