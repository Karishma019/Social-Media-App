import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  name: String,
  creator: String,
  imgUrl: String,
  likes: { type: Number, default: 0 },

  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
