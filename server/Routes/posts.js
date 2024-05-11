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
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likes", auth, likePost);
router.post("/:id/comments", auth, commentPost);

export default router;
