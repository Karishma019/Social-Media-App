import express from "express";
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../Controllers/posts.js";
// import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likes", likePost);
router.post("/:id/comments", commentPost);

export default router;
