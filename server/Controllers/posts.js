import Post from "../Models/posts.js";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({ ...post, creator: req.userId });
  try {
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await Post.findById(id);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, imgUrl, likeCount, comments } = req.body.post;
  console.log(req.body);
  try {
    const updatedPost = {
      title,
      content,
      imgUrl,
      likeCount,
      comments,
      _id: id,
    };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.status(201).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.likes += 1; // Increment likes by 1 for toggle
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const post = await Post.findById(id);

  post.comments.push(comment);

  await post.save();

  res.status(201).json(post);
};
