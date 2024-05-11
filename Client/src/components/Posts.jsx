import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { useEffect, useState } from "react";
import { fetchPosts } from "../posts/postsSlice";
import { ImSpinner9 } from "react-icons/im";

function Posts({ setCurrentId, toggleModal }) {
  const { data: posts, isLoading, error } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <ImSpinner9 className="animate-spin text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-xl bg-red-50">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 ">
      {posts &&
        posts.map((post) => {
          return (
            <Post
              key={post._id}
              {...post}
              setCurrentId={setCurrentId}
              toggleModal={toggleModal}
            />
          );
        })}
    </div>
  );
}

export default Posts;
