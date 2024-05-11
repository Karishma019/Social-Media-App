import Post from "../Models/posts.js";
import User from "../Models/userModel.js";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({ ...post, creator: req.userId });
  try {
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await Post.findById(id);
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, imgUrl, likeCount, comments, name } = req.body.post;
  try {
    const updatedPost = {
      title,
      name,
      content,
      imgUrl,
      likeCount,
      comments,
      _id: id,
    };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  await Post.findOneAndDelete(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const { userId } = req;

  try {
    const commentedUser = await User.findById(userId);
    const post = await Post.findById(id);

    post.comments.push({ comment: comment, commentedUser: commentedUser });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
