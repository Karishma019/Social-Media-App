import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { useEffect, useState } from "react";
import { fetchPosts } from "../posts/postsSlice";

function Posts({ setCurrentId }) {
  const { data: posts, isLoading, error } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {posts &&
        posts.map((post) => {
          return <Post key={post._id} {...post} setCurrentId={setCurrentId} />;
        })}
    </div>
  );
}

export default Posts;
