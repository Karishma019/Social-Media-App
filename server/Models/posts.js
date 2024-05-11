import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  content: String,
  name: String,
  creator: String,
  imgUrl: String,
  likes: { type: [String], default: [] },
  comments: { type: [Object], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
