import { useDispatch } from "react-redux";
import { commentPost, deletePost, likePost } from "../posts/postsSlice";
import { useState } from "react";
function Post({
  _id,
  creator,
  title,
  imgUrl,
  content,
  likes,
  comments,
  setCurrentId,
}) {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");

  const handleDelete = () => {
    const postId = _id;
    dispatch(deletePost(postId));
  };

  const handleLike = () => {
    dispatch(likePost(_id));
  };

  const handleComment = () => {
    dispatch(commentPost({ id: _id, comment: comment }));
    setComment("");
  };

  return (
    <div className="max-w-lg w-96 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <img
              className="h-10 w-10 rounded-full"
              src={imgUrl}
              alt="User Avatar"
            />
          </div>
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{creator}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">{title}</p>
          <img
            className="w-full object-cover h-48"
            src={imgUrl}
            alt="Post Image"
          />
          <p className="text-gray-700 mt-2">{content}</p>
        </div>
      </div>
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex items-center cursor-pointer" onClick={handleLike}>
          <p className="text-sm text-gray-500">{likes} Likes</p>
        </div>

        {showComments && (
          <>
            {comments &&
              comments.map((comment) => {
                return <p key={crypto.randomUUID()}>{comment}</p>;
              })}
            <div className="flex ">
              <input
                id="title"
                type="text"
                name="title"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="write a comment"
                required
              />
              <button
                className="bg-slate-100 px-3 rounded shadow"
                onClick={handleComment}
              >
                post
              </button>
            </div>
          </>
        )}
        <div
          className="flex items-center mt-1 cursor-pointer"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          {comments && (
            <p className="text-sm text-gray-500">
              {comments.length} {showComments ? "hide Comments" : "Comments"}
            </p>
          )}
        </div>
        <div>
          <button onClick={handleDelete}>delete</button>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(_id);
            }}
          >
            edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
